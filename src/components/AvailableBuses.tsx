import React from "react";
// Change the import path to correctly point to the CSS file in the src directory
import "../AvailableBuses.css";

function AvailableBuses({ originName, destinationName, onSelectBus }) {
  const buses = [
    {
      routeName: `${originName}-${destinationName}`,
      departureTime: "16:30",
      arrivalTime: "17:10",
      status: "On Time",
      capacityStatus: "Available",
      serviceNo: "127A",
    },
    {
      routeName: `${originName}-${destinationName}`,
      departureTime: "16:45",
      arrivalTime: "17:25",
      status: "On Time",
      capacityStatus: "Filling",
      serviceNo: "130",
    },
  ];

  return (
    <div className="buses-container">
      <h2 className="buses-title">🚌 Available Buses</h2>
      {buses.map((bus, i) => (
        <div key={i} className="bus-card" onClick={() => onSelectBus(bus)}>
          <div className="bus-header">
            <div className="bus-route">{bus.routeName}</div>
            <span
              className={`bus-status ${
                bus.capacityStatus === "Available"
                  ? "status-available"
                  : "status-filling"
              }`}
            >
              {bus.capacityStatus}
            </span>
          </div>
          <div className="bus-times">
            <span className="bus-time">{bus.departureTime}</span>
            <span className="arrow">→</span>
            <span className="bus-time">{bus.arrivalTime}</span>
          </div>
          <div className="bus-service">
            Service No: <strong>{bus.serviceNo}</strong> •{" "}
            <span className="on-time">{bus.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AvailableBuses;