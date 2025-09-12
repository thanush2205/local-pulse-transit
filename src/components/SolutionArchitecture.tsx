import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Server, Database, Satellite, Cloud, Wifi } from "lucide-react";
import architectureImage from "@/assets/architecture-diagram.jpg";

const SolutionArchitecture = () => {
  const components = [
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      title: "Mobile Frontend",
      description: "React Native app with offline capabilities",
      tech: ["React Native", "Redux Toolkit", "React Navigation", "AsyncStorage"]
    },
    {
      icon: <Server className="h-6 w-6 text-primary" />,
      title: "Backend API",
      description: "Scalable microservices architecture",
      tech: ["Node.js", "Express.js", "Socket.io", "JWT Auth"]
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Database Layer",
      description: "Real-time data with caching",
      tech: ["PostgreSQL", "Redis", "PostGIS", "TimescaleDB"]
    },
    {
      icon: <Satellite className="h-6 w-6 text-primary" />,
      title: "GPS Integration",
      description: "Real-time location tracking",
      tech: ["GPS Modules", "MQTT", "Geofencing", "Route Optimization"]
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Technical Design</Badge>
          <h2 className="text-4xl font-bold mb-6">Solution Architecture</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive, scalable architecture designed for reliability and low-bandwidth optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <img 
              src={architectureImage} 
              alt="System Architecture Diagram"
              className="w-full rounded-lg shadow-elegant"
            />
          </div>
          <div className="space-y-6">
            {components.map((component, index) => (
              <Card key={index} className="hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    {component.icon}
                    {component.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{component.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {component.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="data-flow" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="data-flow">Data Flow</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="data-flow" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  Real-Time Data Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
                    <div>
                      <strong>GPS Data Collection:</strong> Bus GPS modules send location data every 10-30 seconds via MQTT
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
                    <div>
                      <strong>Data Processing:</strong> Backend validates, processes, and enriches location data with route information
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">3</div>
                    <div>
                      <strong>Real-Time Distribution:</strong> Socket.io broadcasts updates to connected mobile clients
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">4</div>
                    <div>
                      <strong>Client Update:</strong> Mobile apps receive updates and display real-time arrival predictions
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="infrastructure" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  Infrastructure Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Cloud Infrastructure</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• AWS EC2/ECS for application hosting</li>
                      <li>• RDS for PostgreSQL database</li>
                      <li>• ElastiCache for Redis caching</li>
                      <li>• CloudFront for CDN and edge caching</li>
                      <li>• Auto-scaling groups for traffic spikes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">GPS Hardware</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 4G/LTE GPS tracking devices</li>
                      <li>• Backup battery for continuous tracking</li>
                      <li>• MQTT protocol for efficient data transmission</li>
                      <li>• Geofencing capabilities for route validation</li>
                      <li>• OBD-II integration for vehicle diagnostics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  Security Measures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Data Protection</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• End-to-end encryption for all data transmission</li>
                      <li>• JWT tokens for secure API authentication</li>
                      <li>• Rate limiting to prevent API abuse</li>
                      <li>• GDPR compliant data handling</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Infrastructure Security</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• VPC with private subnets for databases</li>
                      <li>• WAF for application-level protection</li>
                      <li>• SSL/TLS certificates for all endpoints</li>
                      <li>• Regular security audits and monitoring</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SolutionArchitecture;