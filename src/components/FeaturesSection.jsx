import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeagueCard from './LeagueCard';
import MagicButton from './MagicButton';
import { leagueService } from '../services/leagueService';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = ({ openLeagueSignup, openStandings }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [leagues, setLeagues] = useState([]);
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
    const loadLeagues = async () => {
      try {
        const activeLeagues = await leagueService.getAllLeagues(true);

        if (activeLeagues.length > 0) {
          setLeagues(activeLeagues);
        } else {
          setLeagues(leagueService.getDefaultLeagues());
        }
      } catch (error) {
        setLeagues(leagueService.getDefaultLeagues());
      }
    };

    loadLeagues();
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
          {leagues.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-secondary)'
            }}>
              <p style={{ fontSize: '1.2rem' }}>Loading leagues...</p>
            </div>
          ) : (
            leagues.map((league, index) => {
              // Format emoji based on format or use default
              const formatEmojis = {
                'Open': '🎳',
                'Men\'s': '👨',
                'Ladies': '👩',
                'Mixed': '👥',
                'Youth': '👦',
                'Seniors': '👴',
                'Other': '🎯'
              };
              
              const emoji = formatEmojis[league.format] || '🎳';
              
              return (
                <LeagueCard
                  key={league.name}
                  emoji={emoji}
                  title={league.name}
                  description={league.description || `Join us for ${league.format} bowling!`}
                  details={{
                    'Schedule': `Every ${league.day}, ${league.time}`,
                    'Season': `${league.totalWeeks} weeks`,
                    'Format': league.format,
                  }}
                  onClick={() => openLeagueSignup(league.name)}
                  cardRef={(el) => (cardsRef.current[index] = el)}
                />
              );
            })
          )}
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
