import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LeagueSignupModal = ({ isOpen, onClose, leagueName = '' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const modalContentRef = useRef(null);
  const backdropRef = useRef(null);
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

  // Animation effect when modal opens
  useEffect(() => {
    if (isOpen && modalContentRef.current && backdropRef.current) {
      // Animate backdrop fade in
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      // Animate modal content with scale and slide
      gsap.fromTo(
        modalContentRef.current,
        { 
          opacity: 0, 
          scale: 0.8,
          y: -50,
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 0.5, 
          ease: 'back.out(1.7)',
          delay: 0.1,
        }
      );
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('League signup submitted:', formData);
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
      onClick={onClose}
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
          onClick={onClose}
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
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            e.currentTarget.style.color = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          ×
        </button>

        {/* Modal Content */}
        <div style={{ padding: isMobile ? '40px 20px 30px' : '50px 40px 40px' }}>
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
                <option value="Monday Night Open">Monday Night Open</option>
                <option value="Tuesday Night Ladies">Tuesday Night Ladies</option>
                <option value="Wednesday Night Mixed">Wednesday Night Mixed</option>
                <option value="Church League">Church League</option>
                <option value="Youth">Youth</option>
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
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'white',
                backgroundColor: 'var(--accent-primary)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(150, 51, 60, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(150, 51, 60, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(150, 51, 60, 0.3)';
              }}
            >
              Sign Up for League
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeagueSignupModal;
