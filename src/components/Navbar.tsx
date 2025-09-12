import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Menu, X, User, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navbar = ({ currentView, onViewChange }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Track Buses', icon: <MapPin className="h-4 w-4" /> },
    { id: 'admin', label: 'Admin Panel', icon: <Settings className="h-4 w-4" /> },
  ];

  const NavContent = () => (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={currentView === item.id ? "default" : "ghost"}
          onClick={() => {
            onViewChange(item.id);
            setIsOpen(false);
          }}
          className="justify-start lg:justify-center"
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
      <div className="flex items-center gap-2 lg:ml-auto">
        <ThemeToggle />
        <Badge variant="secondary" className="bg-primary/20 text-primary">
          Live
        </Badge>
        <Button variant="outline" size="sm">
          <User className="h-4 w-4 mr-2" />
          Login
        </Button>
      </div>
    </div>
  );

  return (
    <nav className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">BusTracker</h1>
              <p className="text-xs text-muted-foreground">Real-time tracking</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavContent />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                </div>
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;