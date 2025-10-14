import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from './TiltedCard';
import MagicButton from './MagicButton';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = ({ openBooking }) => {
  const [isMobile, setIsMobile] = useState(false);
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
          { opacity: 0, y: 80, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: index === 1 ? 1.05 : 1, // Middle card slightly larger
            duration: 0.7,
            delay: 0.3 + index * 0.12,
            ease: 'back.out(1.2)',
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
      name: 'Casual Play',
      price: '$25',
      period: 'per person/hour',
      features: [
        'Lane rental included',
        'Shoe rental included',
        'Up to 6 players per lane',
        'Unlimited games',
      ],
      color: 'var(--accent-secondary)',
      popular: false,
    },
    {
      name: 'Party Package',
      price: '$199',
      period: 'for 10 people',
      features: [
        '2 hours of bowling',
        'Shoe rentals included',
        'Private party area',
        'Pizza & drinks',
        'Dedicated party host',
      ],
      color: 'var(--accent-primary)',
      popular: true,
    },
    {
      name: 'League Play',
      price: '$15',
      period: 'per person/week',
      features: [
        '3 games per week',
        'Shoe rental included',
        'Tournament prizes',
        'Team uniforms',
        'Season banquet',
      ],
      color: 'var(--accent-secondary)',
      popular: false,
    },
  ];

  return (
    <section 
      id="pricing"
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
              color: 'var(--bg-primary)',
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
            Pricing Plans
          </h2>
          <p 
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
              opacity: 0,
            }}
          >
            Choose the perfect package for your bowling experience
          </p>
        </div>

        {/* Pricing Cards */}
        <div 
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'stretch',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
          }}
        >
          {pricingPlans.map((plan, index) => (
            <TiltedCard
              key={index}
              scaleOnHover={plan.popular ? 1.08 : 1.05}
              rotateAmplitude={12}
              style={{
                flex: 1,
                maxWidth: isMobile ? '400px' : '350px',
                position: 'relative',
              }}
            >
              <div ref={(el) => (cardsRef.current[index] = el)} style={{ position: 'relative', height: '100%' }}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--accent-primary)',
                      color: '#ffffff',
                      padding: '0.5rem 1.5rem',
                      borderRadius: '20px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      zIndex: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Card */}
                <div
                  style={{
                    padding: '3rem 2rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '20px',
                    border: plan.popular ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                {/* Plan Name */}
                <h3 
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.8rem',
                    color: plan.color,
                    marginBottom: '1rem',
                    textAlign: 'center',
                  }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div 
                    style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: '3rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </div>
                  <div 
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--text-secondary)',
                      marginTop: '0.5rem',
                    }}
                  >
                    {plan.period}
                  </div>
                </div>

                {/* Features List */}
                <ul 
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    marginBottom: '2rem',
                    flex: 1,
                  }}
                >
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '1rem',
                        paddingLeft: '1.5rem',
                        position: 'relative',
                        lineHeight: 1.5,
                      }}
                    >
                      <span 
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: plan.color,
                          fontWeight: 'bold',
                        }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <MagicButton
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={300}
                  glowColor={plan.popular ? "150, 51, 60" : "78, 152, 213"}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: '700',
                    padding: '1rem 2rem',
                    backgroundColor: plan.popular ? 'var(--accent-primary)' : 'transparent',
                    color: plan.popular ? '#ffffff' : plan.color,
                    border: plan.popular ? 'none' : `2px solid ${plan.color}`,
                    borderRadius: '50px',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                  onClick={openBooking}
                >
                  Book Now
                </MagicButton>
              </div>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
