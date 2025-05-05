// models/Plan.js
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  specifications: {
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    squareFootage: {
      type: Number,
      required: true
    },
    dimensions: {
      width: Number,
      depth: Number,
      height: Number
    }
  },
  media: {
    exteriorImages: [String],
    interiorImages: [String],
    floorPlanImages: [String]
  },
  files: {
    pdfUrl: String,
    cadUrl: String
  },
  metadata: {
    style: {
      type: String,
      enum: ['Modern', 'Traditional', 'Colonial', 'Craftsman', 'Farmhouse', 'Mediterranean', 'Contemporary', 'Ranch', 'Other'],
      required: true
    },
    features: [String],
    categories: [String],
    tags: [String]
  },
  variations: [{
    name: String,
    description: String,
    priceAdjustment: Number
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Add index for search functionality
planSchema.index({ 
  name: 'text', 
  description: 'text', 
  'metadata.style': 'text',
  'metadata.features': 'text',
  'metadata.categories': 'text',
  'metadata.tags': 'text'
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;