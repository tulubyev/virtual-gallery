import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GalleryVerticalEnd,
  Users,
  Eye,
  Heart,
  Star,
  Calendar,
  Award,
  Target,
  TrendingUp,
  MessageCircle
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface ArtProjectCardProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  fundingGoal: number;
  fundingRaised: number;
  supporters: number;
  rating: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onSupport?: () => void;
  onView?: () => void;
  className?: string;
}

const ArtProjectCard: React.FC<ArtProjectCardProps> = ({
  title,
  description,
  startDate,
  endDate,
  fundingGoal,
  fundingRaised,
  supporters,
  rating,
  tags,
  featured = false,
  imageUrl,
  onSupport,
  onView,
  className
}) => {
  const fundingPercentage = Math.min(100, (fundingRaised / fundingGoal) * 100);
  const daysRemaining = Math.floor((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Популярный проект
        </div>
      )}
      
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-video bg-muted flex items-center justify-center">
            <GalleryVerticalEnd className="h-16 w-16 text-primary/20" />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Цель финансирования</p>
              <p className="text-lg font-bold">${fundingGoal.toLocaleString()}</p>
            </div>
            <div className="border rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Собрано</p>
              <p className="text-lg font-bold">${fundingRaised.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Прогресс</span>
              <span>{fundingPercentage}%</span>
            </div>
            <ProgressBar 
              value={fundingPercentage} 
              variant={fundingPercentage > 100 ? "success" : fundingPercentage > 70 ? "default" : "warning"} 
            />
          </div>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{supporters} поддержали</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{daysRemaining > 0 ? `${daysRemaining} дн.` : 'Завершен'}</span>
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
        <Button className="w-full" onClick={onSupport}>
          <Heart className="h-4 w-4 mr-2" />
          Поддержать проект
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ArtProjectCard };