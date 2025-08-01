import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Clock, Heart } from 'lucide-react';

// Simple type for project props
type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    genre: string;
    duration: string;
    status: 'completed' | 'processing' | 'draft';
    likes: number;
    thumbnail: string;
  };
  isPlaying: boolean;
  onPlayPause: (projectId: string) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isPlaying, onPlayPause }) => {
  // Choose badge color based on status
  const getBadgeColor = (status: string) => {
    if (status === 'completed') return 'bg-green-500';
    if (status === 'processing') return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <Card className="bg-card/50 border-border/50 hover:shadow-primary transition-all duration-300 group">
      <div className="relative">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        {/* Play button overlay - shows on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg">
          <Button
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            onClick={() => onPlayPause(project.id)}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Status badge */}
        <Badge className={`absolute top-3 right-3 ${getBadgeColor(project.status)}`}>
          {project.status}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
          <p className="text-muted-foreground text-sm">{project.genre}</p>
        </div>
        
        {/* Duration and likes */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>{project.likes}</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <Link to={`/project/${project.id}`}>View Details</Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link to={`/editor/${project.id}`}>Edit Audio</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;