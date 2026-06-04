import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Star,
  Wallet,
  Gem,
  Users
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface NFTCollectionCardProps {
  name: string;
  description: string;
  owner: string;
  itemCount: number;
  holders: number;
  floorPrice: number;
  volumeTraded: number;
  rating: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onView?: () => void;
  onBuy?: () => void;
  className?: string;
}

const NFTCollectionCard: React.FC<NFTCollectionCardProps> = ({
  name,
  description,
  owner,
  itemCount,
  holders,
  floorPrice,
  volumeTraded,
  rating,
  tags,
  featured = false,
  imageUrl,
  onView,
  onBuy,
  className
}) => {
  const tradingVolume = Math.min(100, (volumeTraded / 1000000) * 100); // Assuming $1M as max expected volume

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Популярная коллекция
        </div>
      )}
      
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-video bg-muted flex items-center justify-center">
            <Gem className="h-16 w-16 text-primary/20" />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Владелец: {owner}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{itemCount}</p>
              <p className="text-xs text-muted-foreground">NFT</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{holders}</p>
              <p className="text-xs text-muted-foreground">Владельцев</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">${floorPrice.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Мин. цена</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">${volumeTraded.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Объем</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Уровень активности</span>
              <span>${volumeTraded.toLocaleString()} объем</span>
            </div>
            <ProgressBar 
              value={tradingVolume} 
              variant={tradingVolume > 70 ? "success" : tradingVolume > 40 ? "default" : "warning"} 
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onBuy}>
          <Wallet className="h-4 w-4 mr-2" />
          Приобрести NFT
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробнее о коллекции
        </Button>
      </CardFooter>
    </Card>
  );
};

export { NFTCollectionCard };