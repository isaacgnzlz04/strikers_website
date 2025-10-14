import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagicButton from './MagicButton';
import './StandingsPage.css';

const StandingsPage = ({ onClose }) => {
  const [selectedLeague, setSelectedLeague] = useState('Monday Night Open');
  const [standings, setStandings] = useState({});
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef([]);
  const tableRef = useRef(null);

  const leagues = [
    'Monday Night Open',
    'Tuesday Night Ladies',
    'Wednesday Night Mixed',
    'Church League',
    'Youth'
  ];

  useEffect(() => {
    // Load standings from localStorage
    const loadStandings = () => {
      const saved = {};
      leagues.forEach(league => {
        const data = localStorage.getItem(`standings_${league}`);
        if (data) {
          try {
            saved[league] = JSON.parse(data);
          } catch (e) {
            saved[league] = null;
          }
        }
      });
      setStandings(saved);
    };
    loadStandings();

    // Entrance animations
    const tl = gsap.timeline();
    
    // Fade in overlay
    tl.fromTo(overlayRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Modal entrance - scale and fade
    tl.fromTo(modalRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.2'
    );

    // Title slide in
    tl.fromTo(titleRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    );

    // Stagger league buttons
    tl.fromTo(buttonsRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' },
      '-=0.2'
    );

    // Table fade in
    if (tableRef.current) {
      tl.fromTo(tableRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Animate table when league changes
  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(tableRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [selectedLeague]);

  const currentStandings = standings[selectedLeague] || [];

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    });

    // Reverse the entrance animation
    tl.to(tableRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    });

    tl.to(buttonsRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: 'back.in(2)'
    }, '-=0.1');

    tl.to(titleRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.1');

    tl.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'back.in(1.7)'
    }, '-=0.1');

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.2');
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="standings-modal-content"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            fontSize: '2rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'transform 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.2)';
            e.currentTarget.style.color = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          ×
        </button>

        {/* Title */}
        <h2
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-header)',
            fontSize: '2.5rem',
            color: 'var(--accent-primary)',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          League Standings
        </h2>

        {/* League Selector */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {leagues.map((league, index) => (
            <div
              key={league}
              ref={(el) => buttonsRef.current[index] = el}
              style={{ display: 'inline-block' }}
            >
              <MagicButton
                effectType="borderGlow"
                enableSpotlight={selectedLeague === league}
                enableMagnetism={true}
                clickEffect={true}
                glowColor={selectedLeague === league ? "150, 51, 60" : "78, 152, 213"}
                spotlightRadius={100}
                className="league-selector-button"
                style={{
                  padding: '10px 20px',
                  borderRadius: '25px',
                  border: selectedLeague === league ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
                  backgroundColor: selectedLeague === league ? 'var(--accent-primary)' : 'transparent',
                  color: selectedLeague === league ? '#ffffff' : 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                onClick={() => setSelectedLeague(league)}
              >
                {league}
              </MagicButton>
            </div>
          ))}
        </div>

        {/* Standings Table */}
        {currentStandings.length > 0 ? (
          <div ref={tableRef} style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--font-body)',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--accent-primary)' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: 'var(--accent-primary)' }}>Rank</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: 'var(--accent-primary)' }}>Team/Player</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: 'var(--accent-primary)' }}>Wins</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: 'var(--accent-primary)' }}>Losses</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: 'var(--accent-primary)' }}>Points</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: 'var(--accent-primary)' }}>Average</th>
                </tr>
              </thead>
              <tbody>
                {currentStandings.map((entry, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'transparent',
                      borderBottom: '1px solid var(--border-color)',
                    }}
                  >
                    <td style={{ padding: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>{entry.rank}</td>
                    <td style={{ padding: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>{entry.name}</td>
                    <td style={{ padding: '15px', textAlign: 'center', color: 'var(--text-secondary)' }}>{entry.wins}</td>
                    <td style={{ padding: '15px', textAlign: 'center', color: 'var(--text-secondary)' }}>{entry.losses}</td>
                    <td style={{ padding: '15px', textAlign: 'center', color: 'var(--text-secondary)' }}>{entry.points}</td>
                    <td style={{ padding: '15px', textAlign: 'center', color: 'var(--text-secondary)' }}>{entry.average}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-secondary)',
            }}
          >
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
              No standings available for {selectedLeague} yet.
            </p>
            <p style={{ fontSize: '1rem' }}>
              Check back soon!
            </p>
          </div>
        )}

        {/* Admin Link */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)',
            marginBottom: '10px'
          }}>
            Bowling Alley Staff
          </p>
          <a
            href="/admin.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--accent-secondary)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Click here to update standings →
          </a>
        </div>
      </div>
    </div>
  );
};

export default StandingsPage;
