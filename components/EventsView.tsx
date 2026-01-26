
import React, { useState } from 'react';
import { User, DatingEvent } from '../types';
import SpeedDatingView from './SpeedDatingView';

interface EventsViewProps {
  user: User | null;
  onUpdateTickets: (count: number) => void;
}

const MOCK_EVENTS: DatingEvent[] = [
  { id: 'e1', title: 'Late Night Blind Sesh', type: 'Blind Date', date: 'Tonight', time: '8:00 PM', attendees: 124, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', isLive: true },
  { id: 'e2', title: 'Speed Dating: Artists Edition', type: 'Speed Dating', date: 'Saturday', time: '7:00 PM', attendees: 56, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80' },
  { id: 'e3', title: 'Intentional Mix & Mingle', type: 'Mixer', date: 'Sunday', time: '4:00 PM', attendees: 89, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80' },
];

const EventsView: React.FC<EventsViewProps> = ({ user, onUpdateTickets }) => {
  const [showSesh, setShowSesh] = useState(false);

  const buyTickets = () => {
    const count = prompt("Purchase tickets for the next intentional event? Each ticket grants 1 Blind Sesh entry.", "3");
    if (count && parseInt(count) > 0) {
      const added = parseInt(count);
      onUpdateTickets((user?.speedDatingTickets || 0) + added);
      alert(`Successfully added ${added} Sesh tickets to your account. ✨`);
    }
  };

  if (showSesh) {
    return (
      <div className="animate-in fade-in duration-700">
        <button onClick={() => setShowSesh(false)} className="mb-8 px-4 py-2 rounded-2xl glass text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-3 group hover:text-white transition-colors">
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Back to City Events
        </button>
        <SpeedDatingView user={user} onUpdateTickets={onUpdateTickets} />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-40 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col gap-1.5 px-3">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text italic leading-none">City Events</h2>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1 opacity-60">Verified Intentional Gatherings</p>
      </div>

      {/* Ticket Balance Bento Card */}
      <div className="mx-1 p-10 glass rounded-[4rem] border-white/10 flex items-center justify-between shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group border-t-emerald-500/20">
        <div className="absolute inset-0 petal-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
        <div className="space-y-2 relative z-10">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
             <i className="fa-solid fa-sparkles text-emerald-500"></i>
             Sesh Credits
          </p>
          <div className="flex items-center gap-3">
            <p className="text-4xl font-black text-white italic tracking-tighter">
              {user?.isPremium ? 'Unlimited' : `${user?.speedDatingTickets || 0}`}
            </p>
            {user?.isPremium && (
               <div className="w-8 h-8 rounded-xl petal-gradient flex items-center justify-center shadow-lg">
                 <i className="fa-solid fa-crown text-[10px] text-white"></i>
               </div>
            )}
          </div>
        </div>
        <button 
          onClick={buyTickets}
          className="relative z-10 px-8 py-5 shimmer-btn text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl active:scale-95 transition-all border border-white/20"
        >
          {user?.isPremium ? 'Priority In' : 'Top Up'}
        </button>
      </div>

      <div className="space-y-8">
        <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] px-4 flex items-center gap-4">
           Scheduled Scene
           <div className="h-[1px] flex-1 bg-white/5"></div>
        </h3>
        
        {MOCK_EVENTS.map(event => (
          <div key={event.id} className="relative aspect-[16/11.5] rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] group mx-1 bg-slate-900 active:scale-[0.98] transition-all duration-500">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-70 group-hover:opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            <div className="absolute top-10 left-10 flex gap-3">
              {event.isLive && (
                <div className="flex items-center gap-3 bg-red-600/90 backdrop-blur-xl px-5 py-2.5 rounded-[1.5rem] shadow-2xl border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Live Sesh</span>
                </div>
              )}
              <span className="bg-white/5 backdrop-blur-3xl text-[9px] font-black px-5 py-2.5 rounded-[1.5rem] text-slate-200 uppercase tracking-[0.2em] border border-white/10">
                {event.type}
              </span>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">{event.date} @ {event.time}</p>
                <h3 className="text-4xl font-black text-white tracking-tighter leading-none mb-4 italic group-hover:translate-x-2 transition-transform">{event.title}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2.5">
                     {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-950 bg-slate-800 shadow-xl"></div>)}
                  </div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] italic">
                    {event.attendees}+ Intentions Fired
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowSesh(true)}
                className="w-16 h-16 shimmer-btn rounded-[2rem] flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.3)] active:scale-90"
              >
                <i className="fa-solid fa-bolt-lightning text-xl drop-shadow-[0_0_8px_white]"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-950/40 p-12 rounded-[4rem] border border-white/5 text-center space-y-6 mx-1 relative overflow-hidden group shadow-inner mt-12">
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-1000"></div>
        
        <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center text-emerald-400 mx-auto shadow-2xl border border-emerald-500/10 rotate-6 group-hover:rotate-0 transition-all duration-700">
          <i className="fa-solid fa-microphone-lines text-3xl"></i>
        </div>
        
        <div className="space-y-3 relative z-10 px-2">
          <h4 className="font-black text-3xl tracking-tighter text-white italic leading-none">Curate a Sesh</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium px-4 opacity-80">
            Verified hosts can create intentional Blind Sessions. Apply to lead your local community vibe.
          </p>
        </div>
        
        <button className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 hover:text-white transition-all pt-4 block w-full group-hover:scale-105">
           Become a Host <i className="fa-solid fa-sparkles ml-2 text-[8px]"></i>
        </button>
      </div>
    </div>
  );
};

export default EventsView;
