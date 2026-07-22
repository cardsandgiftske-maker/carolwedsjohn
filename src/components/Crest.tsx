import React from 'react';
import { motion } from 'motion/react';

interface CrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function Crest({ size = 'md', animated = true }: CrestProps) {
  const sizeClasses = {
    sm: 'w-24 h-22 text-xl',
    md: 'w-40 h-36 text-3xl',
    lg: 'w-56 h-50 text-5xl',
    xl: 'w-72 h-64 text-6xl',
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const branchVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const heartVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const CrestContent = (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} select-none`} id="wedding-crest-container">
      {/* Delicate Gold/Wine Glow Effect */}
      <div className="absolute inset-x-4 inset-y-2 rounded-full bg-maroon-50/50 blur-2xl" />

      <svg
        viewBox="0 0 200 180"
        className="absolute inset-0 w-full h-full text-maroon-700"
        fill="none"
        id="wedding-crest-svg"
      >
        {/* Monogram Letters (C & J) */}
        {animated ? (
          <motion.g variants={textVariants}>
            <text
              x="62"
              y="94"
              textAnchor="middle"
              className="font-script select-none fill-current text-maroon-800"
              style={{ fontSize: '92px', fontStyle: 'normal' }}
            >
              C
            </text>
            <text
              x="100"
              y="88"
              textAnchor="middle"
              className="font-serif bold select-none fill-current text-maroon-700/80"
              style={{ fontSize: '32px' }}
            >
              &amp;
            </text>
            <text
              x="138"
              y="104"
              textAnchor="middle"
              className="font-script select-none fill-current text-maroon-800"
              style={{ fontSize: '92px', fontStyle: 'normal' }}
            >
              J
            </text>
          </motion.g>
        ) : (
          <g>
            <text
              x="62"
              y="94"
              textAnchor="middle"
              className="font-script select-none fill-current text-maroon-800"
              style={{ fontSize: '92px', fontStyle: 'normal' }}
            >
              C
            </text>
            <text
              x="100"
              y="88"
              textAnchor="middle"
              className="font-serif italic select-none fill-current text-maroon-700/80"
              style={{ fontSize: '32px' }}
            >
              &amp;
            </text>
            <text
              x="138"
              y="104"
              textAnchor="middle"
              className="font-script select-none fill-current text-maroon-800"
              style={{ fontSize: '92px', fontStyle: 'normal' }}
            >
              J
            </text>
          </g>
        )}

        {/* Symmetrical Olive Leaves Branch (smiling horizontally below the monogram) */}
        {animated ? (
          <motion.g
            variants={branchVariants}
            className="text-maroon-700"
            stroke="currentColor"
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Left Branch */}
            <path d="M 100,140 Q 65,140 35,130" strokeWidth="1.5" />
            
            {/* Left Branch Leaves */}
            <path d="M 35,130 C 27,123 17,123 11,127 C 17,135 27,135 35,130" fill="currentColor" fillOpacity="0.1" />
            <path d="M 55,137 C 47,121 37,117 31,123 C 39,131 49,135 55,137" fill="currentColor" fillOpacity="0.1" />
            <path d="M 75,140 C 67,124 57,120 51,126 C 59,134 69,138 75,140" fill="currentColor" fillOpacity="0.1" />
            <path d="M 55,137 C 47,153 37,157 31,151 C 39,143 49,139 55,137" fill="currentColor" fillOpacity="0.1" />
            <path d="M 75,140 C 67,156 57,160 51,154 C 59,146 69,142 75,140" fill="currentColor" fillOpacity="0.1" />

            {/* Right Branch (Mirrored) */}
            <g transform="translate(200, 0) scale(-1, 1)">
              <path d="M 100,140 Q 65,140 35,130" strokeWidth="1.5" />
              <path d="M 35,130 C 27,123 17,123 11,127 C 17,135 27,135 35,130" fill="currentColor" fillOpacity="0.1" />
              <path d="M 55,137 C 47,121 37,117 31,123 C 39,131 49,135 55,137" fill="currentColor" fillOpacity="0.1" />
              <path d="M 75,140 C 67,124 57,120 51,126 C 59,134 69,138 75,140" fill="currentColor" fillOpacity="0.1" />
              <path d="M 55,137 C 47,153 37,157 31,151 C 39,143 49,139 55,137" fill="currentColor" fillOpacity="0.1" />
              <path d="M 75,140 C 67,156 57,160 51,154 C 59,146 69,142 75,140" fill="currentColor" fillOpacity="0.1" />
            </g>
          </motion.g>
        ) : (
          <g
            className="text-maroon-700"
            stroke="currentColor"
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Left Branch */}
            <path d="M 100,140 Q 65,140 35,130" strokeWidth="1.5" />
            
            {/* Left Branch Leaves */}
            <path d="M 35,130 C 27,123 17,123 11,127 C 17,135 27,135 35,130" fill="currentColor" fillOpacity="0.1" />
            <path d="M 55,137 C 47,121 37,117 31,123 C 39,131 49,135 55,137" fill="currentColor" fillOpacity="0.1" />
            <path d="M 75,140 C 67,124 57,120 51,126 C 59,134 69,138 75,140" fill="currentColor" fillOpacity="0.1" />
            <path d="M 55,137 C 47,153 37,157 31,151 C 39,143 49,139 55,137" fill="currentColor" fillOpacity="0.1" />
            <path d="M 75,140 C 67,156 57,160 51,154 C 59,146 69,142 75,140" fill="currentColor" fillOpacity="0.1" />

            {/* Right Branch (Mirrored) */}
            <g transform="translate(200, 0) scale(-1, 1)">
              <path d="M 100,140 Q 65,140 35,130" strokeWidth="1.5" />
              <path d="M 35,130 C 27,123 17,123 11,127 C 17,135 27,135 35,130" fill="currentColor" fillOpacity="0.1" />
              <path d="M 55,137 C 47,121 37,117 31,123 C 39,131 49,135 55,137" fill="currentColor" fillOpacity="0.1" />
              <path d="M 75,140 C 67,124 57,120 51,126 C 59,134 69,138 75,140" fill="currentColor" fillOpacity="0.1" />
              <path d="M 55,137 C 47,153 37,157 31,151 C 39,143 49,139 55,137" fill="currentColor" fillOpacity="0.1" />
              <path d="M 75,140 C 67,156 57,160 51,154 C 59,146 69,142 75,140" fill="currentColor" fillOpacity="0.1" />
            </g>
          </g>
        )}

        {/* Symmetrical Centered Hearts (Top and Bottom) */}
        {animated ? (
          <g>
            <motion.path
              variants={heartVariants}
              d="M 100,123.5 C 97.5,120, 94.5,120, 94.5,123 C 94.5,125.5, 97.5,127.5, 100,130 C 102.5,127.5, 105.5,125.5, 105.5,123 C 105.5,120, 102.5,120, 100,123.5 Z"
              fill="currentColor"
              className="text-maroon-700"
            />
            <motion.path
              variants={heartVariants}
              d="M 100,150.5 C 97.5,147, 94.5,147, 94.5,150 C 94.5,152.5, 97.5,154.5, 100,157 C 102.5,154.5, 105.5,152.5, 105.5,150 C 105.5,147, 102.5,147, 100,150.5 Z"
              fill="currentColor"
              className="text-maroon-700"
            />
          </g>
        ) : (
          <g>
            <path
              d="M 100,123.5 C 97.5,120, 94.5,120, 94.5,123 C 94.5,125.5, 97.5,127.5, 100,130 C 102.5,127.5, 105.5,125.5, 105.5,123 C 105.5,120, 102.5,120, 100,123.5 Z"
              fill="currentColor"
              className="text-maroon-700"
            />
            <path
              d="M 100,150.5 C 97.5,147, 94.5,147, 94.5,150 C 94.5,152.5, 97.5,154.5, 100,157 C 102.5,154.5, 105.5,152.5, 105.5,150 C 105.5,147, 102.5,147, 100,150.5 Z"
              fill="currentColor"
              className="text-maroon-700"
            />
          </g>
        )}
      </svg>
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
