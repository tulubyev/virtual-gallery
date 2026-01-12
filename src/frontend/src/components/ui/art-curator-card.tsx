import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  Award,
  GalleryVerticalEnd,
  Users,
  Eye,
  Heart,
  Star,
  Calendar,
  MessageCircle,
  Target,
  TrendingUp
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface ArtCuratorCardProps {
  name: string;
  role: string;
  bio: string;
  joinDate: string;
  rating: number;
  exhibitionsCurated: number;
  artworksReviewed: number;
  approvedArtworks: number;
  tags: string[];
  featured?: boolean;
  avatar?: string;
  onContact?: () => void;
  onView?: () => void;
  className?: string;
}

const ArtCuratorCard: React.FC<ArtCuratorCardProps> = ({
  name,
  role,
  bio,
  joinDate,
  rating,
  exhibitionsCurated,
  artworksReviewed,
  approvedArtworks,
  tags,
  featured = false,
  avatar,
  onContact,
  onView,
  className
}) => {
  const approvalRate = artworksReviewed > 0 ? (approvedArtworks / artworksReviewed) * 100 : 0;

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Рекомендуемый куратор
        </div>
      )}
      
      <div className="relative">
        {avatar ? (
          <img 
            src={avatar} 
            alt={name} 
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-square bg-muted flex items-center justify-center">
            <User className="h-16 w-16 text-primary/20" />
          </div>
        )}
      </div>
      
      <CardHeader className="items-center pb-3">
        <div className="relative">
          <Avatar src={avatar} size="xl" />
          <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <Award className="h-3 w-3 text-primary-foreground" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">{bio}</p>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{exhibitionsCurated}</p>
              <p className="text-xs text-muted-foreground">Выставок</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{artworksReviewed}</p>
              <p className="text-xs text-muted-foreground">Рассмотрено</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{approvedArtworks}</p>
              <p className="text-xs text-muted-foreground">Одобрено</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Ставка одобрения</span>
              <span>{approvalRate.toFixed(1)}%</span>
            </div>
            <ProgressBar 
              value={approvalRate} 
              variant={approvalRate > 80 ? "success" : approvalRate > 50 ? "default" : "warning"} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating.toFixed(1)}</span>
            </div>
            <Badge variant="outline">Куратор</Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onContact}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Связаться
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Профиль куратора
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ArtCuratorCard };