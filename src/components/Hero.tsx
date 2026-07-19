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

        {/* Sub-header text */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-emerald-700 font-sans tracking-widest text-xs uppercase mb-3 font-semibold"
        >
          The Sacrament of Holy Matrimony
        </motion.p>

        {/* Main Title: Carol & John */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight text-stone-900 mb-4"
        >
          <span className="block mb-2 md:inline md:mb-0 text-maroon-700">Carol</span>
          <span className="font-display font-light text-stone-400 mx-4 text-4xl md:text-6xl italic">&amp;</span>
          <span className="block mt-2 md:inline md:mt-0 text-emerald-700">John</span>
        </motion.h1>

        {/* Biblical Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 12, delay: 1 }}
          className="max-w-md mx-auto mb-10 text-stone-600 italic font-serif text-sm md:text-base border-y border-stone-200/80 py-3"
        >
          <p className="mb-1">“I have found the one whom my soul loves.”</p>
          <p className="text-emerald-700/80 text-xs tracking-wider uppercase font-sans font-medium not-italic">Song of Solomon 3:4</p>
        </motion.div>

        {/* Date, Location, Time Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full bg-white/80 border border-stone-200/60 p-6 rounded-2xl mb-12 shadow-md"
        >
          {/* Calendar Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">The Date</p>
            <p className="text-sm text-stone-800 font-serif font-medium">Saturday</p>
            <p className="text-base text-emerald-700 font-serif font-semibold">August 22, 2026</p>
          </div>

          {/* Time Card */}
          <div className="flex flex-col items-center text-center p-3 border-y sm:border-y-0 sm:border-x border-stone-150">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">The Time</p>
            <p className="text-sm text-stone-800 font-serif font-medium">10:00 a.m. Prompt</p>
            <p className="text-xs text-emerald-700/80 font-sans mt-1 font-medium">Nuptial Mass</p>
          </div>

          {/* Venue Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold mb-1">The Venue</p>
            <p className="text-sm text-stone-800 font-serif font-medium leading-tight">{WEDDING_DETAILS.ceremony.venue}</p>
            <p className="text-xs text-emerald-700/80 font-sans mt-1 font-medium">Katani, Kenya</p>
          </div>
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <h3 className="text-xs text-stone-600 uppercase tracking-widest font-sans font-bold mb-4">Countdown to our Big Day</h3>
          
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
