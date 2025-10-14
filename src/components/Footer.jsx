import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const navigationLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: '📘', name: 'Facebook', href: '#' },
    { icon: '📷', name: 'Instagram', href: '#' },
    { icon: '🐦', name: 'Twitter', href: '#' },
    { icon: '📍', name: 'Yelp', href: '#' },
  ];

  const contactInfo = [
    { icon: '📍', text: '123 Strike Lane, Bowling City, BC 12345' },
    { icon: '📞', text: '(555) 123-4567' },
    { icon: '📧', text: 'info@strikersbowling.com' },
  ];

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid rgba(var(--text-primary-rgb), 0.1)',
        padding: isMobile ? '60px 20px 30px' : '80px 40px 40px',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Main Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '40px' : '60px',
            marginBottom: '60px',
          }}
        >
          {/* Brand Column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: isMobile ? '1.8rem' : '2rem',
                color: 'var(--text-primary)',
                marginBottom: '20px',
              }}
            >
              🎳 STRIKERS
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}
            >
              Your premier bowling destination for over 30 years. Where strikes happen and memories are made.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  style={{
                    fontSize: '1.5rem',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '20px',
                letterSpacing: '0.5px',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {navigationLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '20px',
                letterSpacing: '0.5px',
              }}
            >
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {contactInfo.map((info, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '15px',
                  }}
                >
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>
                    {info.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    {info.text}
                  </span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '20px' }}>
              <h5
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Hours
              </h5>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                Mon-Thu: 10am - 11pm<br />
                Fri-Sat: 10am - 1am<br />
                Sun: 11am - 10pm
              </p>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '20px',
                letterSpacing: '0.5px',
              }}
            >
              Stay Updated
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}
            >
              Subscribe to our newsletter for special offers, events, and bowling tips!
            </p>
            <form onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  background: 'var(--bg-primary)',
                  border: '1px solid rgba(var(--text-primary-rgb), 0.2)',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-primary)';
                  e.target.style.outline = 'none';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(var(--text-primary-rgb), 0.2)';
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px 0',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  color: 'var(--bg-primary)',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent-secondary)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(var(--text-primary-rgb), 0.1)',
            marginBottom: '30px',
          }}
        />

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              margin: 0,
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            © {new Date().getFullYear()} Strikers Bowling Alley. All rights reserved.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-end',
            }}
          >
            <a
              href="#privacy"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-secondary)';
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-secondary)';
              }}
            >
              Terms of Service
            </a>
            <a
              href="#accessibility"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-secondary)';
              }}
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
