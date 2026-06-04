import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Eye,
  Star,
  MapPin,
  Clock,
  GalleryVerticalEnd
} from "lucide-react";
import { Tag } from "@/components/ui/tag";
import { motion } from "framer-motion";

interface GalleryCardProps {
  name: string;
  description: string;
  location: string;
  openingHours: string;
  visitorCount: number;
  rating: number;
  artworksCount: number;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  onView?: () => void;
  className?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  name,
  description,
  location,
  openingHours,
  visitorCount,
  rating,
  artworksCount,
  tags,
  featured = false,
  imageUrl,
  onView,
  className
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Card className={cn("overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300", className)}>
        {featured && (
          <div className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground text-center py-2 text-sm font-medium">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span>Рекомендуем</span>
            </div>
          </div>
        )}

        <div className="relative overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-muted to-primary/10 flex items-center justify-center">
              <GalleryVerticalEnd className="h-16 w-16 text-primary/20" />
            </div>
          )}

          {/* Rating badge overlay */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3 pt-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
            </div>
            <Badge variant="secondary" className="self-start bg-primary/10 text-primary">
              {visitorCount.toLocaleString()} посетителей
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-3 px-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{openingHours}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GalleryVerticalEnd className="h-4 w-4" />
              <span>{artworksCount} экспонатов</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Tag text={tag} variant="secondary" />
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-4 px-6">
          <Button
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground"
            onClick={onView}
          >
            <Eye className="h-4 w-4 mr-2" />
            Посетить галерею
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export { GalleryCard };