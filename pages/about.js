import Image from 'next/image';
import Layout from '../components/common/Layout';

export default function About() {
  return (
    <Layout
      title="About RoanPaul - Professional Photographer & Artist"
      description="Learn about RoanPaul, a passionate photographer dedicated to capturing life's beautiful moments through artistic vision and technical excellence."
      url="/about"
    >
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">About RoanPaul</h1>
                <p className="hero-subtitle">
                  Passionate Photographer & Visual Artist
                </p>
                <p className="hero-description">
                  Welcome to my world of photography, where every image tells a story 
                  and every moment becomes a lasting memory.
                </p>
              </div>
              <div className="hero-image">
                <div className="image-placeholder">
                  {/* Placeholder for photographer's portrait */}
                  <div className="placeholder-content">
                    <div className="placeholder-icon">📷</div>
                    <p>RoanPaul Portrait</p>
                    <small>(Photo to be added)</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section story">
          <div className="container">
            <div className="story-content">
              <h2 className="section-title">My Story</h2>
              <div className="story-text">
                <p>
                  Photography has been my passion for over a decade. What started as a hobby 
                  with a simple camera has evolved into a lifelong dedication to capturing 
                  the beauty, emotion, and essence of life through the lens.
                </p>
                <p>
                  My journey began in the streets of my hometown, where I discovered the power 
                  of photography to freeze moments in time and tell stories that words alone 
                  cannot express. From those early days of experimentation to now, I've 
                  developed a unique style that blends technical precision with artistic vision.
                </p>
                <p>
                  Every photograph I take is an opportunity to connect with my subjects and 
                  create something meaningful. Whether it's the joy of a wedding day, the 
                  quiet beauty of a landscape, or the intimate moments of a portrait session, 
                  I approach each project with the same level of passion and commitment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="section philosophy">
          <div className="container">
            <h2 className="section-title">My Philosophy</h2>
            <div className="philosophy-grid">
              <div className="philosophy-item">
                <div className="philosophy-icon">🎯</div>
                <h3 className="philosophy-title">Authentic Moments</h3>
                <p className="philosophy-description">
                  I believe in capturing genuine emotions and authentic moments rather than 
                  forced poses. The best photographs happen when people are being themselves.
                </p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">✨</div>
                <h3 className="philosophy-title">Artistic Vision</h3>
                <p className="philosophy-description">
                  Every image should be a work of art. I combine technical expertise with 
                  creative vision to produce photographs that are both beautiful and meaningful.
                </p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">🤝</div>
                <h3 className="philosophy-title">Personal Connection</h3>
                <p className="philosophy-description">
                  Building a connection with my clients is essential. When people feel 
                  comfortable, their true personality shines through in the photographs.
                </p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">⚡</div>
                <h3 className="philosophy-title">Technical Excellence</h3>
                <p className="philosophy-description">
                  I'm committed to using the latest techniques and equipment to ensure 
                  every photograph meets the highest standards of quality and craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="section expertise">
          <div className="container">
            <h2 className="section-title">Areas of Expertise</h2>
            <div className="expertise-content">
              <div className="expertise-list">
                <div className="expertise-category">
                  <h3 className="expertise-category-title">Portrait Photography</h3>
                  <ul className="expertise-items">
                    <li>Individual Portraits</li>
                    <li>Family Photography</li>
                    <li>Corporate Headshots</li>
                    <li>Senior Portraits</li>
                    <li>Maternity & Newborn</li>
                  </ul>
                </div>
                <div className="expertise-category">
                  <h3 className="expertise-category-title">Event Photography</h3>
                  <ul className="expertise-items">
                    <li>Wedding Photography</li>
                    <li>Corporate Events</li>
                    <li>Birthday Celebrations</li>
                    <li>Anniversary Parties</li>
                    <li>Special Occasions</li>
                  </ul>
                </div>
                <div className="expertise-category">
                  <h3 className="expertise-category-title">Artistic Photography</h3>
                  <ul className="expertise-items">
                    <li>Landscape Photography</li>
                    <li>Fine Art Photography</li>
                    <li>Abstract Compositions</li>
                    <li>Nature Photography</li>
                    <li>Architectural Photography</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="section equipment">
          <div className="container">
            <h2 className="section-title">Equipment & Approach</h2>
            <div className="equipment-content">
              <div className="equipment-text">
                <p>
                  I use professional-grade equipment to ensure the highest quality results 
                  for every project. My camera bag includes the latest digital cameras, 
                  a variety of lenses for different shooting scenarios, and professional 
                  lighting equipment for studio and on-location work.
                </p>
                <p>
                  However, I believe that great photography is about more than just equipment. 
                  It's about understanding light, composition, timing, and most importantly, 
                  connecting with the subject to capture their essence.
                </p>
              </div>
              <div className="equipment-highlights">
                <h3 className="equipment-subtitle">Technical Capabilities</h3>
                <ul className="equipment-list">
                  <li>High-resolution digital photography</li>
                  <li>Professional studio lighting</li>
                  <li>On-location portable lighting</li>
                  <li>Drone photography (licensed)</li>
                  <li>Advanced post-processing techniques</li>
                  <li>Same-day preview galleries</li>
                  <li>Professional printing services</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="section awards">
          <div className="container">
            <h2 className="section-title">Recognition & Awards</h2>
            <div className="awards-grid">
              <div className="award-item">
                <div className="award-year">2023</div>
                <div className="award-details">
                  <h3 className="award-title">Best Portrait Photographer</h3>
                  <p className="award-organization">Local Photography Association</p>
                </div>
              </div>
              <div className="award-item">
                <div className="award-year">2022</div>
                <div className="award-details">
                  <h3 className="award-title">Wedding Photographer of the Year</h3>
                  <p className="award-organization">Regional Wedding Awards</p>
                </div>
              </div>
              <div className="award-item">
                <div className="award-year">2021</div>
                <div className="award-details">
                  <h3 className="award-title">Fine Art Photography Excellence</h3>
                  <p className="award-organization">State Arts Council</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Let's Create Something Beautiful Together</h2>
              <p className="cta-description">
                I'd love to hear about your photography needs and discuss how we can 
                bring your vision to life. Every project is unique, and I'm committed 
                to delivering exceptional results that exceed your expectations.
              </p>
              <div className="cta-buttons">
                <a href="/contact" className="btn btn-primary btn-large">
                  Get In Touch
                </a>
                <a href="/gallery" className="btn btn-secondary btn-large">
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
        }
        
        .about-hero {
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          padding: 4rem 0;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        
        .hero-text {
          text-align: center;
        }
        
        .hero-title {
          font-size: 3rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
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
          max-width: 600px;
          margin: 0 auto;
        }
        
        .hero-image {
          display: flex;
          justify-content: center;
        }
        
        .image-placeholder {
          width: 300px;
          height: 400px;
          background: var(--secondary-color);
          border: 2px dashed var(--border-color);
          border-radius: var(--border-radius);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .placeholder-content {
          text-align: center;
          color: var(--text-light);
        }
        
        .placeholder-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .story {
          background: white;
        }
        
        .story-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .section-title {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }
        
        .story-text {
          text-align: left;
        }
        
        .story-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }
        
        .philosophy {
          background: var(--secondary-color);
        }
        
        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .philosophy-item {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          text-align: center;
          box-shadow: var(--shadow-light);
          transition: var(--transition);
        }
        
        .philosophy-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
        }
        
        .philosophy-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .philosophy-title {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .philosophy-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .expertise {
          background: white;
        }
        
        .expertise-content {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .expertise-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .expertise-category {
          background: var(--secondary-color);
          padding: 2rem;
          border-radius: var(--border-radius);
        }
        
        .expertise-category-title {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
          border-bottom: 2px solid var(--accent-color);
          padding-bottom: 0.5rem;
        }
        
        .expertise-items {
          list-style: none;
        }
        
        .expertise-items li {
          padding: 0.5rem 0;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
        }
        
        .expertise-items li:last-child {
          border-bottom: none;
        }
        
        .equipment {
          background: var(--secondary-color);
        }
        
        .equipment-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .equipment-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        .equipment-subtitle {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .equipment-list {
          list-style: none;
        }
        
        .equipment-list li {
          padding: 0.5rem 0;
          color: var(--text-secondary);
          position: relative;
          padding-left: 1.5rem;
        }
        
        .equipment-list li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-weight: bold;
        }
        
        .awards {
          background: white;
        }
        
        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .award-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: var(--secondary-color);
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-light);
        }
        
        .award-year {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-color);
          min-width: 80px;
        }
        
        .award-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .award-organization {
          color: var(--text-secondary);
          font-style: italic;
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
          line-height: 1.6;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            text-align: left;
          }
          
          .hero-text {
            text-align: left;
          }
          
          .equipment-content {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (min-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
          
          .section-title {
            font-size: 3rem;
          }
          
          .cta-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </Layout>
  );
}

