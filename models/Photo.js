import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  url: {
    type: String,
    required: true
  },
  webpUrl: {
    type: String,
    required: true
  },
  watermarkedUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    default: null
  },
  categories: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  metadata: {
    camera: {
      type: String,
      trim: true
    },
    lens: {
      type: String,
      trim: true
    },
    iso: {
      type: Number,
      min: 50,
      max: 102400
    },
    shutterSpeed: {
      type: String,
      trim: true
    },
    aperture: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  altText: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
PhotoSchema.index({ featured: 1, createdAt: -1 });
PhotoSchema.index({ categories: 1, createdAt: -1 });
PhotoSchema.index({ albumId: 1, createdAt: -1 });
PhotoSchema.index({ createdAt: -1 });

// Virtual for SEO-friendly URL slug
PhotoSchema.virtual('slug').get(function() {
  return this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
});

// Ensure virtual fields are serialized
PhotoSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Photo || mongoose.model('Photo', PhotoSchema);

