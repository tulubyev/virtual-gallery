import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  Users,
  GraduationCap,
  Award,
  Star,
  Calendar,
  GalleryVerticalEnd,
  MessageCircle,
  Target,
  TrendingUp,
  Play,
  Eye,
  Heart
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

interface ArtEducationVisualizerProps {
  educationData: {
    courses: Array<{
      title: string;
      instructor: string;
      studentsEnrolled: number;
      completionRate: number;
      rating: number;
      duration: string;
      tags: string[];
    }>;
    learningPaths: Array<{
      name: string;
      description: string;
      coursesCount: number;
      estimatedTime: string;
      difficulty: 'beginner' | 'intermediate' | 'advanced';
    }>;
    studentProgress: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    coursePopularity: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    achievementMetrics: {
      totalStudents: number;
      certificatesIssued: number;
      averageCompletionTime: number; // in days
      satisfactionRate: number; // 0-100
    };
  };
  className?: string;
}

const ArtEducationVisualizer: React.FC<ArtEducationVisualizerProps> = ({
  educationData,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Achievement metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего студентов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{educationData.achievementMetrics.totalStudents.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+18.2% за месяц</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Выдано сертификатов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{educationData.achievementMetrics.certificatesIssued.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+22.5% за месяц</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Среднее время завершения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{educationData.achievementMetrics.averageCompletionTime} дней</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Target className="h-4 w-4 mr-1" />
              <span>Оптимально: 30 дней</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Удовлетворенность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{educationData.achievementMetrics.satisfactionRate}%</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>Высокий уровень</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student progress chart */}
        <Card>
          <CardHeader>
            <CardTitle>Прогресс студентов</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="line"
              data={learningData.studentProgress}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Прогресс студентов по курсам за последние 30 дней'
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
        
        {/* Course popularity chart */}
        <Card>
          <CardHeader>
            <CardTitle>Популярность курсов</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="bar"
              data={learningData.coursePopularity}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Рейтинг курсов по количеству записавшихся'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Популярные курсы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {educationData.courses.map((course, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">Инструктор: {course.instructor}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{course.rating.toFixed(1)}</span>
                        </div>
                        <Badge variant="outline">{course.duration}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.studentsEnrolled} студентов</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{course.completionRate}% завершено</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {course.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Learning paths */}
        <Card>
          <CardHeader>
            <CardTitle>Образовательные траектории</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {educationData.learningPaths.map((path, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{path.name}</h3>
                    <Badge variant={
                      path.difficulty === 'beginner' ? 'default' : 
                      path.difficulty === 'intermediate' ? 'secondary' : 'outline'
                    }>
                      {path.difficulty === 'beginner' ? 'Начальный' : 
                       path.difficulty === 'intermediate' ? 'Средний' : 'Продвинутый'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{path.description}</p>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <GalleryVerticalEnd className="h-4 w-4" />
                      <span>{path.coursesCount} курсов</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{path.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-6">
              <GraduationCap className="h-4 w-4 mr-2" />
              Начать обучение
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ArtEducationVisualizer };