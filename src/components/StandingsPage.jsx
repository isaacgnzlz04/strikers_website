import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagicButton from './MagicButton';
import { leagueService } from '../services/leagueService';
import './StandingsPage.css';

const StandingsPage = ({ onClose }) => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [hasPDF, setHasPDF] = useState(false);
  const [pdfFileName, setPdfFileName] = useState(null);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef([]);
  const contentRef = useRef(null);
  const iframeRef = useRef(null);

  // Download PDF function
  const downloadPDF = async () => {
    if (!selectedWeek) return;
    
    const pdfRecord = await leagueService.getPDF(selectedLeague, selectedWeek);
    if (!pdfRecord || !pdfRecord.pdfData) return;

    try {
      // Open the PDF URL directly for download
      const link = document.createElement('a');
      link.href = pdfRecord.pdfData;
      link.download = pdfFileName || `${selectedLeague}-${selectedWeek}-standings.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading PDF. Please try again.');
    }
  };

  // View PDF in new window
  const viewPDF = async () => {
    if (!selectedWeek) return;
    
    const pdfRecord = await leagueService.getPDF(selectedLeague, selectedWeek);
    if (!pdfRecord || !pdfRecord.pdfData) return;

    try {
      // Open PDF URL in new window
      window.open(pdfRecord.pdfData, '_blank');
    } catch (error) {
      console.error('View error:', error);
      alert('Error opening PDF. Please try downloading instead.');
    }
  };

  useEffect(() => {
    // Load leagues on mount
    const loadLeagues = async () => {
      const allLeagues = await leagueService.getAllLeagues(true); // Get only active leagues
      setLeagues(allLeagues);
      
      // Auto-select first league
      if (allLeagues.length > 0 && !selectedLeague) {
        setSelectedLeague(allLeagues[0].name);
      }
    };
    loadLeagues();

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

    // Content fade in
    if (contentRef.current) {
      tl.fromTo(contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Update when league changes
  useEffect(() => {
    if (!selectedLeague) return;
    
    const loadWeeks = async () => {
      const weeks = await leagueService.getWeeksForLeague(selectedLeague);
      setAvailableWeeks(weeks);
      
      // Auto-select first week or most recent
      if (weeks.length > 0) {
        const mostRecent = weeks[weeks.length - 1];
        setSelectedWeek(mostRecent.weekNumber);
      } else {
        setSelectedWeek(null);
        setHasPDF(false);
        setPdfFileName(null);
      }
    };
    loadWeeks();

    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [selectedLeague]);

  // Update PDF info when week changes
  useEffect(() => {
    const checkPDF = async () => {
      if (selectedWeek) {
        const pdfRecord = await leagueService.getPDF(selectedLeague, selectedWeek);
        const weekData = availableWeeks.find(w => w.weekNumber === selectedWeek);
        setHasPDF(!!pdfRecord);
        setPdfFileName(weekData?.fileName || null);
      } else {
        setHasPDF(false);
        setPdfFileName(null);
      }
    };
    checkPDF();
  }, [selectedWeek, selectedLeague, availableWeeks]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    });

    // Reverse the entrance animation
    tl.to(contentRef.current, {
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
              key={league.name}
              ref={(el) => buttonsRef.current[index] = el}
              style={{ display: 'inline-block' }}
            >
              <MagicButton
                effectType="borderGlow"
                enableSpotlight={selectedLeague === league.name}
                enableMagnetism={true}
                clickEffect={true}
                glowColor={selectedLeague === league.name ? "150, 51, 60" : "78, 152, 213"}
                spotlightRadius={100}
                className="league-selector-button"
                style={{
                  padding: '10px 20px',
                  borderRadius: '25px',
                  border: selectedLeague === league.name ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
                  backgroundColor: selectedLeague === league.name ? 'var(--accent-primary)' : 'transparent',
                  color: selectedLeague === league.name ? '#ffffff' : 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                onClick={() => setSelectedLeague(league.name)}
              >
                {league.name}
              </MagicButton>
            </div>
          ))}
        </div>

        {/* Week Selector */}
        {availableWeeks.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginRight: '10px'
            }}>
              Select Week:
            </span>
            {availableWeeks.map((weekData) => (
              <button
                key={weekData.week}
                onClick={() => setSelectedWeek(weekData.week)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedWeek === weekData.week ? '2px solid var(--accent-secondary)' : '2px solid var(--border-color)',
                  backgroundColor: selectedWeek === weekData.week ? 'var(--accent-secondary)' : 'transparent',
                  color: selectedWeek === weekData.week ? '#ffffff' : 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedWeek !== weekData.week) {
                    e.currentTarget.style.borderColor = 'var(--accent-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedWeek !== weekData.week) {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }
                }}
              >
                {weekData.week}
              </button>
            ))}
          </div>
        )}

        {/* PDF Actions */}
        <div ref={contentRef}>
          {hasPDF ? (
            <div style={{ 
              width: '100%', 
              padding: '60px 40px',
              border: '2px solid var(--border-color)',
              borderRadius: '15px',
              backgroundColor: 'var(--bg-secondary)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '30px' }}>📄</div>
              <h3 style={{
                fontFamily: 'var(--font-header)',
                fontSize: '1.8rem',
                color: 'var(--text-primary)',
                marginBottom: '15px'
              }}>
                {selectedLeague} - {selectedWeek || 'Standings'}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                marginBottom: '40px'
              }}>
                {pdfFileName || 'standings.pdf'}
              </p>
              
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <MagicButton
                  effectType="borderGlow"
                  enableSpotlight={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  glowColor="78, 152, 213"
                  spotlightRadius={120}
                  onClick={viewPDF}
                  style={{
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    backgroundColor: 'var(--accent-secondary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '30px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>👁️</span>
                  View PDF
                </MagicButton>
                
                <MagicButton
                  effectType="borderGlow"
                  enableSpotlight={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  glowColor="150, 51, 60"
                  spotlightRadius={120}
                  onClick={downloadPDF}
                  style={{
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '30px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>📥</span>
                  Download PDF
                </MagicButton>
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '15px',
                border: '2px dashed var(--border-color)',
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.5 }}>📄</div>
              <p style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                No standings available for {selectedLeague} yet.
              </p>
              <p style={{ fontSize: '1rem' }}>
                Check back soon!
              </p>
            </div>
          )}
        </div>

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
