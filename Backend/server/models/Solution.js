const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    solutionType: {
      type: String,
      enum: ['Product', 'Service', 'Technology', 'Other'],
      default: 'Product',
    },
    industry: {
      type: String,
      trim: true,
    },
    keyFeatures: {
      type: String,
      trim: true,
    },
    pricing: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity',
      default: null,
    },
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
    },
    startupName: {
      type: String,
      required: true,
    },
    founderName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Solution', solutionSchema);

