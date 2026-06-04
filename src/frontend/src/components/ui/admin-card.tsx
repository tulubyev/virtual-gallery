import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail,
  Calendar,
  Shield,
  Settings,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar-enhanced";
import { ProgressBar } from "@/components/ui/progress-bar";

interface AdminCardProps {
  name: string;
  role: string;
  email: string;
  joinDate: string;
  permissions: string[];
  totalUsers: number;
  totalArtworks: number;
  totalGalleries: number;
  activeSessions: number;
  avatar?: string;
  onManage?: () => void;
  onView?: () => void;
  className?: string;
}

const AdminCard: React.FC<AdminCardProps> = ({
  name,
  role,
  email,
  joinDate,
  permissions,
  totalUsers,
  totalArtworks,
  totalGalleries,
  activeSessions,
  avatar,
  onManage,
  onView,
  className
}) => {
  const platformActivity = Math.min(100, (activeSessions / 50) * 100); // Assuming 50 is max expected sessions

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="items-center pb-3">
        <div className="relative">
          <Avatar src={avatar} size="xl" />
          <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <Shield className="h-3 w-3 text-primary-foreground" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
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
              <p className="text-lg font-semibold">{totalUsers}</p>
              <p className="text-xs text-muted-foreground">Пользователей</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{totalArtworks}</p>
              <p className="text-xs text-muted-foreground">Экспонатов</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{totalGalleries}</p>
              <p className="text-xs text-muted-foreground">Галерей</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{activeSessions}</p>
              <p className="text-xs text-muted-foreground">Сессий</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Активность платформы</span>
              <span>{activeSessions} сессий</span>
            </div>
            <ProgressBar 
              value={platformActivity} 
              variant={platformActivity > 70 ? "success" : platformActivity > 40 ? "default" : "warning"} 
            />
          </div>
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Разрешения</h4>
            <div className="flex flex-wrap gap-1">
              {permissions.map((perm, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {perm}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onManage}>
          <Settings className="h-4 w-4 mr-2" />
          Управление
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Подробный профиль
        </Button>
      </CardFooter>
    </Card>
  );
};

export { AdminCard };