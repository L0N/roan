import connectDB from '../../../lib/db/mongodb';
import Photo from '../../../models/Photo';
import Album from '../../../models/Album';
import { requireAdmin } from '../../../lib/auth/jwt';
import { deleteImage } from '../../../lib/cloudinary/config';
import { validatePhotoData } from '../../../utils/validation';

async function handleGET(req, res) {
  try {
    const { id } = req.query;

    await connectDB();

    const photo = await Photo.findById(id)
      .populate('albumId', 'name slug')
      .lean();

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    res.status(200).json({ photo });

  } catch (error) {
    console.error('Get photo error:', error);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
}

async function handlePATCH(req, res) {
  try {
    const { id } = req.query;
    const updateData = req.body;

    // Validate update data
    const validationErrors = validatePhotoData(updateData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join(', ') });
    }

    await connectDB();

    const photo = await Photo.findById(id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Handle album change
    const oldAlbumId = photo.albumId;
    const newAlbumId = updateData.albumId;

    // Update photo
    const updatedPhoto = await Photo.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('albumId', 'name slug');

    // Update album photo counts if album changed
    if (oldAlbumId && oldAlbumId.toString() !== newAlbumId) {
      await Album.findByIdAndUpdate(oldAlbumId, {
        $inc: { photoCount: -1 },
      });
    }

    if (newAlbumId && oldAlbumId?.toString() !== newAlbumId) {
      await Album.findByIdAndUpdate(newAlbumId, {
        $inc: { photoCount: 1 },
      });
    }

    res.status(200).json({
      message: 'Photo updated successfully',
      photo: updatedPhoto,
    });

  } catch (error) {
    console.error('Update photo error:', error);
    res.status(500).json({ error: 'Failed to update photo' });
  }
}

async function handleDELETE(req, res) {
  try {
    const { id } = req.query;

    await connectDB();

    const photo = await Photo.findById(id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Delete from Cloudinary
    try {
      await deleteImage(photo.publicId);
    } catch (cloudinaryError) {
      console.error('Cloudinary delete error:', cloudinaryError);
      // Continue with database deletion even if Cloudinary fails
    }

    // Update album photo count
    if (photo.albumId) {
      await Album.findByIdAndUpdate(photo.albumId, {
        $inc: { photoCount: -1 },
      });
    }

    // Delete from database
    await Photo.findByIdAndDelete(id);

    res.status(200).json({ message: 'Photo deleted successfully' });

  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
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

