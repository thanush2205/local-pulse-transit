import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="loader-container">
      {isOnline ? (
        <div className="loader-card">
          <p>Loading...</p>
          <span className="loader-bar"></span>
        </div>
      ) : (
        <div className="offline-card">
          <p>No Internet Connection</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default Loader;
