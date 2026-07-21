import React from 'react';

export default function DressCode() {
  return (
    <section className="relative py-20 bg-[#FCFAF7] text-stone-850 border-t border-stone-200/60" id="dress-code-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500/[0.01] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-maroon-700 text-xs font-semibold tracking-widest uppercase font-sans">The Attire</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Wedding Dress Code</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maroon-700/30 to-transparent mx-auto relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent" />
          </div>
          <p className="text-stone-700 text-base md:text-lg lg:text-xl max-w-2xl mx-auto italic font-serif leading-relaxed">
            We kindly invite you to celebrate with us in elegant attire befitting this joyous occasion.
          </p>
        </div>
      </div>
    </section>
  );
}
