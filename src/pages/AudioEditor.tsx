import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward,
  Volume2,
  Mic,
  Upload,
  Download,
  Save,
  ArrowLeft,
  Undo,
  Redo,
  Scissors,
  Copy,
  Settings,
  Zap,
  AudioWaveform
} from 'lucide-react';

const AudioEditor: React.FC = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState([120]);
  const [pitch, setPitch] = useState([0]);
  const [reverb, setReverb] = useState([25]);
  const [volume, setVolume] = useState([80]);
  const [bassBoost, setBassBoost] = useState([0]);
  const [trebleBoost, setTrebleBoost] = useState([0]);
  const [compression, setCompression] = useState([0]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-outfit font-bold">Audio Editor</h1>
              <p className="text-muted-foreground">Fine-tune your music with professional tools</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Undo className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button variant="outline">
              <Redo className="h-4 w-4 mr-2" />
              Redo
            </Button>
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button className="gradient-primary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Waveform Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Audio Player Controls */}
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
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
                    <Button variant="outline" size="sm">
                      <Square className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">0:42 / 3:24</span>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-4 w-4" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Waveform Visualization */}
                <div className="bg-muted/30 rounded-lg p-8 mb-4">
                  <div className="flex items-end justify-center space-x-1 h-32">
                    {[...Array(100)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary rounded-full transition-all duration-200"
                        style={{
                          width: '3px',
                          height: `${Math.random() * 100 + 20}%`,
                          opacity: i < 30 ? 1 : 0.3
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-center mt-4 text-muted-foreground">
                    <AudioWaveform className="h-5 w-5 mx-auto mb-2" />
                    <p>Waveform visualization</p>
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>0:00</span>
                  <span>0:30</span>
                  <span>1:00</span>
                  <span>1:30</span>
                  <span>2:00</span>
                  <span>2:30</span>
                  <span>3:00</span>
                  <span>3:24</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="w-1/4 h-full bg-primary rounded-full"></div>
                </div>
              </CardContent>
            </Card>

            {/* Track Layers */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AudioWaveform className="h-5 w-5 mr-2" />
                  Track Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Vocals', 'Guitar', 'Piano', 'Drums', 'Bass'].map((track, index) => (
                  <div key={track} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                    <div className="w-20 text-sm font-medium">{track}</div>
                    <Button variant="ghost" size="sm">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Slider
                      defaultValue={[70]}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Scissors className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Controls Sidebar */}
          <div className="space-y-6">
            <Tabs defaultValue="effects" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="effects">Effects</TabsTrigger>
                <TabsTrigger value="vocals">Vocals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="effects" className="space-y-4 mt-4">
                {/* Tempo Control */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Tempo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-2xl font-bold">{tempo[0]}</span>
                      <span className="text-muted-foreground ml-1">BPM</span>
                    </div>
                    <Slider
                      value={tempo}
                      onValueChange={setTempo}
                      max={200}
                      min={60}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>60</span>
                      <span>200</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Pitch Control */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Pitch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-2xl font-bold">{pitch[0] > 0 ? '+' : ''}{pitch[0]}</span>
                      <span className="text-muted-foreground ml-1">semitones</span>
                    </div>
                    <Slider
                      value={pitch}
                      onValueChange={setPitch}
                      max={12}
                      min={-12}
                      step={1}
                      className="w-full"
                    />
                  </CardContent>
                </Card>

                {/* Reverb */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Reverb</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-2xl font-bold">{reverb[0]}%</span>
                    </div>
                    <Slider
                      value={reverb}
                      onValueChange={setReverb}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </CardContent>
                </Card>

                {/* EQ Controls */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Equalizer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-sm">Bass</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs w-8">-12</span>
                        <Slider
                          value={bassBoost}
                          onValueChange={setBassBoost}
                          max={12}
                          min={-12}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-xs w-8">+12</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Treble</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs w-8">-12</span>
                        <Slider
                          value={trebleBoost}
                          onValueChange={setTrebleBoost}
                          max={12}
                          min={-12}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-xs w-8">+12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compression */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Compression</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-2xl font-bold">{compression[0]}%</span>
                    </div>
                    <Slider
                      value={compression}
                      onValueChange={setCompression}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="vocals" className="space-y-4 mt-4">
                {/* Vocal Upload */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Mic className="h-5 w-5 mr-2" />
                      Vocal Track
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Vocal Recording
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      or
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Mic className="h-4 w-4 mr-2" />
                      Record New Vocal
                    </Button>
                  </CardContent>
                </Card>

                {/* Vocal Effects */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Vocal Effects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="vocal-style">Voice Style</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select voice style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="natural">Natural</SelectItem>
                          <SelectItem value="autotuned">Auto-tuned</SelectItem>
                          <SelectItem value="robotic">Robotic</SelectItem>
                          <SelectItem value="chorus">Chorus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="vocal-gender">Voice Gender</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select voice type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full gradient-primary">
                      <Zap className="h-4 w-4 mr-2" />
                      Apply AI Vocals
                    </Button>
                  </CardContent>
                </Card>

                {/* Voice Processing */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Voice Processing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Noise Reduction
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Auto-Tune
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Vocal Isolation
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioEditor;