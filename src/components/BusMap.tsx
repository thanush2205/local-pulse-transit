import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Navigation, Wifi } from "lucide-react";

// You might want to import a default bus image or use a placeholder
const BusIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
    <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0v1.5a3.75 3.75 0 0 1-7.5 0V6.75ZM6 2.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 .75.75v1.5c0 1.933-1.088 3.553-2.671 4.402A4.249 4.249 0 0 0 12 9.75c-1.053 0-2.054-.153-2.98-.423C7.088 7.303 6 5.683 6 3.75v-1.5ZM1.5 10.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM2.25 14.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM19.5 10.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM20.25 14.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM4.5 18.75a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-.75-.75h-15ZM12 12a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 12 12ZM3 15.75v-1.5c0-.414.336-.75.75-.75h1.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM20.25 15.75v-1.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
  </svg>
`;

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
  // Manually add coordinates for the stops for this demo
  currentStopCoords: { lat: number; lng: number };
  nextStopCoords: { lat: number; lng: number };
}

const BusMap = () => {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [hoveredBus, setHoveredBus] = useState<Bus | null>(null); // New state for hover
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
      status: 'on-time',
      currentStopCoords: { lat: 23.8150, lng: 90.4100 },
      nextStopCoords: { lat: 23.8250, lng: 90.4200 }
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
      status: 'early',
      currentStopCoords: { lat: 23.8250, lng: 90.4200 },
      nextStopCoords: { lat: 23.8350, lng: 90.4300 }
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
      status: 'delayed',
      currentStopCoords: { lat: 23.8050, lng: 90.4000 },
      nextStopCoords: { lat: 23.7950, lng: 90.4050 }
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses =>
        prevBuses.map(bus => ({
          ...bus,
          eta: Math.max(0, bus.eta - 1),
          occupancy: Math.min(100, Math.max(10, bus.occupancy + Math.floor(Math.random() * 10 - 5))),
          lat: bus.lat + (Math.random() - 0.5) * 0.0005,
          lng: bus.lng + (Math.random() - 0.5) * 0.0008,
          status: Math.random() < 0.1 ? (['on-time', 'delayed', 'early'][Math.floor(Math.random() * 3)] as 'on-time' | 'delayed' | 'early') : bus.status
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-500 text-white';
      case 'early': return 'bg-blue-500 text-white';
      case 'delayed': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 50) return 'text-green-500';
    if (occupancy < 80) return 'text-orange-500';
    return 'text-red-500';
  };

  const mapLatToPercent = (lat: number) => {
    const minLat = 23.79;
    const maxLat = 23.83;
    return ((lat - minLat) / (maxLat - minLat)) * 100;
  };

  const mapLngToPercent = (lng: number) => {
    const minLng = 90.39;
    const maxLng = 90.43;
    return ((lng - minLng) / (maxLng - minLng)) * 100;
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
            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg relative overflow-hidden">
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
              {buses.map((bus) => (
                <div
                  key={bus.id}
                  className={`absolute w-8 h-8 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center text-white text-xs font-bold shadow-md transform hover:scale-125 hover:z-10 ${
                    selectedBus?.id === bus.id ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  style={{
                    left: `${mapLngToPercent(bus.lng)}%`,
                    top: `${mapLatToPercent(bus.lat)}%`,
                    backgroundColor: bus.status === 'on-time' ? 'hsl(142.1 76.2% 36.3%)' :
                                     bus.status === 'early' ? 'hsl(217.2 91.2% 59.8%)' :
                                     'hsl(0 84.2% 60.2%)'
                  }}
                  onClick={() => setSelectedBus(bus)}
                  onMouseEnter={() => setHoveredBus(bus)} // Set hovered bus
                  onMouseLeave={() => setHoveredBus(null)} // Clear hovered bus
                >
                  {/* Conditional rendering for content */}
                  {hoveredBus?.id === bus.id ? (
                    <span className="text-white font-bold text-sm">{bus.id.replace('BUS', '')}</span>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: BusIconSVG }} />
                  )}
                </div>
              ))}

              {/* Stop Markers (rendered only if a bus is selected) */}
              {selectedBus && (
                <>
                  {/* Current Stop Marker */}
                  <div
                    className="absolute w-4 h-4 rounded-full bg-primary/80 ring-2 ring-primary-foreground flex items-center justify-center animate-pulse"
                    style={{
                      left: `${mapLngToPercent(selectedBus.currentStopCoords.lng)}%`,
                      top: `${mapLatToPercent(selectedBus.currentStopCoords.lat)}%`
                    }}
                  >
                    <MapPin className="h-3 w-3 text-white" />
                  </div>
                  <div
                    className="absolute -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-md p-1 px-2 text-xs font-semibold shadow-md"
                    style={{
                      left: `${mapLngToPercent(selectedBus.currentStopCoords.lng)}%`,
                      top: `${mapLatToPercent(selectedBus.currentStopCoords.lat) - 2}%`
                    }}
                  >
                    Current: {selectedBus.currentStop}
                  </div>

                  {/* Next Stop Marker */}
                  <div
                    className="absolute w-4 h-4 rounded-full bg-accent/80 ring-2 ring-accent-foreground flex items-center justify-center"
                    style={{
                      left: `${mapLngToPercent(selectedBus.nextStopCoords.lng)}%`,
                      top: `${mapLatToPercent(selectedBus.nextStopCoords.lat)}%`
                    }}
                  >
                    <Navigation className="h-3 w-3 text-white" />
                  </div>
                  <div
                    className="absolute -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-md p-1 px-2 text-xs font-semibold shadow-md"
                    style={{
                      left: `${mapLngToPercent(selectedBus.nextStopCoords.lng)}%`,
                      top: `${mapLatToPercent(selectedBus.nextStopCoords.lat) - 2}%`
                    }}
                  >
                    Next: {selectedBus.nextStop}
                  </div>
                </>
              )}

              {/* Route Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 10% 15% Q 30% 10% 50% 18% Q 70% 25% 90% 20%"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="5,5"
                />
                <path
                  d="M 8% 70% Q 28% 65% 48% 72% Q 68% 78% 88% 74%"
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Map Labels and Legend */}
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 text-xs shadow-md">
                <div className="font-semibold text-sm mb-2">Live Status Legend</div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span>On-Time</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span>Early</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span>Delayed</span>
                </div>
              </div>

              {/* Additional Map Info */}
              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 text-xs">
                <div className="font-semibold">Downtown Area</div>
                <div className="text-muted-foreground">Traffic: Light</div>
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