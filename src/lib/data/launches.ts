import { Launch } from '../types/launch';

export const launches: Launch[] = [
  {
    id: 'launch-1',
    name: 'ProductX',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'boosted',
    doFollowBacklink: true
  },
  {
    id: 'launch-2',
    name: 'ProductY',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-9',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'launch-3',
    name: 'Productq',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-9',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  }, 
  {
    id: 'launch-4',
    name: 'Productw',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-9',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'launch-5',
    name: 'Productr',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'boosted',
    doFollowBacklink: true
  },
  {
    id: 'launch-6',
    name: 'Productt',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-9',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  },
   {
    id: 'launch-7',
    name: 'Productu',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-9',
    website: 'https://example.com',
    category: 'Productivity',
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
