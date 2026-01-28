
import React, { useState } from 'react';
import { User, DatingEvent } from '../types';
import SpeedDatingView from './SpeedDatingView';

interface EventsViewProps {
  user: User | null;
  onUpdateTickets: (count: number) => void;
}

const MOCK_EVENTS: DatingEvent[] = [
  { id: 'e1', title: 'Virtual Blind Sesh', type: 'Blind Date', date: 'LIVE NOW', time: 'Ongoing', attendees: 342, image: 'https://images.unsplash.com/photo-1550029330-8dbccaade873?w=800&q=80', isLive: true },
  { id: 'e2', title: 'Midnight Speed Dating', type: 'Speed Dating', date: 'Tonight', time: '11:00 PM', attendees: 89, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', isLive: false },
  { id: 'e3', title: 'Prismatic Blind Mix', type: 'Blind Date', date: 'Friday', time: '9:00 PM', attendees: 156, image: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=800&q=80' },
  { id: 'e4', title: 'Identity Mixer', type: 'Mixer', date: 'Saturday', time: '6:00 PM', attendees: 210, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80' },
];

const EventsView: React.FC<EventsViewProps> = ({ user, onUpdateTickets }) => {
  const [showSesh, setShowSesh] = useState(false);

  const buyTickets = () => {
    if (user?.isPremium) return;
    const count = prompt("Top up your Sesh credits? 1 Credit = 1 Live Window entry.", "3");
    if (count && parseInt(count) > 0) {
      const added = parseInt(count);
      onUpdateTickets((user?.speedDatingTickets || 0) + added);
    }
  };

  if (showSesh) {
    return (
      <div className="animate-in fade-in duration-700 h-full overflow-y-auto no-scrollbar">
        <button onClick={() => setShowSesh(false)} className="mb-6 px-4 py-3 rounded-2xl glass text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3 active:scale-95 transition-all">
          <i className="fa-solid fa-chevron-left"></i> Exit Event Scene
        </button>
        {/* Added onExit prop to resolve property missing error */}
        <SpeedDatingView user={user} onUpdateTickets={onUpdateTickets} onExit={() => setShowSesh(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-40 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col gap-1.5 px-3">
        <h2 className="text-5xl font-black tracking-tighter shimmer-text italic leading-none">The Scene</h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 opacity-70">Virtual Events & Gatherings</p>
      </div>

      {/* Ticket Status Card */}
      <div className="mx-1 p-8 glass rounded-[3.5rem] border-white/10 flex items-center justify-between shadow-2xl relative overflow-hidden group border-b-rose-500/20">
        <div className="absolute inset-0 petal-gradient opacity-5"></div>
        <div className="space-y-1 relative z-10">
          <p className="text-[8px] font-black text-rose-400 uppercase tracking-[0.3em]">Access Status</p>
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-black text-white italic tracking-tighter">
              {user?.isPremium ? 'Unlimited' : `${user?.speedDatingTickets || 0} Credits`}
            </h3>
            {user?.isPremium && <i className="fa-solid fa-crown text-rose-400 text-xs animate-bounce"></i>}
          </div>
        </div>
        {!user?.isPremium && (
          <button 
            onClick={buyTickets}
            className="relative z-10 px-6 py-4 shimmer-btn text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl active:scale-95 transition-all border border-white/20"
          >
            Top Up Credits
          </button>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] px-4 flex items-center gap-4">
           Active Hotspots
           <div className="h-[1px] flex-1 bg-white/5"></div>
        </h3>
        
        {MOCK_EVENTS.map(event => (
          <div key={event.id} onClick={() => setShowSesh(true)} className="relative aspect-[16/10] rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl group mx-1 bg-slate-900 cursor-pointer active:scale-95 transition-all">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            
            <div className="absolute top-8 left-8 flex gap-2">
              {event.isLive && (
                <div className="flex items-center gap-2 bg-rose-600 px-4 py-2 rounded-full shadow-2xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">LIVE SESH</span>
                </div>
              )}
              <div className="glass px-4 py-2 rounded-full border-white/10">
                <span className="text-[8px] font-black text-white/70 uppercase tracking-widest">{event.type}</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">{event.date} • {event.time}</p>
              <h4 className="text-3xl font-black text-white tracking-tighter italic leading-tight mb-2 group-hover:translate-x-1 transition-transform">{event.title}</h4>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-users text-[8px] text-slate-500"></i>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{event.attendees} interacting</span>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8">
               <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white border-white/10 group-hover:bg-rose-500 transition-all">
                  <i className="fa-solid fa-bolt-lightning text-lg"></i>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsView;
