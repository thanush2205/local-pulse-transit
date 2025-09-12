import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Navigation, Wifi } from "lucide-react";

interface Bus {
  id: string;
  route: string;
  currentStop: string;
  nextStop: string;
  eta: number;
  occupancy: number;
  lat: number;
  lng: number;
  status: 'on-time' | 'delayed' | 'early';
}

const BusMap = () => {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: "BUS001",
      route: "Route 12 - City Center",
      currentStop: "Main Station",
      nextStop: "College Square",
      eta: 4,
      occupancy: 75,
      lat: 23.8103,
      lng: 90.4125,
      status: 'on-time'
    },
    {
      id: "BUS002", 
      route: "Route 8 - Airport Express",
      currentStop: "Tech Park",
      nextStop: "Airport Terminal",
      eta: 8,
      occupancy: 45,
      lat: 23.8203,
      lng: 90.4225,
      status: 'early'
    },
    {
      id: "BUS003",
      route: "Route 5 - University Line",
      currentStop: "Shopping Mall",
      nextStop: "University Gate",
      eta: 12,
      occupancy: 90,
      lat: 23.8003,
      lng: 90.4025,
      status: 'delayed'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          eta: Math.max(0, bus.eta - 1),
          occupancy: Math.min(100, Math.max(10, bus.occupancy + Math.floor(Math.random() * 10 - 5))),
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'on-time': return 'bg-primary text-primary-foreground';
      case 'early': return 'bg-accent text-accent-foreground';  
      case 'delayed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 50) return 'text-primary';
    if (occupancy < 80) return 'text-accent';
    return 'text-destructive';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
      {/* Map Area */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Bus Tracking
              <Badge className="ml-auto bg-primary/20 text-primary">
                <Wifi className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-80px)] relative">
            {/* Simulated Map Background */}
            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg relative overflow-hidden">
              {/* Map Grid Pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Bus Markers */}
              {buses.map((bus, index) => (
                <div
                  key={bus.id}
                  className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center text-white text-xs font-bold shadow-glow transform hover:scale-110 ${
                    selectedBus?.id === bus.id ? 'w-8 h-8 ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                    backgroundColor: bus.status === 'on-time' ? 'hsl(var(--primary))' : 
                                   bus.status === 'early' ? 'hsl(var(--accent))' : 
                                   'hsl(var(--destructive))'
                  }}
                  onClick={() => setSelectedBus(bus)}
                >
                  {index + 1}
                </div>
              ))}

              {/* Route Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 100 150 Q 200 100 350 180 Q 450 250 550 200"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="5,5"
                />
                <path
                  d="M 80 300 Q 180 250 280 320 Q 380 380 480 340"
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Map Labels */}
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 text-xs">
                <div className="font-semibold">Downtown Area</div>
                <div className="text-muted-foreground">Live Traffic: Light</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bus Information Panel */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Bus Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedBus?.id === bus.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setSelectedBus(bus)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {bus.id}
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(bus.status)}`}>
                    {bus.status}
                  </Badge>
                </div>
                
                <h4 className="font-semibold text-sm mb-2">{bus.route}</h4>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>At: {bus.currentStop}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-3 w-3" />
                    <span>Next: {bus.nextStop}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>ETA: {bus.eta} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className={`h-3 w-3 ${getOccupancyColor(bus.occupancy)}`} />
                    <span>Occupancy: {bus.occupancy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {selectedBus && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bus Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-primary">{selectedBus.route}</h5>
                  <p className="text-sm text-muted-foreground">Bus ID: {selectedBus.id}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold">{selectedBus.eta}</div>
                    <div className="text-xs text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Users className={`h-5 w-5 mx-auto mb-1 ${getOccupancyColor(selectedBus.occupancy)}`} />
                    <div className="text-lg font-bold">{selectedBus.occupancy}%</div>
                    <div className="text-xs text-muted-foreground">Occupied</div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Set Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BusMap;