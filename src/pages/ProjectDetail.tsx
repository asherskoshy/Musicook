import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Edit, 
  Heart, 
  Clock, 
  Calendar,
  Music,
  Mic,
  Volume2,
  BarChart3,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(42);
  const totalTime = 204; // 3:24 in seconds

  // Mock project data
  const project = {
    id: id || '1',
    title: 'Summer Vibes',
    genre: 'Pop',
    mood: 'Happy',
    duration: '3:24',
    createdAt: '2024-01-15',
    status: 'completed',
    likes: 42,
    plays: 156,
    shares: 8,
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop',
    audioUrl: '#',
    lyrics: `Verse 1:
Walking down the sunny street today
Everything's looking bright my way
Got a smile that won't fade away
Summer vibes are here to stay

Chorus:
Feel the sunshine on my face
In this magical place
Every moment's filled with grace
Summer vibes, summer vibes

Verse 2:
Dancing through the golden hour
Feel the music's gentle power
Every second's like a flower
Blooming in this summer shower`,
    instruments: ['Guitar', 'Piano', 'Drums', 'Vocals'],
    tempo: 128,
    key: 'C Major'
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / totalTime) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-64 md:h-80 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{project.genre}</Badge>
                      <Badge variant="outline">{project.mood}</Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">
                      {project.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-white/90">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {project.duration}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audio Player */}
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button 
                        size="lg"
                        onClick={handlePlayPause}
                        className="gradient-primary w-12 h-12 rounded-full"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6 ml-1" />
                        )}
                      </Button>
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(currentTime)} / {formatTime(totalTime)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className={isLiked ? 'text-red-500' : ''}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Progress value={progress} className="w-full" />
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>0:00</span>
                    <span>{project.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lyrics */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Lyrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {project.lyrics}
                </pre>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 gradient-primary" asChild>
                <Link to={`/editor/${project.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit in Audio Editor
                </Link>
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download MP3
              </Button>
              <Button variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <Play className="h-4 w-4 mr-2" />
                    Plays
                  </span>
                  <span className="font-semibold">{project.plays}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <Heart className="h-4 w-4 mr-2" />
                    Likes
                  </span>
                  <span className="font-semibold">{project.likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <Share2 className="h-4 w-4 mr-2" />
                    Shares
                  </span>
                  <span className="font-semibold">{project.shares}</span>
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Music className="h-5 w-5 mr-2" />
                  Technical Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">TEMPO</Label>
                  <div className="font-semibold">{project.tempo} BPM</div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">KEY</Label>
                  <div className="font-semibold">{project.key}</div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">INSTRUMENTS</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.instruments.map(instrument => (
                      <Badge key={instrument} variant="outline" className="text-xs">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">STATUS</Label>
                  <div className="mt-1">
                    <Badge 
                      className={
                        project.status === 'completed' ? 'bg-green-500' :
                        project.status === 'processing' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Create Remix
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Music className="h-4 w-4 mr-2" />
                  Generate Similar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share to Social
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;