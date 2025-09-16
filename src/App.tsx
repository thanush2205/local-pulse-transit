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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Navbar />
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

        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
