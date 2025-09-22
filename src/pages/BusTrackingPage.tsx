import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bus, Clock, Users, Map, Route } from "lucide-react";
import { Link } from "react-router-dom";
import RouteSearch from "@/components/RouteSearch";
import RoutesAvailable from "@/components/RoutesAvailable";
import AvailableBuses from "@/components/AvailableBuses";
import BusMap from "@/components/BusMap";
import BusMap1 from "@/components/BusMap1";
import AdminDashboard from "@/components/AdminDashboard";

const BusTrackingPage: React.FC = () => {
  const [searchedRoutes, setSearchedRoutes] = useState<any[]>([]);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [mapView, setMapView] = useState<'tracking' | 'routes'>('tracking');
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [view, setView] = useState<'user' | 'admin'>('user');

  const handleSearch = async (o: string, d: string) => {
    setOrigin(o);
    setDestination(d);
    // Mock data for routes
    const mockRoutes = [
      {
        id: "1",
        name: `${o} to ${d} - Route 1`,
        distanceKm: 50,
        durationMin: 60,
        traffic: "low",
        incident: "none",
        originName: o,
        destinationName: d,
      },
      {
        id: "2",
        name: `${o} to ${d} - Route 2`,
        distanceKm: 55,
        durationMin: 70,
        traffic: "moderate",
        incident: "roadwork",
        originName: o,
        destinationName: d,
      },
    ];
    setSearchedRoutes(mockRoutes);
  };

  if (view === 'admin') {
    return (
      <div className="min-h-screen p-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <button
            className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={() => setView('user')}
          >
            Back to User View
          </button>
          <AdminDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-glow">
            <Bus className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Bus Tracking Dashboard</h1>
          <p className="text-muted-foreground">Real-time bus tracking and route information</p>
          <button
            className="mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark"
            onClick={() => setView('admin')}
          >
            Go to Admin Panel
          </button>
        </div>

        {/* Route Search */}
        <div className="mb-8">
          <RouteSearch onSearch={handleSearch} />
        </div>



        {/* Available Buses */}
        {searchedRoutes.length > 0 && (
          <div className="mb-8">
            <AvailableBuses originName={origin} destinationName={destination} onSelectBus={setSelectedBus} />
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Bus Tracking Map */}
            <BusMap />

            {/* Live tracking Map */}
            <BusMap1 originName={origin} destinationName={destination} />

            {/* Routes Map */}
            {searchedRoutes.length > 0 && (
              <RoutesAvailable routes={searchedRoutes} defaultOrigin={origin} defaultDestination={destination} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions and Recent Activity moved upwards to right side of map */}
            <Card className="border-border/50 bg-card/80 backdrop-blur shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Nearby Buses
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bus className="h-4 w-4 mr-2" />
                  View Routes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Passenger Info
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/80 backdrop-blur shadow-elegant">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent bus tracking activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Bus 101 arrived at Station A</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Route 5B updated</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Bus 203 delayed by 5 mins</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back to Home */}
            <Link to="/">
              <Button variant="ghost" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusTrackingPage;
