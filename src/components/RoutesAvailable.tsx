/**
 * RoutesAvailable
 * Displays available routes with distance, duration, traffic, and incidents.
 *
 * Props:
 * - routes: Array<{
 *     id: string,
 *     name: string,
 *     distanceKm: number,
 *     durationMin: number,
 *     traffic: 'low' | 'moderate' | 'heavy' | 'severe',
 *     incident?: 'none' | 'accident' | 'roadwork' | 'closure'
 *   }>
 */

// function trafficMeta(traffic) {
//   switch (traffic) {
//     case 'low': return { label: 'Low', color: '#16a34a' }
//     case 'moderate': return { label: 'Moderate', color: '#f59e0b' }
//     case 'heavy': return { label: 'Heavy', color: '#ef4444' }
//     case 'severe': return { label: 'Severe', color: '#7f1d1d' }
//     default: return { label: 'Unknown', color: '#6b7280' }
//   }
// }

// function incidentMeta(incident) {
//   switch (incident) {
//     case 'none': return { label: 'No incidents', color: '#10b981' }
//     case 'accident': return { label: 'Accident', color: '#ef4444' }
//     case 'roadwork': return { label: 'Road work', color: '#f59e0b' }
//     case 'closure': return { label: 'Road closure', color: '#111827' }
//     default: return { label: 'Unknown', color: '#6b7280' }
//   }
// }

// function buildGmapsUrl({ origin, destination, waypoints = [] }) {
//   const params = new URLSearchParams()
//   params.set('api', '1')
//   if (origin) params.set('origin', origin)
//   if (destination) params.set('destination', destination)
//   if (Array.isArray(waypoints) && waypoints.length > 0) params.set('waypoints', waypoints.join('|'))
//   params.set('travelmode', 'driving')
//   return `https://www.google.com/maps/dir/?${params.toString()}`
// }

// function RoutesAvailable({ routes = [], defaultOrigin, defaultDestination }) {
//   function openInGoogleMaps(route) {
//     const origin = route.originName || defaultOrigin
//     const destination = route.destinationName || defaultDestination
//     const waypoints = Array.isArray(route.waypoints) ? route.waypoints : []
//     const url = buildGmapsUrl({ origin, destination, waypoints })
//     window.open(url, '_blank', 'noopener,noreferrer')
//   }
//   return (
//     <div style={styles.card}>
//       <div style={styles.header}>Routes available</div>
//       <ul style={styles.list}>
//         {routes.map((r) => {
//           const t = trafficMeta(r.traffic)
//           const i = incidentMeta(r.incident ?? 'none')
//           return (
//             <li
//               key={r.id}
//               style={{ ...styles.item, cursor: 'pointer' }}
//               onClick={() => openInGoogleMaps(r)}
//               title="Open in Google Maps"
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => { if (e.key === 'Enter') openInGoogleMaps(r) }}
//             >
//               <div style={styles.itemMain}>
//                 <div style={styles.routeName}>{r.name}</div>
//                 <div style={styles.kpis}>
//                   <span>{r.distanceKm.toFixed(1)} km</span>
//                   <span>•</span>
//                   <span>{r.durationMin} min</span>
//                 </div>
//               </div>
//               <div style={styles.badges}>
//                 <span style={{ ...styles.badge, borderColor: t.color, color: t.color }}>{t.label} traffic</span>
//                 <span style={{ ...styles.badge, borderColor: i.color, color: i.color }}>{i.label}</span>
//               </div>
//             </li>
//           )
//         })}
//       </ul>
//     </div>
//   )
// }

// const styles = {
//   card: {
//     border: '1px solid #e5e7eb',
//     borderRadius: 12,
//     padding: 16,
//     background: '#ffffff',
//     maxWidth: 640,
//     boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
//     marginTop: 16
//   },
//   header: {
//     fontSize: 16,
//     fontWeight: 800,
//     color: '#111827',
//     marginBottom: 12
//   },
//   list: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 10
//   },
//   item: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: 12,
//     border: '1px solid #e5e7eb',
//     borderRadius: 10,
//     padding: '10px 12px',
//     background: '#fafafa'
//   },
//   itemMain: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 4
//   },
//   routeName: {
//     fontSize: 15,
//     fontWeight: 700,
//     color: '#111827'
//   },
//   kpis: {
//     display: 'flex',
//     gap: 8,
//     color: '#6b7280',
//     fontSize: 13
//   },
//   badges: {
//     display: 'flex',
//     gap: 8
//   },
//   badge: {
//     border: '1px solid',
//     borderRadius: 999,
//     padding: '4px 10px',
//     fontWeight: 700,
//     fontSize: 12,
//   }
// }

// export default RoutesAvailable







import React from "react";
import "../RoutesAvailable.css";

// Traffic metadata
function trafficMeta(traffic: string) {
  switch (traffic) {
    case "low": return { label: "Low", color: "#16a34a" };
    case "moderate": return { label: "Moderate", color: "#f59e0b" };
    case "heavy": return { label: "Heavy", color: "#ef4444" };
    case "severe": return { label: "Severe", color: "#7f1d1d" };
    default: return { label: "Unknown", color: "#6b7280" };
  }
}

// Incident metadata
function incidentMeta(incident: string) {
  switch (incident) {
    case "none": return { label: "No incidents", color: "#10b981" };
    case "accident": return { label: "Accident", color: "#ef4444" };
    case "roadwork": return { label: "Road work", color: "#f59e0b" };
    case "closure": return { label: "Road closure", color: "#111827" };
    default: return { label: "Unknown", color: "#6b7280" };
  }
}

function buildGmapsUrl({
  origin, destination, waypoints = []
}: { origin: string; destination: string; waypoints?: string[] }) {
  const params = new URLSearchParams();
  params.set("api", "1");
  if (origin) params.set("origin", origin);
  if (destination) params.set("destination", destination);
  if (waypoints.length > 0) params.set("waypoints", waypoints.join("|"));
  params.set("travelmode", "driving");
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

interface RouteAvailableProps {
  routes: {
    id: string;
    name: string;
    distanceKm: number;
    durationMin: number;
    traffic: string;
    incident?: string;
    originName?: string;
    destinationName?: string;
    waypoints?: string[];
  }[];
  defaultOrigin: string;
  defaultDestination: string;
}

const RoutesAvailable: React.FC<RouteAvailableProps> = ({ routes, defaultOrigin, defaultDestination }) => {
  function openInGoogleMaps(route: any) {
    const origin = route.originName || defaultOrigin;
    const destination = route.destinationName || defaultDestination;
    const waypoints = Array.isArray(route.waypoints) ? route.waypoints : [];
    window.open(buildGmapsUrl({ origin, destination, waypoints }), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="routes-container">
      <h2 className="routes-title">🚍 Routes Available</h2>
      <ul className="routes-list">
        {routes.map((r) => {
          const t = trafficMeta(r.traffic);
          const i = incidentMeta(r.incident ?? "none");
          return (
            <li
              key={r.id}
              className="route-card"
              onClick={() => openInGoogleMaps(r)}
            >
              <div className="route-info">
                <div className="route-name">{r.name}</div>
                <div className="route-details">
                  {r.distanceKm.toFixed(1)} km • {r.durationMin} min
                </div>
              </div>
              <div className="route-tags">
                <span className="route-tag" style={{ borderColor: t.color, color: t.color }}>
                  {t.label} traffic
                </span>
                <span className="route-tag" style={{ borderColor: i.color, color: i.color }}>
                  {i.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoutesAvailable;
