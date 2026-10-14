import React from 'react';
import { Shield, Scale, Clock, Award, Building, Check } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/content';

const meetingRoomImg = '/images/office_interior_real.jpg';

interface AboutSectionProps {
  currentLang: SupportedLanguage;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="chi-siamo" className="py-28 bg-[#0D1624] text-white border-t border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C5A880]">
              <span className="w-6 h-[1.5px] bg-[#C5A880]" />
              <span>{t.about.kicker}</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight text-balance">
              {t.about.title}
            </h2>

            <p className="text-lg text-[#DFC7A5] font-light leading-relaxed">
              {t.about.lead}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#E7DED4]/80 leading-relaxed font-light">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            {/* 4 Pillars Grid in Dark Luxury Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-[#080D16] border border-white/10 hover:border-[#C5A880]/40 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded bg-white/5 text-[#C5A880]">
                    <Scale className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <h4 className="font-semibold text-sm text-white">Rigore Normativo</h4>
                </div>
                <p className="text-xs text-[#E7DED4]/70 leading-relaxed font-light">
                  Pratiche istruite nel pieno rispetto del Testo Unico sull'Immigrazione (D.Lgs. 286/98).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#080D16] border border-white/10 hover:border-[#C5A880]/40 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded bg-white/5 text-[#C5A880]">
                    <Shield className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <h4 className="font-semibold text-sm text-white">Tutela Deontologica</h4>
                </div>
                <p className="text-xs text-[#E7DED4]/70 leading-relaxed font-light">
                  Collaborazione con avvocati iscritti all'Albo per la massima garanzia e conformità legale.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#080D16] border border-white/10 hover:border-[#C5A880]/40 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded bg-white/5 text-[#C5A880]">
                    <Clock className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <h4 className="font-semibold text-sm text-white">Monitoraggio Costante</h4>
                </div>
                <p className="text-xs text-[#E7DED4]/70 leading-relaxed font-light">
                  Controllo periodico dello stato fascicolo e solleciti tempestivi agli uffici della Prefettura e Questura.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#080D16] border border-white/10 hover:border-[#C5A880]/40 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded bg-white/5 text-[#C5A880]">
                    <Award className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <h4 className="font-semibold text-sm text-white">Trasparenza Totale</h4>
                </div>
                <p className="text-xs text-[#E7DED4]/70 leading-relaxed font-light">
                  Nessuna falsa promessa: chiarezza immediata sui tempi istruttori e sui reali requisiti previsti.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Frame: Real Office Interior */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#C5A880]/30 bg-[#080D16] group">
              <img
                src={meetingRoomImg}
                alt="Studio e sala consultazione di Italia Immigrazione a Milano"
                className="w-full h-full object-cover aspect-[4/3] sm:aspect-[16/11] filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080D16] via-[#080D16]/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] mb-1">
                  SEDE OPERATIVA · CITTÀ STUDI
                </div>
                <div className="font-editorial text-lg sm:text-xl font-medium text-white">
                  Sala Consultazione & Ricevimento Riservato
                </div>
                <div className="mt-2 text-xs text-[#E7DED4]/80 flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Milano, Via Ampère 126 · Ricevimento su appuntamento</span>
                </div>
              </div>
            </div>

            {/* Floating verification badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#080D16] border border-[#C5A880]/40 p-4 rounded-lg shadow-2xl items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Check className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Sede Verificata a Milano</div>
                <div className="text-[10px] text-[#E7DED4]/70">Accoglienza riservata in 5 lingue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
