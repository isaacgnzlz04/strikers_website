import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-1.5 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence mode="wait">
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full block rounded-lg"
                style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 0.1,
                  scale: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.15 },
                }} />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-lg h-full w-full overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-primary)] relative z-20 transition-colors duration-200",
        className
      )}
      style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="relative z-50">
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h4 
      className={cn("font-semibold tracking-wide", className)}
      style={{ 
        color: 'var(--text-primary)',
        fontSize: '1rem',
        fontFamily: 'var(--font-body)',
        marginBottom: '0.25rem'
      }}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p
      className={cn("tracking-wide text-sm", className)}
      style={{
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        fontFamily: 'var(--font-body)',
        marginTop: 0
      }}>
      {children}
    </p>
  );
};
