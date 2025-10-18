import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from './TiltedCard';
import MagicButton from './MagicButton';

gsap.registerPlugin(ScrollTrigger);

const EventsSection = ({ openBooking }) => {
  const [isMobile, setIsMobile] = useState(false);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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
            duration: 0.7,
            delay: 0.3 + index * 0.15,
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

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const events = [
    {
      icon: '🎂',
      title: 'Birthday Parties',
      description: 'Make your special day unforgettable with a bowling party! Includes lane reservations, party host, and special birthday package.',
      features: [
        'Dedicated party host',
        'Decorated party area',
        'Food & drink packages',
        'Party favors included',
        'Flexible scheduling',
      ],
      popular: true,
    },
    {
      icon: '💼',
      title: 'Corporate Events',
      description: 'Perfect for team building, company parties, or client entertainment. Professional service and customizable packages.',
      features: [
        'Private lane reservations',
        'Catering options',
        'AV equipment available',
        'Dedicated event coordinator',
        'Customizable packages',
      ],
      popular: false,
    },
    {
      icon: '👥',
      title: 'Group Events',
      description: 'Gathering with friends, family reunion, or special celebration? We can accommodate groups of any size.',
      features: [
        'Flexible group sizes',
        'Custom food menus',
        'Multiple lane packages',
        'Extended hours available',
        'Special group rates',
      ],
      popular: false,
    },
  ];

  return (
    <section 
      id="events"
      className="section" 
      style={{ 
        minHeight: '100vh',
        padding: isMobile ? '80px 20px 20px 20px' : '100px 40px 20px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div 
        className="container-custom" 
        style={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
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
              opacity: 0,
              marginBottom: '20px',
              letterSpacing: '1px',
            }}
          >
            EVENTS & PARTIES
          </div>
          <h2 
            ref={titleRef}
            style={{ 
              fontFamily: 'var(--font-header)',
              fontSize: isMobile ? '2.5rem' : '4rem',
              color: 'var(--text-primary)',
              marginBottom: '20px',
              lineHeight: '1.2',
              opacity: 0,
            }}
          >
            Celebrate in Style 🎉
          </h2>
          <p 
            ref={subtitleRef}
            style={{
              opacity: 0, 
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            From birthdays to corporate events, we make every occasion special with personalized service and unbeatable fun.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '30px' : '40px',
            marginBottom: '80px',
          }}
        >
          {events.map((event, index) => (
            <EventCard key={index} event={event} isMobile={isMobile} cardRef={(el) => (cardsRef.current[index] = el)} openBooking={openBooking} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          style={{
            opacity: 0, 
            textAlign: 'center',
            padding: isMobile ? '20px 20px 10px 20px' : '30px 40px 10px 40px',
            borderRadius: '20px',
            background: 'rgba(var(--accent-primary-rgb), 0.05)',
            border: '1px solid rgba(var(--accent-primary-rgb), 0.1)',
            marginBottom: '0',
          }}
        >
          <h3 
            style={{ 
              fontFamily: 'var(--font-header)',
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              color: 'var(--text-primary)',
              marginBottom: '15px',
            }}
          >
            Ready to Plan Your Event?
          </h3>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: 'var(--text-secondary)',
              marginBottom: '0',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Our event coordinators are here to help you create an unforgettable experience. Contact us today to start planning!
          </p>
        </div>
      </div>
    </section>
  );
};

const EventCard = ({ event, isMobile, cardRef, openBooking }) => {
  return (
    <TiltedCard scaleOnHover={1.05} rotateAmplitude={10}>
      <div
        ref={cardRef}
        style={{
          opacity: 0,
          position: 'relative',
          padding: isMobile ? '30px 25px' : '40px 30px',
          borderRadius: '20px',
          background: 'var(--bg-secondary)',
          border: event.popular 
            ? '2px solid var(--accent-primary)' 
            : '1px solid rgba(var(--text-primary-rgb), 0.1)',
          height: '100%',
        }}
      >
      {/* Popular Badge */}
      {event.popular && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '6px 20px',
            borderRadius: '20px',
            background: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '1px',
          }}
        >
          MOST POPULAR
        </div>
      )}

      {/* Icon */}
      <div
        style={{
          fontSize: '4rem',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        {event.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-header)',
          fontSize: isMobile ? '1.8rem' : '2rem',
          color: 'var(--text-primary)',
          marginBottom: '15px',
          textAlign: 'center',
        }}
      >
        {event.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '25px',
          textAlign: 'center',
        }}
      >
        {event.description}
      </p>

      {/* Features List */}
      <div style={{ marginBottom: '30px' }}>
        {event.features.map((feature, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 0',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
            }}
          >
            <span
              style={{
                color: 'var(--accent-primary)',
                fontSize: '1.2rem',
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Book Button */}
      <MagicButton
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={250}
        glowColor="150, 51, 60"
        style={{
          width: '100%',
          padding: '14px 0',
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          fontWeight: '600',
          color: event.popular ? 'var(--bg-primary)' : 'var(--accent-primary)',
          background: event.popular ? 'var(--accent-primary)' : 'transparent',
          border: event.popular ? 'none' : '2px solid var(--accent-primary)',
          borderRadius: '50px',
          cursor: 'pointer',
        }}
        onClick={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        Request Information
      </MagicButton>
      </div>
    </TiltedCard>
  );
};

export default EventsSection;
