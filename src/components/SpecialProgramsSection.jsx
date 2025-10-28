import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bowlingAlleyInfo } from '../data/bowlingAlleyInfo';
import TiltedCard from './TiltedCard';
import MagicButton from './MagicButton';

gsap.registerPlugin(ScrollTrigger);

const SpecialProgramsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
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

  const programs = [
    {
      title: bowlingAlleyInfo.specialPrograms[0].name,
      icon: '👦',
      description: 'Kids ages 5-17 learn bowling fundamentals in a fun, supportive environment. Season starts Sept 13, 2025.',
      highlight: 'Starting Sept 13, 2025',
      action: 'View League Info',
      type: 'internal',
      link: '/leagues',
    },
    {
      title: bowlingAlleyInfo.specialPrograms[1].name,
      icon: '♿',
      description: 'Inclusive bowling for all ages and abilities. One free game including shoes in a welcoming community.',
      highlight: 'Free Game Included',
      action: 'Visit Bowlability',
      type: 'external',
      link: bowlingAlleyInfo.specialPrograms[1].link,
    },
  ];

  const handleProgramClick = (program) => {
    if (program.type === 'internal') {
      navigate(program.link);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else if (program.type === 'external') {
      window.open(program.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="special-programs"
      style={{
        padding: isMobile ? '60px 20px' : '80px 40px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            SPECIAL PROGRAMS
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
            Programs That Make a Difference
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
            Building community through bowling - for youth and all abilities
          </p>
        </div>

        {/* Program Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem',
          }}
        >
          {programs.map((program, index) => (
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
                  {program.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: '1.8rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {program.title}
                </h3>

                {/* Highlight */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    width: 'fit-content',
                  }}
                >
                  {program.highlight}
                </div>

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
                  {program.description}
                </p>

                {/* Learn More Button */}
                <MagicButton
                  type="button"
                  onClick={() => handleProgramClick(program)}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  clickEffect={true}
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
                  {program.action} →
                </MagicButton>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialProgramsSection;
