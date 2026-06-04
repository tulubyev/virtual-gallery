import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail,
  DollarSign,
  Trophy,
  Calendar,
  Star,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar-enhanced";
import { ProgressBar } from "@/components/ui/progress-bar";

interface AuctionParticipantCardProps {
  name: string;
  email: string;
  joinDate: string;
  rating: number;
  auctionsWon: number;
  totalSpent: number;
  activeBids: number;
  balance: number;
  avatar?: string;
  onBid?: () => void;
  onView?: () => void;
  className?: string;
}

const AuctionParticipantCard: React.FC<AuctionParticipantCardProps> = ({
  name,
  email,
  joinDate,
  rating,
  auctionsWon,
  totalSpent,
  activeBids,
  balance,
  avatar,
  onBid,
  onView,
  className
}) => {
  const spendingPercentage = Math.min(100, (totalSpent / 100000) * 100); // Assuming $100,000 as max spending

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="items-center pb-3">
        <div className="relative">
          <Avatar src={avatar} size="xl" />
          <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <Trophy className="h-3 w-3 text-primary-foreground" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">Участник аукциона</p>
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
              <p className="text-lg font-semibold">${balance.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Баланс</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{activeBids}</p>
              <p className="text-xs text-muted-foreground">Активные ставки</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{auctionsWon}</p>
              <p className="text-xs text-muted-foreground">Выиграно</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">${totalSpent.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Потрачено</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Общий бюджет</span>
              <span>${totalSpent.toLocaleString()}/$100,000</span>
            </div>
            <ProgressBar 
              value={spendingPercentage} 
              variant={spendingPercentage > 80 ? "error" : spendingPercentage > 50 ? "warning" : "success"} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating.toFixed(1)}</span>
            </div>
            <Badge variant="outline">Участник</Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onBid}>
          <DollarSign className="h-4 w-4 mr-2" />
          Сделать ставку
        </Button>
        <Button variant="outline" className="w-full" onClick={onView}>
          Профиль участника
        </Button>
      </CardFooter>
    </Card>
  );
};

export { AuctionParticipantCard };