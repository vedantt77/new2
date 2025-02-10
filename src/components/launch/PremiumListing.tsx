import { Launch } from '@/lib/types/launch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface PremiumListingProps {
  launch: Launch;
}

export function PremiumListing({ launch }: PremiumListingProps) {
  return (
    <Card className="relative bg-gradient-to-br from-purple-50/5 to-purple-100/5 dark:from-purple-900/5 dark:to-purple-800/5 p-4 sm:p-6 border-2 border-purple-500/30 dark:border-purple-500/50 hover:border-purple-500/50 dark:hover:border-purple-500/70 transition-all duration-200">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5 dark:from-purple-400/5 dark:via-transparent dark:to-purple-400/5 rounded-lg pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={launch.logo}
          alt={launch.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="text-lg sm:text-xl font-semibold">{launch.name}</h3>
            <Badge 
              variant="secondary" 
              className="w-fit sm:w-auto bg-purple-100 text-purple-800 dark:bg-purple-500/30 dark:text-purple-200 border-purple-200 dark:border-purple-500/50"
            >
              Premium
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">{launch.description}</p>
        </div>
        <Button 
          size="lg" 
          className="w-full sm:w-auto mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white" 
          asChild
        >
          <a 
            href={launch.website} 
            target="_blank"
          >
            Visit <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
