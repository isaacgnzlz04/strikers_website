import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagicButton from './MagicButton';
import TiltedCard from './TiltedCard';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = ({ openBooking }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

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

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Card animations
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.3 + index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  const pricingPlans = [
    {
      name: 'Adults',
      price: '$5.50',
      period: 'Per Game',
      description: 'Our Regular Price For Adults (13 Years Old +)',
      note: '$3.50 Shoe Fee Per Bowler',
      icon: '👨',
    },
    {
      name: 'Children',
      price: '$4.50',
      period: 'Per Game',
      description: 'Our Regular Price For Children (12 Years Old And Younger)',
      note: 'Shoes Included!',
      icon: '👶',
      highlight: true,
    },
    {
      name: 'College',
      price: '$5.00',
      period: 'Per Game',
      description: 'College Students Deserve A Break! Shoes Included!',
      note: 'Valid with ANY college ID',
      icon: '🎓',
      highlight: true,
    },
    {
      name: 'League',
      price: '$4.75',
      period: 'Per Game',
      description: 'For Our Regular League Bowlers! With member card',
      note: '$3.00 Shoe Fee Per Bowler',
      icon: '🏆',
    },
    {
      name: 'Hourly',
      price: '$40',
      period: 'One Hour',
      description: 'Our best deal for small groups! Shoes Included!',
      note: 'Up to 6 People!',
      icon: '⏰',
      highlight: true,
    },
  ];

  return (
    <>
      <section 
        id="pricing"
        style={{
          padding: isMobile ? '80px 20px' : '120px 40px',
          position: 'relative',
        }}
      >
        <div 
          style={{
            maxWidth: '1400px',
            width: '100%',
            margin: '0 auto',
          }}
        >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            PRICING
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
            Affordable Bowling Fun
          </h2>
          <p 
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
              opacity: 0,
            }}
          >
            Great prices for everyone - from kids to league bowlers!
          </p>

          {/* Calculator Button */}
          <div style={{ marginTop: '2rem' }}>
            <MagicButton
              onClick={() => setShowCalculator(true)}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              spotlightRadius={300}
              glowColor="78, 152, 213"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '1rem 2.5rem',
                backgroundColor: 'transparent',
                color: 'var(--accent-secondary)',
                border: '2px solid var(--accent-secondary)',
                borderRadius: '50px',
                cursor: 'pointer',
              }}
            >
              💰 Price Calculator
            </MagicButton>
          </div>
        </div>

        {/* Pricing Cards - Compact Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.2rem',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {pricingPlans.map((plan, index) => (
            <TiltedCard key={index} scaleOnHover={1.03} rotateAmplitude={8}>
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '15px',
                  border: '2px solid var(--accent-primary)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  opacity: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
              {/* Highlight Badge */}
              {plan.highlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    letterSpacing: '0.5px',
                  }}
                >
                  DEAL
                </div>
              )}

              {/* Icon */}
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                {plan.icon}
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.3rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                {plan.name}
              </h3>

              {/* Period */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem',
                }}
              >
                {plan.period}
              </div>

              {/* Price */}
              <div
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '2.5rem',
                  color: 'var(--accent-primary)',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                }}
              >
                {plan.price}
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '0.75rem',
                  minHeight: '60px',
                }}
              >
                {plan.description}
              </p>

              {/* Note */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: plan.note.includes('Included') ? '#4ade80' : 'var(--text-secondary)',
                  fontWeight: plan.note.includes('Included') ? '600' : '400',
                  padding: '0.5rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '8px',
                }}
              >
                {plan.note}
              </div>
            </div>
            </TiltedCard>
          ))}
        </div>

        {/* Book Now CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <MagicButton
            onClick={openBooking}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
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
            }}
          >
            Book Your Lane Now
          </MagicButton>
        </div>
      </div>
    </section>

    {/* Price Calculator Modal */}
    {showCalculator && (
      <PriceCalculatorModal 
        onClose={() => setShowCalculator(false)}
        pricingPlans={pricingPlans}
      />
    )}
  </>
  );
};

// Price Calculator Modal Component
const PriceCalculatorModal = ({ onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [games, setGames] = useState(1);
  const [useHourly, setUseHourly] = useState(false);
  const [hours, setHours] = useState(1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calculateTotal = () => {
    if (useHourly) {
      const totalPeople = adults + children;
      if (totalPeople <= 6) {
        return hours * 40;
      } else {
        const lanes = Math.ceil(totalPeople / 6);
        return hours * 40 * lanes;
      }
    } else {
      const adultCost = adults * 5.50 * games;
      const adultShoes = adults * 3.50;
      const childCost = children * 4.50 * games;
      return adultCost + adultShoes + childCost;
    }
  };

  const total = calculateTotal();
  const totalPeople = adults + children;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '20px',
          border: '2px solid var(--accent-primary)',
          padding: isMobile ? '2rem' : '3rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-primary)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          ×
        </button>

        <h2
          style={{
            fontFamily: 'var(--font-header)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          🧮 Price Calculator
        </h2>

        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '30px',
              padding: '4px',
              gap: '4px',
            }}
          >
            <button
              onClick={() => setUseHourly(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: '600',
                padding: '10px 24px',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                backgroundColor: !useHourly ? 'var(--accent-primary)' : 'transparent',
                color: !useHourly ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.3s ease',
              }}
            >
              Per Game
            </button>
            <button
              onClick={() => setUseHourly(true)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: '600',
                padding: '10px 24px',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                backgroundColor: useHourly ? 'var(--accent-secondary)' : 'transparent',
                color: useHourly ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.3s ease',
              }}
            >
              Hourly
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              👨 Adults (13+ years)
            </label>
            <input
              type="number"
              min="0"
              value={adults}
              onChange={(e) => setAdults(Math.max(0, parseInt(e.target.value) || 0))}
              style={{
                width: '100%',
                padding: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                borderRadius: '10px',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              👶 Children (12 and under)
            </label>
            <input
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
              style={{
                width: '100%',
                padding: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                borderRadius: '10px',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {!useHourly ? (
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                🎳 Number of Games
              </label>
              <input
                type="number"
                min="1"
                value={games}
                onChange={(e) => setGames(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '10px',
                  outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
          ) : (
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                ⏰ Number of Hours
              </label>
              <input
                type="number"
                min="1"
                value={hours}
                onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '10px',
                  outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
          )}
        </div>

        {totalPeople > 0 && (
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: '1.3rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}
            >
              Breakdown
            </h3>

            {!useHourly ? (
              <>
                {adults > 0 && (
                  <>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{adults} Adult{adults !== 1 ? 's' : ''} × {games} game{games !== 1 ? 's' : ''} × $5.50</span>
                      <span>${(adults * games * 5.50).toFixed(2)}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{adults} Adult shoe{adults !== 1 ? 's' : ''} × $3.50</span>
                      <span>${(adults * 3.50).toFixed(2)}</span>
                    </div>
                  </>
                )}
                {children > 0 && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{children} Child{children !== 1 ? 'ren' : ''} × {games} game{games !== 1 ? 's' : ''} × $4.50 (shoes incl.)</span>
                    <span>${(children * games * 4.50).toFixed(2)}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{totalPeople} People (up to 6 per lane)</span>
                  <span>{Math.ceil(totalPeople / 6)} Lane{Math.ceil(totalPeople / 6) !== 1 ? 's' : ''}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{Math.ceil(totalPeople / 6)} Lane{Math.ceil(totalPeople / 6) !== 1 ? 's' : ''} × {hours} hour{hours !== 1 ? 's' : ''} × $40</span>
                  <span>${(Math.ceil(totalPeople / 6) * hours * 40).toFixed(2)}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#4ade80', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  ✓ Shoes included with hourly rate
                </div>
              </>
            )}
          </div>
        )}

        <div
          style={{
            backgroundColor: 'var(--accent-primary)',
            borderRadius: '15px',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.5rem' }}>
            Estimated Total
          </div>
          <div style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: '#ffffff', fontWeight: 'bold' }}>
            ${total.toFixed(2)}
          </div>
        </div>

        <MagicButton
          onClick={onClose}
          enableSpotlight={true}
          enableBorderGlow={true}
          spotlightRadius={300}
          glowColor="78, 152, 213"
          style={{
            width: '100%',
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            fontWeight: '700',
            padding: '1.2rem',
            backgroundColor: 'var(--accent-secondary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
        >
          Book Now
        </MagicButton>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem', fontStyle: 'italic' }}>
          * Prices are estimates. Final price may vary based on promotions and special offers.
        </p>
      </div>
    </div>
  );
};

export default PricingSection;
