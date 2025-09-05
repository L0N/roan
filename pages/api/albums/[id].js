import connectDB from '../../../lib/db/mongodb';
import Album from '../../../models/Album';
import Photo from '../../../models/Photo';
import { requireAdmin } from '../../../lib/auth/jwt';
import { validateAlbumData } from '../../../utils/validation';

async function handleGET(req, res) {
  try {
    const { id } = req.query;

    await connectDB();

    const album = await Album.findById(id)
      .populate('coverPhotoId', 'url webpUrl title altText')
      .lean();

    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    // Get photos in this album
    const photos = await Photo.find({ albumId: id })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ 
      album: {
        ...album,
        photos,
      }
    });

  } catch (error) {
    console.error('Get album error:', error);
    res.status(500).json({ error: 'Failed to fetch album' });
  }
}

async function handlePATCH(req, res) {
  try {
    const { id } = req.query;
    const updateData = req.body;

    // Validate update data
    const validationErrors = validateAlbumData(updateData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join(', ') });
    }

    await connectDB();

    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    // Check if new name conflicts with existing album
    if (updateData.name && updateData.name !== album.name) {
      const existingAlbum = await Album.findOne({ 
        name: { $regex: new RegExp(`^${updateData.name}$`, 'i') },
        _id: { $ne: id }
      });

      if (existingAlbum) {
        return res.status(400).json({ error: 'Album name already exists' });
      }
    }

    // Update album
    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('coverPhotoId', 'url webpUrl title altText');

    res.status(200).json({
      message: 'Album updated successfully',
      album: updatedAlbum,
    });

  } catch (error) {
    console.error('Update album error:', error);
    res.status(500).json({ error: 'Failed to update album' });
  }
}

async function handleDELETE(req, res) {
  try {
    const { id } = req.query;

    await connectDB();

    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    // Check if album has photos
    const photoCount = await Photo.countDocuments({ albumId: id });
    if (photoCount > 0) {
      return res.status(400).json({ 
        error: `Cannot delete album with ${photoCount} photos. Please move or delete photos first.` 
      });
    }

    // Delete album
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: 'Album deleted successfully' });

  } catch (error) {
    console.error('Delete album error:', error);
    res.status(500).json({ error: 'Failed to delete album' });
  }
}

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return handleGET(req, res);
    case 'PATCH':
      return requireAdmin(handlePATCH)(req, res);
    case 'DELETE':
      return requireAdmin(handleDELETE)(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler;

