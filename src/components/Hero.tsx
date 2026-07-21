import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, MapPin, Clock } from 'lucide-react';
import { WEDDING_DATE, WEDDING_DETAILS } from '../data';
import Crest from './Crest';
import heroImage from "../assets/images/carol_and_john_portrait_1784461506194.jpg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FCFAF7] text-stone-850 py-16" id="hero-section">
      {/* Background Image with Warm Paper Vignette/Overlay */}
      <div className="absolute inset-0 z-0">
        <img
  src={heroImage}
  alt="Carol and John Wedding Portrait"
  className="w-full h-full object-cover object-center opacity-[0.22] scale-105 filter brightness-[1.03] contrast-[0.98]"
/>
        {/* Elegant warm radial and vertical gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7] via-[#FCFAF7]/85 to-[#FCFAF7]/50" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FCFAF7]/40 to-[#FCFAF7]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        {/* Elegant Crest at the top of the hero */}
        <div className="mb-6">
          <Crest size="md" animated={true} />
        </div>

        {/* Together with our Families we */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-emerald-700 font-sans tracking-widest text-xs uppercase mb-1 font-semibold"
        >
          Together with our Families
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-stone-500 italic font-serif text-sm md:text-base mb-4"
        >
          we
        </motion.div>

        {/* Main Title: Carole & John */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight text-stone-900 mb-5"
        >
          <span className="block mb-2 md:inline md:mb-0 text-maroon-700">Carole</span>
          <span className="font-display font-light text-stone-400 mx-4 text-4xl md:text-6xl italic">&amp;</span>
          <span className="block mt-2 md:inline md:mt-0 text-maroon-700">John</span>
        </motion.h1>

        {/* Request the honour of your presence... */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-stone-700 font-serif tracking-wide text-xs sm:text-sm md:text-base mb-10 max-w-2xl mx-auto leading-relaxed italic"
        >
          request the honour of your presence as we celebrate the Sacrament of Holy Matrimony
        </motion.p>

        {/* Biblical Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="max-w-md mx-auto mb-10 text-stone-600 italic font-serif text-sm md:text-base border-y border-stone-200/80 py-3.5"
        >
          <p className="mb-1">“I have found the one whom my soul loves.”</p>
          <p className="text-emerald-700/80 text-xs tracking-wider uppercase font-sans font-medium not-italic">Song of Solomon 3:4</p>
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col items-center mb-12"
        >
          <h3 className="text-[10px] text-stone-500 uppercase tracking-widest font-sans font-bold mb-4">Countdown to our Big Day</h3>
          
          <div className="flex gap-3 md:gap-4 text-center">
            {/* Days block */}
            <div className="flex flex-col bg-white border border-stone-200/60 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-sm">
              <span className="text-2xl md:text-4xl font-serif font-light text-emerald-700">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Days</span>
            </div>

            {/* Hours block */}
            <div className="flex flex-col bg-white border border-stone-200/60 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-sm">
              <span className="text-2xl md:text-4xl font-serif font-light text-emerald-700">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Hours</span>
            </div>

            {/* Minutes block */}
            <div className="flex flex-col bg-white border border-stone-200/60 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-sm">
              <span className="text-2xl md:text-4xl font-serif font-light text-emerald-700">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Mins</span>
            </div>

            {/* Seconds block */}
            <div className="flex flex-col bg-white border border-stone-200/60 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-sm">
              <span className="text-2xl md:text-4xl font-serif font-light text-emerald-700">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Secs</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Floating Sparkle Effect or Delicate Dust Particle Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FCFAF7] to-transparent pointer-events-none" />
    </section>
  );
}
