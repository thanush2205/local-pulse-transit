import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-transport.jpg";

const ProjectHeader = () => {
  return (
    <div className="relative h-[60vh] bg-gradient-hero overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
      
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Project Planning Document
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Real-Time Public Transport Tracking
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Comprehensive project plan for GPS-based bus tracking system optimized for small cities and tier-2 towns
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-primary text-primary-foreground">Mobile App</Badge>
            <Badge className="bg-accent text-accent-foreground">GPS Integration</Badge>
            <Badge className="bg-primary/20 text-primary">Real-Time Tracking</Badge>
            <Badge className="bg-accent/20 text-accent">Low Bandwidth Optimized</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;