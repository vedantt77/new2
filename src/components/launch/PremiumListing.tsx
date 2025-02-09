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
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={launch.logo}
          alt={launch.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="text-lg sm:text-xl font-semibold">{launch.name}</h3>
            <Badge variant="secondary" className="w-fit sm:w-auto bg-purple-500/20 text-purple-700">Premium</Badge>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">{launch.description}</p>
        </div>
        <Button size="lg" className="w-full sm:w-auto mt-4 sm:mt-0" asChild>
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