import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeagueCard from '../components/LeagueCard';
import MagicButton from '../components/MagicButton';
import TiltedCard from '../components/TiltedCard';
import GradualBlur from '../components/GradualBlur';
import { leagueService } from '../services/leagueService';

gsap.registerPlugin(ScrollTrigger);

const LeaguePage = ({ openLeagueSignup, openStandings, openHonorScores }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [leagues, setLeagues] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const filtersRef = useRef(null);
  const cardsRef = useRef({});

  // Global cleanup on unmount - kill all GSAP animations and ScrollTriggers
  useEffect(() => {
    return () => {
      // Kill all GSAP animations on this component
      const allCardElements = Object.values(cardsRef.current).filter(Boolean);
      gsap.killTweensOf([heroRef.current, badgeRef.current, titleRef.current, subtitleRef.current, filtersRef.current, ...allCardElements]);
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // CRITICAL: Kill all existing ScrollTrigger instances from other pages
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadLeagues = async () => {
      const activeLeagues = await leagueService.getAllLeagues(true);
      setLeagues(activeLeagues);
    };
    loadLeagues();
  }, []);

  useEffect(() => {
    // Run animations immediately when component mounts
    const animations = [];
    
    // Hero animation
    if (heroRef.current) {
      const anim = gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );
      animations.push(anim);
    }

    // Badge animation
    if (badgeRef.current) {
      const anim = gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.3,
          ease: 'back.out(2)',
        }
      );
      animations.push(anim);
    }

    // Title animation
    if (titleRef.current) {
      const anim = gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.out',
        }
      );
      animations.push(anim);
    }

    // Subtitle animation
    if (subtitleRef.current) {
      const anim = gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.7,
          ease: 'power3.out',
        }
      );
      animations.push(anim);
    }

    // Filters animation
    if (filtersRef.current) {
      const anim = gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.9,
          ease: 'power3.out',
        }
      );
      animations.push(anim);
    }

    // Cleanup function to kill all animations when component unmounts
    return () => {
      animations.forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Run once on mount

  useEffect(() => {
    // Card animations - run when filteredLeagues change
    if (leagues.length === 0) return;

    const cardAnimations = [];
    let timeoutId;

    // Kill any existing card animations first
    const allCardElements = Object.values(cardsRef.current).filter(Boolean);
    gsap.killTweensOf(allCardElements);

    // Wait a bit to ensure cards are rendered
    timeoutId = setTimeout(() => {
      const cardElements = Object.values(cardsRef.current).filter(Boolean);
      cardElements.forEach((card, index) => {
        if (card) {
          const anim = gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: 'back.out(1.2)',
            }
          );
          cardAnimations.push(anim);
        }
      });
    }, 100);

    // Cleanup function to kill card animations and clear timeout
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      cardAnimations.forEach(anim => anim.kill());
    };
  }, [leagues, activeFilter]);

  // Immediately kill all card animations when filter changes - BEFORE React re-renders
  useEffect(() => {
    const allCardElements = Object.values(cardsRef.current).filter(Boolean);
    allCardElements.forEach(card => {
      if (card) {
        gsap.killTweensOf(card);
      }
    });
  }, [activeFilter]);

  const formats = ['All', 'Open', 'Men\'s', 'Ladies', 'Mixed', 'Youth', 'Seniors'];
  
  const filteredLeagues = activeFilter === 'All' 
    ? leagues 
    : leagues.filter(league => league.format === activeFilter);

  const formatEmojis = {
    'Open': '🎳',
    'Men\'s': '👨',
    'Ladies': '👩',
    'Mixed': '👥',
    'Youth': '👦',
    'Seniors': '👴',
    'Other': '🎯'
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        style={{
          padding: isMobile ? '120px 20px 60px' : '140px 40px 80px',
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <GradualBlur position="top" height="4rem" strength={1.5} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1.5rem',
            }}
          >
            🏆 BOWLING LEAGUES
          </div>

          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: isMobile ? '2.5rem' : '4rem',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Join Our Leagues
          </h1>

          <p
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: 'var(--text-secondary)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Whether you're a seasoned pro or just starting out, we have a league for everyone. 
            Join us for friendly competition, skill development, and lasting friendships!
          </p>
        </div>
      </section>

      {/* Leagues Section */}
      <section
        style={{
          padding: isMobile ? '40px 20px 80px' : '60px 40px 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <GradualBlur position="top" height="3.5rem" strength={1.5} />
        <GradualBlur position="bottom" height="3.5rem" strength={1.5} />
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Filters */}
          <div
            ref={filtersRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            {formats.map((format) => (
              <button
                key={format}
                onClick={() => setActiveFilter(format)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '25px',
                  border: activeFilter === format 
                    ? '2px solid var(--accent-primary)' 
                    : '2px solid var(--border-color)',
                  backgroundColor: activeFilter === format 
                    ? 'var(--accent-primary)' 
                    : 'var(--bg-secondary)',
                  color: activeFilter === format 
                    ? '#ffffff' 
                    : 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {format}
              </button>
            ))}
          </div>

          {/* League Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {filteredLeagues.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '3rem',
                color: 'var(--text-secondary)'
              }}>
                <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-body)' }}>
                  {leagues.length === 0 ? 'Loading leagues...' : 'No leagues found for this filter.'}
                </p>
              </div>
            ) : (
              filteredLeagues.map((league) => {
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
                    cardRef={(el) => {
                      if (el) {
                        cardsRef.current[league.name] = el;
                      } else {
                        delete cardsRef.current[league.name];
                      }
                    }}
                  />
                );
              })
            )}
          </div>

          {/* Benefits Section */}
          <div style={{ marginTop: '4rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: isMobile ? '2rem' : '2.5rem',
                color: 'var(--text-primary)',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              Why Join a League?
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem',
              }}
            >
              {[
                {
                  icon: '🎯',
                  title: 'Improve Your Game',
                  description: 'Regular practice and friendly competition help you develop your skills and technique.',
                },
                {
                  icon: '👥',
                  title: 'Make Friends',
                  description: 'Meet new people and build lasting friendships with fellow bowling enthusiasts.',
                },
                {
                  icon: '🏆',
                  title: 'Compete for Prizes',
                  description: 'Win trophies, awards, and prizes throughout the season and at our championship events.',
                },
                {
                  icon: '📅',
                  title: 'Weekly Fun',
                  description: 'Enjoy a regular social activity that gets you out of the house and having fun!',
                },
              ].map((benefit, index) => (
                <TiltedCard key={index} scaleOnHover={1.05}>
                  <div
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '15px',
                      border: '2px solid var(--accent-primary)',
                      padding: '2rem',
                      textAlign: 'center',
                      height: '100%',
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                      {benefit.icon}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-header)',
                        fontSize: '1.3rem',
                        color: 'var(--text-primary)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                      }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </TiltedCard>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '3rem',
            }}
          >
            <MagicButton
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              clickEffect={true}
              className="btn-primary"
              onClick={() => openLeagueSignup()}
            >
              Sign Up for a League
            </MagicButton>

            <MagicButton
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              clickEffect={true}
              className="btn-outline"
              onClick={openStandings}
            >
              View League Standings
            </MagicButton>

            <MagicButton
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              clickEffect={true}
              className="btn-outline"
              onClick={openHonorScores}
            >
              Honor Scores
            </MagicButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaguePage;
