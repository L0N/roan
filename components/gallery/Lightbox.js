import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Lightbox({ 
  photos, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev, 
  showMetadata = false 
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [metadataVisible, setMetadataVisible] = useState(showMetadata);

  const currentPhoto = photos[currentIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'i':
        case 'I':
          setMetadataVisible(!metadataVisible);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, metadataVisible]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Reset image loaded state when photo changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    onNext(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    onPrev(prevIndex);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!currentPhoto) return null;

  return (
    <div className="lightbox-overlay" onClick={handleBackdropClick}>
      <div className="lightbox-container">
        {/* Close Button */}
        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Navigation Buttons */}
        {photos.length > 1 && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={handlePrev} aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button className="lightbox-nav lightbox-next" onClick={handleNext} aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </>
        )}

        {/* Image Container */}
        <div className="lightbox-image-container">
          {!imageLoaded && (
            <div className="lightbox-loading">
              <div className="spinner"></div>
              <p>Loading image...</p>
            </div>
          )}
          
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.altText}
            width={currentPhoto.width}
            height={currentPhoto.height}
            className={`lightbox-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            priority
          />
        </div>

        {/* Image Counter */}
        {photos.length > 1 && (
          <div className="lightbox-counter">
            {currentIndex + 1} of {photos.length}
          </div>
        )}

        {/* Metadata Panel */}
        <div className={`lightbox-metadata ${metadataVisible ? 'visible' : ''}`}>
          <div className="metadata-header">
            <h3 className="metadata-title">{currentPhoto.title}</h3>
            <button 
              className="metadata-toggle"
              onClick={() => setMetadataVisible(!metadataVisible)}
              aria-label={metadataVisible ? 'Hide metadata' : 'Show metadata'}
            >
              {metadataVisible ? 'Hide Info' : 'Show Info'}
            </button>
          </div>
          
          {metadataVisible && (
            <div className="metadata-content">
              {currentPhoto.metadata?.description && (
                <p className="metadata-description">{currentPhoto.metadata.description}</p>
              )}
              
              <div className="metadata-details">
                {currentPhoto.metadata?.location && (
                  <div className="metadata-item">
                    <span className="metadata-label">Location:</span>
                    <span className="metadata-value">{currentPhoto.metadata.location}</span>
                  </div>
                )}
                
                {currentPhoto.metadata?.camera && (
                  <div className="metadata-item">
                    <span className="metadata-label">Camera:</span>
                    <span className="metadata-value">{currentPhoto.metadata.camera}</span>
                  </div>
                )}
                
                {currentPhoto.metadata?.lens && (
                  <div className="metadata-item">
                    <span className="metadata-label">Lens:</span>
                    <span className="metadata-value">{currentPhoto.metadata.lens}</span>
                  </div>
                )}
                
                {currentPhoto.metadata?.iso && (
                  <div className="metadata-item">
                    <span className="metadata-label">ISO:</span>
                    <span className="metadata-value">{currentPhoto.metadata.iso}</span>
                  </div>
                )}
                
                {currentPhoto.metadata?.aperture && (
                  <div className="metadata-item">
                    <span className="metadata-label">Aperture:</span>
                    <span className="metadata-value">{currentPhoto.metadata.aperture}</span>
                  </div>
                )}
                
                {currentPhoto.metadata?.shutterSpeed && (
                  <div className="metadata-item">
                    <span className="metadata-label">Shutter Speed:</span>
                    <span className="metadata-value">{currentPhoto.metadata.shutterSpeed}</span>
                  </div>
                )}
              </div>
              
              {currentPhoto.categories && currentPhoto.categories.length > 0 && (
                <div className="metadata-categories">
                  <span className="metadata-label">Categories:</span>
                  <div className="category-tags">
                    {currentPhoto.categories.map((category) => (
                      <span key={category} className="category-tag">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="lightbox-help">
          <p>Use arrow keys to navigate • Press 'i' to toggle info • Press 'Esc' to close</p>
        </div>
      </div>

      <style jsx>{`
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-out;
        }
        
        .lightbox-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          z-index: 10;
        }
        
        .lightbox-close:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }
        
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          z-index: 10;
        }
        
        .lightbox-nav:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: translateY(-50%) scale(1.1);
        }
        
        .lightbox-prev {
          left: 2rem;
        }
        
        .lightbox-next {
          right: 2rem;
        }
        
        .lightbox-image-container {
          position: relative;
          max-width: 90%;
          max-height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .lightbox-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: white;
        }
        
        .lightbox-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        
        .lightbox-image.loaded {
          opacity: 1;
        }
        
        .lightbox-counter {
          position: absolute;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          z-index: 10;
        }
        
        .lightbox-metadata {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
          color: white;
          padding: 3rem 2rem 2rem;
          transform: translateY(100%);
          transition: transform 0.3s ease-out;
          z-index: 10;
        }
        
        .lightbox-metadata.visible {
          transform: translateY(0);
        }
        
        .metadata-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .metadata-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }
        
        .metadata-toggle {
          background: var(--accent-color);
          color: var(--primary-color);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .metadata-toggle:hover {
          background: var(--accent-hover);
        }
        
        .metadata-content {
          max-height: 200px;
          overflow-y: auto;
        }
        
        .metadata-description {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        
        .metadata-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .metadata-item {
          display: flex;
          gap: 0.5rem;
        }
        
        .metadata-label {
          font-weight: 600;
          color: var(--accent-color);
          min-width: 80px;
        }
        
        .metadata-value {
          color: #cccccc;
        }
        
        .metadata-categories {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
        }
        
        .category-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .category-tag {
          background: var(--accent-color);
          color: var(--primary-color);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .lightbox-help {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8rem;
          text-align: center;
          z-index: 10;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @media (max-width: 768px) {
          .lightbox-container {
            padding: 1rem;
          }
          
          .lightbox-close,
          .lightbox-nav {
            width: 40px;
            height: 40px;
          }
          
          .lightbox-close {
            top: 1rem;
            right: 1rem;
          }
          
          .lightbox-prev {
            left: 1rem;
          }
          
          .lightbox-next {
            right: 1rem;
          }
          
          .lightbox-counter {
            top: 1rem;
            font-size: 0.8rem;
          }
          
          .lightbox-metadata {
            padding: 2rem 1rem 1rem;
          }
          
          .metadata-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .metadata-details {
            grid-template-columns: 1fr;
          }
          
          .lightbox-help {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

