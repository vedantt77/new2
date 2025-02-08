import { Launch } from '@/lib/types/launch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface LaunchListItemProps {
  launch: Launch;
}

export function LaunchListItem({ launch }: LaunchListItemProps) {
  return (
    <div className={`flex items-center justify-between p-4 border-b hover:bg-accent/5 transition-colors ${
      launch.listingType === 'boosted' ? 'bg-primary/5' : ''
    }`}>
      <div className="flex items-center gap-4 flex-1">
        <img
          src={launch.logo}
          alt={launch.name}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{launch.name}</h3>
            <Badge variant="secondary" className={launch.listingType === 'boosted' ? 'bg-primary/20 text-primary' : ''}>
              {launch.listingType === 'boosted' ? 'Boosted' : launch.category}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm truncate">{launch.description}</p>
        </div>
      </div>
      <Button size="sm" variant="outline" className="ml-4 shrink-0" asChild>
        <a href={launch.website} target="_blank" rel="noopener noreferrer">
          Visit <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}