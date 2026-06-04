import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar-enhanced";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle,
  Calendar,
  MapPin,
} from "lucide-react";

interface UserProfileCardProps {
  name: string;
  role: string;
  avatarSrc?: string;
  bio?: string;
  joinDate?: string;
  location?: string;
  stats?: {
    followers: number;
    following: number;
    artworks: number;
  };
  badges?: string[];
  onFollow?: () => void;
  onMessage?: () => void;
  className?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  role,
  avatarSrc,
  bio,
  joinDate,
  location,
  stats = { followers: 0, following: 0, artworks: 0 },
  badges = [],
  onFollow,
  onMessage,
  className
}) => {
  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="items-center">
        <Avatar src={avatarSrc} size="xl" />
        <div className="text-center">
          <CardTitle className="text-xl">{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        {bio && <p className="text-sm text-center text-muted-foreground">{bio}</p>}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Присоединился {joinDate}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{location}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 text-center py-4">
          <div>
            <p className="text-lg font-semibold">{stats.followers}</p>
            <p className="text-xs text-muted-foreground">Подписчики</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{stats.following}</p>
            <p className="text-xs text-muted-foreground">Подписки</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{stats.artworks}</p>
            <p className="text-xs text-muted-foreground">Экспонаты</p>
          </div>
        </div>

        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {onFollow && (
            <Button className="flex-1" onClick={onFollow}>
              <Heart className="h-4 w-4 mr-2" />
              Подписаться
            </Button>
          )}
          {onMessage && (
            <Button variant="outline" size="icon" onClick={onMessage}>
              <MessageCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { UserProfileCard };