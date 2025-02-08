import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LaunchListItem } from '@/components/launch/LaunchListItem';
import { PremiumListing } from '@/components/launch/PremiumListing';
import { AnimatedHeader } from '@/components/launch/AnimatedHeader';
import { getLaunches, getWeeklyLaunches } from '@/lib/data/launches';
import { WeeklyCountdownTimer } from '@/components/WeeklyCountdownTimer';
import { Launch } from '@/lib/types/launch';

export function LaunchPage() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [rotatedWeeklyLaunches, setRotatedWeeklyLaunches] = useState(getWeeklyLaunches());
  const allLaunches = getLaunches();

  // Separate premium and boosted launches
  const premiumLaunches = allLaunches.filter(launch => launch.listingType === 'premium');
  const boostedLaunches = allLaunches.filter(launch => launch.listingType === 'boosted');
  const regularLaunches = allLaunches.filter(launch => !launch.listingType || launch.listingType === 'regular');

  // Function to insert boosted listings between regular listings
  const insertBoostedLaunches = (launches: Launch[]) => {
    if (!boostedLaunches.length) return launches;

    const result: Launch[] = [];
    const spacing = Math.max(Math.floor(launches.length / (boostedLaunches.length + 1)), 1);
    
    launches.forEach((launch, index) => {
      result.push(launch);
      if ((index + 1) % spacing === 0) {
        const boostedIndex = Math.floor(index / spacing);
        if (boostedLaunches[boostedIndex]) {
          result.push(boostedLaunches[boostedIndex]);
        }
      }
    });

    return result;
  };

  // Rotate launches every 10 minutes
  useEffect(() => {
    if (activeTab !== 'weekly') return;

    // Initial rotation
    rotateWeeklyLaunches();

    // Set up interval for rotation
    const intervalId = setInterval(rotateWeeklyLaunches, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(intervalId);
  }, [activeTab]);

  const rotateWeeklyLaunches = () => {
    const weeklyLaunches = getWeeklyLaunches();
    if (weeklyLaunches.length <= 1) {
      setRotatedWeeklyLaunches(weeklyLaunches);
      return;
    }

    // Create a new array with the first item moved to the end
    const rotated = [...weeklyLaunches];
    const firstItem = rotated.shift();
    if (firstItem) {
      rotated.push(firstItem);
    }
    
    setRotatedWeeklyLaunches(rotated);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedHeader />
      
      <h2 className="text-xl text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
        Submit today and receive a quality backlink and badge! Our unique rotation system ensures equal exposure for all startups by rotating listings every 10 minutes - no upvotes needed. 🔄✨
      </h2>

      <WeeklyCountdownTimer />

      {/* Premium Listings */}
      {premiumLaunches.map((launch) => (
        <PremiumListing key={launch.id} launch={launch} />
      ))}

      <Tabs defaultValue="weekly" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="mt-6">
          <div className="border rounded-lg divide-y">
            {insertBoostedLaunches(rotatedWeeklyLaunches).map((launch) => (
              <LaunchListItem 
                key={launch.id} 
                launch={launch}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="border rounded-lg divide-y">
            {insertBoostedLaunches(regularLaunches).map((launch) => (
              <LaunchListItem 
                key={launch.id} 
                launch={launch}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}