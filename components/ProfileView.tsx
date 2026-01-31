
import React, { useState } from 'react';
import { User } from '../types';
import { PRIMARY_HYPE_QUOTE } from '../constants';

const ProfileView: React.FC<{ user: User | null, onReset: () => void }> = ({ user, onReset }) => {
  const [showSafety, setShowSafety] = useState(false);
  const [showMantra, setShowMantra] = useState(false);

  if (!user) return null;

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Privacy Compliance (CCPA/GDPR): This will permanently erase your entire ScissHER presence and biological proofs from our servers. This action is irreversible. Proceed?");
    if (confirmed) {
      localStorage.removeItem('scissher_verified');
      onReset();
    }
  };

  return (
    <div className="space-y-12 pb-40 animate-in slide-in-from-bottom-6 duration-700 px-2 relative">
      <div className="flex flex-col items-center pt-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-rose-500/20 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="w-44 h-44 rounded-[4rem] overflow-hidden border-4 border-slate-950 shadow-2xl relative z-10 p-1 bg-gradient-to-tr from-rose-500 via-violet-500 to-emerald-500">
            <img src={user.mainPhoto} className="w-full h-full object-cover rounded-[3.8rem]" alt="Me" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 petal-gradient rounded-2xl flex items-center justify-center text-white border-4 border-slate-950 z-20 shadow-2xl animate-pulse">
            <i className="fa-solid fa-crown text-sm"></i>
          </div>
        </div>
        
        <div className="mt-8 text-center space-y-2">
          <h2 className="text-4xl font-black text-white tracking-tighter italic leading-none">{user.name}, {user.age}</h2>
          <div className="flex items-center justify-center gap-2">
            <i className="fa-solid fa-certificate text-emerald-400 text-[10px]"></i>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">Prismatic Identity Verified</span>
          </div>
        </div>
      </div>

      <div className="px-1">
        <button 
          onClick={() => setShowMantra(true)}
          className="w-full p-8 glass rounded-[3.5rem] border-white/5 relative overflow-hidden group shadow-2xl active:scale-95 transition-all text-left"
        >
          <div className="absolute top-0 left-0 w-1 h-full petal-gradient"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-[8px] font-black text-rose-400 uppercase tracking-[0.4em]">Daily Intentional Mantra</p>
              <h4 className="text-xl font-black text-white italic tracking-tighter leading-tight pr-4">"Interact with power and authentic light."</h4>
            </div>
            <i className="fa-solid fa-sparkles text-rose-400 text-lg opacity-40"></i>
          </div>
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 px-6 flex items-center gap-4">
           The Suite
           <div className="h-[1px] flex-1 bg-white/5"></div>
        </h3>
        
        <div className="space-y-4 px-1">
          <button onClick={() => setShowSafety(true)} className="w-full glass p-8 rounded-[3rem] flex items-center justify-between border-white/5 group shadow-xl hover:bg-white/5 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <i className="fa-solid fa-shield-heart text-lg"></i>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-100 block">Safety Protocol</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-0.5 block">Report, Block, & Global Bans</span>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-700 group-hover:translate-x-1.5 transition-transform"></i>
          </button>
          
          <button className="w-full glass p-8 rounded-[3rem] flex items-center justify-between border-white/5 group shadow-xl hover:bg-white/5 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                <i className="fa-solid fa-vault text-lg"></i>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-100 block">Vault Permissions</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-0.5 block">Manage Private Accessibility</span>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-700 group-hover:translate-x-1.5 transition-transform"></i>
          </button>
        </div>
      </div>

      <div className="pt-8 pb-10 space-y-6 px-1">
        <div className="flex flex-col gap-4 p-6 glass rounded-[3rem] border-white/5 bg-slate-900/40">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Legal & Compliance</h4>
           <div className="flex flex-col gap-3">
             <a href="#" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
             <a href="#" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors">Safety Guidelines</a>
           </div>
        </div>
        <button onClick={onReset} className="w-full py-6 glass border border-white/5 text-slate-500 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:text-white transition-all active:scale-95">
          Disconnect Presence
        </button>
        <button onClick={handleDeleteAccount} className="w-full py-2 text-red-500/50 text-[8px] font-black uppercase tracking-[0.5em] italic hover:text-red-400 transition-colors">
          Erase All Biological Proofs (CCPA/GDPR)
        </button>
      </div>

      {showMantra && (
        <div className="fixed inset-0 z-[600] bg-slate-950 p-10 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
           <div className="absolute inset-0 petal-gradient opacity-10 animate-pulse"></div>
           <div className="relative z-10 space-y-12">
              <div className="w-24 h-24 petal-gradient rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-white/20 shadow-2xl rotate-12">
                <i className="fa-solid fa-sparkles text-white text-3xl"></i>
              </div>
              <div className="space-y-6 px-4">
                 <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.6em] italic opacity-80">Daily Intention Status</p>
                 <h2 className="text-4xl font-black text-white tracking-tighter italic leading-tight">
                   "{PRIMARY_HYPE_QUOTE}"
                 </h2>
              </div>
              <button 
                onClick={() => setShowMantra(false)}
                className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all border border-white/20"
              >
                Reflect & Continue
              </button>
           </div>
        </div>
      )}

      {showSafety && (
        <div className="fixed inset-0 z-[600] bg-slate-950 p-10 flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto no-scrollbar">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-black text-white tracking-tighter italic shimmer-text leading-none">Safety Suite</h3>
              <button onClick={() => setShowSafety(false)} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all"><i className="fa-solid fa-xmark"></i></button>
           </div>
           <div className="space-y-8">
              <div className="glass p-10 rounded-[4rem] border-white/5 space-y-4">
                 <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Zero-Tolerance Policy</h4>
                 <p className="text-base text-slate-300 italic font-medium leading-relaxed">ScissHER is a space for intentional connection. Harassment, neural spam, and lack of respect result in immediate, global identity bans.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] px-4">Protocols</h4>
                <div className="space-y-3">
                  <button className="w-full p-6 glass border border-white/5 rounded-3xl text-left flex items-center justify-between">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Community Guidelines</span>
                    <i className="fa-solid fa-external-link text-[10px] text-slate-700"></i>
                  </button>
                  <button className="w-full p-6 glass border border-white/5 rounded-3xl text-left flex items-center justify-between">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Privacy Policy</span>
                    <i className="fa-solid fa-external-link text-[10px] text-slate-700"></i>
                  </button>
                  <button className="w-full p-6 glass border border-white/5 rounded-3xl text-left flex items-center justify-between">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Terms of Service</span>
                    <i className="fa-solid fa-external-link text-[10px] text-slate-700"></i>
                  </button>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
