import connectDB from '../../../lib/db/mongodb';
import Album from '../../../models/Album';
import Photo from '../../../models/Photo';
import { requireAdmin } from '../../../lib/auth/jwt';
import { validateAlbumData } from '../../../utils/validation';

async function handleGET(req, res) {
  try {
    await connectDB();

    const {
      page = 1,
      limit = 20,
      includePrivate = false,
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = {};
    if (includePrivate !== 'true') {
      query.isPublic = true;
    }

    // Get albums with pagination
    const albums = await Album.find(query)
      .populate('coverPhotoId', 'url webpUrl title altText')
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count
    const total = await Album.countDocuments(query);

    res.status(200).json({
      albums,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
    });

  } catch (error) {
    console.error('Get albums error:', error);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
}

async function handlePOST(req, res) {
  try {
    const albumData = req.body;

    // Validate data
    const validationErrors = validateAlbumData(albumData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join(', ') });
    }

    await connectDB();

    // Check if album name already exists
    const existingAlbum = await Album.findOne({ 
      name: { $regex: new RegExp(`^${albumData.name}$`, 'i') }
    });

    if (existingAlbum) {
      return res.status(400).json({ error: 'Album name already exists' });
    }

    // Create album
    const album = new Album(albumData);
    await album.save();

    // Populate cover photo for response
    await album.populate('coverPhotoId', 'url webpUrl title altText');

    res.status(201).json({
      message: 'Album created successfully',
      album,
    });

  } catch (error) {
    console.error('Create album error:', error);
    res.status(500).json({ error: 'Failed to create album' });
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

