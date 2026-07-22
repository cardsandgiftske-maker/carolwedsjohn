import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, User, Phone, Check, Clipboard, QrCode, Download, Share2, CloudLightning } from 'lucide-react';
import { RsvpGuest } from '../types';
import { WEDDING_DETAILS } from '../data';
import { saveRsvp, isFirebaseConfigured } from '../lib/firebase';

export default function RsvpForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [adultsCount, setAdultsCount] = useState(1);
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submittedGuest, setSubmittedGuest] = useState<RsvpGuest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Floating button state
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        // If RSVP section is visible on screen, hide floating button to avoid redundancy
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowFloatingBtn(false);
        } else {
          setShowFloatingBtn(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateInvitationCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'CJ-26-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    setLoading(true);

    try {
      const newGuest: RsvpGuest = {
        id: 'rsvp-' + Date.now(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        willAttend,
        adultsCount: willAttend === 'yes' ? adultsCount : 0,
        submittedAt: new Date().toISOString(),
        eCardCode: generateInvitationCode(),
        notes: notes.trim() || undefined,
      };

      // Save to Firebase (with transparent localStorage fallback inside)
      await saveRsvp(newGuest);

      setSubmittedGuest(newGuest);
      setLoading(false);

      // Reset fields
      setFullName('');
      setPhoneNumber('');
      setWillAttend('yes');
      setAdultsCount(1);
      setNotes('');

      // Dispatches custom event to notify Admin Panel to reload
      window.dispatchEvent(new Event('rsvp_database_updated'));
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const scrollToRsvp = () => {
    const element = document.getElementById('rsvp-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative py-24 bg-[#FAF7F2] text-stone-850 border-t border-stone-200/60" id="rsvp-section">
        {/* Decorative backdrop glow */}
        <div className="absolute inset-0 bg-radial-gradient from-emerald-500/[0.01] via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Confirm Attendance</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent mx-auto" />
            <p className="text-stone-600 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
              Kindly RSVP by 10th August to help us prepare for your presence. Thank you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="md:col-span-6 bg-white border border-stone-200/60 p-8 rounded-2xl shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-stone-900 flex items-center gap-2 font-medium">
                  <Mail className="w-5 h-5 text-emerald-700" />
                  <span>RSVP Form</span>
                </h3>
                {isFirebaseConfigured ? (
                  <span className="flex items-center gap-1.5 text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                    <span>Cloud Synced</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] text-stone-500 bg-stone-100 border border-stone-250 px-2.5 py-0.5 rounded-full font-sans font-semibold uppercase tracking-wider" title="Configure VITE_FIREBASE_API_KEY environment variables to activate cloud database integration.">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <span>Local Sandbox</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-5" id="rsvp-wedding-form">
                {/* Full Name input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johnson Kariuki"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all"
                  />
                </div>

                {/* Phone Number input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +254 724 783 311"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all"
                  />
                </div>

                {/* Will Attend toggle radio */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                    Will you attend?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWillAttend('yes')}
                      className={`py-3.5 text-xs uppercase tracking-wider font-sans font-bold border rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        willAttend === 'yes'
                          ? 'bg-maroon-700 border-maroon-700 text-white shadow-md'
                          : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Yes, with pleasure!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWillAttend('no')}
                      className={`py-3.5 text-xs uppercase tracking-wider font-sans font-bold border rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        willAttend === 'no'
                          ? 'bg-rose-50 border border-rose-300 text-rose-700 shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>No, sends love</span>
                    </button>
                  </div>
                </div>



                {/* Custom Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                    Special Notes / Dietary / Congratulations
                  </label>
                  <textarea
                    placeholder="Optional message (e.g., Congratulations Carole & John!, or vegetarian meal request)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all resize-none"
                  />
                </div>

                {/* Errors display */}
                {errorMessage && (
                  <div className="p-3.5 bg-rose-50 border border-rose-250 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-maroon-700 hover:bg-maroon-800 active:scale-98 disabled:opacity-50 text-white font-sans font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm &amp; Generate E-Card</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* E-Invitation Display Column */}
            <div className="md:col-span-6 flex flex-col items-center">
              <AnimatePresence mode="wait">
                {submittedGuest ? (
                  /* Success / E-Card Card */
                  <motion.div
                    key="e-card-state"
                    initial={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="w-full max-w-[360px] bg-gradient-to-b from-white to-[#FCFAF7] border border-emerald-600/30 rounded-3xl p-6 shadow-md relative flex flex-col overflow-hidden"
                  >
                    {/* Glowing golden elements inside */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent" />
                    <div className="absolute top-10 right-10 w-24 h-24 bg-emerald-500/[0.01] rounded-full blur-2xl" />

                    {/* Success Header */}
                    <div className="flex flex-col items-center text-center mb-5 pb-5 border-b border-stone-100">
                      <div className="w-11 h-11 bg-green-50 border border-green-200 text-green-700 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-sans font-bold uppercase text-xs tracking-widest text-green-700">RSVP Confirmed!</h4>
                      <p className="text-[10px] text-stone-500 font-sans mt-0.5">Thank you for confirming your attendance</p>
                    </div>

                    {/* E-Card Front Content */}
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* C&J Monogram Crest (Miniature) */}
                      <div className="w-16 h-16 rounded-full border border-emerald-600/20 flex items-center justify-center font-serif text-xl text-emerald-700 bg-[#FCFAF7] mb-2 relative">
                        <span className="font-extralight tracking-tight">C&amp;J</span>
                        <div className="absolute inset-0 rounded-full border border-dashed border-emerald-600/10 scale-95" />
                      </div>

                      {/* Couple names */}
                      <div className="space-y-0.5">
                        <p className="font-serif text-sm tracking-widest text-emerald-700 uppercase">The Wedding of</p>
                        <h5 className="font-serif text-xl font-light text-stone-900">Carole &amp; John</h5>
                      </div>

                      {/* Guest details */}
                      <div className="bg-stone-50 border border-stone-200/60 rounded-xl px-5 py-3 w-full space-y-1.5 shadow-inner">
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-sans font-bold">Admit Guest(s)</p>
                        <p className="font-serif text-base text-stone-900 truncate font-semibold leading-none">{submittedGuest.fullName}</p>
                        <div className="flex items-center justify-center gap-2 pt-1 border-t border-stone-100">
                          <span className={`text-[9px] uppercase tracking-wider font-sans font-semibold px-2 py-0.5 rounded ${
                            submittedGuest.willAttend === 'yes' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-stone-200 text-stone-600'
                          }`}>
                            {submittedGuest.willAttend === 'yes' ? 'Attending' : 'Declined'}
                          </span>
                        </div>
                      </div>

                      {/* Program Summary on E-Card */}
                      <div className="text-[10px] text-stone-500 text-center space-y-0.5 leading-relaxed font-sans">
                        <p className="font-bold text-stone-850">August 22, 2026 | 10:00 AM</p>
                        <p className="italic text-stone-500">St Francis de Sales Parish Catholic Church Katani &amp; Brighton Intl School</p>
                      </div>

                      {/* Decorative QR Code Block */}
                      <div className="relative p-2 bg-stone-50 border border-stone-200/60 rounded-2xl flex flex-col items-center gap-1.5 shadow-sm mt-2 select-none w-full max-w-[150px] mx-auto">
                        {/* Custom SVG QR Code styling with check */}
                        <div className="w-24 h-24 text-stone-100 flex items-center justify-center relative p-1.5 bg-white border border-stone-100 rounded-lg">
                          <QrCode className="w-full h-full text-emerald-700" />
                          <div className="absolute w-5 h-5 bg-white border border-stone-150 rounded flex items-center justify-center text-emerald-600 shadow-md">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Serial/Validation Code label */}
                        <div className="text-center font-mono text-[10px] tracking-widest text-emerald-700 font-semibold uppercase">
                          {submittedGuest.eCardCode}
                        </div>
                      </div>
                    </div>

                    {/* Help actions to screenshot */}
                    <div className="mt-6 pt-4 border-t border-stone-100 text-center text-[10px] text-stone-500 space-y-1">
                      <p>✨ Take a screenshot or bookmark this card for entry.</p>
                      <button
                        onClick={() => setSubmittedGuest(null)}
                        className="text-emerald-700 hover:text-emerald-850 underline font-semibold tracking-wide block mx-auto cursor-pointer"
                      >
                        Submit another RSVP
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Standard / Instruction Side Card */
                  <motion.div
                    key="standard-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-[360px] aspect-[3/4] bg-white border border-stone-200 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/0 to-emerald-500/[0.005] pointer-events-none" />
                    
                    {/* Circle Card Graphic */}
                    <div className="w-20 h-20 rounded-full bg-[#FCFAF7] border border-stone-200 flex items-center justify-center text-emerald-700 shadow-sm relative">
                      <QrCode className="w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-15" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-lg text-stone-850 font-medium">Your E-Invitation Card</h4>
                      <p className="text-xs text-stone-500 leading-relaxed max-w-[240px] mx-auto">
                        Once you complete the RSVP form on the left, a personalized digital e-card with your unique invitation serial code and Entry QR code will be generated here instantly.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 w-full text-[10px] text-stone-400 uppercase tracking-widest font-sans font-bold">
                      Digital Pass Generator
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Alternative Phone RSVP */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="w-full max-w-[360px] mt-6 bg-[#FCFAF7] border border-stone-250/60 rounded-3xl p-6 text-center shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-maroon-700/20 to-transparent" />
                <h5 className="font-serif text-sm font-semibold text-stone-850 mb-1.5 flex items-center justify-center gap-1.5">
                  <Phone className="w-4 h-4 text-maroon-700" />
                  <span>RSVP via Call or SMS</span>
                </h5>
                <p className="text-[11px] text-stone-500 leading-relaxed mb-4">
                  If you prefer to confirm your attendance manually, feel free to contact us:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 font-sans text-[11px] font-bold text-stone-700">
                  <a 
                    href="tel:+254724783311" 
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-stone-200/80 hover:border-maroon-300 hover:text-maroon-700 hover:bg-maroon-50/[0.02] rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>+254 724 783 311</span>
                  </a>
                  <a 
                    href="tel:+254714413777" 
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-stone-200/80 hover:border-maroon-300 hover:text-maroon-700 hover:bg-maroon-50/[0.02] rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>+254 714 413 777</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            id="floating-rsvp-button-wrapper"
          >
            <button
              onClick={scrollToRsvp}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-maroon-700 hover:bg-maroon-800 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '4s' }} />
              <span>Confirm Attendance</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
