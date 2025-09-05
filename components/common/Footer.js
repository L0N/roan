import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <h3 className="footer-title">RoanPaul Photography & Arts</h3>
            <p className="footer-tagline">Capturing Life's Beautiful Moments</p>
          </div>

          {/* Navigation */}
          <div className="footer-nav">
            <h4 className="footer-nav-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li>
                <Link href="/" className="footer-nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="footer-nav-link">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-nav-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-services">
            <h4 className="footer-services-title">Services</h4>
            <ul className="footer-services-list">
              <li>Portrait Photography</li>
              <li>Event Photography</li>
              <li>Landscape Photography</li>
              <li>Fine Art Photography</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4 className="footer-contact-title">Get In Touch</h4>
            <p className="footer-contact-text">
              Ready to capture your special moments?
            </p>
            <Link href="/contact" className="footer-contact-button">
              Contact Me
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} RoanPaul Photography & Arts. All rights reserved.
            </p>
            <div className="footer-links">
              <Link href="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

