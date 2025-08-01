import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Play, 
  Pause, 
  Search, 
  Music, 
  TrendingUp,
  Clock,
  Heart
} from 'lucide-react';

// Simple type for our music projects
type Project = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  status: 'completed' | 'processing' | 'draft';
  likes: number;
  thumbnail: string;
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string>('');

  // Some example projects (in real app, this would come from your backend)
  const projects: Project[] = [
    {
      id: '1',
      title: 'Summer Vibes',
      genre: 'Pop',
      duration: '3:24',
      status: 'completed',
      likes: 42,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Midnight Dreams',
      genre: 'Electronic',
      duration: '4:12',
      status: 'completed',
      likes: 28,
      thumbnail: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop'
    },
    {
      id: '3',
      title: 'Coffee Shop Blues',
      genre: 'Jazz',
      duration: '2:45',
      status: 'processing',
      likes: 15,
      thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop'
    },
    {
      id: '4',
      title: 'Mountain High',
      genre: 'Folk',
      duration: '3:56',
      status: 'draft',
      likes: 8,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop'
    }
  ];

  // Simple function to handle play/pause
  const handlePlayPause = (projectId: string) => {
    if (currentlyPlaying === projectId) {
      setCurrentlyPlaying(''); // Stop playing
    } else {
      setCurrentlyPlaying(projectId); // Start playing this project
    }
  };

  // Simple search - filter projects by title or genre
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate some simple stats
  const totalLikes = projects.reduce((sum, project) => sum + project.likes, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-outfit font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Let's create some amazing music today
          </p>
        </div>

        {/* Simple Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Projects</p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
                <div className="gradient-primary p-3 rounded-full">
                  <Music className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Plays</p>
                  <p className="text-2xl font-bold">2.4K</p>
                </div>
                <div className="gradient-primary p-3 rounded-full">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Likes</p>
                  <p className="text-2xl font-bold">{totalLikes}</p>
                </div>
                <div className="gradient-primary p-3 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">This Month</p>
                  <p className="text-2xl font-bold">+12</p>
                </div>
                <div className="gradient-primary p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create New Project Card */}
        <Card className="mb-8 bg-gradient-primary">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-4 md:mb-0">
                <h3 className="text-xl font-semibold mb-2">Ready to create your next hit?</h3>
                <p className="text-white/90">Transform your lyrics into professional music with our AI</p>
              </div>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/generate">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Project
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-outfit font-bold">Your Projects</h2>
            
            {/* Simple search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[200px]"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-card/50 border-border/50 hover:shadow-primary transition-all duration-300 group">
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
                      onClick={() => handlePlayPause(project.id)}
                    >
                      {currentlyPlaying === project.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Status badge */}
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      project.status === 'completed' ? 'bg-green-500' :
                      project.status === 'processing' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}
                  >
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
            ))}
          </div>

          {/* Show message when no projects found */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Create your first music project to get started'}
              </p>
              <Button asChild>
                <Link to="/generate">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;