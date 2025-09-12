import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Globe, Database, Settings, Zap, Shield } from "lucide-react";

const TechStack = () => {
  const stacks = {
    frontend: {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Frontend & Mobile",
      primary: [
        { name: "React Native", description: "Cross-platform mobile development", category: "Framework" },
        { name: "TypeScript", description: "Type-safe development", category: "Language" },
        { name: "Redux Toolkit", description: "State management", category: "State" },
        { name: "React Navigation", description: "Navigation library", category: "Navigation" }
      ],
      supporting: ["Expo", "React Native Maps", "AsyncStorage", "React Hook Form", "React Query"]
    },
    backend: {
      icon: <Globe className="h-6 w-6" />,
      title: "Backend & APIs",
      primary: [
        { name: "Node.js", description: "Runtime environment", category: "Runtime" },
        { name: "Express.js", description: "Web application framework", category: "Framework" },
        { name: "Socket.io", description: "Real-time communication", category: "Real-time" },
        { name: "JWT", description: "Authentication tokens", category: "Auth" }
      ],
      supporting: ["Helmet.js", "CORS", "Morgan", "Compression", "Rate Limiting"]
    },
    database: {
      icon: <Database className="h-6 w-6" />,
      title: "Database & Storage",
      primary: [
        { name: "PostgreSQL", description: "Primary relational database", category: "Database" },
        { name: "PostGIS", description: "Geospatial extensions", category: "Geospatial" },
        { name: "Redis", description: "Caching and session storage", category: "Cache" },
        { name: "TimescaleDB", description: "Time-series data optimization", category: "Analytics" }
      ],
      supporting: ["Prisma ORM", "Connection Pooling", "Database Migrations", "Backup Strategies"]
    },
    infrastructure: {
      icon: <Settings className="h-6 w-6" />,
      title: "Infrastructure & DevOps",
      primary: [
        { name: "AWS EC2", description: "Compute instances", category: "Compute" },
        { name: "Docker", description: "Containerization", category: "Container" },
        { name: "NGINX", description: "Reverse proxy and load balancer", category: "Proxy" },
        { name: "CloudWatch", description: "Monitoring and logging", category: "Monitoring" }
      ],
      supporting: ["GitHub Actions", "Terraform", "Let's Encrypt", "Backup Solutions"]
    }
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    const colors = {
      Framework: "bg-primary/20 text-primary",
      Language: "bg-accent/20 text-accent",
      State: "bg-muted text-muted-foreground",
      Navigation: "bg-secondary text-secondary-foreground",
      Runtime: "bg-primary/20 text-primary",
      "Real-time": "bg-accent/20 text-accent",
      Auth: "bg-muted text-muted-foreground",
      Database: "bg-primary/20 text-primary",
      Geospatial: "bg-accent/20 text-accent",
      Cache: "bg-muted text-muted-foreground",
      Analytics: "bg-secondary text-secondary-foreground",
      Compute: "bg-primary/20 text-primary",
      Container: "bg-accent/20 text-accent",
      Proxy: "bg-muted text-muted-foreground",
      Monitoring: "bg-secondary text-secondary-foreground"
    };
    
    return (
      <Badge className={`text-xs ${colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground'}`}>
        {category}
      </Badge>
    );
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Technology Stack</Badge>
          <h2 className="text-4xl font-bold mb-6">Recommended Tech Stack</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Production-ready technologies optimized for scalability, performance, and low-bandwidth environments
          </p>
        </div>

        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="frontend" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Frontend
            </TabsTrigger>
            <TabsTrigger value="backend" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Backend
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Infrastructure
            </TabsTrigger>
          </TabsList>

          {Object.entries(stacks).map(([key, stack]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {stack.icon}
                        {stack.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stack.primary.map((tech, index) => (
                          <div key={index} className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-foreground">{tech.name}</h4>
                              <CategoryBadge category={tech.category} />
                            </div>
                            <p className="text-sm text-muted-foreground">{tech.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Supporting Libraries</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {stack.supporting.map((lib, index) => (
                          <Badge key={index} variant="secondary" className="mr-2 mb-2">
                            {lib}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Performance Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Offline-first architecture</li>
                <li>• Data compression and caching</li>
                <li>• Progressive web app capabilities</li>
                <li>• Optimized for 2G/3G networks</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• End-to-end encryption</li>
                <li>• JWT authentication</li>
                <li>• API rate limiting</li>
                <li>• GDPR compliance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Scalability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Microservices architecture</li>
                <li>• Horizontal scaling support</li>
                <li>• Load balancing</li>
                <li>• Auto-scaling capabilities</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechStack;