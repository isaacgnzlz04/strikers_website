import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bowlingAlleyInfo } from '../data/bowlingAlleyInfo';
import MagicButton from './MagicButton';
import TiltedCard from './TiltedCard';
import { HoverEffect } from './ui/card-hover-effect';

gsap.registerPlugin(ScrollTrigger);

const HoursAndPricingSection = ({ openBooking }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorMode, setCalculatorMode] = useState('perGame');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [college, setCollege] = useState(0);
  const [hours, setHours] = useState(1);
  
  const sectionRef = useRef(null);
  const hoursRef = useRef(null);
  const pricingRef = useRef(null);
  const cardsRef = useRef([]);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Calculator Modal refs
  const modalBackdropRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalTitleRef = useRef(null);
  const modalBodyRef = useRef(null);
  const modeContentRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (showCalculator) {
      document.body.style.overflow = 'hidden';
      // Hide navbar when calculator opens
      const navbar = document.querySelector('.card-nav-container');
      if (navbar) {
        navbar.style.display = 'none';
      }
    } else {
      document.body.style.overflow = 'auto';
      // Show navbar when calculator closes
      const navbar = document.querySelector('.card-nav-container');
      if (navbar) {
        navbar.style.display = 'block';
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
      // Ensure navbar is visible on cleanup
      const navbar = document.querySelector('.card-nav-container');
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, [showCalculator]);

  // Calculator modal animation
  useEffect(() => {
    if (!showCalculator) return;

    const tl = gsap.timeline();

    // Fade in backdrop
    tl.fromTo(
      modalBackdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Modal entrance
    tl.fromTo(
      modalContentRef.current,
      { scale: 0.8, opacity: 0, y: -50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.15'
    );

    // Title slide in
    if (modalTitleRef.current) {
      tl.fromTo(
        modalTitleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.25'
      );
    }

    // Body fade in
    if (modalBodyRef.current) {
      tl.fromTo(
        modalBodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => tl.kill();
  }, [showCalculator]);

  // Animate mode changes
  useEffect(() => {
    if (!showCalculator || !modeContentRef.current) return;

    const tl = gsap.timeline();

    // Fade out
    tl.to(modeContentRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      ease: 'power2.in',
    });

    // Fade in with new content
    tl.to(modeContentRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
    });

    return () => tl.kill();
  }, [calculatorMode, showCalculator]);

  useEffect(() => {
    // Use a single ScrollTrigger timeline for all animations to reduce overhead
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      });

      // Badge animation
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            force3D: true,
          },
          0
        );
      }

      // Title animation
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            force3D: true,
          },
          0.1
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            force3D: true,
          },
          0.15
        );
      }

      // Hours card animation
      if (hoursRef.current) {
        tl.fromTo(
          hoursRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            force3D: true,
          },
          0.2
        );
      }

      // Pricing card animation
      if (pricingRef.current) {
        tl.fromTo(
          pricingRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            force3D: true,
          },
          0.2
        );
      }

      // Pricing cards animation - batch them together
      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              force3D: true,
            },
            0.3 + index * 0.1
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pricingPlans = [
    {
      name: 'Adults',
      price: '$5.50',
      period: 'Per Game',
      description: 'Regular Price For Adults (13+)',
      note: '$3.50 Shoe Fee',
      icon: '👨',
    },
    {
      name: 'Children',
      price: '$4.50',
      period: 'Per Game',
      description: 'Children (12 & Under)',
      note: 'Shoes Included!',
      icon: '👶',
      highlight: true,
    },
    {
      name: 'College',
      price: '$5.00',
      period: 'Per Game',
      description: 'College Students',
      note: 'Valid with ANY college ID',
      icon: '🎓',
      highlight: true,
    },
    {
      name: 'League',
      price: '$4.75',
      period: 'Per Game',
      description: 'League Bowlers',
      note: '$3.00 Shoe Fee',
      icon: '🏆',
    },
    {
      name: 'Hourly',
      price: '$40',
      period: 'One Hour',
      description: 'Best Deal for Groups!',
      note: 'Up to 6 People!',
      icon: '⏰',
      highlight: true,
    },
  ];

  const calculateTotal = () => {
    if (calculatorMode === 'perGame') {
      const adultsCost = adults * 5.50;
      const childrenCost = children * 4.50;
      const collegeCost = college * 5.00;
      const adultShoes = adults * 3.50;
      
      return (adultsCost + childrenCost + collegeCost + adultShoes).toFixed(2);
    } else {
      return (hours * 40).toFixed(2);
    }
  };

  const handleCloseCalculator = () => {
    const tl = gsap.timeline({ onComplete: () => setShowCalculator(false) });

    // Fade out body
    if (modalBodyRef.current) {
      tl.to(modalBodyRef.current, { y: 20, opacity: 0, duration: 0.18, ease: 'power2.in' });
    }

    // Title out
    if (modalTitleRef.current) {
      tl.to(modalTitleRef.current, { y: -20, opacity: 0, duration: 0.18, ease: 'power2.in' }, '-=0.12');
    }

    // Modal exit
    if (modalContentRef.current) {
      tl.to(modalContentRef.current, { scale: 0.8, opacity: 0, y: -50, duration: 0.25, ease: 'power2.in' }, '-=0.1');
    }

    // Fade out backdrop
    if (modalBackdropRef.current) {
      tl.to(modalBackdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.2');
    }
  };

  const CalculatorModal = () => (
    <div
      ref={modalBackdropRef}
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
        zIndex: 10000,
        padding: '20px',
      }}
      onClick={handleCloseCalculator}
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
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (X) */}
        <button
          onClick={handleCloseCalculator}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '2px solid var(--accent-primary)',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            fontWeight: '300',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
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
            paddingRight: '40px',
          }}
        >
          💰 Pricing Calculator
        </h3>

        <div ref={modalBodyRef}>
        {/* Mode Toggle */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setCalculatorMode('perGame')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid var(--accent-primary)',
              backgroundColor: calculatorMode === 'perGame' ? 'var(--accent-primary)' : 'transparent',
              color: calculatorMode === 'perGame' ? '#ffffff' : 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Per Game
          </button>
          <button
            onClick={() => setCalculatorMode('hourly')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid var(--accent-primary)',
              backgroundColor: calculatorMode === 'hourly' ? 'var(--accent-primary)' : 'transparent',
              color: calculatorMode === 'hourly' ? '#ffffff' : 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Hourly Rate
          </button>
        </div>

        {/* Mode Content with Animation */}
        <div ref={modeContentRef}>
        {/* Per Game Mode */}
        {calculatorMode === 'perGame' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                Adults (13+) - $5.50 + $3.50 shoes
              </label>
              <input
                type="number"
                min="0"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value) || 0)}
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
                Children (12 & Under) - $4.50 (shoes included)
              </label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
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
                College Students - $5.00 (shoes included)
              </label>
              <input
                type="number"
                min="0"
                value={college}
                onChange={(e) => setCollege(parseInt(e.target.value) || 0)}
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
        )}

        {/* Hourly Mode */}
        {calculatorMode === 'hourly' && (
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
              Number of Hours - $40/hour (up to 6 people, shoes included)
            </label>
            <input
              type="number"
              min="1"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 1)}
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
        )}

        {/* Total */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            borderRadius: '15px',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--accent-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.2rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}
            >
              Total:
            </span>
            <span
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: '2rem',
                color: 'var(--accent-primary)',
                fontWeight: 'bold',
              }}
            >
              ${calculateTotal()}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <MagicButton
            type="button"
            onClick={handleCloseCalculator}
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
            Close
          </MagicButton>
          <MagicButton
            type="button"
            onClick={() => {
              handleCloseCalculator();
              setTimeout(() => openBooking(), 300);
            }}
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
            Book Now!
          </MagicButton>
        </div>
        </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section
        ref={sectionRef}
        id="hours-pricing"
        style={{
          padding: isMobile ? '60px 20px' : '80px 40px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Section Header */}
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
                marginBottom: '16px',
                letterSpacing: '1px',
                opacity: 0,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
            >
              PRICING
            </div>
            <h2
              ref={titleRef}
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                color: 'var(--text-primary)',
                margin: '0 0 1rem 0',
                opacity: 0,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
            >
              Affordable Bowling Fun
            </h2>
            <p
              ref={subtitleRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                margin: 0,
                opacity: 0,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
            >
              Affordable fun for everyone!
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {pricingPlans.map((plan, index) => (
              <TiltedCard key={index} scaleOnHover={1.05} rotateAmplitude={5}>
                <div
                  ref={(el) => (cardsRef.current[index] = el)}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '15px',
                    border: '2px solid var(--accent-primary)',
                    padding: '1.5rem',
                    opacity: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                    position: 'relative',
                  }}
                >
                  {plan.highlight && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        backgroundColor: 'var(--accent-primary)',
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      POPULAR
                    </div>
                  )}

                  <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    {plan.icon}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: '1.5rem',
                      color: 'var(--text-primary)',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    {plan.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: '2rem',
                      color: 'var(--accent-primary)',
                      margin: '0 0 0.25rem 0',
                      fontWeight: 'bold',
                    }}
                  >
                    {plan.price}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      margin: '0 0 1rem 0',
                    }}
                  >
                    {plan.period}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      margin: '0 0 0.5rem 0',
                      flex: 1,
                    }}
                  >
                    {plan.description}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--accent-primary)',
                      margin: 0,
                      fontWeight: '600',
                    }}
                  >
                    {plan.note}
                  </p>
                </div>
              </TiltedCard>
            ))}
          </div>

          {/* Hours Card - Full Width */}
          <div
            ref={hoursRef}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '20px',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              border: '2px solid var(--accent-primary)',
              padding: isMobile ? '2rem' : '2.5rem',
              marginBottom: '2rem',
              opacity: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>🕒</span>
              <h2
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Hours of Operation
              </h2>
            </div>

            <HoverEffect 
              items={bowlingAlleyInfo.hoursFormatted.map((hour) => ({
                title: hour.day,
                description: hour.hours,
                link: '#'
              }))}
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-7 py-0"
            />
          </div>

          {/* Calculator Button */}
          <div style={{ textAlign: 'center' }}>
            <MagicButton
              type="button"
              onClick={() => setShowCalculator(true)}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              clickEffect={true}
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                padding: '16px 36px',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '30px',
              }}
            >
              🧮 Calculate Your Total
            </MagicButton>
          </div>
        </div>
      </section>

      {/* Calculator Modal */}
      {showCalculator && <CalculatorModal />}
    </>
  );
};

export default HoursAndPricingSection;
