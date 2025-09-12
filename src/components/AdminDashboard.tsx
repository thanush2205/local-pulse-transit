import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bus, 
  Users, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  Fuel,
  Settings,
  BarChart3,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const fleetStats = {
    totalBuses: 45,
    activeBuses: 38,
    avgOccupancy: 67,
    onTimePerformance: 85,
    totalRoutes: 12,
    alerts: 3
  };

  const buses = [
    { id: "BUS001", route: "Route 12", status: "active", occupancy: 75, fuel: 85, maintenance: "good" },
    { id: "BUS002", route: "Route 8", status: "active", occupancy: 45, fuel: 60, maintenance: "good" },
    { id: "BUS003", route: "Route 5", status: "delayed", occupancy: 90, fuel: 40, maintenance: "attention" },
    { id: "BUS004", route: "Route 15", status: "maintenance", occupancy: 0, fuel: 95, maintenance: "service" },
    { id: "BUS005", route: "Route 3", status: "active", occupancy: 55, fuel: 70, maintenance: "good" },
  ];

  const alerts = [
    { id: 1, type: "maintenance", message: "BUS003 requires brake inspection", priority: "high" },
    { id: 2, type: "delay", message: "Route 8 experiencing 15-min delays", priority: "medium" },
    { id: 3, type: "fuel", message: "BUS003 fuel level below 50%", priority: "medium" },
  ];

  const routes = [
    { id: "R12", name: "City Center Loop", buses: 4, avgDelay: 2, efficiency: 92 },
    { id: "R8", name: "Airport Express", buses: 3, avgDelay: 15, efficiency: 78 },
    { id: "R5", name: "University Line", buses: 5, avgDelay: 5, efficiency: 88 },
    { id: "R15", name: "Industrial Zone", buses: 3, avgDelay: 8, efficiency: 85 },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-primary text-primary-foreground';
      case 'delayed': return 'bg-accent text-accent-foreground';
      case 'maintenance': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Bus className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{fleetStats.totalBuses}</div>
            <div className="text-xs text-muted-foreground">Total Buses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{fleetStats.activeBuses}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{fleetStats.avgOccupancy}%</div>
            <div className="text-xs text-muted-foreground">Avg Occupancy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{fleetStats.onTimePerformance}%</div>
            <div className="text-xs text-muted-foreground">On Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{fleetStats.totalRoutes}</div>
            <div className="text-xs text-muted-foreground">Routes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-2" />
            <div className="text-2xl font-bold">{fleetStats.alerts}</div>
            <div className="text-xs text-muted-foreground">Alerts</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="fleet" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                Fleet Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {buses.map((bus) => (
                  <div
                    key={bus.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedBus === bus.id ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setSelectedBus(bus.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{bus.id}</h4>
                        <p className="text-sm text-muted-foreground">{bus.route}</p>
                      </div>
                      <Badge className={`${getStatusColor(bus.status)}`}>
                        {bus.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-sm font-semibold">{bus.occupancy}%</div>
                        <div className="text-xs text-muted-foreground">Occupancy</div>
                      </div>
                      <div>
                        <Fuel className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-sm font-semibold">{bus.fuel}%</div>
                        <div className="text-xs text-muted-foreground">Fuel</div>
                      </div>
                      <div>
                        <Settings className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="text-sm font-semibold">{bus.maintenance}</div>
                        <div className="text-xs text-muted-foreground">Status</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Route Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{route.name}</h4>
                        <p className="text-sm text-muted-foreground">Route {route.id}</p>
                      </div>
                      <Badge variant="outline">{route.buses} buses</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{route.avgDelay}min</div>
                        <div className="text-xs text-muted-foreground">Avg Delay</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{route.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>
                      <div className="text-center">
                        <Button variant="outline" size="sm">
                          Optimize
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground capitalize">{alert.type} Alert</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>On-Time Performance</span>
                    <span className="font-bold text-primary">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Fleet Utilization</span>
                    <span className="font-bold text-accent">78%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Customer Satisfaction</span>
                    <span className="font-bold text-primary">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <h5 className="font-semibold text-primary mb-1">Peak Hours</h5>
                    <p className="text-sm text-muted-foreground">
                      Highest occupancy: 8-9 AM and 6-7 PM
                    </p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <h5 className="font-semibold text-accent mb-1">Most Efficient Route</h5>
                    <p className="text-sm text-muted-foreground">
                      Route 12 - City Center Loop (92% efficiency)
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold mb-1">Improvement Opportunity</h5>
                    <p className="text-sm text-muted-foreground">
                      Route 8 delays can be reduced by 30%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;