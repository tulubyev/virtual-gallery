import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database,
  Globe,
  Zap,
  Brain,
  Palette,
  Users,
  Eye,
  Activity,
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

interface ArtTechVisualizerProps {
  techData: {
    technologies: Array<{
      name: string;
      description: string;
      adoptionRate: number; // 0-100
      userSatisfaction: number; // 0-100
      performanceScore: number; // 0-100
      usageCount: number;
      tags: string[];
    }>;
    systemMetrics: {
      uptime: number; // percentage
      responseTime: number; // in ms
      concurrentUsers: number;
      dataProcessed: number; // in GB
    };
    innovationTrends: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    technologyAdoption: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    performanceMetrics: Array<{
      name: string;
      score: number; // 0-100
      status: 'excellent' | 'good' | 'average' | 'poor';
    }>;
    securityMetrics: {
      dataEncryption: boolean;
      accessControls: number; // 0-100
      auditLogs: boolean;
      vulnerabilityAssessment: number; // 0-100
    };
    vrArMetrics: {
      vrUsers: number;
      arInteractions: number;
      avgSessionTime: number; // in minutes
      satisfactionRate: number; // 0-100
    };
  };
  className?: string;
}

const ArtTechVisualizer: React.FC<ArtTechVisualizerProps> = ({
  techData,
  className
}) => {
  const securityMetrics = techData.securityMetrics;
  const vrMetrics = techData.vrArMetrics;
  return (
    <div className={cn("space-y-6", className)}>
      {/* System metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Время работы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{techData.systemMetrics.uptime}%</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Zap className="h-4 w-4 mr-1" />
              <span>Стабильность системы</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Время отклика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{techData.systemMetrics.responseTime}мс</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="h-4 w-4 mr-1" />
              <span>Среднее время отклика</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Одновременных пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{techData.systemMetrics.concurrentUsers.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>Активные сессии</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Обработано данных</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(techData.systemMetrics.dataProcessed / 1024).toFixed(1)}TB</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Database className="h-4 w-4 mr-1" />
              <span>За месяц</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Innovation trends chart */}
        <Card>
          <CardHeader>
            <CardTitle>Тренды инноваций</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="line"
              data={techData.innovationTrends}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Внедрение новых технологий в арт-галереях'
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
        
        {/* Technology adoption chart */}
        <Card>
          <CardHeader>
            <CardTitle>Принятие технологий</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="bar"
              data={techData.technologyAdoption}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Уровень принятия технологий пользователями'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Technology cards */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Используемые технологии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {techData.technologies.map((tech, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{tech.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{tech.description}</p>
                    </div>
                    <Badge variant="outline">{tech.usageCount.toLocaleString()} использований</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Принятие</p>
                      <div className="flex items-center gap-2">
                        <ProgressBar value={tech.adoptionRate} variant="default" className="h-2" />
                        <span className="text-sm font-medium">{tech.adoptionRate}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Удовлетворенность</p>
                      <div className="flex items-center gap-2">
                        <ProgressBar value={tech.userSatisfaction} variant="success" className="h-2" />
                        <span className="text-sm font-medium">{tech.userSatisfaction}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Производительность</p>
                      <div className="flex items-center gap-2">
                        <ProgressBar value={tech.performanceScore} 
                          variant={
                            tech.performanceScore > 80 ? "success" : 
                            tech.performanceScore > 60 ? "default" : 
                            tech.performanceScore > 40 ? "warning" : "error"
                          } 
                          className="h-2" 
                        />
                        <span className="text-sm font-medium">{tech.performanceScore}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tech.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Performance and security metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Метрики производительности</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {techData.performanceMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{metric.name}</span>
                    <span>{metric.score}%</span>
                  </div>
                  <ProgressBar 
                    value={metric.score} 
                    variant={
                      metric.status === 'excellent' ? 'success' : 
                      metric.status === 'good' ? 'default' : 
                      metric.status === 'average' ? 'warning' : 'error'
                    } 
                  />
                </div>
              ))}
              
              <div className="pt-4">
                <h4 className="font-medium mb-3">Безопасность</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Шифрование данных</span>
                    <Badge variant={securityMetrics.dataEncryption ? "default" : "destructive"}>
                      {securityMetrics.dataEncryption ? "Вкл" : "Выкл"}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Контроль доступа</span>
                      <span>{securityMetrics.accessControls}%</span>
                    </div>
                    <ProgressBar 
                      value={securityMetrics.accessControls} 
                      variant={securityMetrics.accessControls > 80 ? "success" : securityMetrics.accessControls > 50 ? "default" : "warning"} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Логи аудита</span>
                    <Badge variant={securityMetrics.auditLogs ? "default" : "destructive"}>
                      {securityMetrics.auditLogs ? "Есть" : "Нет"}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Оценка уязвимостей</span>
                      <span>{securityMetrics.vulnerabilityAssessment}%</span>
                    </div>
                    <ProgressBar 
                      value={securityMetrics.vulnerabilityAssessment} 
                      variant={securityMetrics.vulnerabilityAssessment > 80 ? "success" : securityMetrics.vulnerabilityAssessment > 50 ? "default" : "warning"} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-3">VR/AR Метрики</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-lg p-3">
                    <p className="text-lg font-semibold">{vrMetrics.vrUsers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">VR пользователей</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="text-lg font-semibold">{vrMetrics.arInteractions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">AR взаимодействий</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="text-lg font-semibold">{vrMetrics.avgSessionTime} мин</p>
                    <p className="text-xs text-muted-foreground">Средняя сессия</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="text-lg font-semibold">{vrMetrics.satisfactionRate}%</p>
                    <p className="text-xs text-muted-foreground">Удовлетворенность</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tech roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Технологическая дорожная карта</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Brain className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">ИИ-рекомендации</h4>
                <p className="text-sm text-muted-foreground mt-1">Персонализированные рекомендации экспонатов на основе предпочтений пользователя</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="default">Q2 2024</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>95% удовлетворенности</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">VR-галереи</h4>
                <p className="text-sm text-muted-foreground mt-1">Полноценные VR-опыты с поддержкой Oculus и HTC Vive</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="default">Q3 2024</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>87% вовлеченности</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Palette className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">AR-навигация</h4>
                <p className="text-sm text-muted-foreground mt-1">Дополненная реальность для навигации по галерее и получения информации об экспонатах</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary">Q4 2024</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span>В разработке</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ArtTechVisualizer };