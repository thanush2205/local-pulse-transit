import { useState } from "react";
import Navbar from "@/components/Navbar";
import LandingHero from "@/components/LandingHero";
import BusMap from "@/components/BusMap";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<string>('landing');

  const renderContent = () => {
    switch(currentView) {
      case 'home':
        return <BusMap />;
      case 'admin':
        return <AdminDashboard />;
      case 'landing':
      default:
        return <LandingHero onGetStarted={() => setCurrentView('home')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView !== 'landing' && (
        <Navbar currentView={currentView} onViewChange={setCurrentView} />
      )}
      <main className={currentView === 'landing' ? '' : 'container mx-auto px-6 py-6'}>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
