import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Users, Zap, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-outfit font-bold mb-4">About Musicook</h1>
          <p className="text-xl text-muted-foreground">Revolutionizing music creation with AI</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-8 text-center">
              <Music className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">To democratize music creation by making professional-quality music accessible to everyone, regardless of musical background.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-8 text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Our Technology</h3>
              <p className="text-muted-foreground">Powered by cutting-edge AI that understands musical theory, emotion, and the art of composition.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;