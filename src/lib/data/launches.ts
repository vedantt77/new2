import { Launch } from '../types/launch';

export const launches: Launch[] = [
   {
    id: 'Microsaaslink-1',
    name: 'Microsaaslink',
    logo: '/images/android-chrome-512x512.png',
    description: 'Uncover Hidden MicroSaaS Opportunities by analyzing established SaaS pain points and turning them into profitable micro-products',
    launchDate: '2025-02-16',
    website: 'https://microsaasl.ink',
    category: 'analystics',
    listingType: 'regular',
    doFollowBacklink: true
  },
   {
    id: 'Directonaut-2',
    name: 'Directonaut',
    logo: 'images/Directonaut.png',
    description: 'Expert marketing guidance meets AI power for bootstrapped success',
    launchDate: '2025-02-16',
    website: 'https://directonaut.com',
    category: 'marketing',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'AllyMatter-3',
    name: 'AllyMatter',
    logo: 'images/AllyMatter Logo.png',
    description: 'Knowledge base tool built for internal teams',
    launchDate: '2025-02-16',
    website: 'https://allymatter.com',
    category: 'resource',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'Smartpictures-4',
    name: 'Smartpictures',
    logo: 'images/Smartpictures.png',
    description: 'Smartpictures.ai generates realistic professional headshots in just 10 minutes.',
    launchDate: '2025-02-16',
    website: 'https://smartpictures.ai/',
    category: 'Ai tool',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'NextUpKit-5',
    name: 'NextUpKit',
    logo: 'images/nextupkit.png',
    description: 'Affordable & Fully-Featured Next.js SaaS Starter Kit',
    launchDate: '2025-02-16',
    website: 'https://www.nextupkit.com/',
    category: 'resource',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'Devterms-6',
    name: 'Devterms',
    logo: '/images/Devterms.png',
    description: 'Tech is everywhere and understanding technical jargon can be overwhelming for beginners and non-tech users',
    launchDate: '2025-02-16',
    website: 'https://www.devterms.ai/',
    category: 'Ai tool',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'Whisperin-7',
    name: 'Whisperin',
    logo: '/images/Whisperin.png',
    description: 'Transform speech into optimized posts',
    launchDate: '2025-02-16',
    website: 'https://www.korelabstech.com/whisperin',
    category: 'Ai tool',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'Cairnify-8',
    name: 'Cairnify',
    logo: '/images/Cairnify.png',
    description: 'Cairnify is a personalized search engine for advanced queries, quick access, and smarter navigation.',
    launchDate: '2025-02-16',
    website: 'https://cairnify.com',
    category: 'Ai tool',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'InDocify-9',
    name: 'InDocify',
    logo: '/images/InDocify.jpeg',
    description: 'No More Digging Through Code, Just Ask',
    launchDate: '2025-02-16',
    website: 'https://www.indocify.com/',
    category: 'Ai tool',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'WebCull-10',
    name: 'WebCull',
    logo: '/images/WebCull.png',
    description: 'WebCull is a secure, end-to-end encrypted bookmark manager for organizing and syncing your links.',
    launchDate: '2025-02-16',
    website: 'https://webcull.com/',
    category: 'productivity',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'Snowpixel-11',
    name: 'Snowpixel',
    logo: '/images/Snowpixel.png',
    description: 'Generative Media Toolkit',
    launchDate: '2025-02-16',
    website: 'https://snowpixel.app/',
    category: 'Ai tool',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'Spurvo-12',
    name: 'Spurvo',
    logo: '/images/Spurvo.png',
    description: 'Its a tool that helps early founders and product teams capture and centralise feedback from different sources and create voting-based roadmaps & changelogs.',
    launchDate: '2025-02-16',
    website: 'https://spurvo.com/',
    category: 'feedback',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'DMconvo-13',
    name: 'DMconvo',
    logo: '/images/DMconvo.jpeg',
    description: 'Turn Your Instagram DMs into a 24/7 Sales Machine—Without Lifting a Finger',
    launchDate: '2025-02-16',
    website: 'https://dmconvo.ai',
    category: 'Ai tool',
    listingType: 'regular',
    doFollowBacklink: true
  },
  
];

export function getLaunches(): Launch[] {
  return launches;
}

export function getWeeklyLaunches(): Launch[] {
  // Get current date in IST
  const now = new Date();
  const istOffset = 0 * 60 * 60 * 1000; // IST is UTC+5:30
  const istNow = new Date(now.getTime() + istOffset);
  
  // Find the start of the current week (Sunday) in IST
  const startOfWeek = new Date(istNow);
  startOfWeek.setDate(istNow.getDate() - istNow.getDay()); // Go back to Sunday
  startOfWeek.setHours(0, 0, 0, 0);
  
  // Find the end of the week (Saturday) in IST
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Go to Saturday
  endOfWeek.setHours(23, 59, 59, 999);
  
  // Convert back to UTC for comparison
  const startOfWeekUTC = new Date(startOfWeek.getTime() - istOffset);
  const endOfWeekUTC = new Date(endOfWeek.getTime() - istOffset);
  
  return launches.filter(launch => {
    const launchDate = new Date(launch.launchDate);
    return launchDate >= startOfWeekUTC && launchDate <= endOfWeekUTC;
  });
}

