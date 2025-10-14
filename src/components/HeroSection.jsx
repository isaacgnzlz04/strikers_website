import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BowlingBall } from './index';
import MagicButton from './MagicButton';

// Import individual bowling pin SVGs
import pin1 from '../assets/bowling_pins/1.svg';
import pin2 from '../assets/bowling_pins/2.svg';
import pin3 from '../assets/bowling_pins/3.svg';
import pin4 from '../assets/bowling_pins/4.svg';
import pin5 from '../assets/bowling_pins/5.svg';
import pin6 from '../assets/bowling_pins/6.svg';
import pin7 from '../assets/bowling_pins/7.svg';
import pin8 from '../assets/bowling_pins/8.svg';
import pin9 from '../assets/bowling_pins/9.svg';
import pin10 from '../assets/bowling_pins/10.svg';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ openBooking }) => {
  const heroRef = useRef(null);
  const ballRef = useRef(null);
  const strikersTextRef = useRef(null);
  const bowlingAlleyRef = useRef(null);
  const ctaContentRef = useRef(null);
  const buttonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Define pin positions in standard bowling formation (10-pin triangle pointing toward ball)
  const pinPositions = [
    // Row 1 (front) - Head pin closest to ball
    { x: 0, y: 0, id: 1, src: pin1 },
    // Row 2
    { x: 40, y: -30, id: 2, src: pin2 },
    { x: 40, y: 30, id: 3, src: pin3 },
    // Row 3
    { x: 80, y: -60, id: 4, src: pin4 },
    { x: 80, y: 0, id: 5, src: pin5 },
    { x: 80, y: 60, id: 6, src: pin6 },
    // Row 4 (back)
    { x: 120, y: -90, id: 7, src: pin7 },
    { x: 120, y: -30, id: 8, src: pin8 },
    { x: 120, y: 30, id: 9, src: pin9 },
    { x: 120, y: 90, id: 10, src: pin10 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single timeline for all animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 0.5,
          pin: true,
          pinSpacing: false,
        }
      });

      // Ball rolls from left to pins - needs to travel the gap distance (0 - 0.5)
      tl.to(ballRef.current, {
        x: isMobile ? 400 : 840, // Travel across the gap to reach pins (doubled distance)
        rotation: 1440,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      // Ball continues moving after impact (0.5 - 1.0)
      .to(ballRef.current, {
        x: isMobile ? 700 : 1400,
        rotation: '+=720',
        opacity: 0,
        duration: 0.5,
        ease: 'power1.out'
      });

      // Animate each pin individually - all start at 0.5 (impact time when ball reaches them)
      pinPositions.forEach((pin) => {
        const randomX = isMobile ? gsap.utils.random(500, 900) : gsap.utils.random(1000, 1800);
        const randomY = isMobile ? gsap.utils.random(-200, 200) : gsap.utils.random(-400, 400);
        const randomRotation = gsap.utils.random(-720, 720);
        
        tl.to(`.bowling-pin-${pin.id}`, {
          x: randomX,
          y: randomY,
          rotation: randomRotation,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out'
        }, 0.5); // Pins scatter when ball reaches them at 0.5
      });

      // Fade out CTA content as we scroll
      tl.to(ctaContentRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0);

    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      ref={heroRef}
      id="home"
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large Background Ball and Pins - 5x bigger, low opacity */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      >
        {/* Animation Container */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: isMobile ? '2rem' : '20rem',
            position: 'relative',
            transform: isMobile ? 'scale(1)' : 'scale(1.25)',
          }}
        >
          {/* Bowling Ball */}
          <div 
            ref={ballRef}
            style={{
              width: '130px',
              position: 'relative',
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))',
            }}
          >
            <BowlingBall />
          </div>

          {/* Bowling Pins Formation */}
          <div 
            style={{
              width: '500px',
              height: '150px',
              position: 'relative',
              marginTop: '-3rem',
              marginLeft: '6rem',
            }}
          >
            {pinPositions.map((pin) => (
              <div 
                key={pin.id}
                className={`bowling-pin-${pin.id}`}
                style={{
                  width: '160px',
                  height: '200px',
                  position: 'absolute',
                  left: `calc(50% + ${pin.x}px)`,
                  top: `calc(50% + ${pin.y}px)`,
                  transform: 'translate(-50%, -50%)',
                  overflow: 'hidden',
                }}
              >
                <img 
                  src={pin.src} 
                  alt={`Bowling Pin ${pin.id}`} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - CTA */}
      <div className="container-custom" style={{ position: 'relative', width: '100%', maxWidth: '1200px', zIndex: 10, padding: isMobile ? '3rem 1.5rem' : '4rem 2rem' }}>
        
        {/* Main Text - STRIKERS */}
        <div 
          ref={ctaContentRef}
          style={{
            textAlign: 'center',
          }}
        >
          <h1 
            ref={strikersTextRef}
            style={{ 
              fontFamily: 'var(--font-header)', 
              color: 'var(--text-primary)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              margin: 0,
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Ready to Roll?
          </h1>
          <p 
            ref={bowlingAlleyRef}
            style={{ 
              fontFamily: 'var(--font-body)', 
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              marginBottom: '3rem',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              lineHeight: 1.6,
            }}
          >
            Experience the ultimate bowling adventure at Strikers. Book your lane today and strike up some fun!
          </p>

          {/* CTA Button */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <MagicButton
              ref={buttonRef}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              glowColor="150, 51, 60"
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
                boxShadow: '0 10px 30px rgba(150, 51, 60, 0.3)',
              }}
              onClick={openBooking}
            >
              Book Your Lane
            </MagicButton>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
