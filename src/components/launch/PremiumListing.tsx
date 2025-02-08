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
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 mb-8">
      <div className="flex items-center gap-4">
        <img
          src={launch.logo}
          alt={launch.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold">{launch.name}</h3>
            <Badge variant="secondary" className="bg-primary/20 text-primary">Premium</Badge>
          </div>
          <p className="text-muted-foreground">{launch.description}</p>
        </div>
        <Button size="lg" asChild>
          <a href={launch.website} target="_blank" rel="noopener noreferrer">
            Visit <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </Card>
  );
}