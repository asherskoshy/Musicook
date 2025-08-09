import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Mic, Headphones, AudioWaveform, Sparkles, Users, TrendingUp, Star } from 'lucide-react';

const Landing: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-background/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Floating music notes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="music-note absolute top-20 left-20 text-white/20">♪</div>
              <div className="music-note absolute top-32 right-32 text-white/20">♫</div>
              <div className="music-note absolute bottom-40 left-1/4 text-white/20">♪</div>
              <div className="music-note absolute top-40 right-20 text-white/20">♫</div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-outfit font-bold text-white mb-6">
              Turn Your <span className="text-yellow-300">Lyrics</span><br />
              Into <span className="text-yellow-300">Music</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              AI-powered music generation that transforms your words into professional-quality songs. 
              No musical experience required.
            </p>
            
            {/* Audio visualizer */}
            <div className="flex justify-center space-x-1 mb-8">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="audio-bar w-2 bg-white/60"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4" asChild>
                <Link to="/signup">Start Creating Free</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-4" asChild>
                <Link to="/about">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-outfit font-bold mb-4">
              Everything You Need to Create Music
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From lyric input to professional production, our AI handles the complex music theory 
              so you can focus on creativity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border/50 hover:shadow-primary transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Mic className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lyric to Music</h3>
                <p className="text-muted-foreground">
                  Simply paste your lyrics and our AI will compose melodies, harmonies, and arrangements that perfectly match your words.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-border/50 hover:shadow-primary transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <AudioWaveform className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Audio Editor</h3>
                <p className="text-muted-foreground">
                  Fine-tune your creations with professional audio editing tools. Adjust tempo, pitch, add effects, and more.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-border/50 hover:shadow-primary transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Professional Quality</h3>
                <p className="text-muted-foreground">
                  Export studio-quality tracks ready for streaming platforms, social media, or professional use.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-outfit font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Create professional music in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="absolute top-10 left-1/2 w-24 h-0.5 bg-gradient-primary transform -translate-x-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Input Your Lyrics</h3>
              <p className="text-muted-foreground">
                Paste your lyrics or write new ones. Choose your preferred genre, mood, and style preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute top-10 left-1/2 w-24 h-0.5 bg-gradient-primary transform -translate-x-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Generation</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your lyrics and creates a complete musical arrangement with vocals, instruments, and production.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Edit & Export</h3>
              <p className="text-muted-foreground">
                Fine-tune your track with our audio editor, then export in high quality for any platform or use case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold">50K+</span>
              </div>
              <p className="text-muted-foreground">Active Creators</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Music className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold">1M+</span>
              </div>
              <p className="text-muted-foreground">Songs Generated</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold">4.9/5</span>
              </div>
              <p className="text-muted-foreground">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-outfit font-bold text-white mb-6">
            Ready to Create Your First Song?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of creators who are already making amazing music with Musicook.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4" asChild>
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;