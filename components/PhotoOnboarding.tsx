
import React, { useState, useRef } from 'react';

interface PhotoItem {
  id: string;
  url: string;
  isPrivate: boolean;
  isLead: boolean;
}

interface PhotoOnboardingProps {
  onComplete: (publicPhotos: string[], privatePhotos: string[]) => void;
}

const PhotoOnboarding: React.FC<PhotoOnboardingProps> = ({ onComplete }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    
    setUploading(true);
    setTimeout(() => {
      const newPhotos: PhotoItem[] = filesArray.map((file, idx) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file as Blob),
        isPrivate: false,
        isLead: photos.length === 0 && idx === 0
      }));
      setPhotos(prev => [...prev, ...newPhotos]);
      setUploading(false);
    }, 800);
  };

  const togglePrivate = (id: string) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, isPrivate: !p.isPrivate } : p));
  };

  const setLead = (id: string) => {
    setPhotos(prev => prev.map(p => ({ ...p, isLead: p.id === id })));
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => {
      const filtered = prev.filter(p => p.id !== id);
      if (filtered.length > 0 && !filtered.find(p => p.isLead)) {
        filtered[0].isLead = true;
      }
      return filtered;
    });
  };

  const isReady = photos.length >= 3; 

  const handleSubmit = () => {
    if (!isReady) return;
    // Reorder to put lead photo first
    const sorted = [...photos].sort((a, b) => (a.isLead ? -1 : b.isLead ? 1 : 0));
    const publicUrls = sorted.filter(p => !p.isPrivate).map(p => p.url);
    const privateUrls = sorted.filter(p => p.isPrivate).map(p => p.url);
    onComplete(publicUrls, privateUrls);
  };

  return (
    <div className="fixed inset-0 bg-[#020617] z-[100] flex flex-col items-center justify-start py-12 px-6 overflow-y-auto no-scrollbar">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="text-center space-y-3 max-w-xs relative z-10 w-full mb-10">
        <h1 className="text-4xl font-black tracking-tighter text-white italic leading-tight">
          <span className="shimmer-text">Define Your Scene</span>
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
          Upload 3+ Photos • Select Your Lead
        </p>
      </div>

      <div className="w-full max-w-xs space-y-8 relative z-10">
        <div className="grid grid-cols-6 gap-3 auto-rows-[100px]">
          {photos.map((photo, idx) => (
            <div 
              key={photo.id} 
              className={`relative rounded-[2rem] overflow-hidden border transition-all duration-500 shadow-2xl group ${
                photo.isLead ? 'col-span-4 row-span-3 border-emerald-500/40' : 'col-span-2 row-span-2 border-white/5'
              }`}
              onClick={() => !photo.isLead && setLead(photo.id)}
            >
              <img src={photo.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Upload" />
              
              {photo.isLead && (
                <div className="absolute top-4 left-4 bg-emerald-500 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xl border border-white/20">
                  <i className="fa-solid fa-star text-[8px] text-white animate-pulse"></i>
                  <span className="text-[8px] font-black uppercase text-white tracking-widest">Lead</span>
                </div>
              )}

              <button 
                onClick={(e) => { e.stopPropagation(); removePhoto(photo.id); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-[10px] opacity-0 group-hover:opacity-100 transition-all border border-white/10"
              >
                <i className="fa-solid fa-x"></i>
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); togglePrivate(photo.id); }}
                className={`absolute bottom-3 left-3 right-3 py-2 rounded-xl flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.15em] transition-all border ${
                  photo.isPrivate 
                  ? 'bg-emerald-500/80 border-emerald-400 text-white' 
                  : 'bg-black/30 backdrop-blur-md text-white border-white/10'
                }`}
              >
                <i className={`fa-solid ${photo.isPrivate ? 'fa-lock' : 'fa-lock-open'}`}></i>
                {photo.isPrivate ? 'Vaulted' : 'Public'}
              </button>
            </div>
          ))}

          <label className="col-span-2 row-span-2 bg-slate-900/40 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/30 transition-all group shadow-inner relative overflow-hidden active:scale-95">
            <input type="file" multiple onChange={handleFileSelect} className="hidden" accept="image/*" />
            <i className="fa-solid fa-plus text-slate-600 text-xl group-hover:text-emerald-500 transition-colors"></i>
          </label>
        </div>

        <div className="flex items-center justify-between px-2">
           <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${i < photos.length ? 'w-8 bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'w-4 bg-slate-800'}`}></div>
              ))}
           </div>
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              {photos.length}/3 Launch Ready
           </span>
        </div>

        <div className="pt-4 space-y-4">
          <button 
            onClick={handleSubmit}
            disabled={!isReady || uploading}
            className={`w-full py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] text-white shadow-2xl transition-all ${
              isReady && !uploading
              ? 'shimmer-btn active:scale-95 shadow-emerald-500/30' 
              : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-white/5 opacity-50'
            }`}
          >
            {uploading ? "Encrypting Vibe..." : isReady ? "Launch Experience ✨" : "Curate More"}
          </button>
          
          <p className="text-[8px] font-bold text-slate-600 text-center uppercase tracking-[0.4em] px-8 leading-relaxed italic opacity-80">
            Photos are encrypted via <span className="text-emerald-500">End-to-End ScissHER Vault</span> technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoOnboarding;
