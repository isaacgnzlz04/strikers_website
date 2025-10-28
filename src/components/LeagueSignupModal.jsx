import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getAllLeagues } from '../utils/standingsDB';
import MagicButton from './MagicButton';
import { useLeagueSignup } from '../hooks/useLeagueSignup';

const LeagueSignupModal = ({ isOpen, onClose, leagueName = '' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [leagues, setLeagues] = useState([]);
  const modalContentRef = useRef(null);
  const backdropRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const closeBtnRef = useRef(null);
  const openTlRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    league: leagueName,
    usbcMembership: '',
    average: '',
    teamName: '',
    additionalInfo: '',
  });

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
      const allLeagues = await getAllLeagues();
      const activeLeagues = allLeagues.filter(l => l.active);
      setLeagues(activeLeagues);
    };
    loadLeagues();
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Animation effect when modal opens - use timeline for consistent enter/exit behavior
  useEffect(() => {
    if (!isOpen) return;

    const tl = gsap.timeline();
    openTlRef.current = tl;

    // Fade in backdrop
    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Modal entrance - scale and slide
    tl.fromTo(
      modalContentRef.current,
      { scale: 0.8, opacity: 0, y: -50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.15'
    );

    // Title slide in
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.25'
      );
    }

    // Content fade in
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
      openTlRef.current = null;
    };
  }, [isOpen]);

  // Update league when prop changes
  useEffect(() => {
    if (leagueName) {
      setFormData(prev => ({ ...prev, league: leagueName }));
    }
  }, [leagueName]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { signupForLeague, loading, error } = useLeagueSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signupForLeague({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        league: formData.league,
        teamName: formData.teamName,
        average: formData.average,
        usbcMembership: formData.usbcMembership,
        additionalInfo: formData.additionalInfo,
      });
      
      alert(`Thank you for signing up for ${formData.league}! We will contact you shortly with league details and registration information.`);
      setFormData({
        name: '',
        email: '',
        phone: '',
        league: '',
        usbcMembership: '',
        average: '',
        teamName: '',
        additionalInfo: '',
      });
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to submit league signup. Please try again.');
    }
  };

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });

    // Fade out content
    if (contentRef.current) {
      tl.to(contentRef.current, { y: 20, opacity: 0, duration: 0.18, ease: 'power2.in' });
    }

    // Title out
    if (titleRef.current) {
      tl.to(titleRef.current, { y: -20, opacity: 0, duration: 0.18, ease: 'power2.in' }, '-=0.12');
    }

    // Modal scale down
    tl.to(modalContentRef.current, { scale: 0.8, opacity: 0, y: -30, duration: 0.28, ease: 'back.in(1.7)' }, '-=0.12');

    // Fade out backdrop
    tl.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.18');
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: isMobile ? '20px' : '40px',
        overflow: 'auto',
      }}
        onClick={handleClose}
    >
      <div
        ref={modalContentRef}
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '20px',
          border: '2px solid var(--border-color)',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            zIndex: 10,
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

        {/* Modal Content */}
        <div ref={contentRef} style={{ padding: isMobile ? '40px 20px 30px' : '50px 40px 40px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎳</div>
            <h2
              style={{
                fontFamily: 'var(--font-header)',
                fontSize: isMobile ? '2rem' : '2.5rem',
                color: 'var(--accent-primary)',
                marginBottom: '10px',
              }}
              ref={titleRef}
            >
              Join a League
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                fontSize: '1rem',
              }}
            >
              Sign up for one of our exciting bowling leagues!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div style={{ marginBottom: '25px' }}>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '20px',
                marginBottom: '25px',
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>
            </div>

            {/* League Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label
                htmlFor="league"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                League *
              </label>
              <select
                id="league"
                name="league"
                required
                value={formData.league}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  cursor: 'pointer',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              >
                <option value="">Select a league</option>
                {leagues.map(league => (
                  <option key={league.name} value={league.name}>
                    {league.name} - {league.day}s at {league.time}
                  </option>
                ))}
              </select>
            </div>

            {/* USBC Membership and Average */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '20px',
                marginBottom: '25px',
              }}
            >
              <div>
                <label
                  htmlFor="usbcMembership"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  USBC Membership #
                </label>
                <input
                  type="text"
                  id="usbcMembership"
                  name="usbcMembership"
                  placeholder="e.g., 123-456789"
                  value={formData.usbcMembership}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              <div>
                <label
                  htmlFor="average"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  Bowling Average
                </label>
                <input
                  type="number"
                  id="average"
                  name="average"
                  placeholder="e.g., 150"
                  value={formData.average}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>
            </div>

            {/* Team Name */}
            <div style={{ marginBottom: '25px' }}>
              <label
                htmlFor="teamName"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Team Name (if applicable)
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                placeholder="Enter your team name"
                value={formData.teamName}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            {/* Additional Information */}
            <div style={{ marginBottom: '30px' }}>
              <label
                htmlFor="additionalInfo"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows="4"
                placeholder="Any questions or special requests?"
                value={formData.additionalInfo}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            {/* Submit Button */}
            <MagicButton
              type="submit"
              disabled={loading}
              enableSpotlight={!loading}
              enableBorderGlow={!loading}
              enableTilt={!loading}
              clickEffect={!loading}
              spotlightRadius={220}
              glowColor="150, 51, 60"
              style={{
                width: '100%',
                padding: '14px',
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                fontWeight: '700',
                color: 'white',
                backgroundColor: loading ? '#999' : 'var(--accent-primary)',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 6px 20px rgba(150, 51, 60, 0.35)',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Submitting...' : 'Sign Up for League'}
            </MagicButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeagueSignupModal;
