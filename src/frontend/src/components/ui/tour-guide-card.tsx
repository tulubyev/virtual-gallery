import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  Mail,
  Map,
  Calendar,
  Star,
  Award,
  Users,
  Clock,
  MessageCircle,
  Play
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar-enhanced";
import { ProgressBar } from "@/components/ui/progress-bar";

interface TourGuideCardProps {
  name: string;
  specialization: string;
  email: string;
  joinDate: string;
  rating: number;
  toursConducted: number;
  totalParticipants: number;
  languages: string[];
  activeTours: number;
  avgDuration: string;
  avatar?: string;
  onStartTour?: () => void;
  onView?: () => void;
  className?: string;
}

const TourGuideCard: React.FC<TourGuideCardProps> = ({
  name,
  specialization,
  email,
  joinDate,
  rating,
  toursConducted,
  totalParticipants,
  languages,
  activeTours,
  avgDuration,
  avatar,
  onStartTour,
  onView,
  className
}) => {
  const satisfactionRate = Math.min(100, (rating / 5) * 100);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="items-center pb-3">
        <div className="relative">
          <Avatar src={avatar} size="xl" />
          <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <Map className="h-3 w-3 text-primary-foreground" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{specialization}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Присоединился: {joinDate}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-center py-3">
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{toursConducted}</p>
              <p className="text-xs text-muted-foreground">Туров проведено</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{totalParticipants}</p>
              <p className="text-xs text-muted-foreground">Участников</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{activeTours}</p>
              <p className="text-xs text-muted-foreground">Активных туров</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{avgDuration}</p>
              <p className="text-xs text-muted-foreground">Средняя длительность</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Удовлетворенность</span>
              <span>{rating.toFixed(1)}/5</span>
            </div>
            <ProgressBar 
              value={satisfactionRate} 
              variant={satisfactionRate > 80 ? "success" : satisfactionRate > 60 ? "default" : "warning"} 
            />
          </div>
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Языки</h4>
            <div className="flex flex-wrap gap-1">
              {languages.map((lang, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating.toFixed(1)}</span>
            </div>
            <Badge variant="outline">Гид</Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onStartTour}>
          <Play className="h-4 w-4 mr-2" />
          Начать тур
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Профиль гида
        </Button>
      </CardFooter>
    </Card>
  );
};

export { TourGuideCard };