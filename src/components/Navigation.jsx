import React, { useState, useEffect } from 'react';

const Navigation = ({ openBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStrikers, setShowStrikers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      // Scroll to the very top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add scroll listener to change nav style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      // Show STRIKERS in nav sooner to match faster animation (reduced from 0.4 to 0.25)
      setShowStrikers(scrollY > window.innerHeight * 0.25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(36, 51, 65, 0.1)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(15px)' : 'none',
        transition: 'all 0.3s ease',
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        borderBottom: isScrolled ? '1px solid rgba(214, 213, 215, 0.1)' : 'none',
      }}
    >
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 1.5rem' : '0 4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Navigation Links - Hidden on mobile */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '4rem', flex: 1 }}>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('facilities')}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Facilities
            </button>
            <button 
              onClick={() => scrollToSection('leagues')}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Leagues
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Pricing
            </button>
          </div>
        )}

        {/* Center Logo/Home - Always visible */}
        <div style={{ flex: isMobile ? '1' : '0 0 auto' }}>
          <button 
            onClick={() => scrollToSection('home')}
            style={{
              fontFamily: 'var(--font-header)',
              color: 'var(--color-stiletto)',
              textDecoration: 'none',
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              transition: 'opacity 0.3s ease',
              textShadow: '0 2px 10px rgba(150, 51, 60, 0.3)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            STRIKERS
          </button>
        </div>

        {/* Right Navigation Links - Hidden on mobile */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '4rem', flex: 1, justifyContent: 'flex-end' }}>
            <button 
              onClick={() => scrollToSection('events')}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Contact
            </button>
            <button 
              onClick={openBooking}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Book Now
            </button>
          </div>
        )}

        {/* Mobile Hamburger Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 1001,
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              width: '25px',
              height: '3px',
              backgroundColor: 'var(--text-primary)',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            }} />
            <span style={{
              width: '25px',
              height: '3px',
              backgroundColor: 'var(--text-primary)',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              width: '25px',
              height: '3px',
              backgroundColor: 'var(--text-primary)',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            }} />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: isScrolled ? 'rgba(36, 51, 65, 0.1)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(15px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(15px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(214, 213, 215, 0.1)' : 'none',
          maxHeight: isMobileMenuOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1.5rem',
            gap: '1rem',
          }}>
            <button 
              onClick={() => scrollToSection('about')}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-color)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('facilities')}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-color)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Facilities
            </button>
            <button 
              onClick={() => scrollToSection('leagues')}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-color)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Leagues
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-color)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('events')}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-color)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-color)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Contact
            </button>
            <button 
              onClick={openBooking}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.75rem 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
