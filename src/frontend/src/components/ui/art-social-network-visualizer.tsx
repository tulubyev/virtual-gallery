import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  MessageCircle,
  Heart,
  Share2,
  Eye,
  GalleryVerticalEnd,
  Star,
  Calendar,
  Award,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  UserPlus,
  Repeat2
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

interface ArtSocialNetworkVisualizerProps {
  socialData: {
    userMetrics: {
      totalUsers: number;
      activeUsers: number;
      newUsers: number;
      engagementRate: number;
    };
    contentMetrics: {
      totalPosts: number;
      totalLikes: number;
      totalShares: number;
      totalComments: number;
    };
    communityGrowth: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    contentDistribution: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    topCreators: Array<{
      name: string;
      followers: number;
      posts: number;
      engagement: number;
      avatar?: string;
    }>;
    trendingTopics: Array<{
      topic: string;
      mentions: number;
      growth: number;
    }>;
    interactionTypes: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    engagementMetrics: {
      avgSessionDuration: number; // in minutes
      returningUsers: number; // percentage
      contentCreationRate: number; // percentage
      socialSharingRate: number; // percentage
    };
    engagementByPlatform: Array<{
      name: string;
      engagementRate: number; // percentage
    }>;
  };
  className?: string;
}

const ArtSocialNetworkVisualizer: React.FC<ArtSocialNetworkVisualizerProps> = ({
  socialData,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Social metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialData.userMetrics.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{socialData.userMetrics.newUsers} за месяц</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Активных пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialData.userMetrics.activeUsers.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="h-4 w-4 mr-1" />
              <span>{socialData.userMetrics.engagementRate}% вовлечённость</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего публикаций</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialData.contentMetrics.totalPosts.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <GalleryVerticalEnd className="h-4 w-4 mr-1" />
              <span>{socialData.contentMetrics.avgPerUser.toFixed(1)} на пользователя</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Лайков</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialData.contentMetrics.totalLikes.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Heart className="h-4 w-4 mr-1" />
              <span>{socialData.contentMetrics.likesPerPost.toFixed(1)} на публикацию</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Комментариев</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialData.contentMetrics.totalComments.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{socialData.contentMetrics.commentsPerPost.toFixed(1)} на публикацию</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Community growth chart */}
        <Card>
          <CardHeader>
            <CardTitle>Рост сообщества</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="line"
              data={socialData.communityGrowth}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Рост числа пользователей за последние 12 месяцев'
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
        
        {/* Content distribution chart */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение контента</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="doughnut"
              data={socialData.contentDistribution}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                  title: {
                    display: true,
                    text: 'Типы контента в социальной сети'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top creators */}
        <Card>
          <CardHeader>
            <CardTitle>Топ создатели</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialData.topCreators.map((creator, index) => (
                <div key={index} className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg">
                  <Avatar src={creator.avatar} size="md" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{creator.name}</h4>
                    <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                      <span>{creator.followers.toLocaleString()} подписчиков</span>
                      <span>{creator.posts} публикаций</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{creator.engagementRate}%</p>
                    <p className="text-xs text-muted-foreground">вовлеченность</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Trending topics */}
        <Card>
          <CardHeader>
            <CardTitle>Трендовые темы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialData.trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">#{topic.topic}</h4>
                    <p className="text-xs text-muted-foreground">{topic.mentions.toLocaleString()} упоминаний</p>
                  </div>
                  <div className={`flex items-center text-xs ${topic.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {topic.growth >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    <span>{Math.abs(topic.growth)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Interaction types */}
        <Card>
          <CardHeader>
            <CardTitle>Типы взаимодействий</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="bar"
              data={socialData.interactionTypes}
              options={{
                indexAxis: 'y',
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Распределение типов взаимодействий'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Engagement metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Метрики вовлечённости</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{socialData.engagementMetrics.avgSessionDuration}м</p>
              <p className="text-sm text-muted-foreground">Средняя сессия</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{socialData.engagementMetrics.returningUsers}%</p>
              <p className="text-sm text-muted-foreground">Возвращаемость</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{socialData.engagementMetrics.contentCreationRate}%</p>
              <p className="text-sm text-muted-foreground">Создание контента</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{socialData.engagementMetrics.socialSharingRate}%</p>
              <p className="text-sm text-muted-foreground">Шеринг</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Уровень вовлечённости по платформам</h4>
            <div className="space-y-3">
              {socialData.engagementByPlatform.map((platform, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{platform.name}</span>
                    <span>{platform.engagementRate}%</span>
                  </div>
                  <ProgressBar 
                    value={platform.engagementRate} 
                    variant={platform.engagementRate > 70 ? "success" : platform.engagementRate > 40 ? "default" : "warning"} 
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ArtSocialNetworkVisualizer };