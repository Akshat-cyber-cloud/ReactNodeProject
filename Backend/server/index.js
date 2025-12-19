const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Import http
const { Server } = require('socket.io'); // Import Server from socket.io
const jwt = require('jsonwebtoken'); // Need jwt for socket auth
require('dotenv').config();

const Startup = require('./models/Startup');
const Corporate = require('./models/Corporate');
const Opportunity = require('./models/Opportunity');
const Solution = require('./models/Solution');
const Chat = require('./models/Chat'); // Import Chat model
const { generateToken, authenticate } = require('./middleware/auth');

const app = express();
const server = http.createServer(app); // Create HTTP server




app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://collabx-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());
app.use(express.json());


const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://collabx-frontend.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const PORT = process.env.PORT || 5000;
const { MONGO_URI, JWT_SECRET } = process.env;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in .env');
  process.exit(1);
}

const allowedOrigins = [
  "http://localhost:5173",
  "https://collabx-frontend.onrender.com"
];

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  });

// --- SOCKET.IO MIDDLEWARE & LOGIC ---

// Middleware to authenticate socket connection
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    socket.user = decoded; // { id, type, email }
    next();
  } catch (err) {
    next(new Error('Authentication error: Invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.user.id} (${socket.user.type})`);

  // Ensure user.id is a string for room consistency
  const userId = String(socket.user.id);

  // Join a room specific to this user ID so they can receive direct messages
  socket.join(userId);

  // Event: Send Message
  socket.on('send_message', async (data) => {
    // Validate input data
    if (!data || !data.recipientId || !data.content) {
      socket.emit('error', { message: 'Missing required fields: recipientId and content are required' });
      return;
    }

    // data = { recipientId, recipientType, content, recipientName, senderName, clientTempId }
    let { recipientId, recipientType, content, recipientName, senderName, clientTempId } = data;
    const senderId = userId; // Use the string version
    const senderType = socket.user.type;

    // Ensure recipientId is a string for room consistency
    recipientId = String(recipientId);

    try {
      // Validate ObjectId format before casting
      if (!mongoose.Types.ObjectId.isValid(senderId)) {
        throw new Error('Invalid sender ID format');
      }
      if (!mongoose.Types.ObjectId.isValid(recipientId)) {
        throw new Error('Invalid recipient ID format');
      }

      // Cast to ObjectId for database operations
      const senderObjectId = new mongoose.Types.ObjectId(senderId);
      const recipientObjectId = new mongoose.Types.ObjectId(recipientId);

      // Prevent sending message to self
      if (senderId === recipientId) {
        console.error(`❌ Self-message blocked: ${senderId} → ${recipientId}`);
        socket.emit('error', { message: 'Cannot send message to yourself' });
        return;
      }

      // 1. Find or Create Chat in DB
      let chat = await Chat.findOne({
        'participants.id': { $all: [senderObjectId, recipientObjectId] }
      });

      if (!chat) {
        chat = new Chat({
          participants: [
            { id: senderObjectId, type: senderType, name: senderName || 'Unknown' },
            { id: recipientObjectId, type: recipientType || 'unknown', name: recipientName || 'Unknown' }
          ],
          messages: []
        });
      }

      // 2. Add Message
      const newMessage = {
        senderId: senderObjectId,
        content: content.trim(),
        timestamp: new Date(),
        read: false
      };

      chat.messages.push(newMessage);
      chat.lastUpdated = new Date();
      await chat.save();

      // 3. Emit to Recipient (if online) - use string ID for room
      io.to(recipientId).emit('receive_message', {
        chatId: chat._id.toString(),
        message: {
          ...newMessage,
          senderId: senderId, // Send as string for frontend
          _id: newMessage._id || new mongoose.Types.ObjectId()
        },
        senderId: senderId,
        senderName: senderName || 'Unknown'
      });

      // 4. Emit back to Sender (for UI update confirmation)
      socket.emit('message_sent', {
        chatId: chat._id.toString(),
        message: {
          ...newMessage,
          senderId: senderId,
          _id: newMessage._id || new mongoose.Types.ObjectId()
        },
        recipientId: recipientId,
        clientTempId // Echo back the temp ID
      });

    } catch (err) {
      console.error('❌ Socket message error:', err);
      console.error('Error stack:', err.stack);
      // Send error back to sender
      socket.emit('error', {
        message: 'Failed to send message: ' + err.message,
        clientTempId: clientTempId // Include tempId so frontend can handle it
      });
    }
  });

  // Handle typing indicators (optional but useful)
  socket.on('typing_start', (data) => {
    const recipientId = String(data.recipientId);
    socket.to(recipientId).emit('user_typing', {
      senderId: userId,
      senderName: socket.user.email || 'Someone'
    });
  });

  socket.on('typing_stop', (data) => {
    const recipientId = String(data.recipientId);
    socket.to(recipientId).emit('user_stopped_typing', {
      senderId: userId
    });
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${userId}`);
  });
});


// --- REST ROUTES ---

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// ========== STARTUP ROUTES ==========

// Startup Signup
app.post('/api/startups/signup', async (req, res) => {
  try {
    const { companyName, email, password, founderName, industry, description, website, stage } = req.body;

    if (!companyName || !email || !password || !founderName) {
      return res.status(400).json({ error: 'Company name, email, password, and founder name are required' });
    }

    // Check if email already exists
    const existingStartup = await Startup.findOne({ email });
    if (existingStartup) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const startup = await Startup.create({
      companyName,
      email,
      password,
      founderName,
      industry,
      description,
      website,
      stage,
    });

    const token = generateToken({ id: startup._id, type: 'startup', email: startup.email });

    res.status(201).json({
      message: 'Startup registered successfully',
      token,
      user: startup,
    });
  } catch (err) {
    console.error('Startup signup error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Startup Login
app.post('/api/startups/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const startup = await Startup.findOne({ email });
    if (!startup) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await startup.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken({ id: startup._id, type: 'startup', email: startup.email });

    res.json({
      message: 'Login successful',
      token,
      user: startup,
    });
  } catch (err) {
    console.error('Startup login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== CORPORATE ROUTES ==========

// Corporate Signup
app.post('/api/corporates/signup', async (req, res) => {
  try {
    const { companyName, email, password, contactPerson, industry, description, website, companySize } = req.body;

    if (!companyName || !email || !password || !contactPerson) {
      return res.status(400).json({ error: 'Company name, email, password, and contact person are required' });
    }

    // Check if email already exists
    const existingCorporate = await Corporate.findOne({ email });
    if (existingCorporate) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const corporate = await Corporate.create({
      companyName,
      email,
      password,
      contactPerson,
      industry,
      description,
      website,
      companySize,
    });

    const token = generateToken({ id: corporate._id, type: 'corporate', email: corporate.email });

    res.status(201).json({
      message: 'Corporate registered successfully',
      token,
      user: corporate,
    });
  } catch (err) {
    console.error('Corporate signup error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Corporate Login
app.post('/api/corporates/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const corporate = await Corporate.findOne({ email });
    if (!corporate) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await corporate.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken({ id: corporate._id, type: 'corporate', email: corporate.email });

    res.json({
      message: 'Login successful',
      token,
      user: corporate,
    });
  } catch (err) {
    console.error('Corporate login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route example (get current user)
app.get('/api/me', authenticate, async (req, res) => {
  try {
    const { id, type } = req.user;
    let user;

    if (type === 'startup') {
      user = await Startup.findById(id);
    } else if (type === 'corporate') {
      user = await Corporate.findById(id);
    } else {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== CHAT ROUTES ==========

// Get User's Chats
app.get('/api/chats', authenticate, async (req, res) => {
  try {
    const { id } = req.user;

    // Validate and convert user ID to ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`❌ Invalid user ID format: ${id}`);
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const userObjectId = new mongoose.Types.ObjectId(id);

    // Find all chats where user is a participant
    let chats = await Chat.find({
      'participants.id': userObjectId
    })
      .sort({ lastUpdated: -1 });

    // If no chats found, try alternative approach (filter in memory)
    // This handles edge cases where ObjectId comparison might fail
    if (chats.length === 0) {
      const allChats = await Chat.find({}).lean();
      const userIdStr = userObjectId.toString();

      chats = allChats.filter(chat => {
        return chat.participants.some(p => {
          const participantId = p.id;
          const participantIdStr = participantId.toString ? participantId.toString() : String(participantId);
          return participantIdStr === userIdStr;
        });
      });

      // Sort by lastUpdated
      chats.sort((a, b) => {
        const dateA = a.lastUpdated || a.createdAt || new Date(0);
        const dateB = b.lastUpdated || b.createdAt || new Date(0);
        return new Date(dateB) - new Date(dateA);
      });
    }

    res.json(chats);
  } catch (err) {
    console.error('Get chats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ========== OPPORTUNITY ROUTES ==========

// Get all opportunities (posted by corporates)
app.get('/api/opportunities', async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ status: 'Open' })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(opportunities);
  } catch (err) {
    console.error('Error fetching opportunities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create opportunity (for corporates)
app.post('/api/opportunities', authenticate, async (req, res) => {
  try {
    const { id, type } = req.user;

    if (type !== 'corporate') {
      return res.status(403).json({ error: 'Only corporates can post opportunities' });
    }

    const corporate = await Corporate.findById(id);
    if (!corporate) {
      return res.status(404).json({ error: 'Corporate not found' });
    }

    const {
      title,
      description,
      industry,
      requirements,
      budget,
      deadline,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const opportunity = await Opportunity.create({
      title,
      description,
      industry,
      requirements,
      budget,
      deadline,
      corporateId: id,
      corporateName: corporate.companyName,
    });

    res.status(201).json(opportunity);
  } catch (err) {
    console.error('Error creating opportunity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== SOLUTION ROUTES ==========

// Create solution (for startups)
app.post('/api/solutions', authenticate, async (req, res) => {
  try {
    const { id, type } = req.user;

    if (type !== 'startup') {
      return res.status(403).json({ error: 'Only startups can post solutions' });
    }

    const startup = await Startup.findById(id);
    if (!startup) {
      return res.status(404).json({ error: 'Startup not found' });
    }

    const {
      title,
      description,
      solutionType,
      industry,
      keyFeatures,
      pricing,
      website,
      opportunityId,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const solution = await Solution.create({
      title,
      description,
      solutionType,
      industry,
      keyFeatures,
      pricing,
      website,
      opportunityId: opportunityId || null,
      startupId: id,
      startupName: startup.companyName,
      founderName: startup.founderName,
    });

    res.status(201).json(solution);
  } catch (err) {
    console.error('Error creating solution:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get solutions (for startups to see their own solutions, for corporates to see all solutions)
app.get('/api/solutions', authenticate, async (req, res) => {
  try {
    const { id, type } = req.user;

    let solutions;
    if (type === 'startup') {
      // Startups see only their own solutions
      solutions = await Solution.find({ startupId: id })
        .sort({ createdAt: -1 });
    } else if (type === 'corporate') {
      // Corporates see all solutions posted by startups
      solutions = await Solution.find()
        .sort({ createdAt: -1 })
        .limit(100);
    } else {
      return res.status(403).json({ error: 'Invalid user type' });
    }

    res.json(solutions);
  } catch (err) {
    console.error('Error fetching solutions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// NOTE: Use server.listen instead of app.listen for Socket.io
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT} with Socket.io support`);
});


