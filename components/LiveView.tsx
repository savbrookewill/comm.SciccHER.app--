
import React, { useState, useRef, useEffect } from 'react';
import { RoseIcon } from './Header';
import { GoogleGenAI } from "@google/genai";

interface Stream {
  id: number;
  hostId: string;
  host: string;
  viewers: string;
  location: string;
  title: string;
  img: string;
  vibeScore: number;
}

const LiveView: React.FC = () => {
  const [activeStream, setActiveStream] = useState<Stream | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [showSafetyAgreement, setShowSafetyAgreement] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');
  const [hearts, setHearts] = useState<{ id: number; left: number; color: string }[]>([]);
  const [vibePulse, setVibePulse] = useState(45); // 0-100 scale
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const streams: Stream[] = [
    { id: 1, hostId: 'u101', host: 'Zara', viewers: '1.2k', location: 'Bushwick', title: 'Late night chill & chat - Join local!', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60', vibeScore: 88 },
    { id: 2, hostId: 'u102', host: 'Luna', viewers: '850', location: 'Upper West Side', title: 'Q&A about local queer nightlife', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60', vibeScore: 62 },
    { id: 3, hostId: 'u103', host: 'Sky', viewers: '2.4k', location: 'West Village', title: 'Getting ready for the party tonight!', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60', vibeScore: 94 },
  ];

  const handleAiSuggest = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Suggest a catchy, intentional 1-sentence metropolitan conversation starter for a lesbian live stream. Focus on community, dating, or city vibes. Keep it sleek.",
        config: {
          systemInstruction: "You are ScissHER's AI moderator. Your tone is high-fashion, concise, and intentional."
        }
      });
      
      const text = response.text || "Let's talk about the intentional energy tonight.";
      setStreamTitle(text.replace(/"/g, ''));
    } catch (err) {
      setStreamTitle("Curating intentional vibes for the city.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const startBroadcast = () => setShowSafetyAgreement(true);

  const confirmSafetyAndStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      setShowSafetyAgreement(false);
      setIsBroadcasting(true);
      handleAiSuggest();
    } catch (err) {
      alert("Camera and Mic access are required to broadcast on ScissHER.");
    }
  };

  const endBroadcast = () => {
    if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
    setMediaStream(null);
    setIsBroadcasting(false);
    setStreamTitle('');
  };

  const spawnInteraction = () => {
    const id = Date.now();
    const colors = ['#fb7185', '#a855f7', '#6366f1', '#34d399'];
    setHearts(prev => [...prev, { 
      id, 
      left: Math.random() * 80 + 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    }]);
    setVibePulse(prev => Math.min(prev + 4, 100));
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 2500);
  };

  useEffect(() => {
    if (videoRef.current && mediaStream) videoRef.current.srcObject = mediaStream;
  }, [mediaStream, isBroadcasting]);

  // Periodic Vibe Score Decay to simulate real-time dynamics
  useEffect(() => {
    const timer = setInterval(() => {
      setVibePulse(prev => Math.max(prev - 1.5, 20));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // BROADCAST VIEW
  if (isBroadcasting) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col animate-in fade-in duration-500 overflow-hidden">
        <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover brightness-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        
        <div className="relative z-10 p-8 pt-safe flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <div className="bg-emerald-500/90 backdrop-blur-md px-5 py-2 rounded-full flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.5)] border border-white/20">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Broadcasting Live</span>
              </div>
              <div className="glass px-5 py-2.5 rounded-2xl flex items-center gap-3 border-white/10 w-fit">
                <i className="fa-solid fa-users text-emerald-400 text-[10px]"></i>
                <span className="text-[11px] font-black text-white/90">428 Intentions</span>
              </div>
            </div>
            <button onClick={endBroadcast} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all border-white/20">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="space-y-6 pb-safe mb-10">
            <div className="glass p-8 rounded-[2.5rem] border-white/10 space-y-4 shadow-2xl backdrop-blur-3xl">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-sparkles text-emerald-400 text-xs"></i>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Scene Intel Suggestion:</p>
              </div>
              <h2 className="text-white text-2xl font-black italic tracking-tighter leading-tight">
                {isAiLoading ? "Curating the perfect vibe..." : streamTitle || "Let's connect intentionally."}
              </h2>
              <button 
                onClick={handleAiSuggest}
                disabled={isAiLoading}
                className="text-[9px] font-black text-emerald-400 uppercase tracking-widest hover:text-white transition-colors"
              >
                {isAiLoading ? 'Regenerating...' : 'Refresh Topic'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="py-5 bg-white text-black rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2">
                 <i className="fa-solid fa-microphone"></i> Mute
              </button>
              <button onClick={endBroadcast} className="py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] active:scale-95 transition-all">
                 End Sesh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE STREAM VIEWER
  if (activeStream) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-700 overflow-hidden">
        <img src={activeStream.img} className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40"></div>
        
        {/* Floating Particles HUD */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {hearts.map(h => (
            <div 
              key={h.id} 
              className="absolute bottom-32 transition-all duration-[2.5s] animate-out slide-out-to-top-[600px] fade-out" 
              style={{ left: `${h.left}%`, color: h.color }}
            >
              <RoseIcon className="w-10 h-10 drop-shadow-[0_0_15px_currentColor]" color="currentColor" />
            </div>
          ))}
        </div>

        <div className="relative z-10 p-8 pt-safe flex flex-col h-full justify-between">
          {/* Header HUD */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-[1.5rem] border-2 border-rose-500/50 p-0.5 overflow-hidden shadow-2xl bg-black/50 backdrop-blur-md">
                 <img src={`https://i.pravatar.cc/150?u=${activeStream.host}`} className="w-full h-full object-cover rounded-[1.2rem]" />
               </div>
               <div className="space-y-0.5">
                 <h4 className="font-black text-white text-lg tracking-tighter italic leading-none">{activeStream.host}</h4>
                 <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-slate-300 text-[8px] font-black uppercase tracking-widest">{activeStream.viewers} Watching</span>
                 </div>
               </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 glass border-white/10 rounded-xl flex items-center justify-center text-white active:scale-90">
                <i className="fa-solid fa-share-nodes text-[10px]"></i>
              </button>
              <button onClick={() => setActiveStream(null)} className="w-10 h-10 glass border-white/10 rounded-xl flex items-center justify-center text-white active:scale-90">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          {/* Vibe Pulse Meter HUD */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <div className="h-64 w-2.5 bg-white/10 rounded-full relative overflow-hidden border border-white/5 backdrop-blur-xl">
              <div 
                className="absolute bottom-0 w-full petal-gradient transition-all duration-1000 shadow-[0_0_15px_#fb7185]"
                style={{ height: `${vibePulse}%` }}
              ></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <i className="fa-solid fa-bolt-lightning text-rose-400 text-xs animate-pulse"></i>
              <span className="text-[7px] font-black text-rose-400 uppercase tracking-widest">Pulse</span>
            </div>
          </div>

          {/* Chat and Interaction Layer */}
          <div className="space-y-6 pb-safe mb-8">
            <div className="space-y-3 max-h-[25vh] overflow-y-auto no-scrollbar mask-gradient-b pr-8">
              {[
                { u: 'Maya', m: 'This conversation topic is exactly what the city needs. ✨' },
                { u: 'Sasha', m: 'Bushwick energy is unmatched tonight.' },
                { u: 'Elena', m: 'Join us for the speed date later?' }
              ].map((msg, i) => (
                <div key={i} className="flex gap-3 items-start animate-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="glass px-4 py-3 rounded-[1.5rem] border-white/10 max-w-[85%] shadow-lg">
                    <p className="text-[8px] font-black text-rose-400 uppercase tracking-widest mb-1">{msg.u}</p>
                    <p className="text-xs text-white/95 font-medium italic leading-relaxed">{msg.m}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex-1 glass border-white/10 rounded-full px-6 py-4 flex items-center gap-3 shadow-2xl">
                 <input type="text" placeholder="Add to the vibe..." className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder:text-slate-500" />
                 <button className="text-rose-400 active:scale-90 transition-transform"><i className="fa-solid fa-paper-plane"></i></button>
              </div>
              <button onClick={spawnInteraction} className="w-16 h-16 shimmer-btn rounded-full flex items-center justify-center text-white shadow-2xl active:scale-125 transition-all border border-white/30">
                <RoseIcon className="w-8 h-8 drop-shadow-[0_0_10px_white]" color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN LIVE DIRECTORY
  return (
    <div className="space-y-12 pb-40 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-4xl font-black tracking-tighter shimmer-text italic leading-none">Local Live</h2>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] opacity-70">Metropolitan Scene Intel</p>
        </div>
        <button onClick={startBroadcast} className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-rose-400 shadow-2xl active:scale-90 transition-all border border-white/10">
          <i className="fa-solid fa-tower-broadcast text-2xl"></i>
        </button>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between px-3">
          <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-4">
             Active Happening
             <div className="h-[1px] flex-1 bg-white/5"></div>
          </h3>
          <div className="flex gap-1.5 items-center bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/10">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
            <span className="text-rose-500 text-[8px] font-black uppercase tracking-widest">Real-time</span>
          </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-10 snap-x no-scrollbar px-2">
          {streams.map(stream => (
            <div 
              key={stream.id} 
              onClick={() => setActiveStream(stream)} 
              className="min-w-[290px] aspect-[9/15] rounded-[4.5rem] bg-slate-900 overflow-hidden relative snap-center border border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] group cursor-pointer transition-all duration-700 hover:scale-[1.02]"
            >
              <img src={stream.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20"></div>
              
              <div className="absolute top-10 left-10 flex flex-col gap-3">
                <span className="bg-rose-500 text-[8px] font-black px-4 py-1.5 rounded-full text-white uppercase tracking-widest border border-white/20 w-fit">LIVE</span>
                <span className="glass backdrop-blur-xl text-[8px] font-black px-4 py-1.5 rounded-full text-white flex items-center gap-2 border border-white/10 w-fit">
                  <i className="fa-solid fa-bolt text-[8px] text-rose-400"></i> {stream.vibeScore}% Pulse
                </span>
              </div>
              
              <div className="absolute bottom-12 left-10 right-10 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-[1.5rem] border-2 border-rose-500/50 p-0.5 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${stream.host}`} className="w-full h-full object-cover rounded-[1.2rem]" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-black text-white text-xl italic tracking-tighter leading-none">{stream.host}</h4>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{stream.location}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-100 leading-snug line-clamp-2 italic pr-4 opacity-90">
                   "{stream.title}"
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-[2px]">
                 <div className="w-20 h-20 rounded-full petal-gradient flex items-center justify-center text-white text-2xl shadow-[0_0_40px_rgba(251,113,133,0.4)] border border-white/20">
                    <i className="fa-solid fa-play ml-1"></i>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION BROADCAST */}
      <div className="mx-1 p-12 glass rounded-[4.5rem] border-white/10 relative overflow-hidden group shadow-inner">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-500/5 blur-[120px] rounded-full group-hover:bg-rose-500/10 transition-all duration-1000"></div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-5">
             <div className="w-16 h-16 rounded-[2rem] bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 shadow-xl group-hover:rotate-12 transition-all">
                <i className="fa-solid fa-video text-2xl"></i>
             </div>
             <div>
                <h3 className="font-black text-3xl tracking-tighter text-white italic leading-none">Host a Sesh</h3>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Lead the Metropolitan Vibe</p>
             </div>
          </div>
          <p className="text-sm text-slate-400 font-medium leading-relaxed italic px-2">
            Share your intentional energy, start real conversations, and connect with local sparks in a way that feels 100% human.
          </p>
          <button onClick={startBroadcast} className="w-full py-6 shimmer-btn text-white rounded-[2.25rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl border border-white/20 active:scale-95 transition-all mt-4">
            Start Live Broadcast
          </button>
        </div>
      </div>

      {/* SAFETY OVERLAY */}
      {showSafetyAgreement && (
        <div className="fixed inset-0 z-[300] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-8 animate-in fade-in duration-500">
           <div className="w-full max-w-sm glass rounded-[4rem] border-white/10 p-12 space-y-12 shadow-2xl text-center">
              <div className="space-y-5">
                <div className="w-24 h-24 bg-rose-500/10 rounded-[2.5rem] flex items-center justify-center text-rose-500 mx-auto border border-rose-500/20 mb-2 shadow-xl rotate-6">
                  <i className="fa-solid fa-hand-holding-heart text-4xl"></i>
                </div>
                <h3 className="text-4xl font-black text-white italic tracking-tighter leading-none">Intentional Space</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400">Safe Interaction Protocol</p>
              </div>

              <div className="p-7 glass rounded-[2.5rem] border-white/5 text-center">
                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                   "ScissHER maintains a zero-tolerance policy. AI moderation and human oversight ensure this sesh remains safe for everyone."
                 </p>
              </div>

              <div className="space-y-4 pt-4">
                <button onClick={confirmSafetyAndStart} className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl border border-white/20 active:scale-95 transition-all">
                   Accept & Go Live
                </button>
                <button onClick={() => setShowSafetyAgreement(false)} className="w-full text-[9px] font-black uppercase tracking-[0.5em] text-slate-600 py-2 hover:text-white transition-colors">
                   Return to Directory
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LiveView;
