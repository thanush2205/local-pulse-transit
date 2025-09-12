import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Server, Smartphone, TrendingUp, Shield, Zap } from "lucide-react";

const DeploymentPlan = () => {
  const phases = [
    {
      phase: "Phase 1",
      duration: "2-3 months",
      title: "MVP Development",
      description: "Core tracking functionality for pilot city",
      deliverables: [
        "Basic mobile app with real-time tracking",
        "Backend API with GPS integration",
        "Admin dashboard for fleet monitoring",
        "Deployment on single cloud region"
      ]
    },
    {
      phase: "Phase 2",
      duration: "3-4 months",
      title: "Enhanced Features",
      description: "Advanced features and multi-city support",
      deliverables: [
        "Predictive arrival algorithms",
        "Occupancy level tracking",
        "Multi-language support",
        "Enhanced analytics dashboard"
      ]
    },
    {
      phase: "Phase 3",
      duration: "4-6 months",
      title: "Scale & Optimize",
      description: "Full scalability and enterprise features",
      deliverables: [
        "Multi-region deployment",
        "Advanced AI/ML features",
        "Enterprise integrations",
        "White-label solutions"
      ]
    }
  ];

  const scalingOptions = [
    {
      size: "Small City",
      population: "50K - 200K",
      buses: "10-50 buses",
      infrastructure: "Single Region",
      cost: "$5K - $15K/month",
      features: ["Basic tracking", "Simple admin panel", "Mobile app"]
    },
    {
      size: "Medium City",
      population: "200K - 500K",
      buses: "50-200 buses",
      infrastructure: "Multi-AZ",
      cost: "$15K - $40K/month",
      features: ["Full feature set", "Advanced analytics", "API integrations"]
    },
    {
      size: "Large City",
      population: "500K+",
      buses: "200+ buses",
      infrastructure: "Multi-Region",
      cost: "$40K+ /month",
      features: ["Enterprise features", "Custom integrations", "24/7 support"]
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Implementation Strategy</Badge>
          <h2 className="text-4xl font-bold mb-6">Deployment Plan</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Phased approach for scalable implementation with cloud-based infrastructure
          </p>
        </div>

        <Tabs defaultValue="phases" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="phases" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Development Phases
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Infrastructure
            </TabsTrigger>
            <TabsTrigger value="scaling" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Scaling Options
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phases" className="mt-6">
            <div className="space-y-8">
              {phases.map((phase, index) => (
                <Card key={index} className="hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="mb-2">{phase.phase}</Badge>
                        <CardTitle className="text-2xl">{phase.title}</CardTitle>
                        <p className="text-muted-foreground mt-2">{phase.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-sm">
                          {phase.duration}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.deliverables.map((deliverable, delIndex) => (
                        <div key={delIndex} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    Mobile Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• React Native for cross-platform development</li>
                    <li>• Progressive Web App as fallback</li>
                    <li>• Offline-first architecture</li>
                    <li>• App store deployment strategy</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-accent" />
                    Cloud Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• AWS multi-region deployment</li>
                    <li>• Auto-scaling based on demand</li>
                    <li>• CDN for global performance</li>
                    <li>• Disaster recovery setup</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• End-to-end encryption</li>
                    <li>• GDPR compliance framework</li>
                    <li>• Regular security audits</li>
                    <li>• Data backup and recovery</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-primary" />
                    Cloud Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h5 className="font-semibold mb-2">Compute Infrastructure</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• AWS ECS with Fargate for containerized apps</li>
                        <li>• Application Load Balancer for traffic distribution</li>
                        <li>• Auto Scaling Groups for demand management</li>
                        <li>• CloudWatch for monitoring and alerting</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h5 className="font-semibold mb-2">Database Setup</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• RDS PostgreSQL with Multi-AZ deployment</li>
                        <li>• ElastiCache Redis for session management</li>
                        <li>• Regular automated backups</li>
                        <li>• Read replicas for read-heavy workloads</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Hardware Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h5 className="font-semibold mb-2">GPS Hardware per Bus</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 4G/LTE GPS tracking device (~$150)</li>
                        <li>• Backup battery system (~$50)</li>
                        <li>• Installation and setup (~$100)</li>
                        <li>• Monthly 4G data plan (~$20)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h5 className="font-semibold mb-2">Additional Equipment</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• OBD-II diagnostic connector</li>
                        <li>• Passenger counting sensors (optional)</li>
                        <li>• Display screens for real-time info</li>
                        <li>• Emergency communication system</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Deployment Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Cloud className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h5 className="font-semibold mb-1">Production</h5>
                      <p className="text-xs text-muted-foreground">Multi-AZ deployment with load balancing</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Server className="h-8 w-8 text-accent mx-auto mb-2" />
                      <h5 className="font-semibold mb-1">Staging</h5>
                      <p className="text-xs text-muted-foreground">Testing environment mirroring production</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h5 className="font-semibold mb-1">Development</h5>
                      <p className="text-xs text-muted-foreground">Isolated development and testing</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
                      <h5 className="font-semibold mb-1">Monitoring</h5>
                      <p className="text-xs text-muted-foreground">24/7 system health monitoring</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scaling" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {scalingOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="text-center">
                      <Badge className="mb-2">{option.size}</Badge>
                      <CardTitle className="text-lg">{option.population}</CardTitle>
                      <p className="text-muted-foreground text-sm">{option.buses}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{option.cost}</div>
                        <div className="text-sm text-muted-foreground">Estimated monthly cost</div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-2">Infrastructure</h5>
                        <p className="text-sm text-muted-foreground">{option.infrastructure}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-2">Included Features</h5>
                        <ul className="space-y-1">
                          {option.features.map((feature, fIndex) => (
                            <li key={fIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Optimization Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-3 text-primary">Infrastructure Optimization</h5>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• Use spot instances for development environments</li>
                        <li>• Implement auto-scaling to reduce idle costs</li>
                        <li>• Use CloudFront CDN to reduce bandwidth costs</li>
                        <li>• Optimize database queries and indexing</li>
                        <li>• Implement data archiving for historical data</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-3 text-primary">Development Efficiency</h5>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• Use Infrastructure as Code (Terraform)</li>
                        <li>• Implement CI/CD for faster deployments</li>
                        <li>• Containerization for consistency</li>
                        <li>• Monitoring and alerting for proactive issues</li>
                        <li>• Regular performance audits and optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DeploymentPlan;