import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Users, Bell, BarChart3, Settings, Smartphone, Monitor } from "lucide-react";
import appInterface from "@/assets/app-interface.jpg";

const FeatureList = () => {
  const commuterFeatures = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Real-Time Bus Tracking",
      description: "Live GPS tracking of all buses with accurate location updates",
      priority: "High"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Arrival Predictions",
      description: "AI-powered arrival time estimates based on traffic and route data",
      priority: "High"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Occupancy Levels",
      description: "Real-time bus capacity information to avoid overcrowded buses",
      priority: "Medium"
    },
    {
      icon: <Bell className="h-6 w-6 text-accent" />,
      title: "Smart Notifications",
      description: "Personalized alerts for bus arrivals, delays, and route changes",
      priority: "Medium"
    }
  ];

  const adminFeatures = [
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into ridership patterns and route efficiency",
      priority: "High"
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: "Fleet Management",
      description: "Monitor and manage entire bus fleet with maintenance scheduling",
      priority: "High"
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Route Optimization",
      description: "Data-driven route planning and optimization tools",
      priority: "Medium"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Driver Management",
      description: "Driver assignment, performance tracking, and communication tools",
      priority: "Medium"
    }
  ];

  const userFlows = [
    {
      step: 1,
      title: "App Launch",
      description: "User opens app and sees nearby bus stops automatically detected via GPS"
    },
    {
      step: 2,
      title: "Route Selection",
      description: "User selects destination and views available routes with real-time data"
    },
    {
      step: 3,
      title: "Bus Tracking",
      description: "Live map shows approaching buses with accurate arrival predictions"
    },
    {
      step: 4,
      title: "Journey Planning",
      description: "Smart notifications guide user through optimal journey timing"
    }
  ];

  const PriorityBadge = ({ priority }: { priority: string }) => {
    const colors = {
      High: "bg-primary text-primary-foreground",
      Medium: "bg-accent text-accent-foreground",
      Low: "bg-muted text-muted-foreground"
    };
    
    return (
      <Badge className={colors[priority as keyof typeof colors]}>
        {priority} Priority
      </Badge>
    );
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Feature Specification</Badge>
          <h2 className="text-4xl font-bold mb-6">Feature List & User Flows</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive feature set designed for optimal user experience and administrative efficiency
          </p>
        </div>

        <Tabs defaultValue="commuter" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="commuter" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Commuter App
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Admin Dashboard
            </TabsTrigger>
            <TabsTrigger value="flows" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              User Flows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="commuter" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img 
                  src={appInterface} 
                  alt="Mobile App Interface"
                  className="w-full rounded-lg shadow-elegant mb-6"
                />
              </div>
              <div className="space-y-4">
                {commuterFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-glow transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          {feature.icon}
                          {feature.title}
                        </CardTitle>
                        <PriorityBadge priority={feature.priority} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6">Additional Commuter Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Offline route maps and schedules",
                  "Multi-language support",
                  "Accessibility features for disabled users",
                  "Journey history and favorites",
                  "Social features (share journey status)",
                  "Payment integration for digital tickets",
                  "Weather integration for journey planning",
                  "Emergency contact and safety features"
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {adminFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-glow transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        {feature.icon}
                        {feature.title}
                      </CardTitle>
                      <PriorityBadge priority={feature.priority} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Key Admin Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Real-time fleet monitoring and control</li>
                    <li>• Automated route scheduling and optimization</li>
                    <li>• Predictive maintenance alerts</li>
                    <li>• Performance analytics and reporting</li>
                    <li>• Integration with municipal systems</li>
                    <li>• Emergency response coordination</li>
                    <li>• Revenue tracking and analysis</li>
                    <li>• Compliance monitoring and reporting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Peak hour ridership patterns</li>
                    <li>• Route efficiency metrics</li>
                    <li>• Driver performance analytics</li>
                    <li>• Fuel consumption optimization</li>
                    <li>• Customer satisfaction tracking</li>
                    <li>• Revenue per route analysis</li>
                    <li>• Environmental impact metrics</li>
                    <li>• Predictive demand forecasting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="flows" className="mt-6">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Primary User Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {userFlows.map((flow, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                          {flow.step}
                        </div>
                        <h4 className="font-semibold mb-2">{flow.title}</h4>
                        <p className="text-sm text-muted-foreground">{flow.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Alternative User Flows</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2">Emergency Scenarios</h5>
                        <p className="text-sm text-muted-foreground">
                          Bus breakdown → Automatic rerouting suggestions → Alternative transport options
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2">Schedule Changes</h5>
                        <p className="text-sm text-muted-foreground">
                          Route modification → Push notifications → Updated journey planning
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2">Offline Usage</h5>
                        <p className="text-sm text-muted-foreground">
                          No connectivity → Cached data access → Sync when online
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Admin Workflows</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2">Daily Operations</h5>
                        <p className="text-sm text-muted-foreground">
                          Morning setup → Real-time monitoring → Issue resolution → End-of-day reporting
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2">Route Planning</h5>
                        <p className="text-sm text-muted-foreground">
                          Data analysis → Route optimization → Testing → Implementation
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2">Maintenance</h5>
                        <p className="text-sm text-muted-foreground">
                          Predictive alerts → Schedule maintenance → Track completion → Update systems
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeatureList;