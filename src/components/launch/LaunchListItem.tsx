import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Share2 } from 'lucide-react';
import { Launch } from '@/lib/types/launch';
import { shareUrl } from '@/lib/utils/share';

interface LaunchListItemProps {
  launch: Launch;
}

export function LaunchListItem({ launch }: LaunchListItemProps) {
  // Function to determine if link should be dofollow
  const getLinkProps = () => {
    // Premium and boosted listings always get dofollow
    if (launch.listingType === 'premium' || launch.listingType === 'boosted') {
      return {};
    }
    // For regular listings, check the doFollowBacklink property
    return launch.doFollowBacklink ? {} : { rel: 'nofollow' };
  };

  const getBadgeVariant = () => {
    switch (launch.listingType) {
      case 'premium':
        return 'purple';
      case 'boosted':
        return 'yellow';
      default:
        return 'secondary';
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Check out ${launch.name} on startups.ad`,
      text: launch.description,
      url: `https://startups.ad/launch/${launch.id}`
    };

    await shareUrl(shareData);
  };

  return (
    <div className={`
      flex flex-col sm:flex-row items-start sm:items-center justify-between 
      p-6 rounded-lg shadow-sm
      transition duration-200 ease-in-out
      ${launch.listingType === 'boosted' 
        ? 'bg-primary/5 border border-primary/20 hover:border-primary/30' 
        : 'border hover:border-primary/20 hover:bg-accent/5'
      }
    `}>
      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
        <img
          src={launch.logo}
          alt={launch.name}
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
            <h3 className="font-semibold truncate">{launch.name}</h3>
            <Badge 
              variant={getBadgeVariant()} 
              className={`w-fit ${
                launch.listingType === 'boosted' 
                  ? 'bg-yellow-500/20 text-yellow-700' 
                  : launch.listingType === 'premium'
                    ? 'bg-purple-500/20 text-purple-700'
                    : ''
              }`}
            >
              {launch.listingType === 'boosted' ? 'Boosted' : launch.category}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 sm:line-clamp-1">{launch.description}</p>
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 sm:flex-none"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90" 
          asChild
        >
          <a 
            href={launch.website} 
            target="_blank" 
            {...getLinkProps()}
          >
            Visit <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
