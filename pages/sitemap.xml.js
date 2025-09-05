// This file generates the sitemap.xml dynamically
import connectDB from '../lib/db/mongodb';
import Photo from '../models/Photo';
import Album from '../models/Album';

function generateSiteMap(photos, albums) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roanpaul-photography.vercel.app';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static pages -->
     <url>
       <loc>${siteUrl}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${siteUrl}/gallery</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${siteUrl}/about</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${siteUrl}/contact</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <!-- Dynamic photo pages -->
     ${photos
       .map((photo) => {
         return `
       <url>
           <loc>${siteUrl}/photo/${photo._id}</loc>
           <lastmod>${photo.updatedAt}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.6</priority>
       </url>
     `;
       })
       .join('')}
     <!-- Dynamic album pages -->
     ${albums
       .map((album) => {
         return `
       <url>
           <loc>${siteUrl}/album/${album.slug}</loc>
           <lastmod>${album.updatedAt}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  try {
    await connectDB();
    
    // Get all photos and albums for sitemap
    const photos = await Photo.find({}).select('_id updatedAt').lean();
    const albums = await Album.find({ isPublic: true }).select('slug updatedAt').lean();

    // Generate the XML sitemap
    const sitemap = generateSiteMap(photos, albums);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Return basic sitemap on error
    const basicSitemap = generateSiteMap([], []);
    res.setHeader('Content-Type', 'text/xml');
    res.write(basicSitemap);
    res.end();

    return {
      props: {},
    };
  }
}

export default SiteMap;

