
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface SpeedDatingViewProps {
  user: User | null;
  onUpdateTickets: (count: number) => void;
}

const SESSION_DURATION = 180; // 3 minutes
const REVEAL_START_TIME = 30; // Unblur starts at 30s left

const SpeedDatingView: React.FC<SpeedDatingViewProps> = ({ user, onUpdateTickets }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [timer, setTimer] = useState(SESSION_DURATION);
  const [blurAmount, setBlurAmount] = useState(40);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    let interval: any;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          const next = prev - 1;
          
          if (next > REVEAL_START_TIME) {
            setBlurAmount(40);
          } else {
            const progress = next / REVEAL_START_TIME;
            setBlurAmount(40 * progress);
          }
          
          return next;
        });
      }, 1000);
    } else if (timer === 0 && isActive) {
      setBlurAmount(0);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const startSearching = async () => {
    if (!user) return;
    
    if (!user.isPremium && user.speedDatingTickets <= 0) {
      alert("You're out of tickets! Purchase more or upgrade to Premium for unlimited seshes.");
      return;
    }

    try {
      const userMedia = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userMedia);
      setIsSearching(true);

      setTimeout(() => {
        setIsSearching(false);
        setIsActive(true);
        if (!user.isPremium) {
          onUpdateTickets(user.speedDatingTickets - 1);
        }
      }, 4000);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Camera and Microphone access are required for Blind Sesh.");
    }
  };

  useEffect(() => {
    if (videoRef.current && stream && (isActive || isSearching)) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, isActive, isSearching]);

  const handleDecision = (type: 'cut' | 'spark') => {
    if (type === 'spark') {
      alert("Intentional Connection! ✨ It's a mutual Spark. Connection added to your Electric Scene.");
    } else {
      alert("Connection cut with intention. ✂️ Returning to the city.");
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
    setTimer(SESSION_DURATION);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="relative">
          <div className="w-56 h-56 rounded-full border-[1px] border-emerald-500/20 border-t-emerald-400 animate-spin-slow"></div>
          <div className="absolute inset-6 rounded-full overflow-hidden grayscale opacity-20 blur-[2px]">
             <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 petal-gradient rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(16,185,129,0.5)]">
               <i className="fa-solid fa-tower-broadcast text-white text-2xl"></i>
             </div>
          </div>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black tracking-tighter shimmer-text uppercase italic">Scanning Your Area</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] leading-relaxed">Finding another soul <br/> with matching intent</p>
        </div>
      </div>
    );
  }

  if (!isActive && timer === SESSION_DURATION) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] text-center px-6 space-y-10 animate-in zoom-in duration-500">
        <div className="relative group">
          <div className="absolute -inset-8 bg-emerald-500/10 blur-[60px] rounded-full animate-pulse"></div>
          <div className="w-48 h-48 rounded-[3.5rem] bg-slate-900 flex items-center justify-center border border-white/10 shadow-2xl relative z-10 transition-transform duration-700 group-hover:rotate-6">
            <div className="absolute inset-0 petal-gradient opacity-10 rounded-[3.5rem]"></div>
            <i className="fa-solid fa-eye-slash text-7xl text-white/90 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]"></i>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-5xl font-black tracking-tighter shimmer-text leading-none">Blind Sesh</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto px-4 opacity-80">
            A 3-minute window where energy speaks first. Connection unblurs in the final 30 seconds.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-6">
          <button 
            onClick={startSearching}
            className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-[0_25px_50px_-12px_rgba(16,185,129,0.3)] active:scale-95 transition-all flex items-center justify-center gap-4 text-xs border border-white/20"
          >
            <i className="fa-solid fa-bolt-lightning"></i>
            Enter The Sesh
          </button>

          <div className="glass p-6 rounded-[2.5rem] border-white/5 shadow-inner">
            {user?.isPremium ? (
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                <i className="fa-solid fa-crown text-xs"></i> Premium Unlimited Access
              </p>
            ) : (
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Window Credits: {user?.speedDatingTickets}</span>
                <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-white transition-colors">Buy Pack</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[78vh] space-y-6 animate-in fade-in duration-1000">
      <div className="relative aspect-[9/16] w-full rounded-[4.5rem] overflow-hidden border border-white/10 bg-slate-950 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
        
        {/* Remote Video Stream with Prismatic Blur */}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          className="w-full h-full object-cover transition-[filter] duration-1000 ease-linear"
          style={{ filter: `blur(${blurAmount}px) brightness(${1.1}) contrast(1.1)` }}
        />

        {/* Squircle Self View */}
        <div className="absolute top-10 right-10 w-28 h-40 rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl glass z-20 active:scale-150 transition-transform">
          <video 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-80"
            onLoadedMetadata={(e) => {
               (e.target as HTMLVideoElement).srcObject = stream;
            }}
          />
          <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none"></div>
        </div>

        {/* HUD Elements */}
        <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] drop-shadow-xl flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                 Connection Active
              </p>
              <h3 className="text-6xl font-black text-white tracking-tighter drop-shadow-2xl italic leading-none">
                {formatTime(timer)}
              </h3>
            </div>
            
            <div className="glass px-5 py-2.5 rounded-[1.5rem] border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Sesh #729</span>
            </div>
          </div>

          <div className="space-y-10">
            {/* Vibe Visualizer Progress Bar */}
            <div className="space-y-3">
               <div className="flex justify-between items-end px-2">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Reveal Progress</span>
                  <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                    {timer > REVEAL_START_TIME ? "Energy Phase" : "Unveiling..."}
                  </span>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 backdrop-blur-3xl">
                  <div 
                    className="h-full petal-gradient transition-all duration-1000 ease-linear shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    style={{ width: `${(1 - timer / SESSION_DURATION) * 100}%` }}
                  ></div>
               </div>
            </div>
            
            <div className="text-center opacity-60">
               <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.5em]">
                 Intentional Connection Mode
               </p>
            </div>
          </div>
        </div>

        {/* SUDDEN DECISION MODAL (Instant Impact) */}
        {timer === 0 && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl flex flex-col items-center justify-center p-10 z-50 animate-in zoom-in duration-500">
            <div className="w-full space-y-12">
               <div className="text-center space-y-4">
                 <div className="w-20 h-20 glass rounded-[2rem] mx-auto flex items-center justify-center text-white border-white/10 shadow-2xl mb-6">
                    <i className="fa-solid fa-sparkles text-3xl text-emerald-400"></i>
                 </div>
                 <h2 className="text-5xl font-black tracking-tighter text-white italic leading-none">Unveiled.</h2>
                 <p className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.5em] opacity-80">Instant Intent Required</p>
               </div>
               
               <div className="grid grid-cols-1 gap-5">
                  <button 
                    onClick={() => handleDecision('spark')}
                    className="w-full py-7 shimmer-btn text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)] border border-white/30 flex items-center justify-center gap-5 group text-sm active:scale-95"
                  >
                    <i className="fa-solid fa-bolt-lightning text-xl animate-pulse"></i>
                    Spark Match
                  </button>
                  
                  <button 
                    onClick={() => handleDecision('cut')}
                    className="w-full py-6 glass border border-white/10 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95"
                  >
                    <i className="fa-solid fa-scissors mr-3"></i> Cut Connection
                  </button>
               </div>
               
               <p className="text-[9px] text-center text-slate-600 font-bold uppercase tracking-widest px-8 leading-relaxed italic">
                 Both users must Spark to unlock <br/> the Electric Scene.
               </p>
            </div>
          </div>
        )}
      </div>

      {/* Control Strip */}
      <div className="flex justify-center gap-8 pb-4">
        <button className="w-16 h-16 rounded-[2rem] glass flex items-center justify-center text-slate-300 border border-white/10 shadow-xl active:scale-90 transition-all hover:text-emerald-400 hover:border-emerald-500/20">
          <i className="fa-solid fa-microphone text-xl"></i>
        </button>
        <button 
          onClick={() => handleDecision('cut')} 
          className="w-16 h-16 rounded-[2rem] glass flex items-center justify-center text-red-500/80 border border-red-500/10 shadow-xl active:scale-90 transition-all hover:bg-red-500/10"
        >
          <i className="fa-solid fa-phone-slash text-xl rotate-[-135deg]"></i>
        </button>
      </div>
    </div>
  );
};

export default SpeedDatingView;
