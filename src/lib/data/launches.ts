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
    listingType: 'regular',
    doFollowBacklink: true
  },
  // Add more launches as needed
];

export function getLaunches(): Launch[] {
  return launches;
}

export function getWeeklyLaunches(): Launch[] {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return launches.filter(launch => {
    const launchDate = new Date(launch.launchDate);
    return launchDate >= oneWeekAgo && launchDate <= now;
  });
}
