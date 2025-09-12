import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, Code, Rocket, BarChart3 } from "lucide-react";

const ActionPlan = () => {
  const timeline = [
    {
      week: "Week 1-2",
      phase: "Project Setup",
      icon: <Users className="h-6 w-6 text-primary" />,
      tasks: [
        "Assemble development team and assign roles",
        "Set up development environment and tools",
        "Create project documentation structure",
        "Establish communication channels and workflows"
      ],
      deliverables: ["Team formation", "Development setup", "Project charter"]
    },
    {
      week: "Week 3-6",
      phase: "MVP Development",
      icon: <Code className="h-6 w-6 text-primary" />,
      tasks: [
        "Develop basic mobile app with map integration",
        "Create backend API for GPS data processing",
        "Implement real-time WebSocket connections",
        "Build admin dashboard for fleet monitoring"
      ],
      deliverables: ["Mobile app prototype", "Backend API", "Admin dashboard"]
    },
    {
      week: "Week 7-8",
      phase: "Testing & Integration",
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      tasks: [
        "Conduct unit and integration testing",
        "GPS hardware integration and testing",
        "Performance testing and optimization",
        "Security testing and vulnerability assessment"
      ],
      deliverables: ["Test reports", "Integration documentation", "Security audit"]
    },
    {
      week: "Week 9-10",
      phase: "Pilot Deployment",
      icon: <Rocket className="h-6 w-6 text-accent" />,
      tasks: [
        "Deploy to pilot city with limited bus fleet",
        "Train local transport authority staff",
        "Monitor system performance and gather feedback",
        "Iterate based on real-world usage data"
      ],
      deliverables: ["Pilot deployment", "Training materials", "Feedback analysis"]
    },
    {
      week: "Week 11-12",
      phase: "Launch & Scale",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      tasks: [
        "Full production deployment",
        "Public launch and marketing campaign",
        "Monitor system scalability and performance",
        "Plan expansion to additional cities"
      ],
      deliverables: ["Production system", "Launch campaign", "Scaling roadmap"]
    }
  ];

  const teamRoles = [
    {
      role: "Project Manager",
      count: 1,
      responsibilities: ["Overall project coordination", "Stakeholder management", "Timeline and budget tracking"],
      skills: ["Agile/Scrum", "Transport domain knowledge", "Stakeholder management"]
    },
    {
      role: "Frontend Developer",
      count: 2,
      responsibilities: ["Mobile app development", "User interface design", "Cross-platform compatibility"],
      skills: ["React Native", "TypeScript", "Mobile UI/UX", "API integration"]
    },
    {
      role: "Backend Developer",
      count: 2,
      responsibilities: ["API development", "Database design", "Real-time data processing"],
      skills: ["Node.js", "PostgreSQL", "Socket.io", "GPS data processing"]
    },
    {
      role: "DevOps Engineer",
      count: 1,
      responsibilities: ["Infrastructure setup", "CI/CD pipeline", "Monitoring and alerting"],
      skills: ["AWS", "Docker", "Terraform", "Monitoring tools"]
    },
    {
      role: "UI/UX Designer",
      count: 1,
      responsibilities: ["User research", "Interface design", "Usability testing"],
      skills: ["Design thinking", "Figma/Sketch", "Accessibility", "Mobile design"]
    },
    {
      role: "QA Engineer",
      count: 1,
      responsibilities: ["Test planning", "Automated testing", "Performance testing"],
      skills: ["Test automation", "Mobile testing", "API testing", "Performance testing"]
    }
  ];

  const nextSteps = [
    "Finalize stakeholder agreements and funding",
    "Recruit and onboard development team",
    "Set up development infrastructure and tools",
    "Begin MVP development with focus on core features",
    "Establish partnership with pilot city transport authority",
    "Procure GPS hardware for initial fleet installation"
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Implementation Roadmap</Badge>
          <h2 className="text-4xl font-bold mb-6">Action Plan</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready-to-execute plan with timeline, team structure, and immediate next steps
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">12-Week Development Timeline</h3>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <Card key={index} className="hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <div>
                        <CardTitle className="text-xl">{item.phase}</CardTitle>
                        <Badge variant="outline" className="mt-1">{item.week}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h5 className="font-semibold mb-3 text-primary">Key Tasks</h5>
                      <ul className="space-y-2">
                        {item.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-3 text-primary">Deliverables</h5>
                      <div className="space-y-2">
                        {item.deliverables.map((deliverable, delIndex) => (
                          <Badge key={delIndex} variant="secondary" className="mr-2 mb-2 text-xs">
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamRoles.map((team, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">{team.role}</h5>
                      <Badge>{team.count} person{team.count > 1 ? 's' : ''}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h6 className="font-medium mb-1">Responsibilities:</h6>
                        <ul className="space-y-1 text-muted-foreground">
                          {team.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex}>• {resp}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium mb-1">Required Skills:</h6>
                        <div className="flex flex-wrap gap-1">
                          {team.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Immediate Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                <h5 className="font-semibold mb-2">Critical Success Factors</h5>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>• Secure stakeholder buy-in early</li>
                  <li>• Start with limited scope for quick wins</li>
                  <li>• Maintain continuous user feedback loop</li>
                  <li>• Plan for scalability from day one</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Ready to Start?</h3>
                <p className="text-muted-foreground max-w-md">
                  This comprehensive plan provides everything needed to begin development immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Rocket className="h-4 w-4 mr-2" />
                    Begin Implementation
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Review Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ActionPlan;