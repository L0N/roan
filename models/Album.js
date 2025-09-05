import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    unique: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  coverPhotoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
    default: null
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  photoCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
AlbumSchema.index({ isPublic: 1, sortOrder: 1 });
AlbumSchema.index({ slug: 1 });

// Pre-save middleware to generate slug
AlbumSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual to populate cover photo
AlbumSchema.virtual('coverPhoto', {
  ref: 'Photo',
  localField: 'coverPhotoId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtual fields are serialized
AlbumSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Album || mongoose.model('Album', AlbumSchema);

