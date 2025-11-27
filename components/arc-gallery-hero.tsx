'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
};

const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = -110,
  endAngle = 110,
  radiusLg = 340,
  radiusMd = 280,
  radiusSm = 200,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 80,
  className = '',
}) => {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({
    radius: radiusSm,
    cardSize: cardSizeSm,
  });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  if (!mounted) {
    return (
      <section className={`relative overflow-hidden bg-[#FAF9F6] min-h-screen flex flex-col ${className}`}>
        <div className="relative z-10 flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-2xl px-4">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-tight ${language === "fa" ? "font-sans" : "font-serif"}`}>
              {t.hero.title} <br />
              <span className={`text-neutral-500 ${language === "fa" ? "font-light text-xl sm:text-2xl lg:text-3xl" : "italic font-serif text-xl sm:text-2xl lg:text-3xl"}`}>
                {t.hero.subtitle} {t.hero.welcome}
              </span>
            </h1>
          </div>
        </div>
      </section>
    );
  }

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section className={`relative overflow-hidden bg-[#FAF9F6] min-h-screen flex flex-col ${className}`}>
      <div
        className="relative mx-auto"
        style={{
          width: '100%',
          height: dimensions.radius * (dimensions.cardSize > 80 ? 1.0 : 1.3),
        }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {images.map((src, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;
            
            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in will-change-transform"
                suppressHydrationWarning
                style={{
                  width: `${dimensions.cardSize}px`,
                  height: `${dimensions.cardSize}px`,
                  left: `calc(50% + ${x.toFixed(2)}px)`,
                  bottom: `${y.toFixed(2)}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 30}ms`,
                  animationFillMode: 'forwards',
                  zIndex: count - i,
                }}
              >
                <div 
                  className="rounded-2xl overflow-hidden ring-1 ring-neutral-200 bg-white transition-all duration-200 sm:hover:scale-105 w-full h-full"
                  style={{ transform: `rotate(${angle / 6}deg)`, filter: dimensions.cardSize > 80 ? 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.3)) drop-shadow(0 8px 10px rgb(0 0 0 / 0.1))' : 'drop-shadow(0 4px 8px rgb(0 0 0 / 0.15))' }}
                >
                  <img
                    src={src}
                    alt=""
                    className="block w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 mt-8 md:-mt-52 lg:-mt-64">
        <div className="text-center max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-neutral-400" />
            <span className={`text-xs tracking-[0.3em] uppercase text-neutral-500 ${language === "fa" ? "font-sans" : ""}`}>
              Le Petit Isenburg
            </span>
            <div className="w-8 h-px bg-neutral-400" />
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-3 ${language === "fa" ? "font-sans" : "font-serif"}`}>
            {t.hero.title}
          </h1>
          <p className={`text-neutral-500 text-lg mb-6 ${language === "fa" ? "font-sans font-light" : "font-serif italic"}`}>
            {t.hero.subtitle} {t.hero.welcome}
          </p>
          
          <div className="flex gap-3 justify-center">
            <button className={`group bg-neutral-900 text-white px-7 py-3 rounded-full font-medium hover:bg-neutral-800 transition-all shadow-lg hover:-translate-y-0.5 ${language === "fa" ? "font-sans" : ""}`}>
              {t.hero.cta}
            </button>
            <button className={`border border-neutral-300 text-neutral-700 px-7 py-3 rounded-full font-medium hover:bg-neutral-100 transition-all ${language === "fa" ? "font-sans" : ""}`}>
              {language === "fa" ? "کاوش" : "Mehr"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArcGalleryHero;
