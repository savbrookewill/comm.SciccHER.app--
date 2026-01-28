
export interface Prompt {
  id: string;
  question: string;
  answer: string;
}

export interface SocialLink {
  platform: 'Instagram' | 'TikTok' | 'Twitter' | 'LinkedIn' | 'Website';
  username: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  distance: string;
  interests: {
    category: 'Hobbies' | 'Music' | 'Movies' | 'Vibe';
    items: string[];
  }[];
  intentions: string[];
  loveLanguage?: string;
  zodiacSign?: string;
  relationshipStyle: 'Monogamous' | 'ENM' | 'Polyamorous' | 'Open to either';
  prompts: Prompt[];
  mainPhoto: string;
  publicPhotos: string[];
  privatePhotos: string[];
  availability: AvailabilitySlot[];
  isVerified: boolean;
  isOnline: boolean;
  isPremium: boolean;
  speedDatingTickets: number;
  socialLinks?: SocialLink[];
}

export interface AvailabilitySlot {
  day: string;
  slots: string[];
}

export interface DatingEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  attendees: number;
  image: string;
  isLive?: boolean;
}

export type AppView = 'discovery' | 'spark' | 'calendar' | 'events' | 'profile' | 'vault' | 'live';

export type AuthState = 'landing' | 'verifying' | 'identity' | 'onboarding' | 'authorized';
