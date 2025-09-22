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

// Traffic metadata with theme-aware classes
function trafficMeta(traffic: string) {
  switch (traffic) {
    case "low": return { label: "Low", className: "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400" };
    case "moderate": return { label: "Moderate", className: "border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400" };
    case "heavy": return { label: "Heavy", className: "border-red-500 text-red-600 dark:border-red-400 dark:text-red-400" };
    case "severe": return { label: "Severe", className: "border-red-800 text-red-800 dark:border-red-600 dark:text-red-600" };
    default: return { label: "Unknown", className: "border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-400" };
  }
}

// Incident metadata with theme-aware classes
function incidentMeta(incident: string) {
  switch (incident) {
    case "none": return { label: "No incidents", className: "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400" };
    case "accident": return { label: "Accident", className: "border-red-500 text-red-600 dark:border-red-400 dark:text-red-400" };
    case "roadwork": return { label: "Road work", className: "border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400" };
    case "closure": return { label: "Road closure", className: "border-gray-800 text-gray-800 dark:border-gray-600 dark:text-gray-600" };
    default: return { label: "Unknown", className: "border-gray-500 text-gray-600 dark:border-gray-400 dark:text-gray-400" };
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
    <div className="border border-border dark:border-gray-600 rounded-lg p-4 bg-card dark:bg-gray-800 max-w-2xl shadow-sm mt-4">
      <h2 className="text-lg font-bold text-foreground dark:text-white mb-3">🚍 Routes Available</h2>
      <ul className="space-y-3 list-none p-0">
        {routes.map((r) => {
          const t = trafficMeta(r.traffic);
          const i = incidentMeta(r.incident ?? "none");
          return (
            <li
              key={r.id}
              className="flex items-center justify-between gap-3 p-3 border border-border dark:border-gray-600 rounded-lg bg-muted dark:bg-gray-700 cursor-pointer hover:bg-muted/80 dark:hover:bg-gray-600 transition-colors"
              onClick={() => openInGoogleMaps(r)}
            >
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-foreground dark:text-white">{r.name}</div>
                <div className="text-sm text-muted-foreground dark:text-gray-300">
                  {r.distanceKm.toFixed(1)} km • {r.durationMin} min
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 border rounded-full text-xs font-semibold ${t.className}`}>
                  {t.label} traffic
                </span>
                <span className={`px-2 py-1 border rounded-full text-xs font-semibold ${i.className}`}>
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
