import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  Star,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar-enhanced";
import { ProgressBar } from "@/components/ui/progress-bar";

interface StaffCardProps {
  name: string;
  role: string;
  email: string;
  phone?: string;
  joinDate: string;
  rating: number;
  tasksCompleted: number;
  tasksTotal: number;
  status: 'online' | 'offline' | 'busy';
  avatar?: string;
  onContact?: () => void;
  onView?: () => void;
  className?: string;
}

const StaffCard: React.FC<StaffCardProps> = ({
  name,
  role,
  email,
  phone,
  joinDate,
  rating,
  tasksCompleted,
  tasksTotal,
  status,
  avatar,
  onContact,
  onView,
  className
}) => {
  const progress = Math.min(100, Math.max(0, (tasksCompleted / tasksTotal) * 100));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="items-center pb-3">
        <div className="relative">
          <Avatar src={avatar} size="xl" />
          <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background ${
            status === 'online' ? 'bg-green-500' : 
            status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
          }`} />
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
          
          {phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{phone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Присоединился: {joinDate}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating.toFixed(1)}</span>
            </div>
            <Badge variant={status === 'online' ? 'default' : status === 'busy' ? 'secondary' : 'outline'}>
              {status === 'online' ? 'В сети' : status === 'busy' ? 'Занят' : 'Не в сети'}
            </Badge>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Задачи выполнены</span>
              <span>{tasksCompleted}/{tasksTotal}</span>
            </div>
            <ProgressBar value={progress} variant={progress > 90 ? "success" : progress > 50 ? "default" : "warning"} />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onContact}>
          <Mail className="h-4 w-4 mr-2" />
          Связаться
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Профиль сотрудника
        </Button>
      </CardFooter>
    </Card>
  );
};

export { StaffCard };