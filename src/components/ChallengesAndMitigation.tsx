import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Zap, Users, Shield, Wifi, MapPin, DollarSign, Clock } from "lucide-react";

const ChallengesAndMitigation = () => {
  const challenges = [
    {
      icon: <MapPin className="h-6 w-6 text-destructive" />,
      category: "Technical",
      title: "GPS Accuracy in Dense Areas",
      description: "GPS signals can be unreliable in dense urban areas with tall buildings",
      impact: "High",
      mitigation: [
        "Implement sensor fusion with accelerometers and gyroscopes",
        "Use Wi-Fi and cellular tower triangulation as backup",
        "Machine learning algorithms to predict location during signal loss",
        "Regular calibration and validation of GPS data"
      ]
    },
    {
      icon: <Wifi className="h-6 w-6 text-destructive" />,
      category: "Infrastructure", 
      title: "Limited Connectivity",
      description: "Poor 2G/3G networks in small cities affect real-time data transmission",
      impact: "High",
      mitigation: [
        "Offline-first app architecture with local data caching",
        "Data compression and efficient sync protocols",
        "Progressive data loading based on connection quality",
        "Partnership with telecom providers for better coverage"
      ]
    },
    {
      icon: <Users className="h-6 w-6 text-destructive" />,
      category: "Social",
      title: "User Adoption Barriers",
      description: "Resistance to technology adoption among traditional commuters",
      impact: "Medium",
      mitigation: [
        "Gradual rollout with local community champions",
        "Multi-language support and simple UI design",
        "Offline demonstrations and training programs",
        "Integration with existing transport payment systems"
      ]
    },
    {
      icon: <DollarSign className="h-6 w-6 text-destructive" />,
      category: "Financial",
      title: "Implementation Costs",
      description: "High upfront costs for GPS hardware and infrastructure setup",
      impact: "High",
      mitigation: [
        "Phased implementation starting with high-traffic routes",
        "Public-private partnership models",
        "Shared infrastructure with other smart city initiatives",
        "Revenue sharing through digital advertising and partnerships"
      ]
    },
    {
      icon: <Shield className="h-6 w-6 text-destructive" />,
      category: "Security",
      title: "Data Privacy Concerns",
      description: "User location tracking raises privacy and security concerns",
      impact: "Medium",
      mitigation: [
        "Implement strong data encryption and anonymization",
        "Clear privacy policies and user consent mechanisms",
        "GDPR compliance and regular security audits",
        "Local data processing to minimize external data transfer"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-destructive" />,
      category: "Operational",
      title: "System Maintenance",
      description: "Ongoing maintenance of GPS devices and software updates",
      impact: "Medium",
      mitigation: [
        "Remote diagnostic and update capabilities",
        "Predictive maintenance using IoT sensors",
        "Local technical support team training",
        "Modular system design for easy component replacement"
      ]
    }
  ];

  const riskMatrix = [
    { category: "Technical", risks: 3, resolved: 85 },
    { category: "Infrastructure", risks: 2, resolved: 75 },
    { category: "Social", risks: 2, resolved: 90 },
    { category: "Financial", risks: 1, resolved: 70 },
    { category: "Security", risks: 2, resolved: 95 },
    { category: "Operational", risks: 1, resolved: 80 }
  ];

  const getImpactColor = (impact: string) => {
    const colors = {
      High: "bg-destructive text-destructive-foreground",
      Medium: "bg-accent text-accent-foreground",
      Low: "bg-muted text-muted-foreground"
    };
    return colors[impact as keyof typeof colors] || colors.Low;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      Technical: <Zap className="h-4 w-4" />,
      Infrastructure: <Wifi className="h-4 w-4" />,
      Social: <Users className="h-4 w-4" />,
      Financial: <DollarSign className="h-4 w-4" />,
      Security: <Shield className="h-4 w-4" />,
      Operational: <Clock className="h-4 w-4" />
    };
    return icons[category as keyof typeof icons] || <AlertTriangle className="h-4 w-4" />;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Risk Assessment</Badge>
          <h2 className="text-4xl font-bold mb-6">Challenges & Mitigation Strategies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis of potential challenges with actionable mitigation strategies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {challenges.map((challenge, index) => (
            <Card key={index} className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {challenge.icon}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryIcon(challenge.category)}
                          {challenge.category}
                        </Badge>
                        <Badge className={`text-xs ${getImpactColor(challenge.impact)}`}>
                          {challenge.impact} Impact
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{challenge.description}</p>
                <div>
                  <h5 className="font-semibold mb-2 text-primary">Mitigation Strategies:</h5>
                  <ul className="space-y-2">
                    {challenge.mitigation.map((strategy, strategyIndex) => (
                      <li key={strategyIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Risk Assessment Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskMatrix.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(item.category)}
                      <span className="font-medium">{item.category}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.risks} risk{item.risks > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">{item.resolved}%</div>
                      <div className="text-xs text-muted-foreground">mitigation coverage</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Risk Mitigation Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">Pre-Implementation</h5>
                    <Badge>Months 1-2</Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Stakeholder alignment and training</li>
                    <li>• Infrastructure assessment</li>
                    <li>• Pilot program planning</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">During Rollout</h5>
                    <Badge>Months 3-6</Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Continuous monitoring and feedback</li>
                    <li>• Iterative improvements</li>
                    <li>• Community engagement programs</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">Post-Launch</h5>
                    <Badge>Ongoing</Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Performance optimization</li>
                    <li>• Scale-up planning</li>
                    <li>• Long-term sustainability</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-xl text-center">Success Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <h5 className="font-semibold mb-2">Stakeholder Engagement</h5>
                  <p className="text-sm opacity-90">Early and continuous engagement with all stakeholders</p>
                </div>
                <div>
                  <Zap className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <h5 className="font-semibold mb-2">Technical Excellence</h5>
                  <p className="text-sm opacity-90">Robust, scalable, and user-friendly technology</p>
                </div>
                <div>
                  <Shield className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <h5 className="font-semibold mb-2">Risk Management</h5>
                  <p className="text-sm opacity-90">Proactive identification and mitigation of risks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChallengesAndMitigation;