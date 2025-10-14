import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  children,
  className = '',
  containerHeight = 'auto',
  containerWidth = '100%',
  scaleOnHover = 1.02,
  rotateAmplitude = 8,
  showMobileWarning = false,
  style = {}
}) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const shadowIntensity = useSpring(0, springValues);

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    shadowIntensity.set(1);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    shadowIntensity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative h-full [perspective:800px] ${className}`}
      style={{
        height: containerHeight,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale,
        filter: shadowIntensity.get() > 0 
          ? `drop-shadow(0 ${20 * shadowIntensity.get()}px ${40 * shadowIntensity.get()}px rgba(0, 0, 0, 0.3))`
          : 'none',
        ...style
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}
      {children}
    </motion.div>
  );
}
