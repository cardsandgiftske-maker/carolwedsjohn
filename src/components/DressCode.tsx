import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shirt, Sparkle } from 'lucide-react';
import { COLOR_SWATCHES } from '../data';

export default function DressCode() {
  const [hoveredSwatch, setHoveredSwatch] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-[#FCFAF7] text-stone-850 border-t border-stone-200/60" id="dress-code-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500/[0.01] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-maroon-700 text-xs font-semibold tracking-widest uppercase font-sans">The Attire</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Wedding Dress Code</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maroon-700/30 to-transparent mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent" />
          </div>
          <p className="text-stone-600 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
            We kindly invite you to dress in elegant, harmonious pastel tones to complement our beautiful beachfront &amp; garden aesthetics.
          </p>
        </div>

        {/* Central Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Instructions and Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200/60 p-8 rounded-2xl shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-emerald-800 font-medium">Classy Floral Pastels</h3>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-sans font-semibold">Our Chosen Theme</p>
                </div>
              </div>

              <div className="text-sm text-stone-600 leading-relaxed space-y-4">
                <p>
                  To create a beautiful, cohesive visual atmosphere, we kindly request our guests to dress in elegant pastel shades of <span className="text-emerald-700 font-medium">Blush, Sage, Lavender, Cream, and Peach</span>.
                </p>
                <p className="font-serif italic text-stone-600 border-l-2 border-emerald-600/30 pl-4 py-1">
                  “Floral prints and soft pastel colors are highly encouraged!”
                </p>
              </div>

              {/* Specific suggestions list */}
              <div className="space-y-3 pt-4 border-t border-stone-100 text-xs text-stone-500">
                <h4 className="font-sans font-bold text-stone-800 uppercase tracking-widest mb-1.5">Attire Guidelines</h4>
                <div className="flex items-start gap-2">
                  <Sparkle className="w-3.5 h-3.5 text-emerald-600/80 shrink-0 mt-0.5" />
                  <span><strong>For Ladies:</strong> Flowing pastel maxi dresses, floral gowns, elegant cocktail wear.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkle className="w-3.5 h-3.5 text-emerald-600/80 shrink-0 mt-0.5" />
                  <span><strong>For Gentlemen:</strong> Light linen suits, sand-colored trousers, soft pastel collared shirts.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Color Swatches Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <h3 className="text-xs text-stone-500 uppercase tracking-widest font-sans font-bold text-center lg:text-left">
              Our Wedding Color Palette
            </h3>

            {/* Grid of colors */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {COLOR_SWATCHES.map((swatch, index) => (
                <motion.div
                  key={`swatch-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredSwatch(swatch.name)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Swatch Circle */}
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-all p-1 bg-white border border-stone-200">
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center font-bold shadow-inner"
                      style={{ backgroundColor: swatch.hex }}
                    >
                      <Sparkles
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: swatch.textColor }}
                      />
                    </div>

                    {/* Active highlight ring */}
                    {hoveredSwatch === swatch.name && (
                      <motion.div
                        layoutId="activeSwatchRing"
                        className="absolute -inset-1 rounded-full border border-emerald-600/40 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                      />
                    )}
                  </div>

                  <span className="text-stone-700 font-sans text-xs font-semibold mt-3 group-hover:text-emerald-700 transition-colors">
                    {swatch.name}
                  </span>
                  <span className="text-stone-400 font-mono text-[10px] mt-0.5">
                    {swatch.hex}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Explanation box based on hovered swatch or defaults */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 min-h-[90px] flex flex-col justify-center text-center lg:text-left shadow-sm">
              {hoveredSwatch ? (
                (() => {
                  const active = COLOR_SWATCHES.find((s) => s.name === hoveredSwatch);
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1"
                    >
                      <h4 className="font-serif text-emerald-700 font-medium">{active?.name}</h4>
                      <p className="text-stone-600 text-xs md:text-sm">{active?.description}</p>
                    </motion.div>
                  );
                })()
              ) : (
                <div className="space-y-1">
                  <h4 className="font-serif text-stone-400 font-medium italic">Hover over any color swatch</h4>
                  <p className="text-stone-400 text-xs md:text-sm">Explore what each custom pastel wedding tone represents for our special day.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
