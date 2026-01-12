import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  GalleryVerticalEnd,
  Calendar,
  Award,
  Activity,
  BarChart3,
  PieChart
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { cn } from "@/lib/utils";

interface ArtMarketVisualizerProps {
  marketData: {
    priceTrends: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    topCategories: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    marketIndicators: {
      totalValue: number;
      volume: number;
      averagePrice: number;
      priceChange: number;
    };
    topSellingArtists: Array<{
      name: string;
      sales: number;
      growth: number;
    }>;
    auctionResults: Array<{
      artwork: string;
      artist: string;
      hammerPrice: number;
      estimate: number;
      sold: boolean;
    }>;
  };
  className?: string;
}

const ArtMarketVisualizer: React.FC<ArtMarketVisualizerProps> = ({
  marketData,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Market indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Общая стоимость рынка</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(marketData.marketIndicators.totalValue / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{(marketData.marketIndicators.priceChange).toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Объем продаж</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(marketData.marketIndicators.volume / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12.3%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Средняя цена</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${marketData.marketIndicators.averagePrice.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5.2%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketData.auctionResults.length}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="h-4 w-4 mr-1" />
              <span>Аукционов</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price trends chart */}
        <Card>
          <CardHeader>
            <CardTitle>Динамика цен на арт-рынке</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="line"
              data={marketData.priceTrends}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Изменение цен по категориям за последние 12 месяцев'
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
        
        {/* Top categories chart */}
        <Card>
          <CardHeader>
            <CardTitle>Топ категории</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="doughnut"
              data={marketData.topCategories}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                  title: {
                    display: true,
                    text: 'Распределение по категориям'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top selling artists */}
        <Card>
          <CardHeader>
            <CardTitle>Топ художники по продажам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.topSellingArtists.map((artist, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{artist.name}</p>
                      <p className="text-sm text-muted-foreground">${artist.sales.toLocaleString()} продаж</p>
                    </div>
                  </div>
                  <div className={`flex items-center text-sm ${artist.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {artist.growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    <span>{Math.abs(artist.growth)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent auction results */}
        <Card>
          <CardHeader>
            <CardTitle>Результаты последних аукционов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.auctionResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{result.artwork}</p>
                    <p className="text-sm text-muted-foreground">{result.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${result.hammerPrice.toLocaleString()}</p>
                    <p className={`text-sm ${result.sold ? 'text-green-500' : 'text-red-500'}`}>
                      {result.sold ? 'Продано' : 'Не продано'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Аналитика рынка</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Сезонность</h4>
              <p className="text-sm text-muted-foreground">Спрос на арт-объекты возрастает перед праздниками</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Тренды</h4>
              <p className="text-sm text-muted-foreground">NFT и цифровое искусство набирают обороты</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Прогноз</h4>
              <p className="text-sm text-muted-foreground">Ожидается рост на 8-12% в следующем квартале</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ArtMarketVisualizer };