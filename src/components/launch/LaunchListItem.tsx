import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Launch } from '@/lib/types/launch';

interface LaunchListItemProps {
  launch: Launch;
}

export function LaunchListItem({ launch }: LaunchListItemProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b hover:bg-accent/5 transition-colors ${
      launch.listingType === 'boosted' ? 'bg-primary/5' : ''
    }`}>
      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
        <img
          src={launch.logo}
          alt={launch.name}
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
            <h3 className="font-semibold truncate">{launch.name}</h3>
            <Badge variant="secondary" className={`w-fit ${launch.listingType === 'boosted' ? 'bg-primary/20 text-primary' : ''}`}>
              {launch.listingType === 'boosted' ? 'Boosted' : launch.category}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 sm:line-clamp-1">{launch.description}</p>
        </div>
      </div>
      <Button size="sm" className="w-full sm:w-auto shrink-0 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
        <a href={launch.website} target="_blank" rel="noopener noreferrer">
          Visit <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}