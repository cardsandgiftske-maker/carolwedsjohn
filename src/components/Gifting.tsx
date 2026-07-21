import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Copy, Check, Heart, Smartphone } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function Gifting() {
  const [copiedPaybill, setCopiedPaybill] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const handleCopy = (text: string, type: 'paybill' | 'account') => {
    navigator.clipboard.writeText(text);
    if (type === 'paybill') {
      setCopiedPaybill(true);
      setTimeout(() => setCopiedPaybill(false), 2000);
    } else {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  return (
    <section className="relative py-24 bg-[#FCFAF7] text-stone-850 border-t border-stone-200/60" id="gifting-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/[0.01] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-700 text-xs font-semibold tracking-widest uppercase font-sans">Love &amp; Support</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Gifting &amp; Registry</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent mx-auto" />
        </div>

        {/* Registry Message Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Narrative card */}
          <div className="md:col-span-7 flex flex-col justify-between bg-white border border-stone-200/60 p-8 rounded-2xl shadow-md">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 mb-4">
                <Gift className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl text-stone-900 font-medium">Blessings Registry</h3>

              <div className="text-stone-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Your presence, thoughts, and prayers are our absolute greatest treasures on our journey into marriage.
                </p>
                <p>
                  Should you wish to honor our covenant with a wedding gift, we warmly welcome both paper envelopes and digital blessings, in whichever form is most meaningful to you.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-3">
              <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600 animate-pulse" />
              <span className="text-xs text-stone-500 font-sans tracking-wider uppercase font-semibold">
                Thank you for your warm generosity!
              </span>
            </div>
          </div>

          {/* M-PESA Envelope payment instructions card */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#FCFAF7] to-stone-50/50 border border-stone-200/60 p-8 rounded-2xl shadow-md flex flex-col justify-center items-center text-center relative overflow-hidden group">
            {/* Ambient gold glow in card corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.02] rounded-full blur-2xl" />

            {/* M-Pesa Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-[10px] uppercase font-sans font-bold tracking-widest mb-6">
              <Smartphone className="w-3 h-3" />
              <span>M-PESA Gifting</span>
            </div>

            <h4 className="font-serif text-xl text-stone-900 mb-2 font-medium">M-PESA ENVELOPE</h4>
            <p className="text-stone-500 text-xs max-w-[240px] mb-8">
              Easily send monetary wedding gifts directly via mobile money:
            </p>

            {/* Key-Value Copy Blocks */}
            <div className="w-full space-y-4 mb-8">
              {/* Paybill Block */}
              <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3.5 flex items-center justify-between shadow-inner">
                <div className="text-left">
                  <p className="text-[10px] text-stone-400 uppercase font-sans font-bold tracking-wider">Paybill Number</p>
                  <p className="text-lg font-mono font-bold text-emerald-700 tracking-wide">{WEDDING_DETAILS.registry.paybill}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleCopy(WEDDING_DETAILS.registry.paybill, 'paybill')}
                    className={`p-2.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                      copiedPaybill
                        ? 'bg-green-50 border-green-200 text-green-600'
                        : 'bg-white border border-stone-200 text-stone-500 hover:text-maroon-700 hover:border-maroon-200'
                    }`}
                    title="Copy Paybill"
                  >
                    {copiedPaybill ? <Check className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
                  </button>
                  <span className="text-[10px] font-sans text-stone-500 font-medium select-none mt-0.5">
                    {copiedPaybill ? 'Copied!' : 'Copy'}
                  </span>
                </div>
              </div>

              {/* Account Block */}
              <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3.5 flex items-center justify-between shadow-inner">
                <div className="text-left">
                  <p className="text-[10px] text-stone-400 uppercase font-sans font-bold tracking-wider">Account Name</p>
                  <p className="text-sm font-serif font-semibold text-stone-800 tracking-wide">{WEDDING_DETAILS.registry.accountNo}</p>
                </div>
              </div>
            </div>

            {/* Quick Helper Tip */}
            <p className="text-[10px] text-stone-500 italic">
              Tap the button to copy directly to your phone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
