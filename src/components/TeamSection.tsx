import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Info, Upload, RotateCcw, Check, MessageSquare, Award } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TEAM_MEMBERS, TRANSLATIONS } from '../data/content';

interface TeamSectionProps {
  currentLang: SupportedLanguage;
  isAdmin?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ currentLang, isAdmin = false }) => {
  const t = TRANSLATIONS[currentLang];
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Load custom photos from localStorage
  useEffect(() => {
    try {
      const stored: Record<string, string> = {};
      TEAM_MEMBERS.forEach((m) => {
        const saved = localStorage.getItem(`team_photo_${m.id}`);
        if (saved) {
          stored[m.id] = saved;
        }
      });
      setCustomPhotos(stored);
    } catch {
      // Ignore
    }
  }, []);

  const handleFileUpload = (memberId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomPhotos((prev) => ({ ...prev, [memberId]: result }));
          try {
            localStorage.setItem(`team_photo_${memberId}`, result);
          } catch {
            // Quota
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (memberId: string) => {
    try {
      localStorage.removeItem(`team_photo_${memberId}`);
    } catch {
      // Ignore
    }
    setCustomPhotos((prev) => {
      const next = { ...prev };
      delete next[memberId];
      return next;
    });
  };

  return (
    <section id="team" className="py-24 bg-[#080D16] text-white border-t border-b border-white/10 relative overflow-hidden">
      {/* Subtle ambient lighting behind team */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#C5A880]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C5A880]">
            <span className="w-6 h-[1.5px] bg-[#C5A880]" />
            <span className="font-law">STUDIO IMMIGRAZIONE · IL NOSTRO TEAM</span>
          </div>

          <h2 className="font-law text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-[0.06em]">
            {t.teamHeading.title}
          </h2>

          <p className="text-base sm:text-lg text-[#E7DED4]/80 leading-relaxed font-light">
            {t.teamHeading.subtitle}
          </p>

          {/* Deontological note */}
          <div className="flex items-start gap-2.5 p-3.5 bg-[#0D1624] border border-white/10 rounded-lg text-xs text-[#E7DED4]/70">
            <Info className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.teamHeading.disclaimer}
            </p>
          </div>
        </div>

        {/* 5 Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => {
            const defaultPublicPath = `/team/${
              member.id === 'samad-chaudhry'
                ? 'samad.jpg'
                : member.id === 'annalisa-rottola'
                ? 'annalisa.jpg'
                : member.id === 'giovanni-rossetti'
                ? 'giovanni.jpg'
                : member.id === 'elisa-bova'
                ? 'elisa.jpg'
                : 'ahlam.jpg'
            }`;

            const currentPhoto = customPhotos[member.id] || member.image;
            const hasCustomPhoto = !!customPhotos[member.id];

            return (
              <div
                key={member.id}
                className={`group flex flex-col justify-between rounded-xl bg-[#0D1624] border border-white/10 hover:border-[#C5A880]/60 shadow-xl transition-all duration-300 overflow-hidden ${
                  member.isLegalCounsel ? 'ring-1 ring-[#C5A880]/30' : ''
                }`}
              >
                <div>
                  {/* Clean Team Portrait Frame */}
                  <div className="relative aspect-[4/5] bg-[#05080E] overflow-hidden">
                    <img
                      src={currentPhoto}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith(defaultPublicPath)) {
                          target.src = defaultPublicPath;
                        }
                      }}
                      alt={`Foto ufficiale di ${member.name}`}
                      className="w-full h-full object-cover object-top filter contrast-[1.04] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1624] via-transparent to-transparent opacity-80" />

                    {/* Experience Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[11px] font-semibold text-[#DFC7A5] bg-[#080D16]/90 backdrop-blur-md px-3 py-1 rounded border border-[#C5A880]/30 shadow-md">
                        {member.experienceLabel}
                      </span>
                    </div>

                    {/* Legal Counsel Badge */}
                    {member.isLegalCounsel && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white bg-[#B45F42] px-2.5 py-1 rounded shadow-md">
                          <Award className="w-3 h-3" />
                          <span>Patrocinante</span>
                        </span>
                      </div>
                    )}

                    {/* ADMIN-ONLY CONTROLS */}
                    {isAdmin && (
                      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black/85 backdrop-blur-md p-1.5 rounded border border-white/20">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(el) => {
                            fileInputRefs.current[member.id] = el;
                          }}
                          onChange={(e) => handleFileUpload(member.id, e)}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[member.id]?.click()}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-white bg-[#C5A880] hover:bg-[#b0936b] text-[#080D16] rounded-xs transition-colors"
                          title="Modifica foto"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Cambia</span>
                        </button>

                        {hasCustomPhoto && (
                          <button
                            type="button"
                            onClick={() => handleResetPhoto(member.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-white/80 hover:text-white bg-white/10 rounded-xs transition-colors"
                            title="Ripristina originale"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Member Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-[#DFC7A5] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#C5A880] tracking-wide mt-1">
                        {member.role}
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-[#E7DED4]/80 leading-relaxed font-light">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <div className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold">
                        Aree di Intervento:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.specialties.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white/5 text-[#E7DED4]/90 border border-white/10"
                          >
                            <Check className="w-2.5 h-2.5 text-[#C5A880]" />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Spoken Languages */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#E7DED4]/70">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880]">Lingue:</span>
                      <span className="font-medium text-white/90">{member.languages.join(' · ')}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer / Direct Action */}
                <div className="p-4 bg-[#080D16] border-t border-white/10 flex items-center justify-between">
                  <a
                    href={`https://wa.me/393532136704?text=Salve,%20vorrei%20fissare%20una%20consulenza%20con%20${encodeURIComponent(member.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A880] hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Consulenza con {member.name.split(' ')[0]}</span>
                  </a>

                  <span className="text-[10px] font-mono text-white/40">MILANO</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
