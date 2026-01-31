
import React, { useState } from 'react';
import { User } from '../types';
import { GoogleGenAI } from "@google/genai";
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { MOCK_USERS } from '../constants';

interface VaultViewProps {
  user: User | null;
  onGrantAccess: (id: string) => void;
}

const VaultView: React.FC<VaultViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'public' | 'private' | 'access'>('public');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [showKeyNeeded, setShowKeyNeeded] = useState(false);

  // Mocking users who have requested or have access
  const [accessPermissions, setAccessPermissions] = useState<Record<string, boolean>>({
    'u2': true,
    'u3': false
  });

  if (!user) return null;

  const photos = activeTab === 'public' ? user.publicPhotos : user.privatePhotos;

  const handleToggleAccess = async (userId: string) => {
    const isGranted = accessPermissions[userId];
    await Haptics.impact({ style: ImpactStyle.Medium });
    setAccessPermissions(prev => ({
      ...prev,
      [userId]: !isGranted
    }));
    if (!isGranted) {
      await Haptics.notification({ type: NotificationType.Success });
    }
  };

  const handleMagicEdit = async () => {
    if (!selectedPhoto || !editPrompt) return;
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: selectedPhoto.split(',')[1], mimeType: 'image/png' } },
            { text: `Edit this photo as requested: ${editPrompt}` }
          ]
        }
      });
      
      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setSelectedPhoto(`data:image/png;base64,${part.inlineData.data}`);
          foundImage = true;
        }
      }
      
      if (foundImage) {
        await Haptics.impact({ style: ImpactStyle.Heavy });
      }
    } catch (err) {
      console.error(err);
      alert("Magic Edit currently unavailable. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnimate = async () => {
    if (!selectedPhoto) return;
    
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
    if (!hasKey) {
      setShowKeyNeeded(true);
      return;
    }

    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Animate this metropolitan portrait with subtle cinematic motion and professional lighting.',
        image: { 
          imageBytes: selectedPhoto.split(',')[1], 
          mimeType: 'image/png' 
        },
        config: { 
          numberOfVideos: 1, 
          resolution: '720p', 
          aspectRatio: '9:16' 
        }
      });
      
      while (!operation.done) {
        await new Promise(r => setTimeout(r, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }
      
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const vidResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await vidResponse.blob();
      setGeneratedVideo(URL.createObjectURL(blob));
      await Haptics.notification({ type: NotificationType.Success });
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        alert("API Key error. Please re-select your paid project key.");
        await (window as any).aistudio?.openSelectKey();
      } else {
        alert("Animation failed. Ensure you have a valid paid API key selected.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenKeyPicker = async () => {
    setShowKeyNeeded(false);
    await (window as any).aistudio?.openSelectKey();
    handleAnimate();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 px-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text italic leading-none">Vibe Vault</h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic opacity-70">Media Studio & Bio-Proofs</p>
      </div>

      <div className="flex bg-slate-900/40 p-1 rounded-[2.5rem] border border-white/5 mx-1">
        <button 
          onClick={() => setActiveTab('public')}
          className={`flex-1 py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'public' ? 'bg-slate-800 text-white shadow-xl' : 'text-slate-500'}`}
        >
          Public
        </button>
        <button 
          onClick={() => setActiveTab('private')}
          className={`flex-1 py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'private' ? 'bg-slate-800 text-white shadow-xl' : 'text-slate-500'}`}
        >
          Private
        </button>
        <button 
          onClick={() => setActiveTab('access')}
          className={`flex-1 py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'access' ? 'bg-rose-500/10 text-rose-400 shadow-xl' : 'text-slate-500'}`}
        >
          <i className="fa-solid fa-user-lock text-[8px]"></i> Access
        </button>
      </div>

      {activeTab !== 'access' ? (
        <div className="grid grid-cols-2 gap-4">
          {photos.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedPhoto(img)}
              className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group transition-all cursor-pointer active:scale-95"
            >
              <img src={img} alt="Vault item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <i className="fa-solid fa-wand-magic-sparkles text-white text-2xl drop-shadow-lg"></i>
              </div>
              {activeTab === 'private' && (
                <div className="absolute top-4 left-4">
                  <div className="bg-rose-500/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <i className="fa-solid fa-lock text-[8px] text-white"></i>
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Vaulted</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
          <div className="glass p-8 rounded-[3rem] border-white/10 space-y-4">
            <h3 className="text-xl font-black text-white italic tracking-tighter">Private Access Keys</h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
              Grant exclusive "Keys" to your private gallery for intentional connections. Access can be revoked instantly.
            </p>
          </div>

          <div className="space-y-4">
            {MOCK_USERS.filter(u => u.id !== user.id).map(u => {
              const hasAccess = accessPermissions[u.id];
              return (
                <div key={u.id} className="glass p-5 rounded-[2.5rem] flex items-center justify-between border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
                      <img src={u.mainPhoto} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white italic tracking-tighter">{u.name}</h4>
                      <p className={`text-[8px] font-black uppercase tracking-widest ${hasAccess ? 'text-rose-400' : 'text-slate-500'}`}>
                        {hasAccess ? 'Key Issued' : 'No Access'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToggleAccess(u.id)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      hasAccess ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-slate-900 text-slate-500 border border-white/5'
                    }`}
                  >
                    <i className={`fa-solid ${hasAccess ? 'fa-key' : 'fa-key-skeleton'}`}></i>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-8 text-center opacity-40">
            <i className="fa-solid fa-shield-halved text-4xl text-slate-800 mb-4"></i>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Neural Encryption Active</p>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div className="fixed inset-0 z-[600] bg-slate-950 p-8 flex flex-col animate-in slide-in-from-bottom duration-500">
          <div className="flex justify-between items-center mb-10 pt-safe">
            <h3 className="text-2xl font-black italic tracking-tighter shimmer-text leading-none">Vibe Studio</h3>
            <button 
              onClick={() => { setSelectedPhoto(null); setGeneratedVideo(null); }} 
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="flex-1 relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
            {generatedVideo ? (
              <video src={generatedVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={selectedPhoto} className="w-full h-full object-cover" />
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
                <i className="fa-solid fa-sparkles text-rose-500 text-4xl animate-spin"></i>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white animate-pulse">Synthesizing Vibe...</p>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <div className="glass p-4 rounded-[2rem] border-white/10 flex items-center gap-3">
              <input 
                type="text" 
                placeholder="Edit: 'Retro filter', 'Add glow'..." 
                className="bg-transparent border-none text-xs text-white flex-1 focus:outline-none placeholder:text-slate-600 italic px-4"
                value={editPrompt}
                onChange={e => setEditPrompt(e.target.value)}
              />
              <button onClick={handleMagicEdit} className="text-rose-400 font-black text-[10px] uppercase tracking-widest px-4 active:scale-90 transition-all">Apply</button>
            </div>
            <button 
              onClick={handleAnimate} 
              className="w-full py-6 shimmer-btn rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] text-white shadow-2xl border border-white/20 active:scale-95"
            >
              Animate with Veo
            </button>
          </div>
        </div>
      )}

      {showKeyNeeded && (
        <div className="fixed inset-0 z-[700] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
          <div className="w-full max-w-sm glass p-10 rounded-[4rem] border-white/10 text-center space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 petal-gradient"></div>
            <div className="w-20 h-20 bg-rose-500/10 rounded-[2rem] flex items-center justify-center text-rose-500 mx-auto border border-rose-500/20">
              <i className="fa-solid fa-key text-3xl"></i>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white italic tracking-tighter">Paid Project Required</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed italic px-2">
                Cinematic animation via Veo requires selecting a Paid API Key from your Google Cloud project.
              </p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={handleOpenKeyPicker}
                className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl border border-white/20"
              >
                Select My API Key
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noreferrer"
                className="block text-[9px] font-black text-slate-500 uppercase tracking-widest underline"
              >
                Learn About Billing
              </a>
              <button 
                onClick={() => setShowKeyNeeded(false)}
                className="text-[9px] font-black text-slate-600 uppercase tracking-widest pt-2"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultView;
