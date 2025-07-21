import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  Music, 
  Mic, 
  Guitar, 
  Piano, 
  Drum, 
  Volume2,
  Clock,
  Zap,
  Heart,
  Sun,
  Moon,
  Coffee,
  Mountain
} from 'lucide-react';

const Generate: React.FC = () => {
  const [lyrics, setLyrics] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [tempo, setTempo] = useState([120]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Folk', 'Electronic', 'Jazz', 
    'Classical', 'Blues', 'Reggae', 'Indie', 'Alternative', 'Metal'
  ];

  const moods = [
    { value: 'happy', label: 'Happy', icon: Sun, color: 'text-yellow-500' },
    { value: 'sad', label: 'Sad', icon: Moon, color: 'text-blue-500' },
    { value: 'energetic', label: 'Energetic', icon: Zap, color: 'text-orange-500' },
    { value: 'romantic', label: 'Romantic', icon: Heart, color: 'text-pink-500' },
    { value: 'chill', label: 'Chill', icon: Coffee, color: 'text-green-500' },
    { value: 'epic', label: 'Epic', icon: Mountain, color: 'text-purple-500' }
  ];

  const instruments = [
    { value: 'guitar', label: 'Guitar', icon: Guitar },
    { value: 'piano', label: 'Piano', icon: Piano },
    { value: 'drums', label: 'Drums', icon: Drum },
    { value: 'vocals', label: 'Vocals', icon: Mic },
    { value: 'bass', label: 'Bass', icon: Music },
    { value: 'synth', label: 'Synth', icon: Volume2 }
  ];

  const handleInstrumentToggle = (instrument: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrument) 
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  const handleGenerate = async () => {
    if (!lyrics.trim()) {
      toast({
        title: "Error",
        description: "Please enter some lyrics to generate music",
        variant: "destructive",
      });
      return;
    }

    if (!selectedGenre) {
      toast({
        title: "Error",
        description: "Please select a genre",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Mock generation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Music Generated Successfully! 🎵",
        description: "Your song has been created and saved to your projects",
      });

      // Navigate to project detail page
      navigate('/project/new-generated-project');
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-outfit font-bold mb-4">
            AI Music Generator
          </h1>
          <p className="text-xl text-muted-foreground">
            Transform your lyrics into professional music with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Generation Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lyrics Input */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Your Lyrics
                </CardTitle>
                <CardDescription>
                  Paste your lyrics or start writing. Our AI will analyze the content and create matching music.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your lyrics here...

Example:
Verse 1:
Walking down the empty street tonight
City lights are shining bright
Dreams are calling out my name
Nothing will ever be the same

Chorus:
We're chasing stars across the sky
Never gonna say goodbye
This is our moment, this is our time
Everything's gonna be just fine"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="min-h-[300px] bg-muted/50 resize-none"
                />
                <div className="mt-2 text-sm text-muted-foreground">
                  {lyrics.length} / 2000 characters
                </div>
              </CardContent>
            </Card>

            {/* Genre Selection */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Genre</CardTitle>
                <CardDescription>
                  Choose the musical style that best fits your song
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre.toLowerCase()}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Mood Selection */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Mood & Vibe</CardTitle>
                <CardDescription>
                  Set the emotional tone of your music
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {moods.map(mood => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMood === mood.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-border/80'
                      }`}
                    >
                      <mood.icon className={`h-6 w-6 mx-auto mb-2 ${mood.color}`} />
                      <div className="text-sm font-medium">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instruments */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Instruments</CardTitle>
                <CardDescription>
                  Select the instruments you want in your track
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {instruments.map(instrument => (
                    <button
                      key={instrument.value}
                      onClick={() => handleInstrumentToggle(instrument.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedInstruments.includes(instrument.value)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-border/80'
                      }`}
                    >
                      <instrument.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">{instrument.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tempo Control */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Tempo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold">{tempo[0]}</span>
                    <span className="text-muted-foreground ml-1">BPM</span>
                  </div>
                  <Slider
                    value={tempo}
                    onValueChange={setTempo}
                    max={200}
                    min={60}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Options Summary */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">GENRE</Label>
                  <div className="mt-1">
                    {selectedGenre ? (
                      <Badge variant="secondary">{selectedGenre}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not selected</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">MOOD</Label>
                  <div className="mt-1">
                    {selectedMood ? (
                      <Badge variant="secondary">{selectedMood}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not selected</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">INSTRUMENTS</Label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedInstruments.length > 0 ? (
                      selectedInstruments.map(instrument => (
                        <Badge key={instrument} variant="outline" className="text-xs">
                          {instrument}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">None selected</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !lyrics.trim() || !selectedGenre}
              className="w-full h-14 text-lg gradient-primary"
            >
              {isGenerating ? (
                <>
                  <div className="flex justify-center space-x-1 mr-3">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="audio-bar w-1 bg-white"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Music
                </>
              )}
            </Button>
            
            {isGenerating && (
              <div className="text-center text-sm text-muted-foreground">
                This usually takes 30-60 seconds
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;