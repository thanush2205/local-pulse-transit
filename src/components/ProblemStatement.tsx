import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Car, MapPin } from "lucide-react";

const ProblemStatement = () => {
  const stats = [
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      stat: "60%+",
      label: "Commuters face delays",
      description: "Due to lack of real-time information"
    },
    {
      icon: <Car className="h-6 w-6 text-accent" />,
      stat: "↑40%",
      label: "Private vehicle dependency",
      description: "Reducing public transport usage"
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-accent" />,
      stat: "High",
      label: "Traffic & pollution impact",
      description: "From increased private vehicle use"
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      stat: "Tier-2",
      label: "Cities affected most",
      description: "Limited digital infrastructure"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Problem Analysis</Badge>
          <h2 className="text-4xl font-bold mb-6">Understanding the Challenge</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Small cities and tier-2 towns face significant challenges with unpredictable public transport, 
            leading to reduced ridership and increased urban mobility issues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, index) => (
            <Card key={index} className="text-center hover:shadow-glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
                <div className="font-semibold mb-2">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-l-4 border-l-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Key Problem Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Commuter Pain Points</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Unpredictable bus arrival times</li>
                  <li>• Overcrowding due to poor scheduling</li>
                  <li>• Wasted time waiting at bus stops</li>
                  <li>• Lack of route information accessibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Infrastructure Challenges</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Limited digital infrastructure</li>
                  <li>• Low bandwidth connectivity</li>
                  <li>• Aging public transport fleet</li>
                  <li>• Insufficient data management systems</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProblemStatement;