import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeagueCard from './LeagueCard';
import MagicButton from './MagicButton';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = ({ openLeagueSignup, openStandings }) => {
  const [isMobile, setIsMobile] = useState(false);
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
    // Text animations
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
  }, []);

  return (
    <section 
      id="leagues"
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
        }}
      >
        {/* Section Title */}
        <h2 
          ref={titleRef}
          style={{ 
            fontFamily: 'var(--font-header)',
            fontSize: isMobile ? '2.5rem' : '4rem',
            color: 'var(--text-primary)',
            marginBottom: '20px',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          Join Our Leagues
        </h2>
        <p 
          ref={subtitleRef}
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 60px',
            textAlign: 'center',
            lineHeight: '1.6',
            opacity: 0,
          }}
        >
          Find the perfect league for you! Join one of our exciting bowling leagues and compete with friends.
        </p>

        {/* League Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <LeagueCard
            emoji="🎳"
            title="Monday Night Open"
            description="Open to all skill levels. Join us every Monday evening for competitive bowling and great company."
            details={{
              'Schedule': 'Every Monday, 7:00 PM - 9:30 PM',
              'Season': '20 weeks (September - February)',
              'Format': '4-person teams, handicap scoring',
              'Skill Level': 'All levels welcome',
              'Cost': '$15 per week',
            }}
            onClick={() => openLeagueSignup('Monday Night Open')}
            cardRef={(el) => (cardsRef.current[0] = el)}
          />

          <LeagueCard
            emoji="👩"
            title="Tuesday Night Ladies"
            description="Ladies night out! A fun and social league for women bowlers of all abilities."
            details={{
              'Schedule': 'Every Tuesday, 6:30 PM - 9:00 PM',
              'Season': '16 weeks (October - February)',
              'Format': '3-person teams, handicap scoring',
              'Skill Level': 'Beginner to advanced',
              'Cost': '$12 per week',
            }}
            onClick={() => openLeagueSignup('Tuesday Night Ladies')}
            cardRef={(el) => (cardsRef.current[1] = el)}
          />

          <LeagueCard
            emoji="👥"
            title="Wednesday Night Mixed"
            description="Couples and mixed teams welcome! Perfect for friends and family bowling together."
            details={{
              'Schedule': 'Every Wednesday, 7:00 PM - 9:30 PM',
              'Season': '18 weeks (September - January)',
              'Format': '4-person mixed teams, handicap scoring',
              'Skill Level': 'All levels, couples encouraged',
              'Cost': '$14 per week',
            }}
            onClick={() => openLeagueSignup('Wednesday Night Mixed')}
            cardRef={(el) => (cardsRef.current[2] = el)}
          />

          <LeagueCard
            emoji="⛪"
            title="Church League"
            description="Fellowship and fun! Bring your church group for a night of friendly competition."
            details={{
              'Schedule': 'Every Sunday, 5:00 PM - 7:30 PM',
              'Season': '12 weeks (October - December)',
              'Format': '5-person church teams, handicap scoring',
              'Skill Level': 'Family-friendly, all ages',
              'Cost': '$10 per week',
            }}
            onClick={() => openLeagueSignup('Church League')}
            cardRef={(el) => (cardsRef.current[3] = el)}
          />

          <LeagueCard
            emoji="👦"
            title="Youth"
            description="Junior bowlers unite! Our youth league teaches skills, sportsmanship, and builds confidence."
            details={{
              'Schedule': 'Every Saturday, 10:00 AM - 12:00 PM',
              'Season': '16 weeks (September - January)',
              'Format': 'Individual scoring with coaching',
              'Age Group': 'Ages 6-17, grouped by skill',
              'Cost': '$8 per week (includes coaching)',
            }}
            onClick={() => openLeagueSignup('Youth')}
            cardRef={(el) => (cardsRef.current[4] = el)}
          />
        </div>

        {/* Standings Button */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
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
            onClick={openStandings}
          >
            View League Standings
          </MagicButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
