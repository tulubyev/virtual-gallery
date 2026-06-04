import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  GalleryVerticalEnd,
  Star,
  Heart,
  Eye,
  Ticket,
  Award
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  attendees: number;
  rating: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onRegister?: () => void;
  onView?: () => void;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  time,
  location,
  maxAttendees,
  attendees,
  rating,
  tags,
  featured = false,
  imageUrl,
  onRegister,
  onView,
  className
}) => {
  const registrationProgress = Math.min(100, (attendees / maxAttendees) * 100);
  const spotsRemaining = maxAttendees - attendees;

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Рекомендуемое событие
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
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Clock className="h-3 w-3 mr-1" />
            {time}
          </Badge>
        </div>
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
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{attendees}/{maxAttendees} участников</span>
            </div>
            <Badge variant={spotsRemaining > 0 ? "default" : "destructive"}>
              {spotsRemaining > 0 ? `${spotsRemaining} мест` : 'Нет мест'}
            </Badge>
          </div>
          
          <ProgressBar 
            value={registrationProgress} 
            variant={registrationProgress > 90 ? "error" : registrationProgress > 70 ? "warning" : "success"} 
          />
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onRegister} disabled={spotsRemaining <= 0}>
          <Ticket className="h-4 w-4 mr-2" />
          {spotsRemaining > 0 ? 'Зарегистрироваться' : 'Мест нет'}
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};

export { EventCard };