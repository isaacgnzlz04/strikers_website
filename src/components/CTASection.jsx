import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);
  const cardsContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const button = buttonRef.current;
    const cards = cardsRef.current;

    // Split heading text into individual letters
    const headingText = heading.textContent;
    heading.innerHTML = headingText
      .split('')
      .map((char) => `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');
    const headingLetters = heading.querySelectorAll('span');

    // Set initial state for text elements
    gsap.set([...headingLetters, subheading, button], {
      opacity: 0,
      y: 100,
    });

    // Set initial state for cards - stacked on top of each other
    gsap.set(cards, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0.95,
    });

    // Single timeline with proper scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top top',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate heading letters one by one
    tl.to(headingLetters, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(1.7)',
    })
    // Animate subheading
    .to(subheading, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    // Animate button
    .to(button, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, '-=0.5');

    // Separate timeline for cards spreading out
    const cardsContainer = cardsContainerRef.current;
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: cardsContainer,
        start: 'top 80%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    });

    if (isMobile) {
      // On mobile: Simple fade in with stagger, no spreading animation
      cardsTl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power3.out',
      });
    } else {
      // On desktop: Cards spread out from stacked position
      cardsTl.to(cards[0], {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      })
      .to(cards[1], {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.4')
      .to(cards[2], {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.4');
    }

    return () => {
      tl.kill();
      cardsTl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Main Heading */}
        <h2 
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-header)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}
        >
          Ready to Roll?
        </h2>

        {/* Subheading */}
        <p 
          ref={subheadingRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}
        >
          Experience the ultimate bowling adventure at Strikers. Book your lane today and strike up some fun!
        </p>

        {/* CTA Button */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '5rem' }}>
          <div 
            ref={(el) => { if (el) el.buttonGlow = el; }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(150, 51, 60, 0.6) 0%, transparent 70%)',
              borderRadius: '50px',
              filter: 'blur(20px)',
              transform: 'translate(-50%, -50%)',
              transition: 'transform 0.05s ease',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />
          <button 
            ref={buttonRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              fontWeight: '700',
              padding: '1.2rem 3rem',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 10px 30px rgba(150, 51, 60, 0.3)',
              position: 'relative',
              willChange: 'transform',
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
              const glow = e.currentTarget.previousElementSibling;
              if (glow) {
                glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              const glow = e.currentTarget.previousElementSibling;
              if (glow) {
                glow.style.transform = 'translate(-50%, -50%)';
              }
            }}
          >
            Book Your Lane
          </button>
        </div>

        {/* Feature Cards */}
        <div 
          ref={cardsContainerRef}
          style={{
            position: 'relative',
            marginTop: '5rem',
            minHeight: isMobile ? 'auto' : '400px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '2rem' : '0',
            width: '100%',
          }}
        >
          {/* Card 1 */}
          <div style={{ 
            position: isMobile ? 'relative' : 'absolute', 
            left: isMobile ? 'auto' : '0', 
            width: isMobile ? '100%' : '32%',
            maxWidth: isMobile ? '500px' : 'none',
          }}>
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
                borderRadius: '20px',
                filter: 'blur(25px)',
                opacity: 0.4,
                transform: 'translate(-50%, -50%)',
                transition: 'transform 0.05s ease',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              style={{
                padding: '2.5rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                willChange: 'transform',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
                const glow = e.currentTarget.previousElementSibling;
                if (glow) {
                  glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                const glow = e.currentTarget.previousElementSibling;
                if (glow) {
                  glow.style.transform = 'translate(-50%, -50%)';
                }
              }}
            >
            <div 
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              🎳
            </div>
            <h3 
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: '1.8rem',
                color: 'var(--accent-primary)',
                marginBottom: '1rem',
              }}
            >
              32 Modern Lanes
            </h3>
            <p 
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              State-of-the-art bowling lanes with automatic scoring and comfortable seating
            </p>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ 
            position: isMobile ? 'relative' : 'absolute', 
            left: isMobile ? 'auto' : '34%', 
            width: isMobile ? '100%' : '32%',
            maxWidth: isMobile ? '500px' : 'none',
          }}>
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
                borderRadius: '20px',
                filter: 'blur(25px)',
                opacity: 0.4,
                transform: 'translate(-50%, -50%)',
                transition: 'transform 0.05s ease',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              style={{
                padding: '2.5rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                willChange: 'transform',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
                const glow = e.currentTarget.previousElementSibling;
                if (glow) {
                  glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                const glow = e.currentTarget.previousElementSibling;
                if (glow) {
                  glow.style.transform = 'translate(-50%, -50%)';
                }
              }}
            >
            <div 
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              🍕
            </div>
            <h3 
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: '1.8rem',
                color: 'var(--accent-primary)',
                marginBottom: '1rem',
              }}
            >
              Full Bar & Grill
            </h3>
            <p 
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              Delicious food and refreshing drinks delivered right to your lane
            </p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ 
            position: isMobile ? 'relative' : 'absolute', 
            right: isMobile ? 'auto' : '0', 
            width: isMobile ? '100%' : '32%',
            maxWidth: isMobile ? '500px' : 'none',
          }}>
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
                borderRadius: '20px',
                filter: 'blur(25px)',
                opacity: 0.4,
                transform: 'translate(-50%, -50%)',
                transition: 'transform 0.05s ease',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              style={{
                padding: '2.5rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                willChange: 'transform',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
                const glow = e.currentTarget.previousElementSibling;
                if (glow) {
                  glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                const glow = e.currentTarget.previousElementSibling;
                if (glow) {
                  glow.style.transform = 'translate(-50%, -50%)';
                }
              }}
            >
            <div 
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              🎉
            </div>
            <h3 
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: '1.8rem',
                color: 'var(--accent-primary)',
                marginBottom: '1rem',
              }}
            >
              Party Packages
            </h3>
            <p 
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              Perfect venue for birthdays, corporate events, and special celebrations
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
