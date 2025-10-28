import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagicButton from './MagicButton';

const HonorScoresPage = ({ onClose }) => {
  const [honorScoresData, setHonorScoresData] = useState([]);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Load honor scores from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('honorScores');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHonorScoresData(data);
      } catch (e) {
        setHonorScoresData([]);
      }
    }
  }, []);

  // Entry animation
  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in overlay
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Modal entrance
    tl.fromTo(
      modalRef.current,
      { scale: 0.8, opacity: 0, y: -50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.15'
    );

    // Title slide in
    tl.fromTo(
      titleRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
      '-=0.25'
    );

    // Content fade in
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.15'
      );
    }

    return () => tl.kill();
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });

    if (contentRef.current) {
      tl.to(contentRef.current, { y: 20, opacity: 0, duration: 0.18, ease: 'power2.in' });
    }

    if (titleRef.current) {
      tl.to(titleRef.current, { y: -20, opacity: 0, duration: 0.18, ease: 'power2.in' }, '-=0.12');
    }

    if (modalRef.current) {
      tl.to(modalRef.current, { scale: 0.8, opacity: 0, y: -50, duration: 0.25, ease: 'power2.in' }, '-=0.1');
    }

    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.2');
    }
  };

  if (honorScoresData.length === 0) {
    return (
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
        }}
        onClick={handleClose}
      >
        <div
          ref={modalRef}
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            border: '2px solid var(--accent-primary)',
            textAlign: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '2.5rem',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}
          >
            No Honor Scores Available
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '30px',
            }}
          >
            Honor scores have not been uploaded yet. Check back later!
          </p>
          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            clickEffect={true}
            glowColor="150, 51, 60"
            onClick={handleClose}
            style={{
              padding: '12px 30px',
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
            Close
          </MagicButton>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '20px',
          padding: '40px 30px',
          maxWidth: '900px',
          width: '100%',
          border: '2px solid var(--accent-primary)',
          maxHeight: '90vh',
          overflowY: 'auto',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-header)',
            fontSize: '2.5rem',
            color: 'var(--text-primary)',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          🏆 Honor Scores
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Outstanding performances from our bowlers
        </p>

        {/* Honor Scores Table */}
        <div ref={contentRef} style={{ opacity: 0 }}>
          {honorScoresData.length > 0 ? (
            <div
              style={{
                overflowX: 'auto',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <th
                      style={{
                        padding: '15px',
                        textAlign: 'left',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '1rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        padding: '15px',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '1rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Score
                    </th>
                    <th
                      style={{
                        padding: '15px',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '1rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Type
                    </th>
                    <th
                      style={{
                        padding: '15px',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '1rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {honorScoresData.map((entry, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                      }}
                    >
                      <td
                        style={{
                          padding: '12px 15px',
                          color: 'var(--text-primary)',
                          fontSize: '0.95rem',
                        }}
                      >
                        {entry.name}
                      </td>
                      <td
                        style={{
                          padding: '12px 15px',
                          textAlign: 'center',
                          color: 'var(--accent-primary)',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                        }}
                      >
                        {entry.score}
                      </td>
                      <td
                        style={{
                          padding: '12px 15px',
                          textAlign: 'center',
                          color: 'var(--text-secondary)',
                          fontSize: '0.9rem',
                        }}
                      >
                        {entry.type}
                      </td>
                      <td
                        style={{
                          padding: '12px 15px',
                          textAlign: 'center',
                          color: 'var(--text-secondary)',
                          fontSize: '0.9rem',
                        }}
                      >
                        {entry.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                padding: '40px 20px',
              }}
            >
              No honor scores have been added yet
            </p>
          )}
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            clickEffect={true}
            glowColor="150, 51, 60"
            onClick={handleClose}
            style={{
              padding: '12px 30px',
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
            Close
          </MagicButton>
        </div>
      </div>
    </div>
  );
};

export default HonorScoresPage;
