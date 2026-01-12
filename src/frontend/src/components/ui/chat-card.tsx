import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle,
  User,
  Clock,
  Check,
  CheckCheck,
  MoreVertical,
  Phone,
  Video,
  Paperclip
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar-enhanced";

interface ChatCardProps {
  sender: string;
  message: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
  isRead?: boolean;
  avatar?: string;
  onChatClick?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  className?: string;
}

const ChatCard: React.FC<ChatCardProps> = ({
  sender,
  message,
  time,
  unreadCount = 0,
  isOnline = false,
  isRead = false,
  avatar,
  onChatClick,
  onCall,
  onVideoCall,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden hover:bg-accent/50 transition-colors", className)} onClick={onChatClick}>
      <CardHeader className="relative p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar src={avatar} size="md" />
              {isOnline && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{sender}</h3>
              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{message}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{time}</span>
              {isRead ? (
                <CheckCheck className="h-3 w-3 text-muted-foreground" />
              ) : (
                <Check className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
            {unreadCount > 0 && (
              <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-4">
        <div className="flex justify-end gap-2">
          {onCall && (
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onCall(); }}>
              <Phone className="h-4 w-4" />
            </Button>
          )}
          {onVideoCall && (
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onVideoCall(); }}>
              <Video className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ChatCard };