import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSealed, setIsSealed] = useState(true);

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);
    
    if (onSealBreak) {
      onSealBreak();
    }
    
    // Stagger the opening of the envelope flaps after the seal breaks
    setTimeout(() => {
      setIsOpened(true);
    }, 800);

    // Call parent onOpen after envelope slides/fades away
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: 'blur(8px)',
        transition: { duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-black p-4 md:p-6"
    >
      {/* Ambient background flora/glow simulation */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-maroon-700/30 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-600/25 blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />
      </div>

      {/* Main interactive container: simulating the hand-held phone or premium card view */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ 
          opacity: 0, 
          scale: 1.15, 
          y: -30, 
          transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] } 
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[430px] aspect-[9/16] max-h-[90vh] bg-stone-950/40 backdrop-blur-sm rounded-[40px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-stone-800/60 flex items-center justify-center overflow-hidden"
      >
        {/* Phone screen boundary or card viewport */}
        <div className="relative w-full h-full bg-[#EFECE5] rounded-[32px] overflow-hidden shadow-inner flex flex-col justify-between">
          
          {/* Top header on the phone style invitation screen */}
          <div className="w-full text-center pt-8 px-6 z-10">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-extrabold text-stone-500/80">
              Wedding Invitation
            </span>
            <h1 className="font-serif text-xl tracking-[0.1em] text-maroon-900 mt-2">
              CAROL &amp; JOHN
            </h1>
          </div>

          {/* Central Envelope Area */}
          <div className="relative flex-1 w-full flex items-center justify-center px-4">
            
            {/* The Envelope Base */}
            <div className="relative w-full aspect-[4/3] bg-[#EAE5DA] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#DFD9CE] overflow-hidden flex items-center justify-center">
              
              {/* Backing Inner Lining (Burgundy with subtle gold sparkles, seen as flap unfolds) */}
              <div className="absolute inset-0 bg-maroon-950 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full border border-maroon-800/60 flex items-center justify-center opacity-30">
                  <span className="font-serif text-stone-100 text-sm tracking-widest">C&amp;J</span>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60" />
              </div>

              {/* Envelope Flaps Wrapper */}
              <div className="absolute inset-0 overflow-hidden">
                
                {/* 1. Left Flap (Cream with subtle floral embossing) */}
                <motion.svg 
                  animate={isOpened ? { x: '-100%', opacity: 0 } : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[4px_0_6px_rgba(0,0,0,0.06)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0 L200 150 L0 300 Z" fill="#E8E3D7" />
                  <path d="M0 0 L200 150 L0 300" stroke="#DFD9CE" strokeWidth="1" />
                  
                  {/* Delicate embossed floral pattern lines */}
                  <path d="M15 35 C 30 50, 45 45, 50 60 C 55 75, 40 90, 60 105" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M10 210 C 25 195, 40 200, 45 185 C 50 170, 35 155, 55 140" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <circle cx="50" cy="60" r="1.5" fill="#F4F1EA" opacity="0.6" />
                  <circle cx="45" cy="185" r="1.5" fill="#F4F1EA" opacity="0.6" />
                </motion.svg>

                {/* 2. Right Flap (Cream with subtle floral embossing) */}
                <motion.svg 
                  animate={isOpened ? { x: '100%', opacity: 0 } : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[-4px_0_6px_rgba(0,0,0,0.06)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M400 0 L200 150 L400 300 Z" fill="#E8E3D7" />
                  <path d="M400 0 L200 150 L400 300" stroke="#DFD9CE" strokeWidth="1" />
                  
                  {/* Delicate embossed floral pattern lines */}
                  <path d="M385 35 C 370 50, 355 45, 350 60 C 345 75, 360 90, 340 105" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M390 210 C 375 195, 360 200, 355 185 C 350 170, 365 155, 345 140" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <circle cx="350" cy="60" r="1.5" fill="#F4F1EA" opacity="0.6" />
                  <circle cx="355" cy="185" r="1.5" fill="#F4F1EA" opacity="0.6" />
                </motion.svg>

                {/* 3. Bottom Flap */}
                <motion.svg 
                  animate={isOpened ? { y: '100%', opacity: 0 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_-5px_8px_rgba(0,0,0,0.05)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 300 L200 150 L400 300 Z" fill="#E5DEC2" opacity="0.9" />
                  <path d="M0 300 L200 150 L400 300" stroke="#DFD9CE" strokeWidth="1" />
                  
                  {/* Elegant decorative center leaf stem on bottom flap */}
                  <path d="M200 280 L200 210" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.7" />
                  <path d="M190 240 C 195 235, 198 235, 200 240" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <path d="M210 240 C 205 235, 202 235, 200 240" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <path d="M185 260 C 192 255, 195 255, 200 260" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <path d="M215 260 C 208 255, 205 255, 200 260" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                </motion.svg>

                {/* 4. Top Flap (Folds upwards) */}
                <motion.svg 
                  animate={isOpened ? { 
                    rotateX: 180, 
                    transformOrigin: 'top',
                    y: '-10%',
                    opacity: 0,
                    zIndex: 0
                  } : { 
                    rotateX: 0,
                    transformOrigin: 'top',
                    y: 0,
                    opacity: 1,
                    zIndex: 20
                  }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0 L200 150 L400 0 Z" fill="#EAE5DB" />
                  <path d="M0 0 L200 150 L400 0" stroke="#DFD9CE" strokeWidth="1" />
                  
                  {/* Subtle leafy ornaments on the top flap to replicate the photo */}
                  <path d="M140 30 C 170 60, 230 60, 260 30" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M160 45 C 180 55, 220 55, 240 45" stroke="#F4F1EA" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                  <circle cx="200" cy="55" r="2" fill="#F4F1EA" opacity="0.6" />
                </motion.svg>

              </div>

              {/* 5. Elegant Wax Seal Overlay with CJ Monogram */}
              <AnimatePresence>
                {isSealed && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ 
                      scale: 1.6, 
                      opacity: 0,
                      rotate: 15,
                      filter: 'blur(4px)'
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 150,
                      damping: 15,
                      exit: { duration: 0.7, ease: 'easeIn' }
                    }}
                    onClick={handleOpen}
                    className="absolute z-30 cursor-pointer select-none group"
                    style={{ transformPerspective: 1000 }}
                  >
                    {/* Pulsing Backlight Halo Glow behind the wax seal, matching the uploaded photo */}
                    <div className="absolute -inset-6 rounded-full bg-maroon-600/35 blur-xl group-hover:bg-maroon-500/45 transition-all duration-300 animate-pulse" style={{ animationDuration: '3s' }} />

                    {/* Realistic 3D Wax Seal Body */}
                    <div className="relative w-28 h-28 rounded-full flex items-center justify-center p-1 bg-gradient-to-br from-maroon-600 via-maroon-800 to-maroon-950 shadow-[0_10px_25px_rgba(114,47,55,0.45),_inset_0_3px_5px_rgba(255,255,255,0.2),_inset_0_-4px_8px_rgba(0,0,0,0.6)] border border-maroon-900/60 transition-transform duration-300 active:scale-95 group-hover:scale-105">
                      
                      {/* Organic wavy/dripping edge border layer for realism */}
                      <div className="absolute -inset-1.5 rounded-full border-[3px] border-maroon-850/30 opacity-80" />
                      
                      {/* Inner Circular Well of the wax seal */}
                      <div className="w-22 h-22 rounded-full bg-gradient-to-tl from-maroon-900 to-maroon-700 flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),_0_2px_2px_rgba(255,255,255,0.1)] border border-maroon-950/40 relative overflow-hidden">
                        
                        {/* Gold monograms/crest details inside the wax seal */}
                        <div className="flex flex-col items-center justify-center text-center select-none pointer-events-none">
                          {/* Fine luxury gold circular border line */}
                          <div className="absolute inset-2.5 rounded-full border border-amber-300/25" />
                          
                          {/* Elegant, stylized gold monogram lettering C J */}
                          <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                            <defs>
                              <linearGradient id="gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFF1D6" />
                                <stop offset="35%" stopColor="#DFAC6C" />
                                <stop offset="70%" stopColor="#C68B45" />
                                <stop offset="100%" stopColor="#8E5B23" />
                              </linearGradient>
                              <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="1" dy="2" stdDeviation="1.2" floodColor="#000" floodOpacity="0.5" />
                              </filter>
                            </defs>
                            
                            {/* Handcrafted Serif Calligraphy monogram CJ */}
                            <g filter="url(#subtle-shadow)">
                              {/* Letter C */}
                              <text 
                                x="34" 
                                y="58" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="36" 
                                fontWeight="light"
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                textAnchor="middle"
                              >
                                C
                              </text>
                              {/* Intertwining ampersand symbol, very subtle & light */}
                              <text 
                                x="49" 
                                y="54" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="18" 
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                opacity="0.75"
                                textAnchor="middle"
                              >
                                &amp;
                              </text>
                              {/* Letter J */}
                              <text 
                                x="64" 
                                y="66" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="36" 
                                fontWeight="light"
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                textAnchor="middle"
                              >
                                J
                              </text>
                            </g>
                          </svg>
                        </div>
                        
                        {/* Realistic glass-like highlight reflect overlay */}
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent -rotate-12 transform origin-top-left scale-150 pointer-events-none" />
                      </div>
                    </div>

                    {/* Interactive feedback indicator: subtle pulsing call-to-action text */}
                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                      <p className="font-serif italic text-xs tracking-wide text-amber-100/90 drop-shadow flex items-center justify-center gap-1.5 animate-bounce" style={{ animationDuration: '2.5s' }}>
                        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>Tap Seal to Open</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Bottom Footer Details */}
          <div className="w-full text-center pb-10 px-6 z-10 flex flex-col items-center gap-2">
            <p className="text-[10px] tracking-wider uppercase font-sans font-bold text-stone-500">
              Saturday, September 26, 2026
            </p>
            <p className="text-[9px] uppercase font-sans font-bold text-maroon-700/60 tracking-widest">
              Nairobi, Kenya
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
