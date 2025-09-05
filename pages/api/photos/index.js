import connectDB from '../../../lib/db/mongodb';
import Photo from '../../../models/Photo';
import Album from '../../../models/Album';
import { requireAdmin } from '../../../lib/auth/jwt';
import { uploadImage } from '../../../lib/cloudinary/config';
import { validatePhotoData } from '../../../utils/validation';
import multer from 'multer';
import { promisify } from 'util';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

const uploadMiddleware = promisify(upload.single('image'));

// Disable Next.js body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handleGET(req, res) {
  try {
    await connectDB();

    const {
      page = 1,
      limit = 12,
      category,
      album,
      featured,
      search,
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = {};
    
    if (category) {
      query.categories = { $in: [category] };
    }
    
    if (album) {
      query.albumId = album;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'metadata.description': { $regex: search, $options: 'i' } },
        { 'metadata.location': { $regex: search, $options: 'i' } },
      ];
    }

    // Get photos with pagination
    const photos = await Photo.find(query)
      .populate('albumId', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const total = await Photo.countDocuments(query);

    // Get unique categories for filtering
    const categories = await Photo.distinct('categories');

    res.status(200).json({
      photos,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
      categories: categories.filter(Boolean).sort(),
    });

  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
}

async function handlePOST(req, res) {
  try {
    // Handle file upload
    await uploadMiddleware(req, res);

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Parse form data
    const {
      title,
      altText,
      categories,
      albumId,
      featured,
      metadata,
    } = req.body;

    // Validate data
    const photoData = {
      title,
      altText,
      categories: categories ? JSON.parse(categories) : [],
      featured: featured === 'true',
      metadata: metadata ? JSON.parse(metadata) : {},
    };

    const validationErrors = validatePhotoData(photoData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join(', ') });
    }

    await connectDB();

    // Upload to Cloudinary
    const uploadResult = await uploadImage(req.file.buffer, {
      folder: 'roanpaul-portfolio',
      tags: ['portfolio', ...(photoData.categories || [])],
      context: {
        title: photoData.title,
        alt: photoData.altText,
      },
    });

    // Create photo record
    const photo = new Photo({
      ...photoData,
      ...uploadResult,
      albumId: albumId || null,
    });

    await photo.save();

    // Update album photo count if assigned to album
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $inc: { photoCount: 1 },
      });
    }

    // Populate album info for response
    await photo.populate('albumId', 'name slug');

    res.status(201).json({
      message: 'Photo uploaded successfully',
      photo,
    });

  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
}

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return handleGET(req, res);
    case 'POST':
      return requireAdmin(handlePOST)(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler;

