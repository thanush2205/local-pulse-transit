import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Smartphone, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-transport.jpg";
import { Link } from "react-router-dom";

interface LandingHeroProps {
  onGetStarted: () => void;
}

const LandingHero = ({ onGetStarted }: LandingHeroProps) => {
  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Real-Time Tracking",
      description: "Track buses live with GPS precision"
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "Arrival Predictions",
      description: "AI-powered arrival time estimates"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      title: "Mobile Optimized",
      description: "Works perfectly on any device"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Occupancy Info",
      description: "Avoid crowded buses with live data"
    }
  ];

  return (
    <div className="relative min-h-[90vh] bg-gradient-hero overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-primary/20 text-primary">
              🚌 Live Public Transport Tracking
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
              Never Miss Your Bus Again
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Real-time GPS tracking for public buses in your city. Know exactly when your bus will arrive and plan your journey with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
              >
                Track Buses Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/project-plan">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 hover:bg-accent/10"
              >
                View Demo
              </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-glow transition-all duration-300 border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Live Demo Preview */}
          <Card className="bg-card/80 backdrop-blur border-0 shadow-elegant">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Live Demo</h2>
                <p className="text-muted-foreground">
                  See real-time bus tracking in action
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Bus #001</h4>
                  <p className="text-sm text-muted-foreground mb-2">Route 12 - City Center</p>
                  <Badge className="bg-primary text-primary-foreground">
                    Arriving in 4 min
                  </Badge>
                </div>
                
                <div className="text-center p-6 bg-accent/10 rounded-lg">
                  <MapPin className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Bus #002</h4>
                  <p className="text-sm text-muted-foreground mb-2">Route 8 - Airport Express</p>
                  <Badge className="bg-accent text-accent-foreground">
                    Arriving in 8 min
                  </Badge>
                </div>
                
                <div className="text-center p-6 bg-muted/50 rounded-lg">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Bus #003</h4>
                  <p className="text-sm text-muted-foreground mb-2">Route 5 - University Line</p>
                  <Badge variant="secondary">
                    Delayed - 12 min
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;