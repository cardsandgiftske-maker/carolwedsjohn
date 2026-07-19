import React from 'react';
import { motion } from 'motion/react';

interface CrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function Crest({ size = 'md', animated = true }: CrestProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-xl',
    md: 'w-24 h-24 text-3xl',
    lg: 'w-36 h-36 text-5xl',
    xl: 'w-48 h-48 text-6xl',
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  const leafVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.08,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const CrestContent = (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} select-none`} id="wedding-crest-container">
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-emerald-50/50 blur-xl" />

      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full text-emerald-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        id="wedding-crest-svg"
      >
        {/* Elegant Inner Circular Frame */}
        {animated ? (
          <motion.circle
            cx="100"
            cy="100"
            r="82"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            variants={circleVariants}
          />
        ) : (
          <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        )}

        {/* Elegant Outer Circular Frame */}
        {animated ? (
          <motion.circle
            cx="100"
            cy="100"
            r="88"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={circleVariants}
          />
        ) : (
          <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1.5" />
        )}

        {/* Wreath / Olive Branches Left */}
        <g id="crest-branch-left">
          {[
            { cx: 45, cy: 75, r: 4, rot: -30, i: 1 },
            { cx: 35, cy: 95, r: 5, rot: -15, i: 2 },
            { cx: 38, cy: 118, r: 5, rot: 5, i: 3 },
            { cx: 48, cy: 138, r: 4.5, rot: 25, i: 4 },
            { cx: 64, cy: 154, r: 4, rot: 45, i: 5 },
            { cx: 83, cy: 165, r: 3.5, rot: 65, i: 6 },
          ].map((leaf, index) => (
            <React.Fragment key={`left-leaf-${index}`}>
              {animated ? (
                <motion.path
                  d={`M ${leaf.cx} ${leaf.cy} C ${leaf.cx - 8} ${leaf.cy - leaf.r}, ${leaf.cx - 4} ${leaf.cy - leaf.r * 2}, ${leaf.cx} ${leaf.cy - leaf.r * 2.5} C ${leaf.cx + 4} ${leaf.cy - leaf.r * 2}, ${leaf.cx + 8} ${leaf.cy - leaf.r}, ${leaf.cx} ${leaf.cy}`}
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ transformOrigin: `${leaf.cx}px ${leaf.cy}px`, rotate: `${leaf.rot}deg` }}
                  custom={leaf.i}
                  variants={leafVariants}
                />
              ) : (
                <path
                  d={`M ${leaf.cx} ${leaf.cy} C ${leaf.cx - 8} ${leaf.cy - leaf.r}, ${leaf.cx - 4} ${leaf.cy - leaf.r * 2}, ${leaf.cx} ${leaf.cy - leaf.r * 2.5} C ${leaf.cx + 4} ${leaf.cy - leaf.r * 2}, ${leaf.cx + 8} ${leaf.cy - leaf.r}, ${leaf.cx} ${leaf.cy}`}
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ transformOrigin: `${leaf.cx}px ${leaf.cy}px`, transform: `rotate(${leaf.rot}deg)` }}
                />
              )}
            </React.Fragment>
          ))}
        </g>

        {/* Wreath / Olive Branches Right */}
        <g id="crest-branch-right">
          {[
            { cx: 155, cy: 75, r: 4, rot: 30, i: 1 },
            { cx: 165, cy: 95, r: 5, rot: 15, i: 2 },
            { cx: 162, cy: 118, r: 5, rot: -5, i: 3 },
            { cx: 152, cy: 138, r: 4.5, rot: -25, i: 4 },
            { cx: 136, cy: 154, r: 4, rot: -45, i: 5 },
            { cx: 117, cy: 165, r: 3.5, rot: -65, i: 6 },
          ].map((leaf, index) => (
            <React.Fragment key={`right-leaf-${index}`}>
              {animated ? (
                <motion.path
                  d={`M ${leaf.cx} ${leaf.cy} C ${leaf.cx - 8} ${leaf.cy - leaf.r}, ${leaf.cx - 4} ${leaf.cy - leaf.r * 2}, ${leaf.cx} ${leaf.cy - leaf.r * 2.5} C ${leaf.cx + 4} ${leaf.cy - leaf.r * 2}, ${leaf.cx + 8} ${leaf.cy - leaf.r}, ${leaf.cx} ${leaf.cy}`}
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ transformOrigin: `${leaf.cx}px ${leaf.cy}px`, rotate: `${leaf.rot}deg` }}
                  custom={leaf.i}
                  variants={leafVariants}
                />
              ) : (
                <path
                  d={`M ${leaf.cx} ${leaf.cy} C ${leaf.cx - 8} ${leaf.cy - leaf.r}, ${leaf.cx - 4} ${leaf.cy - leaf.r * 2}, ${leaf.cx} ${leaf.cy - leaf.r * 2.5} C ${leaf.cx + 4} ${leaf.cy - leaf.r * 2}, ${leaf.cx + 8} ${leaf.cy - leaf.r}, ${leaf.cx} ${leaf.cy}`}
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ transformOrigin: `${leaf.cx}px ${leaf.cy}px`, transform: `rotate(${leaf.rot}deg)` }}
                />
              )}
            </React.Fragment>
          ))}
        </g>

        {/* Small Heart Accent at Bottom */}
        {animated ? (
          <motion.path
            d="M 100 178 C 98 174, 91 174, 91 169 C 91 166, 94 163, 97 163 C 99 163, 100 165, 100 165 C 100 165, 101 163, 103 163 C 106 163, 109 166, 109 169 C 109 174, 102 174, 100 178 Z"
            fill="currentColor"
            variants={textVariants}
          />
        ) : (
          <path
            d="M 100 178 C 98 174, 91 174, 91 169 C 91 166, 94 163, 97 163 C 99 163, 100 165, 100 165 C 100 165, 101 163, 103 163 C 106 163, 109 166, 109 169 C 109 174, 102 174, 100 178 Z"
            fill="currentColor"
          />
        )}
      </svg>

      {/* Monogram Text inside Wreath */}
      <div className="absolute inset-0 flex items-center justify-center flex-col pt-1" id="crest-monogram-text">
        {animated ? (
          <motion.div
            variants={textVariants}
            className="font-display font-light flex items-center justify-center tracking-tighter"
          >
            <span className="text-maroon-700">C</span>
            <span className="text-stone-400 mx-1 font-display text-[0.6em] font-normal">&amp;</span>
            <span className="text-emerald-700">J</span>
          </motion.div>
        ) : (
          <div className="font-display font-light flex items-center justify-center tracking-tighter">
            <span className="text-maroon-700">C</span>
            <span className="text-stone-400 mx-1 font-display text-[0.6em] font-normal">&amp;</span>
            <span className="text-emerald-700">J</span>
          </div>
        )}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className="flex items-center justify-center"
      >
        {CrestContent}
      </motion.div>
    );
  }

  return CrestContent;
}
