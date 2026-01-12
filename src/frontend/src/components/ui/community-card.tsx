import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  MessageCircle,
  GalleryVerticalEnd,
  Heart,
  Eye,
  Star,
  Calendar,
  Award,
  TrendingUp
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface CommunityCardProps {
  name: string;
  description: string;
  memberCount: number;
  postsCount: number;
  activeMembers: number;
  rating: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onJoin?: () => void;
  onView?: () => void;
  className?: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  name,
  description,
  memberCount,
  postsCount,
  activeMembers,
  rating,
  tags,
  featured = false,
  imageUrl,
  onJoin,
  onView,
  className
}) => {
  const activityRate = Math.min(100, (activeMembers / memberCount) * 100);

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Популярное сообщество
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
            <Users className="h-16 w-16 text-primary/20" />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
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
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{memberCount}</p>
              <p className="text-xs text-muted-foreground">Участников</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{postsCount}</p>
              <p className="text-xs text-muted-foreground">Постов</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{activeMembers}</p>
              <p className="text-xs text-muted-foreground">Активных</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Уровень активности</span>
              <span>{activeMembers}/{memberCount} участников</span>
            </div>
            <ProgressBar 
              value={activityRate} 
              variant={activityRate > 70 ? "success" : activityRate > 40 ? "default" : "warning"} 
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
        <Button className="w-full" onClick={onJoin}>
          <User className="h-4 w-4 mr-2" />
          Присоединиться
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Посетить сообщество
        </Button>
      </CardFooter>
    </Card>
  );
};

export { CommunityCard };