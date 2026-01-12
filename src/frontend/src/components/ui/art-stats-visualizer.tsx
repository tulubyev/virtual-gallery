import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GalleryVerticalEnd,
  Users,
  Eye,
  Heart,
  Star,
  Calendar,
  Award,
  TrendingUp,
  MessageCircle,
  Activity,
  BarChart3,
  PieChart
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { cn } from "@/lib/utils";

interface ArtStatsVisualizerProps {
  statsData: {
    totalArtworks: number;
    totalGalleries: number;
    totalVisitors: number;
    totalLikes: number;
    averageRating: number;
    trendingArtworks: Array<{
      title: string;
      artist: string;
      views: number;
      likes: number;
      rating: number;
    }>;
    monthlyStats: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    categoryDistribution: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    visitorEngagement: {
      dailyActive: number;
      weeklyActive: number;
      monthlyActive: number;
      avgSessionDuration: number; // in minutes
    };
  };
  className?: string;
}

const ArtStatsVisualizer: React.FC<ArtStatsVisualizerProps> = ({
  statsData,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Main statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего экспонатов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalArtworks.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12.3% за месяц</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Галерей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalGalleries.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5.2% за месяц</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Посетителей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalVisitors.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8.7% за месяц</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Лайков</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalLikes.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+15.4% за месяц</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Рейтинг</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.averageRating.toFixed(1)}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>Средний</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly trends chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ежемесячная активность</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="line"
              data={analyticsData.monthlyTrends}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Просмотры, лайки и комментарии за последние 12 месяцев'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }}
            />
          </CardContent>
        </Card>
        
        {/* Category distribution chart */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение по категориям</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="doughnut"
              data={analyticsData.categoryDistribution}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                  title: {
                    display: true,
                    text: 'Распределение экспонатов по категориям'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top artworks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Популярные экспонаты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topArtworks.map((artwork, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg">
                  <div className="bg-muted rounded-lg p-2">
                    <GalleryVerticalEnd className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{artwork.title}</p>
                    <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{artwork.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{artwork.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{artwork.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Engagement metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Метрики вовлечённости</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ежедневно активных</span>
                <span className="font-medium">{engagementMetrics.dailyActive.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Еженедельно активных</span>
                <span className="font-medium">{engagementMetrics.weeklyActive.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Ежемесячно активных</span>
                <span className="font-medium">{engagementMetrics.monthlyActive.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Средняя продолжительность сессии</span>
                <span className="font-medium">{engagementMetrics.avgSessionDuration} мин</span>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-2">Уровень вовлечённости</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Просмотры</span>
                    <span>100%</span>
                  </div>
                  <ProgressBar value={100} variant="success" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Лайки</span>
                    <span>{(engagementMetrics.likesRatio * 100).toFixed(1)}%</span>
                  </div>
                  <ProgressBar value={engagementMetrics.likesRatio * 100} variant="default" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Комментарии</span>
                    <span>{(engagementMetrics.commentsRatio * 100).toFixed(1)}%</span>
                  </div>
                  <ProgressBar value={engagementMetrics.commentsRatio * 100} variant="warning" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ArtStatsVisualizer };