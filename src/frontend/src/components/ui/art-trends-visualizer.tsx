import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  TrendingDown,
  Award,
  Flame,
  Brush
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { cn } from "@/lib/utils";

interface ArtTrendsVisualizerProps {
  trendsData: {
    emergingTrends: Array<{
      name: string;
      growthRate: number;
      popularity: number; // 0-100
      description: string;
      relatedArtists: string[];
      relatedArtworks: string[];
    }>;
    seasonalPatterns: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    genrePopularity: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    artistSpotlight: Array<{
      name: string;
      growth: number;
      trending: boolean;
      specialty: string;
      recentExhibitions: number;
    }>;
    trendingTags: Array<{
      name: string;
      usageCount: number;
    }>;
    marketPredictions: Array<{
      trend: string;
      predictedGrowth: number;
      confidence: number; // 0-100
      timeframe: string;
    }>;
  };
  className?: string;
}

const ArtTrendsVisualizer: React.FC<ArtTrendsVisualizerProps> = ({
  trendsData,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Trending now section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trendsData.emergingTrends.slice(0, 3).map((trend, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                {trend.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{trend.growthRate}%</p>
                  <p className="text-xs text-muted-foreground">Рост</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{trend.popularity}%</p>
                  <p className="text-xs text-muted-foreground">Популярность</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{trend.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seasonal trends chart */}
        <Card>
          <CardHeader>
            <CardTitle>Сезонные тренды</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="line"
              data={trendsData.seasonalPatterns}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Изменение популярности направлений в течение года'
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
        
        {/* Genre popularity chart */}
        <Card>
          <CardHeader>
            <CardTitle>Популярность жанров</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="bar"
              data={trendsData.genrePopularity}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Распределение популярности по художественным жанрам'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Artist spotlight */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Художник недели</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendsData.artistSpotlight.map((artist, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Brush className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{artist.name}</h3>
                        <p className="text-sm text-muted-foreground">{artist.specialty}</p>
                      </div>
                      <Badge variant={artist.trending ? "default" : "secondary"}>
                        {artist.trending ? 'В тренде' : 'Растущий'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        {artist.growth >= 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                        <span className={artist.growth >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {Math.abs(artist.growth)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>{artist.recentExhibitions} выставок</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Predictions */}
        <Card>
          <CardHeader>
            <CardTitle>Прогнозы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendsData.marketPredictions.map((prediction, index) => (
                <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{prediction.trend}</h4>
                    <Badge variant={prediction.confidence > 70 ? "default" : prediction.confidence > 50 ? "secondary" : "outline"}>
                      {prediction.confidence}% уверенность
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${prediction.predictedGrowth}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{prediction.predictedGrowth}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{prediction.timeframe}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Trending tags */}
      <Card>
        <CardHeader>
          <CardTitle>Популярные теги</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendsData.trendingTags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                #{tag.name}
                <span className="ml-1 text-xs">({tag.usageCount})</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ArtTrendsVisualizer };