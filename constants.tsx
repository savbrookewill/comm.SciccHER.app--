
import { User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Maya',
    age: 24,
    bio: 'Art historian by day, experimental chef by night. Looking for someone who appreciates a good playlist and deep talks. I believe in dating with absolute intention.',
    location: 'Brooklyn, NY',
    distance: '2 miles away',
    interests: [
      { category: 'Hobbies', items: ['Abstract Art', 'Sourdough', 'Techno', 'Pottery'] },
      { category: 'Music', items: ['King Princess', 'Girl in Red', 'Fletcher', 'Muna'] },
      { category: 'Vibe', items: ['Creative', 'Night Owl', 'Intentional'] }
    ],
    intentions: ['Long-term relationship', 'Creative collaboration'],
    loveLanguage: 'Acts of Service',
    zodiacSign: 'Scorpio',
    relationshipStyle: 'Monogamous',
    prompts: [
      { id: 'p1', question: 'My ideal weekend involves...', answer: 'Browsing a dusty record store followed by making a 4-course meal for two.' },
      { id: 'p2', question: 'A cause I care about is...', answer: 'Community-led queer art spaces and ensuring accessibility in the arts.' },
      { id: 'p5', question: 'The quickest way to my heart is...', answer: 'A perfectly curated playlist and meaningful eye contact during a conversation.' },
      { id: 'p7', question: 'My personal non-negotiable is...', answer: 'Open communication and a mutual respect for creative boundaries.' },
      { id: 'p8', question: 'What "Intention" means to me...', answer: 'Being present in the moment and dating with a clear vision of what we want to build together.' },
      { id: 'p9', question: 'The most adventurous thing I\'ve done...', answer: 'Moved to a new city with nothing but a suitcase and a sourdough starter.' }
    ],
    mainPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60',
    publicPhotos: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60'
    ],
    privatePhotos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60'
    ],
    availability: [
      { day: 'Wed', slots: ['Evening'] },
      { day: 'Fri', slots: ['Late Night'] },
      { day: 'Sat', slots: ['Afternoon', 'Evening'] }
    ],
    isVerified: true,
    isOnline: true,
    isPremium: false,
    speedDatingTickets: 1,
    socialLinks: [
      { platform: 'Instagram', username: '@maya.creates', url: '#' },
      { platform: 'TikTok', username: '@maya_cooks', url: '#' }
    ]
  },
  {
    id: 'u2',
    name: 'Elena',
    age: 27,
    bio: 'Software engineer who spends too much time at the climbing gym. Let’s skip the small talk and go on a ScissHER sesh? I value efficiency and depth.',
    location: 'Manhattan, NY',
    distance: '5 miles away',
    interests: [
      { category: 'Hobbies', items: ['Bouldering', 'React', 'Hiking', 'Chess'] },
      { category: 'Movies', items: ['Portrait of a Lady on Fire', 'Bottoms', 'The World to Come'] }
    ],
    intentions: ['Short-term fun', 'Casual dating'],
    loveLanguage: 'Physical Touch',
    zodiacSign: 'Aries',
    relationshipStyle: 'Open to either',
    prompts: [
      { id: 'p3', question: 'We’ll get along if...', answer: 'You can out-climb me or at least enjoy the attempt. I love competitive spirits.' },
      { id: 'p4', question: 'My secret talent is...', answer: 'Debugging complex code while listening to heavy metal at 2 AM.' },
      { id: 'p6', question: 'Let’s cut to the chase and talk about...', answer: 'Your 5-year vision, your favorite local bookstore, and your take on AI.' },
      { id: 'p10', question: 'A life goal of mine is...', answer: 'To build a community-driven app that actually makes people feel less lonely.' },
      { id: 'p11', question: 'My ideal first date is...', answer: 'A high-energy activity followed by quiet drinks where we actually talk.' },
      { id: 'p12', question: 'Something that surprises people about me...', answer: 'I used to be a competitive chess player in middle school.' }
    ],
    mainPhoto: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&auto=format&fit=crop&q=60',
    publicPhotos: [
      'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60'
    ],
    privatePhotos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60'
    ],
    availability: [
      { day: 'Tue', slots: ['Evening'] },
      { day: 'Thu', slots: ['Evening'] },
      { day: 'Sun', slots: ['Morning', 'Afternoon'] }
    ],
    isVerified: true,
    isOnline: false,
    isPremium: true,
    speedDatingTickets: 999,
    socialLinks: [
      { platform: 'LinkedIn', username: 'elena-dev', url: '#' },
      { platform: 'Twitter', username: '@elena_codes', url: '#' }
    ]
  },
  {
    id: 'u3',
    name: 'Sasha',
    age: 29,
    bio: 'Photographer and plant parent. I find beauty in the small, intentional moments. Looking for someone to share a sunset and a good bottle of natural wine with.',
    location: 'Queens, NY',
    distance: '8 miles away',
    interests: [
      { category: 'Hobbies', items: ['Film Photography', 'Gardening', 'Natural Wine', 'Yoga'] },
      { category: 'Vibe', items: ['Calm', 'Nature Lover', 'Observant'] }
    ],
    intentions: ['Long-term relationship', 'Friendship'],
    loveLanguage: 'Quality Time',
    zodiacSign: 'Virgo',
    relationshipStyle: 'Monogamous',
    prompts: [
      { id: 'p13', question: 'My favorite way to relax is...', answer: 'Watering my 40+ houseplants while listening to jazz on vinyl.' },
      { id: 'p14', question: 'What I value most in a partner...', answer: 'Emotional intelligence and a genuine curiosity about the world.' },
      { id: 'p15', question: 'My hidden talent is...', answer: 'I can identify almost any plant just by looking at the leaves.' },
      { id: 'p16', question: 'One thing I\'ll never do again...', answer: 'Try to cut my own bangs during a rainy Tuesday.' },
      { id: 'p17', question: 'If I could travel anywhere tomorrow...', answer: 'The Japanese countryside during cherry blossom season.' },
      { id: 'p18', question: 'My ideal morning looks like...', answer: 'A slow cup of coffee, no phone, just watching the birds from my window.' }
    ],
    mainPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60',
    publicPhotos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60'
    ],
    privatePhotos: [
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&auto=format&fit=crop&q=60'
    ],
    availability: [
      { day: 'Sat', slots: ['Morning', 'Afternoon'] },
      { day: 'Sun', slots: ['Afternoon', 'Evening'] }
    ],
    isVerified: true,
    isOnline: true,
    isPremium: false,
    speedDatingTickets: 3
  }
];

export const PRIMARY_HYPE_QUOTE = "Step into your power, interact with intention, and let your authentic light spark the connection you deserve. You're not just a match—you're the main event. ✨";
