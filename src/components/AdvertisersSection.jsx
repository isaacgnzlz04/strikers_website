import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoLoop from './LogoLoop';
import MagicButton from './MagicButton';

gsap.registerPlugin(ScrollTrigger);

const AdvertisersSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const modalContentRef = useRef(null);
  const backdropRef = useRef(null);
  const modalTitleRef = useRef(null);
  const modalBodyRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Badge animation
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Description animation
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  // Modal animation effect
  useEffect(() => {
    if (!showInquiryModal) return;

    const tl = gsap.timeline();

    // Fade in backdrop
    if (backdropRef.current) {
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }

    // Modal entrance - scale and slide
    if (modalContentRef.current) {
      tl.fromTo(
        modalContentRef.current,
        { scale: 0.8, opacity: 0, y: -50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.15'
      );
    }

    // Title slide in
    if (modalTitleRef.current) {
      tl.fromTo(
        modalTitleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.25'
      );
    }

    // Content fade in
    if (modalBodyRef.current) {
      tl.fromTo(
        modalBodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, [showInquiryModal]);

  useEffect(() => {
    if (showInquiryModal) {
      document.body.style.overflow = 'hidden';
      // Hide the navigation bar
      const nav = document.querySelector('.card-nav-container');
      if (nav) nav.style.display = 'none';
    } else {
      document.body.style.overflow = 'auto';
      // Show the navigation bar
      const nav = document.querySelector('.card-nav-container');
      if (nav) nav.style.display = 'block';
    }
    return () => {
      document.body.style.overflow = 'auto';
      // Ensure navigation bar is visible on cleanup
      const nav = document.querySelector('.card-nav-container');
      if (nav) nav.style.display = 'block';
    };
  }, [showInquiryModal]);

  const handleCloseModal = () => {
    const tl = gsap.timeline({ onComplete: () => setShowInquiryModal(false) });

    // Fade out content
    if (modalBodyRef.current) {
      tl.to(modalBodyRef.current, { y: 20, opacity: 0, duration: 0.18, ease: 'power2.in' });
    }

    // Title out
    if (modalTitleRef.current) {
      tl.to(modalTitleRef.current, { y: -20, opacity: 0, duration: 0.18, ease: 'power2.in' }, '-=0.15');
    }

    // Modal exit
    if (modalContentRef.current) {
      tl.to(modalContentRef.current, { scale: 0.8, opacity: 0, y: -50, duration: 0.25, ease: 'power2.in' }, '-=0.1');
    }

    // Backdrop fade out
    if (backdropRef.current) {
      tl.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.2');
    }
  };

  // Sample advertiser logos - will be replaced with actual advertisers
  const advertisers = [
    {
      src: 'https://via.placeholder.com/200x80/667eea/ffffff?text=Business+1',
      alt: 'Local Business 1',
      title: 'Local Business 1',
    },
    {
      src: 'https://via.placeholder.com/200x80/764ba2/ffffff?text=Business+2',
      alt: 'Local Business 2',
      title: 'Local Business 2',
    },
    {
      src: 'https://via.placeholder.com/200x80/f093fb/ffffff?text=Business+3',
      alt: 'Local Business 3',
      title: 'Local Business 3',
    },
    {
      src: 'https://via.placeholder.com/200x80/f5576c/ffffff?text=Business+4',
      alt: 'Local Business 4',
      title: 'Local Business 4',
    },
    {
      src: 'https://via.placeholder.com/200x80/4facfe/ffffff?text=Business+5',
      alt: 'Local Business 5',
      title: 'Local Business 5',
    },
    {
      src: 'https://via.placeholder.com/200x80/00f2fe/ffffff?text=Business+6',
      alt: 'Local Business 6',
      title: 'Local Business 6',
    },
    {
      src: 'https://via.placeholder.com/200x80/43e97b/ffffff?text=Business+7',
      alt: 'Local Business 7',
      title: 'Local Business 7',
    },
    {
      src: 'https://via.placeholder.com/200x80/38f9d7/ffffff?text=Business+8',
      alt: 'Local Business 8',
      title: 'Local Business 8',
    },
  ];

  const InquiryModal = () => (
    <div
      ref={backdropRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
        padding: '20px',
        opacity: 0,
      }}
      onClick={handleCloseModal}
    >
      <div
        ref={modalContentRef}
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '20px',
          padding: isMobile ? '30px 20px' : '40px',
          maxWidth: '700px',
          width: '100%',
          border: '2px solid var(--accent-primary)',
          maxHeight: '90vh',
          overflowY: 'auto',
          opacity: 0,
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            border: '2px solid var(--accent-primary)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--accent-primary)';
            e.target.style.color = '#ffffff';
            e.target.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--bg-secondary)';
            e.target.style.color = 'var(--text-primary)';
            e.target.style.transform = 'rotate(0deg)';
          }}
          aria-label="Close modal"
        >
          ×
        </button>
        
        <h3
          ref={modalTitleRef}
          style={{
            fontFamily: 'var(--font-header)',
            fontSize: '2rem',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            opacity: 0,
          }}
        >
          Partner With Us
        </h3>
        <div ref={modalBodyRef} style={{ opacity: 0 }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          Reach thousands of local customers with prominent placement on our website and in our facility. Choose a
          package that fits your marketing goals.
        </p>

        {/* Pricing Tiers */}
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid var(--accent-primary)',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                }}
              >
                Premium Package
              </h4>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.5rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 'bold',
                }}
              >
                $500
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem',
              }}
            >
              6 months • Featured placement • Large logo size
            </p>
            <ul
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginLeft: '1.5rem',
              }}
            >
              <li>Prime homepage visibility</li>
              <li>Link to your website</li>
              <li>Monthly performance reports</li>
            </ul>
          </div>

          <div
            style={{
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid var(--accent-primary)',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                }}
              >
                Standard Package
              </h4>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.5rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 'bold',
                }}
              >
                $250
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem',
              }}
            >
              3 months • Standard placement • Medium logo size
            </p>
            <ul
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginLeft: '1.5rem',
              }}
            >
              <li>Homepage carousel inclusion</li>
              <li>Link to your website</li>
            </ul>
          </div>

          <div
            style={{
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid var(--accent-primary)',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                }}
              >
                Basic Package
              </h4>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.5rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 'bold',
                }}
              >
                $100
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem',
              }}
            >
              1 month • Rotation placement • Standard logo size
            </p>
            <ul
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginLeft: '1.5rem',
              }}
            >
              <li>Homepage carousel inclusion</li>
            </ul>
          </div>
        </div>

        {/* Inquiry Form */}
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontWeight: '600',
              }}
            >
              Business Name
            </label>
            <input
              type="text"
              placeholder="Your Business LLC"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                }}
              >
                Contact Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--accent-primary)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                }}
              >
                Phone
              </label>
              <input
                type="tel"
                placeholder="(479) 555-0123"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--accent-primary)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontWeight: '600',
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="contact@yourbusiness.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontWeight: '600',
              }}
            >
              Interested Package
            </label>
            <select
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
              }}
            >
              <option>Premium - $500/6 months</option>
              <option>Standard - $250/3 months</option>
              <option>Basic - $100/month</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontWeight: '600',
              }}
            >
              Message
            </label>
            <textarea
              placeholder="Tell us about your business and marketing goals..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--accent-primary)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <MagicButton
              type="button"
              onClick={handleCloseModal}
              style={{
                flex: 1,
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '25px',
                border: '1px solid var(--accent-primary)',
              }}
            >
              Cancel
            </MagicButton>
            <MagicButton
              type="submit"
              enableSpotlight={true}
              enableBorderGlow={true}
              clickEffect={true}
              style={{
                flex: 1,
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '25px',
              }}
            >
              Send Inquiry
            </MagicButton>
          </div>
        </form>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="advertisers"
      style={{
        padding: isMobile ? '10px 20px 60px' : '20px 40px 80px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            ref={badgeRef}
            style={{
              display: 'inline-block',
              padding: '8px 24px',
              borderRadius: '30px',
              background: 'var(--accent-primary)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '20px',
              letterSpacing: '1px',
              opacity: 0,
            }}
          >
            OUR PARTNERS
          </div>
          <h2
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              opacity: 0,
            }}
          >
            Proudly Supporting Local
          </h2>
          <p
            ref={descRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
              opacity: 0,
            }}
          >
            Thank you to our amazing partners who help make Mainlee Strikers a community hub
          </p>

          {/* Advertise Button */}
          <MagicButton
            type="button"
            onClick={() => setShowInquiryModal(true)}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '25px',
            }}
          >
            💼 Advertise With Us
          </MagicButton>
        </div>

        {/* Logo Loop */}
        <div style={{ marginTop: '3rem' }}>
          <LogoLoop logos={advertisers} speed={30} logoHeight={60} gap={48} pauseOnHover={true} fadeOut={false} />
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && <InquiryModal />}
    </section>
  );
};

export default AdvertisersSection;
