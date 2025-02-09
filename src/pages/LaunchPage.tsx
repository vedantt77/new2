import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LaunchListItem } from '@/components/launch/LaunchListItem';
import { PremiumListing } from '@/components/launch/PremiumListing';
import { AnimatedHeader } from '@/components/launch/AnimatedHeader';
import { getLaunches, getWeeklyLaunches } from '@/lib/data/launches';
import { WeeklyCountdownTimer } from '@/components/WeeklyCountdownTimer';
import { Launch } from '@/lib/types/launch';

interface ListItem extends Launch {
  uniqueKey: string;
}

export function LaunchPage() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [rotatedWeeklyLaunches, setRotatedWeeklyLaunches] = useState<Launch[]>([]);
  const [rotatedBoostedLaunches, setRotatedBoostedLaunches] = useState<Launch[]>([]);
  
  // Memoize these values to prevent unnecessary re-renders
  const allLaunches = getLaunches();
  const premiumLaunches = allLaunches.filter(launch => launch.listingType === 'premium');
  const boostedLaunches = allLaunches.filter(launch => launch.listingType === 'boosted');
  const regularLaunches = allLaunches.filter(launch => !launch.listingType || launch.listingType === 'regular');
  const weeklyRegularLaunches = getWeeklyLaunches().filter(
    launch => !launch.listingType || launch.listingType === 'regular'
  );

  const insertBoostedLaunches = (launches: Launch[], section: 'weekly' | 'all'): ListItem[] => {
    if (!rotatedBoostedLaunches.length || !launches.length) {
      return launches.map((launch, index) => ({
        ...launch,
        uniqueKey: `${section}-regular-${launch.id}-${index}`
      }));
    }

    const result: ListItem[] = [];
    const spacing = Math.max(Math.floor(launches.length / rotatedBoostedLaunches.length), 2);
    let boostedIndex = 0;
    const timestamp = Date.now(); // Add timestamp to ensure uniqueness across re-renders

    launches.forEach((launch, index) => {
      result.push({
        ...launch,
        uniqueKey: `${section}-regular-${launch.id}-${index}-${timestamp}`
      });
      
      if ((index + 1) % spacing === 0 && boostedIndex < rotatedBoostedLaunches.length) {
        const boostedLaunch = rotatedBoostedLaunches[boostedIndex];
        result.push({
          ...boostedLaunch,
          uniqueKey: `${section}-boosted-${boostedLaunch.id}-${index}-${timestamp}`
        });
        boostedIndex++;
      }
    });

    // Add any remaining boosted launches
    while (boostedIndex < rotatedBoostedLaunches.length) {
      const boostedLaunch = rotatedBoostedLaunches[boostedIndex];
      result.push({
        ...boostedLaunch,
        uniqueKey: `${section}-boosted-${boostedLaunch.id}-remaining-${boostedIndex}-${timestamp}`
      });
      boostedIndex++;
    }

    return result;
  };

  // Initialize rotated launches
  useEffect(() => {
    setRotatedWeeklyLaunches(weeklyRegularLaunches);
    setRotatedBoostedLaunches(boostedLaunches);
  }, []); // Run only once on mount

  // Handle rotation for both regular and boosted launches
  useEffect(() => {
    if (activeTab !== 'weekly') return;

    const rotateList = () => {
      // Rotate regular launches
      setRotatedWeeklyLaunches(prevLaunches => {
        if (weeklyRegularLaunches.length <= 1) return weeklyRegularLaunches;
        
        if (prevLaunches.length !== weeklyRegularLaunches.length) {
          return weeklyRegularLaunches;
        }

        const rotated = [...prevLaunches];
        const firstItem = rotated.shift();
        if (firstItem) {
          rotated.push(firstItem);
        }
        return rotated;
      });

      // Rotate boosted launches
      setRotatedBoostedLaunches(prevBoosted => {
        if (boostedLaunches.length <= 1) return boostedLaunches;
        
        if (prevBoosted.length !== boostedLaunches.length) {
          return boostedLaunches;
        }

        const rotated = [...prevBoosted];
        const firstItem = rotated.shift();
        if (firstItem) {
          rotated.push(firstItem);
        }
        return rotated;
      });
    };

    // Initial rotation
    rotateList();
    
    // Set up interval - rotate every 10 minutes
    const intervalId = setInterval(rotateList, 10 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [activeTab, boostedLaunches.length]); // Depend on activeTab and boostedLaunches length

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatedHeader />
          
          <h2 className="text-base sm:text-xl text-muted-foreground text-center mb-6 sm:mb-8">
            Submit today and receive quality traffic and backlink! Our unique rotation system ensures equal exposure for all startups by rotating listings every 10 minutes - no upvotes needed. 🔄✨
          </h2>

          <WeeklyCountdownTimer />

          {/* Premium listings */}
          <div className="space-y-8 mb-12">
            {premiumLaunches.map((launch) => (
              <PremiumListing 
                key={`premium-${launch.id}`} 
                launch={launch} 
              />
            ))}
          </div>

          <Tabs defaultValue="weekly" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-[300px] sm:max-w-[400px] grid-cols-2 mx-auto mb-6 sm:mb-8">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="mt-4 sm:mt-6">
              <div className="space-y-4">
                {insertBoostedLaunches(rotatedWeeklyLaunches, 'weekly').map((launch) => (
                  <LaunchListItem 
                    key={launch.uniqueKey}
                    launch={launch}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-4 sm:mt-6">
              <div className="space-y-4">
                {insertBoostedLaunches(regularLaunches, 'all').map((launch) => (
                  <LaunchListItem 
                    key={launch.uniqueKey}
                    launch={launch}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
