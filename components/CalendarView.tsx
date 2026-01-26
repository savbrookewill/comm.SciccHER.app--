
import React, { useState } from 'react';
import { SeshRequest } from '../types';

interface ExtendedSeshRequest extends SeshRequest {
  senderName: string;
  senderPhoto: string;
  distance: string;
}

const CalendarView: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const slots = ['Morning', 'Afternoon', 'Evening', 'Night'];
  
  const [myAvailability, setMyAvailability] = useState<Record<string, string[]>>({
    'Fri': ['Evening', 'Night'],
    'Sat': ['Afternoon', 'Evening']
  });

  const [requests, setRequests] = useState<ExtendedSeshRequest[]>([
    {
      id: 'r1',
      senderId: 'u2',
      senderName: 'Elena',
      senderPhoto: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200',
      receiverId: 'me',
      day: 'Fri',
      slot: 'Night',
      note: 'Coffee at that queer bookstore? ☕️',
      status: 'pending',
      timestamp: Date.now(),
      distance: '3 mi'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'planner' | 'requests'>('planner');

  const toggleSlot = (day: string, slot: string) => {
    setMyAvailability(prev => {
      const currentSlots = prev[day] || [];
      if (currentSlots.includes(slot)) {
        return { ...prev, [day]: currentSlots.filter(s => s !== slot) };
      } else {
        return { ...prev, [day]: [...currentSlots, slot] };
      }
    });
  };

  return (
    <div className="space-y-10 pb-40 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2">
      <div className="flex flex-col gap-1.5 px-4">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text leading-none italic">Sesh Center</h2>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1 opacity-70 italic">Define Your Intentional Window</p>
      </div>

      <div className="flex bg-slate-900/40 p-1.5 rounded-[3rem] border border-white/5 mx-1 shadow-inner relative z-10 backdrop-blur-2xl">
        <button 
          onClick={() => setActiveTab('planner')}
          className={`flex-1 py-4 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-2.5 ${
            activeTab === 'planner' ? 'bg-slate-800 text-white shadow-2xl scale-100' : 'text-slate-500 scale-95 opacity-50 hover:opacity-100'
          }`}
        >
          <i className="fa-solid fa-calendar-heart"></i>
          Planner
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-4 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-2.5 relative ${
            activeTab === 'requests' ? 'bg-rose-500/10 text-rose-400 shadow-2xl scale-100' : 'text-slate-500 scale-95 opacity-50 hover:opacity-100'
          }`}
        >
          <i className="fa-solid fa-paper-plane"></i>
          Requests
          {requests.length > 0 && (
            <span className="absolute top-3 right-8 w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse shadow-[0_0_12px_#fb7185]"></span>
          )}
        </button>
      </div>

      {activeTab === 'planner' ? (
        <div className="space-y-8 animate-in slide-in-from-left-6 duration-700 px-1">
          <div className="glass rounded-[4.5rem] p-12 border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] relative overflow-hidden group border-t-rose-500/20">
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-rose-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <h3 className="text-[10px] font-black text-slate-400 mb-12 flex items-center gap-5 uppercase tracking-[0.4em] italic">
              <div className="w-12 h-12 rounded-[1.5rem] bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/20 shadow-xl group-hover:rotate-12 transition-transform">
                <i className="fa-solid fa-bolt text-lg"></i>
              </div>
              Intentional Window
            </h3>
            
            <div className="grid grid-cols-8 gap-4 mb-10 px-2">
              <div className="col-span-1"></div>
              {days.map(d => (
                <div key={d} className="text-center text-[9px] font-black text-slate-500 uppercase tracking-tighter opacity-50">{d[0]}</div>
              ))}
            </div>

            <div className="space-y-8">
              {slots.map(slot => (
                <div key={slot} className="grid grid-cols-8 gap-4 items-center">
                  <div className="col-span-1 text-[8px] font-black text-slate-600 uppercase pr-1 text-right opacity-60 italic">{slot[0]}</div>
                  {days.map(day => {
                    const isActive = myAvailability[day]?.includes(slot);
                    return (
                      <button
                        key={`${day}-${slot}`}
                        onClick={() => toggleSlot(day, slot)}
                        className={`aspect-square transition-all duration-500 relative flex items-center justify-center group/btn ${
                          isActive 
                            ? 'petal-gradient shadow-[0_15px_30px_rgba(251,113,133,0.3)] scale-110 z-10 rounded-[1.25rem] border border-white/30' 
                            : 'bg-slate-950/60 border border-white/5 hover:border-rose-500/30 rounded-[1rem] scale-90 hover:scale-95'
                        }`}
                      >
                        {isActive ? (
                          <div className="animate-in zoom-in duration-300">
                             <i className="fa-solid fa-heart text-[10px] text-white drop-shadow-md"></i>
                          </div>
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-slate-800 transition-colors group-hover/btn:bg-rose-500/40"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="mt-16 flex gap-6 p-10 bg-slate-950/60 rounded-[4rem] border border-white/5 items-center shadow-inner group/tip">
              <div className="w-14 h-14 rounded-[1.75rem] bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0 shadow-xl group-hover/tip:scale-110 transition-transform">
                <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
                <span className="text-rose-400 font-black tracking-widest uppercase text-[10px] block mb-1">Sesh Intelligence:</span> Overlap triggers a verified Sesh invitation instantly.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-right-6 duration-700 px-1">
           {requests.length === 0 ? (
            <div className="text-center py-40 glass rounded-[4.5rem] border-white/5 space-y-8">
              <div className="w-28 h-28 bg-slate-900/80 rounded-[3rem] flex items-center justify-center text-slate-800 mx-auto border border-white/5 shadow-inner">
                <i className="fa-solid fa-envelope-open text-5xl"></i>
              </div>
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em] italic px-10">No intentional sparks reflected yet</p>
            </div>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="glass rounded-[4rem] p-10 border border-white/10 hover:border-rose-500/30 transition-all duration-500 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] group active:scale-[0.98]">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-2xl relative z-10">
                      <img src={req.senderPhoto} alt={req.senderName} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-11 h-11 bg-rose-500 rounded-[1.25rem] flex items-center justify-center text-white text-base border-4 border-slate-950 shadow-2xl z-20 animate-bounce">
                      <i className="fa-solid fa-bolt-lightning"></i>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <h4 className="font-black text-white text-3xl tracking-tighter flex items-center gap-3 italic">
                      {req.senderName}
                      <i className="fa-solid fa-sparkle text-[12px] text-rose-400 animate-pulse"></i>
                    </h4>
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.25em]">{req.day} • {req.slot}</p>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wide italic opacity-70">{req.distance} away from your scene</p>
                  </div>
                </div>
                
                <div className="mt-10 bg-slate-950/60 p-6 rounded-[2.5rem] border border-white/5 italic text-slate-300 text-sm text-center font-medium leading-relaxed px-8">
                  "{req.note}"
                </div>

                <div className="mt-10 flex gap-5">
                  <button className="flex-1 py-6 bg-slate-900 border border-white/5 rounded-[2.25rem] text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-red-400 transition-all active:scale-95 shadow-lg">Pass</button>
                  <button className="flex-[2.5] py-6 shimmer-btn rounded-[2.25rem] text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl shadow-rose-500/30 active:scale-95 border border-white/20">Accept Sesh</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
