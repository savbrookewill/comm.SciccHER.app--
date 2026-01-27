
import React, { useState } from 'react';
import { User } from '../types';
import { RoseIcon } from './Header';
import { Browser } from '@capacitor/browser';

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
  onSendPetal: () => void;
  hasPrivateAccess?: boolean;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose, onSendPetal, hasPrivateAccess = false }) => {
  const [activeGallery, setActiveGallery] = useState<'public' | 'private'>('public');
  const [showReport, setShowReport] = useState(false);

  const triggerHaptic = () => {
    // Simulated Haptic for Xcode
    if ('vibrate' in navigator) navigator.vibrate(10);
  };

  const handleReport = () => {
    alert(`Report submitted for ${user.name}. Our safety team will review this within 24 hours.`);
    onClose();
  };

  const handleSocialLink = async (url: string) => {
    try {
      await Browser.open({ url });
    } catch (e) {
      // Fallback for browser environment
      console.log('Browser plugin not available, opening in window:', e);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/40 backdrop-blur-md flex items-end">
      <div 
        className="w-full h-[94vh] bg-slate-950 rounded-t-[3.5rem] overflow-y-auto animate-in slide-in-from-bottom duration-500 pb-20 shadow-[0_-20px_100px_rgba(0,0,0,0.8)] border-t border-white/10 no-scrollbar"
      >
        <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl">
          <div className="sheet-grabber"></div>
          <div className="px-6 pb-4 flex items-center justify-between">
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 active:scale-90">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h3 className="text-xl font-black tracking-tighter shimmer-text italic">{user.name}'s Scene</h3>
            <button onClick={() => setShowReport(true)} className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center text-red-500/60 active:scale-90">
              <i className="fa-solid fa-flag text-xs"></i>
            </button>
          </div>
        </div>

        <div className="px-6 space-y-10 pt-4">
          <div className="relative aspect-[3/4.2] rounded-[3.5rem] overflow-hidden shadow-2xl group border border-white/5">
            <img src={user.mainPhoto} alt={user.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-10 left-10">
              <div className="bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 px-4 py-1.5 rounded-full w-fit mb-3 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                 <span className="text-[8px] font-black uppercase tracking-widest text-emerald-100">Verified Presence</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter text-white drop-shadow-lg italic">{user.name}, {user.age}</h2>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 drop-shadow-md">
                <i className="fa-solid fa-location-dot text-rose-400"></i>
                {user.distance} • {user.location}
              </div>
            </div>
          </div>

          <div className="space-y-4 px-2">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                <i className="fa-solid fa-quote-left text-[10px]"></i>
              </div>
              The Vibe
            </h4>
            <p className="text-xl font-medium text-slate-200 leading-relaxed italic pr-6">
              "{user.bio}"
            </p>
          </div>

          {user.socialLinks && user.socialLinks.length > 0 && (
            <div className="space-y-4 px-2">
              <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500">
                  <i className="fa-solid fa-share-nodes text-[10px]"></i>
                </div>
                Social Links
              </h4>
              <div className="flex flex-wrap gap-3">
                {user.socialLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleSocialLink(link.url)}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-900/50 border border-white/10 rounded-full hover:bg-slate-800/70 hover:border-white/20 transition-all active:scale-95"
                  >
                    <i className={`fa-brands fa-${link.platform.toLowerCase()} text-sm ${
                      link.platform === 'Instagram' ? 'text-pink-400' :
                      link.platform === 'TikTok' ? 'text-cyan-400' :
                      link.platform === 'Twitter' ? 'text-blue-400' :
                      link.platform === 'LinkedIn' ? 'text-blue-500' :
                      'text-slate-400'
                    }`}></i>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{link.username}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex bg-slate-900/50 p-1.5 rounded-[2.5rem] border border-white/5 mx-2">
              <button onClick={() => setActiveGallery('public')} className={`flex-1 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeGallery === 'public' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500'}`}>Public Gallery</button>
              <button onClick={() => setActiveGallery('private')} className={`flex-1 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeGallery === 'private' ? 'bg-rose-500/10 text-rose-400 shadow-lg' : 'text-slate-500'}`}><i className="fa-solid fa-lock text-[10px]"></i> Private</button>
            </div>
            <div className="grid grid-cols-2 gap-4 px-2">
              {activeGallery === 'public' ? (
                [user.mainPhoto, ...user.publicPhotos].map((img, i) => (
                  <div key={i} className="aspect-square rounded-[2.5rem] overflow-hidden border border-white/5 shadow-xl"><img src={img} className="w-full h-full object-cover" /></div>
                ))
              ) : (
                <div className="col-span-2 text-center py-20 bg-slate-900/40 rounded-[3rem] border border-dashed border-white/10 space-y-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-600">
                    <i className="fa-solid fa-lock text-3xl"></i>
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Vaulted Content Locked</p>
                  <button className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Request Access</button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-10 pb-32 space-y-4">
            <button 
              onClick={() => { triggerHaptic(); onSendPetal(); onClose(); }} 
              className="w-full py-7 shimmer-btn text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] shadow-[0_30px_60px_-12px_rgba(251,113,133,0.5)] flex items-center justify-center gap-4 active:scale-95 transition-all border border-white/30"
            >
              <RoseIcon className="w-8 h-8 drop-shadow-[0_0_8px_white]" color="white" />
              Send Spark
            </button>
            
            <button onClick={() => setShowReport(true)} className="w-full py-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-red-500 transition-colors">
              Identity Concern? Report
            </button>
          </div>
        </div>
      </div>

      {showReport && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="w-full max-w-sm glass rounded-[3.5rem] p-10 space-y-8 text-center border-red-500/20 border shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto border border-red-500/20 shadow-xl">
              <i className="fa-solid fa-flag text-2xl"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white italic tracking-tighter">Safety Flag</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Intentionality Check</p>
            </div>
            <div className="grid grid-cols-1 gap-2 text-left">
              {['Harassment', 'Not 20-30 Range', 'Neural Spam', 'Underage'].map((reason) => (
                <button key={reason} onClick={handleReport} className="w-full p-4 glass border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-red-500/40 hover:text-white transition-all active:scale-95">
                  {reason}
                </button>
              ))}
            </div>
            <button onClick={() => setShowReport(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-600 pt-2 active:scale-90 transition-transform">Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileModal;
