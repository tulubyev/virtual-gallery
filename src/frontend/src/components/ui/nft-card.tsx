import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GalleryVerticalEnd,
  DollarSign,
  Users,
  Eye,
  Heart,
  Star,
  Calendar,
  Hash,
  Award,
  Zap,
  TrendingUp
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface NFTCardProps {
  title: string;
  artist: string;
  description: string;
  price: number;
  creatorEarnings: number;
  royalties: number;
  owners: number;
  rating: number;
  tags: string[];
  blockchain: string;
  contractAddress: string;
  tokenId: string;
  featured?: boolean;
  imageUrl?: string;
  onBuy?: () => void;
  onView?: () => void;
  className?: string;
}

const NFTCard: React.FC<NFTCardProps> = ({
  title,
  artist,
  description,
  price,
  creatorEarnings,
  royalties,
  owners,
  rating,
  tags,
  blockchain,
  contractAddress,
  tokenId,
  featured = false,
  imageUrl,
  onBuy,
  onView,
  className
}) => {
  const priceChange = 12.5; // Mock data for price change

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Популярный NFT
        </div>
      )}
      
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-square bg-muted flex items-center justify-center">
            <GalleryVerticalEnd className="h-12 w-12 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Zap className="h-3 w-3 mr-1" />
            {blockchain}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Автор: {artist}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Цена</p>
              <p className="text-xl font-bold">${price.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Владельцы</p>
              <p className="text-lg font-medium">{owners}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>Доход художника: {creatorEarnings}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>Роялти: {royalties}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Hash className="h-4 w-4" />
              <span>#{tokenId}</span>
            </div>
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span>+{priceChange}%</span>
            </div>
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
          <DollarSign className="h-4 w-4 mr-2" />
          Приобрести за ${price.toLocaleString()}
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};

export { NFTCard };