import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '../components/common/Layout';
import Lightbox from '../components/gallery/Lightbox';
import connectDB from '../lib/db/mongodb';
import Photo from '../models/Photo';
import Album from '../models/Album';

export default function Gallery({ initialPhotos, albums, categories }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('categories'); // 'categories' or 'all'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMetadata, setShowMetadata] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch photos based on filters
  const fetchPhotos = async (filters = {}, pageNum = 1, append = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '12',
        ...filters,
      });

      const response = await fetch(`/api/photos?${params}`);
      const data = await response.json();

      if (append) {
        setPhotos(prev => [...prev, ...data.photos]);
      } else {
        setPhotos(data.photos);
      }

      setHasMore(data.pagination.hasNext);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setSelectedAlbum('');
    fetchPhotos({ category }, 1);
  };

  // Handle album filter
  const handleAlbumFilter = (albumId) => {
    setSelectedAlbum(albumId);
    setSelectedCategory('');
    fetchPhotos({ album: albumId }, 1);
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setSelectedCategory('');
    setSelectedAlbum('');
    if (mode === 'all') {
      fetchPhotos({}, 1);
    } else {
      setPhotos([]);
    }
  };

  // Load more photos (infinite scroll)
  const loadMore = () => {
    if (!loading && hasMore) {
      const filters = {};
      if (selectedCategory) filters.category = selectedCategory;
      if (selectedAlbum) filters.album = selectedAlbum;
      fetchPhotos(filters, page + 1, true);
    }
  };

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Layout
      title="Gallery - RoanPaul Photography & Arts"
      description="Explore the complete photography portfolio of RoanPaul. Browse by categories or view all photos in our comprehensive gallery."
      url="/gallery"
    >
      <div className="gallery-page">
        {/* Header */}
        <section className="gallery-header">
          <div className="container">
            <h1 className="gallery-title">Photography Gallery</h1>
            <p className="gallery-description">
              Explore my complete portfolio of photography work, organized by categories 
              and collections for easy browsing.
            </p>
          </div>
        </section>

        {/* Controls */}
        <section className="gallery-controls">
          <div className="container">
            <div className="controls-row">
              {/* View Mode Toggle */}
              <div className="view-mode-toggle">
                <button
                  className={`toggle-btn ${viewMode === 'categories' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('categories')}
                >
                  Categories
                </button>
                <button
                  className={`toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('all')}
                >
                  All Photos
                </button>
              </div>

              {/* Metadata Toggle */}
              <button
                className={`metadata-toggle ${showMetadata ? 'active' : ''}`}
                onClick={() => setShowMetadata(!showMetadata)}
              >
                {showMetadata ? 'Hide Info' : 'Show Info'}
              </button>
            </div>

            {/* Filters */}
            {viewMode === 'all' && (
              <div className="filters">
                {/* Category Filter */}
                {categories.length > 0 && (
                  <div className="filter-group">
                    <label className="filter-label">Filter by Category:</label>
                    <select
                      className="filter-select"
                      value={selectedCategory}
                      onChange={(e) => handleCategoryFilter(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Album Filter */}
                {albums.length > 0 && (
                  <div className="filter-group">
                    <label className="filter-label">Filter by Album:</label>
                    <select
                      className="filter-select"
                      value={selectedAlbum}
                      onChange={(e) => handleAlbumFilter(e.target.value)}
                    >
                      <option value="">All Albums</option>
                      {albums.map((album) => (
                        <option key={album._id} value={album._id}>
                          {album.name} ({album.photoCount})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="gallery-content">
          <div className="container">
            {viewMode === 'categories' ? (
              // Categories View
              <div className="categories-view">
                {categories.length > 0 ? (
                  <div className="categories-grid">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="category-card"
                        onClick={() => {
                          setViewMode('all');
                          handleCategoryFilter(category);
                        }}
                      >
                        <div className="category-name">{category}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No categories available yet.</p>
                  </div>
                )}

                {albums.length > 0 && (
                  <>
                    <h2 className="albums-title">Albums</h2>
                    <div className="albums-grid">
                      {albums.map((album) => (
                        <div
                          key={album._id}
                          className="album-card"
                          onClick={() => {
                            setViewMode('all');
                            handleAlbumFilter(album._id);
                          }}
                        >
                          {album.coverPhotoId && (
                            <div className="album-cover">
                              <Image
                                src={album.coverPhotoId.webpUrl || album.coverPhotoId.url}
                                alt={album.coverPhotoId.altText}
                                width={300}
                                height={200}
                                className="album-cover-image"
                              />
                            </div>
                          )}
                          <div className="album-info">
                            <h3 className="album-name">{album.name}</h3>
                            <p className="album-count">{album.photoCount} photos</p>
                            {album.description && (
                              <p className="album-description">{album.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              // All Photos View
              <div className="photos-view">
                {photos.length > 0 ? (
                  <>
                    <div className="photos-grid">
                      {photos.map((photo, index) => (
                        <div
                          key={photo._id}
                          className="photo-item"
                          onClick={() => openLightbox(index)}
                        >
                          <div className="photo-wrapper">
                            <Image
                              src={photo.webpUrl || photo.url}
                              alt={photo.altText}
                              width={400}
                              height={300}
                              className="photo-image"
                            />
                            {showMetadata && (
                              <div className="photo-metadata">
                                <h3 className="photo-title">{photo.title}</h3>
                                {photo.metadata?.location && (
                                  <p className="photo-location">{photo.metadata.location}</p>
                                )}
                                {photo.metadata?.camera && (
                                  <p className="photo-camera">{photo.metadata.camera}</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                      <div className="load-more">
                        <button
                          className="btn btn-primary"
                          onClick={loadMore}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner"></span>
                              Loading...
                            </>
                          ) : (
                            'Load More Photos'
                          )}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="empty-state">
                    {loading ? (
                      <div className="loading-state">
                        <span className="spinner"></span>
                        <p>Loading photos...</p>
                      </div>
                    ) : (
                      <p>No photos found. Try adjusting your filters.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            photos={photos}
            currentIndex={currentImageIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={(index) => setCurrentImageIndex(index)}
            onPrev={(index) => setCurrentImageIndex(index)}
            showMetadata={showMetadata}
          />
        )}
      </div>

      <style jsx>{`
        .gallery-page {
          min-height: 100vh;
        }
        
        .gallery-header {
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          padding: 3rem 0;
          text-align: center;
        }
        
        .gallery-title {
          font-size: 3rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .gallery-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .gallery-controls {
          background: white;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .view-mode-toggle {
          display: flex;
          border: 2px solid var(--accent-color);
          border-radius: var(--border-radius);
          overflow: hidden;
        }
        
        .toggle-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          background: white;
          color: var(--accent-color);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 600;
        }
        
        .toggle-btn.active {
          background: var(--accent-color);
          color: white;
        }
        
        .metadata-toggle {
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--accent-color);
          border-radius: var(--border-radius);
          background: white;
          color: var(--accent-color);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 600;
        }
        
        .metadata-toggle.active {
          background: var(--accent-color);
          color: white;
        }
        
        .filters {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .filter-label {
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .filter-select {
          padding: 0.5rem;
          border: 2px solid var(--border-color);
          border-radius: var(--border-radius);
          font-size: 1rem;
        }
        
        .gallery-content {
          padding: 3rem 0;
        }
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .category-card {
          background: var(--accent-color);
          color: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          text-align: center;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: var(--shadow-light);
        }
        
        .category-card:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }
        
        .category-name {
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .albums-title {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .albums-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .album-card {
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-light);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .album-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }
        
        .album-cover {
          aspect-ratio: 3/2;
          position: relative;
        }
        
        .album-cover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .album-info {
          padding: 1.5rem;
        }
        
        .album-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .album-count {
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        
        .album-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .photos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .photo-item {
          cursor: pointer;
          transition: var(--transition);
        }
        
        .photo-item:hover {
          transform: translateY(-2px);
        }
        
        .photo-wrapper {
          position: relative;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-light);
          transition: var(--transition);
        }
        
        .photo-wrapper:hover {
          box-shadow: var(--shadow-medium);
        }
        
        .photo-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        
        .photo-metadata {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 2rem 1rem 1rem;
        }
        
        .photo-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        
        .photo-location,
        .photo-camera {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-bottom: 0.25rem;
        }
        
        .load-more {
          text-align: center;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }
        
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        @media (max-width: 768px) {
          .gallery-title {
            font-size: 2rem;
          }
          
          .controls-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filters {
            flex-direction: column;
          }
          
          .photos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    await connectDB();
    
    // Get initial photos (first page)
    const initialPhotos = await Photo.find({})
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    // Get albums
    const albums = await Album.find({ isPublic: true })
      .populate('coverPhotoId', 'url webpUrl altText')
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    // Get categories
    const categories = await Photo.distinct('categories');

    return {
      props: {
        initialPhotos: JSON.parse(JSON.stringify(initialPhotos)),
        albums: JSON.parse(JSON.stringify(albums)),
        categories: categories.filter(Boolean).sort(),
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return {
      props: {
        initialPhotos: [],
        albums: [],
        categories: [],
      },
      revalidate: 3600,
    };
  }
}

