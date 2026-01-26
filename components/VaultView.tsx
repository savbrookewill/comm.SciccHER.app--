
import React, { useState } from 'react';
import { User } from '../types';

interface VaultViewProps {
  user: User | null;
  onGrantAccess: (id: string) => void;
}

const MOCK_MATCHES = [
  { id: 'u2', name: 'Elena', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200', status: 'Intentional Match' },
  { id: 'u3', name: 'Sasha', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', status: 'Recent Connection' },
  { id: 'u4', name: 'Jordan', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200', status: 'Sesh Scheduled' },
];

const VaultView: React.FC<VaultViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [accessList, setAccessList] = useState<string[]>(['u2']);
  const [isUploading, setIsUploading] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  if (!user) return null;

  const photos = activeTab === 'public' ? user.publicPhotos : user.privatePhotos;

  const toggleAccess = (id: string) => {
    setAccessList(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        alert(`Successfully encrypted and saved to your ${activeTab === 'public' ? 'Public' : 'Private'} vault. ✨`);
      }, 1500);
    }
  };

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    setDraggedIdx(idx);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 px-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text">Media Vault</h2>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-lock-keyhole text-[10px] text-green-500"></i>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">End-to-End Encrypted Storage</p>
        </div>
      </div>

      <div className="flex bg-slate-900/50 p-1.5 rounded-[2.5rem] border border-white/5 mx-1 shadow-inner relative">
        <button 
          onClick={() => setActiveTab('public')}
          className={`flex-1 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all ${
            activeTab === 'public' ? 'bg-slate-800 text-white shadow-xl' : 'text-slate-500'
          }`}
        >
          Public Gallery
        </button>
        <button 
          onClick={() => setActiveTab('private')}
          className={`flex-1 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            activeTab === 'private' ? 'bg-pink-600/20 text-pink-400' : 'text-slate-500'
          }`}
        >
          <i className="fa-solid fa-lock text-[10px]"></i>
          Private Access
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="aspect-square bg-slate-900/40 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/50 transition-all group shadow-xl relative overflow-hidden">
          <input type="file" multiple onChange={handleUpload} className="hidden" />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <i className="fa-solid fa-spinner-third animate-spin text-pink-500 text-2xl"></i>
              <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest">Encrypting...</span>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <i className="fa-solid fa-cloud-arrow-up text-slate-500 text-xl group-hover:text-pink-500"></i>
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-center px-4">Secure Upload</span>
            </>
          )}
        </label>

        {photos.map((img, i) => (
          <div 
            key={i} 
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => { e.preventDefault(); handleDragOver(i); }}
            onDragEnd={handleDragEnd}
            className={`relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group transition-all duration-300 ${
              draggedIdx === i ? 'scale-95 opacity-50 rotate-2' : ''
            }`}
          >
            <img src={img} alt="Vault item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="px-4 py-6 bg-slate-900/30 rounded-[3rem] border border-white/5 text-center">
        <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest leading-relaxed">
          Your private media is never shared with third parties. <br/> Access is granted exclusively by <span className="text-pink-500">you</span>.
        </p>
      </div>
    </div>
  );
};

export default VaultView;
