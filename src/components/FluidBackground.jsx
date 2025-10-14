import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FluidBackground = () => {
  const blobsRef = useRef([]);

  useEffect(() => {
    // Animate each blob with continuous flowing motion
    blobsRef.current.forEach((blob, index) => {
      if (!blob) return;

      // Create a timeline for each blob with infinite repeat
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      // Random duration between 6-12 seconds for variety (faster movement)
      const duration = 6 + Math.random() * 6;
      
      // Random movement ranges
      const xMove = 100 + Math.random() * 100;
      const yMove = 100 + Math.random() * 100;
      const rotation = 180 + Math.random() * 180;
      const scale = 0.8 + Math.random() * 0.4;

      tl.to(blob, {
        x: `+=${xMove}`,
        y: `+=${yMove}`,
        rotation: rotation,
        scale: scale,
        duration: duration,
        ease: 'sine.inOut',
        force3D: true,
      })
      .to(blob, {
        x: `-=${xMove * 1.2}`,
        y: `-=${yMove * 0.8}`,
        rotation: -rotation * 0.7,
        scale: 1 + (Math.random() * 0.3),
        duration: duration * 0.8,
        ease: 'sine.inOut',
        force3D: true,
      })
      .to(blob, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: duration * 0.6,
        ease: 'sine.inOut',
        force3D: true,
      });

      // Stagger the start time for each blob
      tl.seek(index * (duration / 3));
    });
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      {/* Blob 1 - Top Left */}
      <div
        ref={(el) => (blobsRef.current[0] = el)}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle at center, var(--accent-primary) 0%, transparent 70%)',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          opacity: 0.4,
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 2 - Top Right */}
      <div
        ref={(el) => (blobsRef.current[1] = el)}
        style={{
          position: 'absolute',
          top: '5%',
          right: '-10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle at center, var(--accent-secondary) 0%, transparent 70%)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          opacity: 0.35,
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 3 - Center */}
      <div
        ref={(el) => (blobsRef.current[2] = el)}
        style={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle at center, var(--accent-primary) 0%, transparent 70%)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          opacity: 0.3,
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 4 - Bottom Left */}
      <div
        ref={(el) => (blobsRef.current[3] = el)}
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '10%',
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle at center, var(--accent-secondary) 0%, transparent 70%)',
          borderRadius: '70% 30% 50% 50% / 30% 30% 70% 70%',
          opacity: 0.38,
          filter: 'blur(65px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 5 - Bottom Right */}
      <div
        ref={(el) => (blobsRef.current[4] = el)}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle at center, var(--accent-primary) 0%, transparent 70%)',
          borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
          opacity: 0.32,
          filter: 'blur(55px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 6 - Middle Right */}
      <div
        ref={(el) => (blobsRef.current[5] = el)}
        style={{
          position: 'absolute',
          top: '50%',
          right: '15%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle at center, var(--accent-secondary) 0%, transparent 70%)',
          borderRadius: '40% 60% 50% 50% / 70% 30% 70% 30%',
          opacity: 0.28,
          filter: 'blur(45px)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default FluidBackground;
