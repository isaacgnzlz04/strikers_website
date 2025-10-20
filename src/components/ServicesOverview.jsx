import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from './TiltedCard';
import MagicButton from './MagicButton';

gsap.registerPlugin(ScrollTrigger);

const ServicesOverview = ({ navigate }) => {
  const [isMobile, setIsMobile] = useState(false);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
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
            delay: 0.3 + index * 0.15,
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

  const services = [
    {
      title: 'Birthday Parties',
      icon: '🎂',
      description: 'Make your special day unforgettable! Complete party packages with bowling, arcade, food, and dedicated party hosts.',
      features: ['All Ages Welcome', 'Party Rooms', 'Custom Packages'],
      link: '/events',
      category: 'Birthday',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Corporate Events',
      icon: '💼',
      description: 'Perfect for team building and company celebrations. Professional service with customizable packages for any group size.',
      features: ['Team Building', 'Private Space', 'Catering Available'],
      link: '/events',
      category: 'Corporate',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Fundraisers',
      icon: '🎯',
      description: 'Partner with us for successful fundraising events. We provide the venue, you raise the funds for your cause.',
      features: ['Flexible Packages', 'Group Rates', 'Easy Planning'],
      link: '/events',
      category: 'Fundraiser',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      title: 'League Bowling',
      icon: '🏆',
      description: 'Join our competitive bowling leagues! All skill levels welcome with prizes, standings, and weekly competition.',
      features: ['Weekly Games', 'Prizes & Awards', 'All Skill Levels'],
      link: '/leagues',
      category: null,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  return (
    <section
      id="services"
      style={{
        padding: isMobile ? '60px 20px 30px' : '80px 40px 40px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
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
            OUR SERVICES
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
            What We Offer
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            From birthday celebrations to corporate events, we've got everything you need for an unforgettable experience
          </p>
        </div>

        {/* Service Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {services.map((service, index) => (
            <TiltedCard key={index} scaleOnHover={1.05} rotateAmplitude={8}>
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  border: '2px solid var(--accent-primary)',
                  padding: '2rem',
                  opacity: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: '3.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.8rem',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    flex: 1,
                  }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <div style={{ marginBottom: '1.5rem' }}>
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <MagicButton
                  type="button"
                  onClick={() => {
                    if (navigate && service.link) {
                      navigate(service.link);
                    }
                  }}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  clickEffect={true}
                  spotlightRadius={150}
                  glowColor="150, 51, 60"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderRadius: '25px',
                    width: '100%',
                  }}
                >
                  Learn More →
                </MagicButton>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
