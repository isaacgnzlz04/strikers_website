import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Carousel from './ui/carousel';
import MagicButton from './MagicButton';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
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

    // Filters animation
    if (filtersRef.current) {
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  // Modal animation effect
  useEffect(() => {
    if (!showSubmitModal) return;

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
  }, [showSubmitModal]);

  useEffect(() => {
    if (showSubmitModal) {
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
  }, [showSubmitModal]);

  const handleCloseModal = () => {
    const tl = gsap.timeline({ onComplete: () => setShowSubmitModal(false) });

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

  const filters = ['All', 'Parties', 'Leagues', 'Events', 'Fun Times'];

  // Sample gallery images - will be replaced with actual user submissions
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=800&h=600&fit=crop',
      alt: 'Birthday party celebration',
      category: 'Parties',
    },
    {
      src: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop',
      alt: 'League bowling competition',
      category: 'Leagues',
    },
    {
      src: 'https://images.unsplash.com/photo-1577174881658-0f30157f5803?w=800&h=600&fit=crop',
      alt: 'Corporate event team building',
      category: 'Events',
    },
    {
      src: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop',
      alt: 'Friends having fun',
      category: 'Fun Times',
    },
    {
      src: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&h=600&fit=crop',
      alt: 'Kids birthday party',
      category: 'Parties',
    },
    {
      src: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop',
      alt: 'Tournament winners',
      category: 'Leagues',
    },
    {
      src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      alt: 'Fundraiser event',
      category: 'Events',
    },
    {
      src: 'https://images.unsplash.com/photo-1578874691223-64558a3ca096?w=800&h=600&fit=crop',
      alt: 'Group celebration',
      category: 'Fun Times',
    },
  ];

  const filteredImages =
    activeFilter === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  // Convert to carousel slides format
  const carouselSlides = filteredImages.map((img) => ({
    src: img.src,
    title: img.category,
    button: 'View Full Size'
  }));

  const SubmitModal = () => (
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
          maxWidth: '600px',
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
          Submit Your Photo
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
          Share your favorite Mainlee Strikers moments! Upload your photos from parties, events, or just fun times at
          the alley.
        </p>

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
              Your Name
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
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
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
              Category
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
              <option>Parties</option>
              <option>Leagues</option>
              <option>Events</option>
              <option>Fun Times</option>
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
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
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
              Caption (Optional)
            </label>
            <textarea
              placeholder="Tell us about this moment..."
              rows="3"
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
              Submit Photo
            </MagicButton>
          </div>
        </form>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="gallery"
      style={{
        padding: isMobile ? '60px 20px 60px' : '80px 40px 80px',
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
            COMMUNITY GALLERY
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
            Your Moments, Our Community
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            See what makes Mainlee Strikers special through the eyes of our community
          </p>

          {/* Submit Photo Button */}
          <MagicButton
            type="button"
            onClick={() => setShowSubmitModal(true)}
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
            📸 Submit Your Photo
          </MagicButton>
        </div>

        {/* Filter Buttons */}
        <div
          ref={filtersRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem',
            opacity: 0,
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '10px 24px',
                borderRadius: '25px',
                border: '2px solid var(--accent-primary)',
                backgroundColor: activeFilter === filter ? 'var(--accent-primary)' : 'transparent',
                color: activeFilter === filter ? '#ffffff' : 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div style={{ marginTop: '4rem', marginBottom: '2rem' }}>
          <Carousel slides={carouselSlides} />
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && <SubmitModal />}
    </section>
  );
};

export default GallerySection;
