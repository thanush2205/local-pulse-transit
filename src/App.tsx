import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import BusTrackingPage from "./pages/BusTrackingPage";
import Login from "./pages/Login"; // Make sure the Login component is typed
import Signup from "./pages/Signup";
import ProjectPlan from "./pages/ProjectPlan";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>("home");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  return (
    <BrowserRouter>
      <Navbar currentView={currentView} onViewChange={handleViewChange} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/project-plan" element={<ProjectPlan />} />

        <Route
          path="/bus-tracking"
          element={isAuthenticated ? <BusTrackingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/"
          element={
            currentView === "home" ? (
              <BusTrackingPage />
            ) : currentView === "admin" ? (
              <AdminDashboard />
            ) : (
              <Index />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;