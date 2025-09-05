import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-text">
              RoanPaul Photography & Arts
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="nav-mobile-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line-1-open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line-2-open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line-3-open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`nav-mobile ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-mobile-link ${isActive(item.href) ? 'nav-mobile-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

