import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import connectDB from '../lib/db/mongodb';
import Photo from '../models/Photo';

export default function Home({ featuredPhotos }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate featured images
  useEffect(() => {
    if (featuredPhotos.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % featuredPhotos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredPhotos.length]);

  return (
    <Layout
      title="RoanPaul Photography & Arts - Professional Photography Portfolio"
      description="Welcome to RoanPaul Photography & Arts. Discover stunning photography that captures life's most beautiful moments with artistic vision and technical excellence."
      url="/"
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              RoanPaul Photography & Arts
            </h1>
            <p className="hero-subtitle">
              Capturing Life's Beautiful Moments
            </p>
            <p className="hero-description">
              Professional photography that tells your story through artistic vision, 
              technical excellence, and a passion for preserving life's most precious moments.
            </p>
            <div className="hero-buttons">
              <Link href="/gallery" className="btn btn-primary btn-large">
                View Gallery
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-large">
                Get In Touch
              </Link>
            </div>
          </div>
          
          {featuredPhotos.length > 0 && (
            <div className="hero-image">
              <div className="hero-image-container">
                <Image
                  src={featuredPhotos[currentImageIndex].webpUrl || featuredPhotos[currentImageIndex].url}
                  alt={featuredPhotos[currentImageIndex].altText}
                  width={600}
                  height={400}
                  className="hero-image-main"
                  priority
                />
                {featuredPhotos.length > 1 && (
                  <div className="hero-image-dots">
                    {featuredPhotos.map((_, index) => (
                      <button
                        key={index}
                        className={`hero-dot ${index === currentImageIndex ? 'hero-dot-active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Work Section */}
      {featuredPhotos.length > 0 && (
        <section className="section featured-work">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Work</h2>
              <p className="section-description">
                A curated selection of my finest photography, showcasing the diversity 
                and artistry that defines my work.
              </p>
            </div>
            
            <div className="featured-grid">
              {featuredPhotos.slice(0, 6).map((photo) => (
                <div key={photo._id} className="featured-item">
                  <div className="featured-image-wrapper">
                    <Image
                      src={photo.webpUrl || photo.url}
                      alt={photo.altText}
                      width={400}
                      height={300}
                      className="featured-image"
                    />
                    <div className="featured-overlay">
                      <h3 className="featured-title">{photo.title}</h3>
                      {photo.metadata?.location && (
                        <p className="featured-location">{photo.metadata.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="featured-cta">
              <Link href="/gallery" className="btn btn-primary">
                View Full Gallery
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="section services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Photography Services</h2>
            <p className="section-description">
              Specializing in capturing life's most important moments with 
              artistic flair and professional expertise.
            </p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📸</div>
              <h3 className="service-title">Portrait Photography</h3>
              <p className="service-description">
                Professional portraits that capture personality and emotion, 
                perfect for individuals, families, and corporate needs.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎉</div>
              <h3 className="service-title">Event Photography</h3>
              <p className="service-description">
                Comprehensive event coverage that preserves the joy, emotion, 
                and special moments of your celebrations.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🌄</div>
              <h3 className="service-title">Landscape Photography</h3>
              <p className="service-description">
                Stunning landscape and nature photography that showcases 
                the beauty of the natural world.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3 className="service-title">Fine Art Photography</h3>
              <p className="service-description">
                Artistic photography that goes beyond documentation to create 
                compelling visual narratives and artistic expressions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Capture Your Story?</h2>
            <p className="cta-description">
              Let's work together to create beautiful, lasting memories that you'll 
              treasure for years to come. Get in touch to discuss your photography needs.
            </p>
            <Link href="/contact" className="btn btn-primary btn-large">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          padding: 4rem 0;
          min-height: 70vh;
          display: flex;
          align-items: center;
        }
        
        .hero-content {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 1rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        
        .hero-text {
          text-align: center;
        }
        
        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--accent-color);
          font-style: italic;
          margin-bottom: 1.5rem;
        }
        
        .hero-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .hero-image {
          display: flex;
          justify-content: center;
        }
        
        .hero-image-container {
          position: relative;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-heavy);
        }
        
        .hero-image-main {
          border-radius: var(--border-radius);
          transition: var(--transition);
        }
        
        .hero-image-dots {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }
        
        .hero-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .hero-dot-active {
          background: var(--accent-color);
        }
        
        .featured-work {
          background: white;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .section-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .featured-item {
          position: relative;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-light);
          transition: var(--transition);
        }
        
        .featured-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
        }
        
        .featured-image-wrapper {
          position: relative;
          aspect-ratio: 4/3;
        }
        
        .featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .featured-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 2rem 1.5rem 1.5rem;
        }
        
        .featured-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .featured-location {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        
        .featured-cta {
          text-align: center;
        }
        
        .services {
          background: var(--secondary-color);
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .service-card {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          text-align: center;
          box-shadow: var(--shadow-light);
          transition: var(--transition);
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
        }
        
        .service-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .service-title {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .service-description {
          color: var(--text-secondary);
        }
        
        .cta {
          background: var(--primary-color);
          color: white;
        }
        
        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .cta-title {
          font-size: 2.5rem;
          color: white;
          margin-bottom: 1rem;
        }
        
        .cta-description {
          font-size: 1.1rem;
          color: #cccccc;
          margin-bottom: 2rem;
        }
        
        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            text-align: left;
          }
          
          .hero-text {
            text-align: left;
          }
          
          .hero-description {
            margin-left: 0;
            margin-right: 0;
          }
          
          .hero-buttons {
            justify-content: flex-start;
          }
          
          .hero-title {
            font-size: 3rem;
          }
          
          .section-title {
            font-size: 3rem;
          }
          
          .cta-title {
            font-size: 3rem;
          }
        }
        
        @media (min-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
          
          .featured-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    await connectDB();
    
    const featuredPhotos = await Photo.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();

    return {
      props: {
        featuredPhotos: JSON.parse(JSON.stringify(featuredPhotos)),
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching featured photos:', error);
    return {
      props: {
        featuredPhotos: [],
      },
      revalidate: 3600,
    };
  }
}

