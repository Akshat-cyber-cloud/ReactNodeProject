const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    },
});

const ChatSchema = new mongoose.Schema({
    participants: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            type: {
                type: String, // 'startup' or 'corporate'
                required: true,
            },
            name: {
                type: String,
            },
            avatar: {
                type: String, // Optional URL
            }
        },
    ],
    messages: [MessageSchema],
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster queries needed for "My Chats"
ChatSchema.index({ 'participants.id': 1 });

module.exports = mongoose.model('Chat', ChatSchema);
