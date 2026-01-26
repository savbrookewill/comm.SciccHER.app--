
import React from 'react';
import { AppView } from '../types';
import { SeshClockIcon } from './Header';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const items = [
    { id: 'discovery', icon: 'fa-solid fa-sparkles', component: null, label: 'Explore' },
    { id: 'spark', icon: 'fa-solid fa-bolt-lightning', component: null, label: 'Electric' },
    { id: 'live', icon: 'fa-solid fa-tower-broadcast', component: null, label: 'Live' },
    { id: 'calendar', icon: '', component: <SeshClockIcon className="w-5 h-5" />, label: 'Sesh' },
    { id: 'profile', icon: 'fa-solid fa-user-ninja', component: null, label: 'Me' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-6 pt-5 pb-safe flex justify-between items-center shadow-[0_-20px_60px_rgba(0,0,0,0.8)] rounded-t-[2.5rem]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as AppView)}
          className={`flex flex-col items-center justify-center gap-1.5 py-2 transition-all duration-300 flex-1 relative ${
            currentView === item.id ? 'text-rose-400' : 'text-slate-500'
          }`}
        >
          {currentView === item.id && (
            <div className="absolute inset-0 bg-rose-500/5 blur-xl rounded-full animate-pulse"></div>
          )}
          
          <div className="relative z-10 transition-transform active:scale-75">
            {item.component ? (
              React.cloneElement(item.component as React.ReactElement<any>, { 
                color: currentView === item.id ? '#fb7185' : 'currentColor',
                className: "w-5 h-5"
              })
            ) : (
              <i className={`${item.icon} text-lg`}></i>
            )}
          </div>
          
          <span className={`text-[7px] font-black uppercase tracking-[0.2em] transition-opacity ${currentView === item.id ? 'opacity-100' : 'opacity-40'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
