import React, { useState } from 'react';
import MagicButton from './MagicButton';
import TiltedCard from './TiltedCard';
import './LeagueCard.css';

const LeagueCard = ({ emoji, title, description, details, onClick, cardRef }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = (e) => {
    // Don't flip if clicking the join button
    if (e.target.closest('.join-button')) return;
    setIsFlipped(!isFlipped);
  };

  const handleJoinClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <TiltedCard scaleOnHover={1.03} rotateAmplitude={8}>
      <div
        ref={cardRef}
        onClick={handleCardClick}
        style={{
          perspective: '1000px',
          cursor: 'pointer',
          height: '400px',
        }}
      >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of Card */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            padding: '2.5rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div 
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            {emoji}
          </div>
          <h3 
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1.8rem',
              color: 'var(--accent-primary)',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            {title}
          </h3>
          <p 
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            {description}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--accent-secondary)',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Click to see details →
          </p>
        </div>

        {/* Back of Card */}
        <div
          className="league-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: '2rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '20px',
            border: '2px solid var(--accent-primary)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', marginRight: '0.5rem' }}>{emoji}</span>
              <h3 
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.5rem',
                  color: 'var(--accent-primary)',
                  margin: 0,
                }}
              >
                {title}
              </h3>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              {details && Object.entries(details).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '0.8rem' }}>
                  <strong style={{ 
                    color: 'var(--accent-secondary)', 
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                  }}>
                    {key}:
                  </strong>
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    margin: '0.2rem 0 0 0',
                  }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="join-button">
            <MagicButton
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={200}
              glowColor="150, 51, 60"
              onClick={handleJoinClick}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              Join This League
            </MagicButton>
          </div>
        </div>
      </div>
    </div>
    </TiltedCard>
  );
};

export default LeagueCard;
