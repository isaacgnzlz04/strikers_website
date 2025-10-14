import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRefs = useRef([]);
  const statsRef = useRef([]);
  const visualRef = useRef(null);

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
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
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

    // Text paragraphs animation
    textRefs.current.forEach((text, index) => {
      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.15 + index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // Stats animation
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: 0.4 + index * 0.08,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: stat,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // Visual element animation
    if (visualRef.current) {
      gsap.fromTo(
        visualRef.current,
        { opacity: 0, x: 100, rotation: -20 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section 
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: '4rem',
        }}
      >
        {/* Left Side - Content */}
        <div style={{ flex: 1 }}>
          <div
            ref={badgeRef}
            style={{
              display: 'inline-block',
              padding: '8px 24px',
              borderRadius: '30px',
              background: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '20px',
              letterSpacing: '1px',
              opacity: 0,
            }}
          >
            ABOUT US
          </div>
          <h2 
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              opacity: 0,
            }}
          >
            About Strikers
          </h2>
          <div 
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}
          >
            <p ref={(el) => (textRefs.current[0] = el)} style={{ marginBottom: '1.5rem', opacity: 0 }}>
              Since 1995, Strikers has been the premier bowling destination, bringing families, 
              friends, and communities together for unforgettable experiences. What started as 
              a small 16-lane bowling alley has grown into a state-of-the-art entertainment 
              complex with 32 modern lanes.
            </p>
            <p ref={(el) => (textRefs.current[1] = el)} style={{ marginBottom: '1.5rem', opacity: 0 }}>
              We pride ourselves on maintaining the perfect balance between classic bowling 
              tradition and modern amenities. Our lanes feature the latest automatic scoring 
              technology, comfortable seating, and ambient lighting that creates the perfect 
              atmosphere for any occasion.
            </p>
            <p ref={(el) => (textRefs.current[2] = el)} style={{ opacity: 0 }}>
              Whether you're here for a casual game with friends, a competitive league match, 
              or celebrating a special occasion, our dedicated team ensures every visit to 
              Strikers is memorable. Come experience the difference at Strikers – where every 
              roll counts!
            </p>
          </div>

          {/* Stats */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
              gap: '2rem',
              marginTop: '3rem',
            }}
          >
            <div ref={(el) => (statsRef.current[0] = el)} style={{ textAlign: isMobile ? 'center' : 'left', opacity: 0 }}>
              <div 
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '2.5rem',
                  color: 'var(--accent-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                30+
              </div>
              <div 
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                }}
              >
                Years in Business
              </div>
            </div>

            <div ref={(el) => (statsRef.current[1] = el)} style={{ textAlign: isMobile ? 'center' : 'left', opacity: 0 }}>
              <div 
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '2.5rem',
                  color: 'var(--accent-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                32
              </div>
              <div 
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                }}
              >
                Modern Lanes
              </div>
            </div>

            <div ref={(el) => (statsRef.current[2] = el)} style={{ textAlign: isMobile ? 'center' : 'left', gridColumn: isMobile ? 'span 2' : 'auto', opacity: 0 }}>
              <div 
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '2.5rem',
                  color: 'var(--accent-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                500K+
              </div>
              <div 
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                }}
              >
                Happy Bowlers
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Element */}
        <div 
          style={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            ref={visualRef}
            style={{
              width: '100%',
              maxWidth: '500px',
              aspectRatio: '1',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '2px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative gradient background */}
            <div 
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 50%)',
                opacity: 0.1,
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>🎳</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
