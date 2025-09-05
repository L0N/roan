import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload image to Cloudinary with automatic optimization and watermark
 */
export async function uploadImage(file, options = {}) {
  try {
    const {
      folder = 'roanpaul-portfolio',
      transformation = [],
      tags = [],
      context = {},
    } = options;

    // Base transformations for optimization
    const baseTransformations = [
      { quality: 'auto:good' },
      { fetch_format: 'auto' },
    ];

    // Upload original image
    const uploadResult = await cloudinary.uploader.upload(file, {
      folder,
      tags: ['original', ...tags],
      context,
      transformation: [...baseTransformations, ...transformation],
      resource_type: 'image',
    });

    // Generate WebP version
    const webpUrl = cloudinary.url(uploadResult.public_id, {
      format: 'webp',
      quality: 'auto:good',
      transformation: transformation,
    });

    // Generate watermarked version
    const watermarkedUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        ...transformation,
        {
          overlay: {
            font_family: 'Arial',
            font_size: 48,
            font_weight: 'bold',
            text: '© RoanPaul Photography',
          },
          opacity: 30,
          gravity: 'south_east',
          x: 20,
          y: 20,
          color: 'white',
        },
      ],
    });

    return {
      url: uploadResult.secure_url,
      webpUrl,
      watermarkedUrl,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      fileSize: uploadResult.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}

/**
 * Generate optimized image URL with transformations
 */
export function getOptimizedImageUrl(publicId, options = {}) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto:good',
    format = 'auto',
    gravity = 'auto',
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    format,
    gravity,
    secure: true,
  });
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(publicId, options = {}) {
  const { crop = 'fill', quality = 'auto:good', format = 'auto' } = options;
  
  const breakpoints = [640, 768, 1024, 1280, 1536, 1920];
  
  return breakpoints.map(width => ({
    width,
    url: cloudinary.url(publicId, {
      width,
      crop,
      quality,
      format,
      secure: true,
    }),
  }));
}

export default cloudinary;

