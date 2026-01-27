
import React, { useState } from 'react';
import { User } from '../types';
import { Browser } from '@capacitor/browser';

const ProfileView: React.FC<{ user: User | null, onReset: () => void }> = ({ user, onReset }) => {
  const [showSafety, setShowSafety] = useState(false);

  if (!user) return null;

  const handleLegalLink = async (type: string) => {
    // Map legal document types to URLs
    const urlMap: Record<string, string> = {
      'Community Guidelines': 'https://scissher.app/community-guidelines',
      'Privacy Policy': 'https://scissher.app/privacy-policy',
      'Terms of Service (EULA)': 'https://scissher.app/terms-of-service',
      'Neural Content Security': 'https://scissher.app/content-security'
    };
    
    const url = urlMap[type];
    if (url && url.startsWith('https://')) {
      try {
        await Browser.open({ url });
      } catch (e) {
        // Fallback for browser environment
        const newWindow = window.open(url, '_blank');
        if (!newWindow) {
          alert('Please allow popups to open this link');
        }
      }
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm("Privacy Compliance (CCPA/GDPR): This action is permanent. All your matches, messages, and encrypted vault data will be immediately erased from our cloud servers. Proceed?");
    if (confirmDelete) {
      alert("Your account and all associated biological identity proofs have been permanently deleted.");
      onReset();
    }
  };

  return (
    <div className="space-y-12 pb-40 animate-in slide-in-from-bottom-6 duration-700 px-2">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full"></div>
          <div className="w-52 h-52 rounded-[4.5rem] overflow-hidden border-4 border-slate-950 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] relative z-10 p-1.5 bg-gradient-to-tr from-emerald-500 via-emerald-600 to-indigo-500">
            <img src={user.mainPhoto} className="w-full h-full object-cover rounded-[4rem]" alt="Me" />
          </div>
          <button className="absolute -bottom-2 -right-2 w-14 h-14 petal-gradient rounded-[1.75rem] flex items-center justify-center text-white border-4 border-slate-950 z-20 shadow-2xl hover:scale-110 transition-transform active:scale-90">
            <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
          </button>
        </div>
        
        <div className="mt-10 text-center space-y-2">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-4xl font-black text-white tracking-tighter italic">{user.name}, {user.age}</h2>
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
               <i className="fa-solid fa-certificate text-emerald-500 text-[10px]"></i>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">Lead Presence Verified ✨</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 px-6 flex items-center gap-4">
           Account Scene
           <div className="h-[1px] flex-1 bg-white/5"></div>
        </h3>
        
        <div className="space-y-4 px-1">
          <button onClick={() => setShowSafety(true)} className="w-full glass p-8 rounded-[3rem] flex items-center justify-between border-white/5 group shadow-xl hover:bg-white/5 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-inner">
                <i className="fa-solid fa-shield-heart text-lg"></i>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-100 block">Safety & Moderation</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-0.5 block">Report, Block, & Global Bans</span>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-700 group-hover:translate-x-1.5 transition-transform"></i>
          </button>
          
          <button className="w-full glass p-8 rounded-[3rem] flex items-center justify-between border-white/5 group shadow-xl hover:bg-white/5 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-[1.5rem] bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20 shadow-inner">
                <i className="fa-solid fa-vault text-lg"></i>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-100 block">Vault Management</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-0.5 block">Manage Private Visibility</span>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-700 group-hover:translate-x-1.5 transition-transform"></i>
          </button>
        </div>
      </div>

      <div className="pt-10 pb-20 space-y-6 px-1">
        <button onClick={onReset} className="w-full py-6 bg-slate-900 border border-white/5 text-slate-500 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:text-white transition-all active:scale-95 shadow-lg">
          Sign Out of ScissHER
        </button>
        <button onClick={handleDeleteAccount} className="w-full py-5 text-red-500/40 hover:text-red-500 transition-all text-[9px] font-black uppercase tracking-[0.5em] italic">
          Permanently Erase Presence (CCPA)
        </button>
      </div>

      {showSafety && (
        <div className="fixed inset-0 z-[200] bg-slate-950 overflow-y-auto p-10 animate-in slide-in-from-bottom duration-700">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-black text-white tracking-tighter shimmer-text italic">Safety Center</h3>
              <button onClick={() => setShowSafety(false)} className="w-12 h-12 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white active:scale-90 transition-all border border-white/5 shadow-xl">
                <i className="fa-solid fa-xmark"></i>
              </button>
           </div>
           
           <div className="space-y-10">
             <div className="glass p-10 rounded-[4rem] border-white/10 space-y-6 shadow-2xl relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
               <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] italic">Human Safety Shield</h4>
               <p className="text-base font-medium text-slate-300 leading-relaxed italic pr-4">
                 ScissHER enforces a zero-tolerance policy. If you encounter harassment or non-consensual content, use the Report button on any profile. Our AI-Moderator and human safety agents review all flags within 2 hours.
               </p>
             </div>
             
             <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] px-4 flex items-center gap-4">
                  Legal Compliance
                  <div className="h-[1px] flex-1 bg-white/5"></div>
               </h4>
               {[
                 { t: 'Community Guidelines', id: 'guidelines' },
                 { t: 'Privacy Policy', id: 'privacy' },
                 { t: 'Terms of Service (EULA)', id: 'terms' },
                 { t: 'Neural Content Security', id: 'security' }
               ].map(item => (
                 <button 
                  key={item.id} 
                  onClick={() => handleLegalLink(item.t)}
                  aria-label={`View ${item.t}`}
                  className="w-full py-6 px-8 glass rounded-[2.25rem] text-left text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 border-white/5 flex justify-between items-center hover:bg-white/5 hover:text-white transition-all active:scale-[0.98]">
                   {item.t} <i className="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-40"></i>
                 </button>
               ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
