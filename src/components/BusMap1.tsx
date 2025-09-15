// import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * BusMap
 * Lightweight map embed using OpenStreetMap iframe. No external SDK required.
 *
 * Props:
 * - lat?: number (latitude to center when no route)
 * - lng?: number (longitude to center when no route)
 * - originName?: string (search origin)
 * - destinationName?: string (search destination)
 * - zoom?: number (default 14)
 * - height?: number (px, default 320)
 * - title?: string (optional header)
 */

// Leaflet-based renderer (no iframes)

 

// async function geocode(place) {
//   try {
//     const url = new URL('https://nominatim.openstreetmap.org/search')
//     url.searchParams.set('q', place)
//     url.searchParams.set('format', 'json')
//     url.searchParams.set('limit', '1')
//     const res = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } })
//     if (!res.ok) return null
//     const data = await res.json()
//     if (!Array.isArray(data) || data.length === 0) return null
//     const { lat, lon } = data[0]
//     const latNum = Number(lat)
//     const lonNum = Number(lon)
//     if (Number.isNaN(latNum) || Number.isNaN(lonNum)) return null
//     return { lat: latNum, lng: lonNum }
//   } catch {
//     return null
//   }
// }

// function BusMap({ lat, lng, originName, destinationName, selectedBus, zoom = 14, height = 320, title }) {
//   const containerRef = useRef(null)
//   const mapRef = useRef(null)
//   const routeLayerRef = useRef(null)
//   const routeOutlineRef = useRef(null)
//   const startMarkerRef = useRef(null)
//   const endMarkerRef = useRef(null)
//   const singleMarkerRef = useRef(null)
//   const busMarkerRef = useRef(null)
//   const animationRef = useRef(null)
  
//   // Dynamic bus tracking state
//   const [busProgress, setBusProgress] = useState(0)
//   const [isMoving, setIsMoving] = useState(false)
//   const [currentBusPosition, setCurrentBusPosition] = useState(null)

//   const hasRoute = useMemo(() => !!(originName && destinationName), [originName, destinationName])

//   // Reset bus tracking when a new bus is selected
//   useEffect(() => {
//     if (selectedBus) {
//       setBusProgress(0)
//       setIsMoving(false)
//       setCurrentBusPosition(null)
      
//       // Clear any existing animation
//       if (animationRef.current) {
//         clearInterval(animationRef.current)
//       }
//     }
//   }, [selectedBus])

//   // Dynamic bus movement animation
//   useEffect(() => {
//     if (!selectedBus || !currentBusPosition) return

//     // Clear any existing animation
//     if (animationRef.current) {
//       clearInterval(animationRef.current)
//     }

//     // Start bus movement simulation
//     setIsMoving(true)
//     let progress = 0
//     const speed = 0.003 // Progress per interval (adjust for faster/slower movement)
    
//     animationRef.current = setInterval(() => {
//       progress += speed
//       if (progress >= 1) {
//         progress = 1
//         setIsMoving(false)
//         clearInterval(animationRef.current)
//       }
//       setBusProgress(progress)
//     }, 150) // Update every 150ms for smooth movement

//     return () => {
//       if (animationRef.current) {
//         clearInterval(animationRef.current)
//       }
//     }
//   }, [selectedBus, currentBusPosition])

//   // Update bus marker position when progress changes
//   useEffect(() => {
//     if (!selectedBus || !busMarkerRef.current || !mapRef.current) return

//     // Recalculate position based on current progress
//     const routeProgress = busProgress || 0.1
//     let busLat, busLng
    
//     // This is a simplified version - in a real app, you'd store the route coordinates
//     // For now, we'll use linear interpolation as a fallback
//     if (originName && destinationName) {
//       // This is a placeholder - in reality you'd use stored route coordinates
//       const from = { lat: 15.8309, lng: 78.0421 } // Kurnool coordinates
//       const to = { lat: 15.8667, lng: 78.4833 }   // Nandikotkur coordinates
//       busLat = from.lat + (to.lat - from.lat) * routeProgress
//       busLng = from.lng + (to.lng - from.lng) * routeProgress
      
//       // Update marker position
//       busMarkerRef.current.setLatLng([busLat, busLng])
//       setCurrentBusPosition({ lat: busLat, lng: busLng })
//     }
//   }, [busProgress, selectedBus, originName, destinationName])

//   useEffect(() => {
//     let cancelled = false

//     async function ensureLeaflet() {
//       if (typeof window !== 'undefined' && window.L) return true
//       // load CSS
//       await new Promise((resolve) => {
//         const existing = document.querySelector('link[data-leaflet]')
//         if (existing) return resolve()
//         const link = document.createElement('link')
//         link.rel = 'stylesheet'
//         link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
//         link.setAttribute('data-leaflet', '1')
//         link.onload = resolve
//         document.head.appendChild(link)
//       })
//       // load JS
//       await new Promise((resolve) => {
//         const existing = document.querySelector('script[data-leaflet]')
//         if (existing) return resolve()
//         const script = document.createElement('script')
//         script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
//         script.setAttribute('data-leaflet', '1')
//         script.onload = resolve
//         document.body.appendChild(script)
//       })
//       return true
//     }

//     async function draw() {
//       const ok = await ensureLeaflet()
//       if (!ok || cancelled) return
//       const L = window.L
//       if (!mapRef.current && containerRef.current) {
//         mapRef.current = L.map(containerRef.current).setView([lat || 15.8281, lng || 78.0373], zoom)
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '&copy; OpenStreetMap contributors'
//         }).addTo(mapRef.current)
//       }

//       // Clear previous layers
//       if (routeLayerRef.current) { routeLayerRef.current.remove(); routeLayerRef.current = null }
//       if (routeOutlineRef.current) { routeOutlineRef.current.remove(); routeOutlineRef.current = null }
//       if (startMarkerRef.current) { startMarkerRef.current.remove(); startMarkerRef.current = null }
//       if (endMarkerRef.current) { endMarkerRef.current.remove(); endMarkerRef.current = null }
//       if (singleMarkerRef.current) { singleMarkerRef.current.remove(); singleMarkerRef.current = null }
//       if (busMarkerRef.current) { busMarkerRef.current.remove(); busMarkerRef.current = null }

//       if (hasRoute) {
//         const from = await geocode(originName)
//         const to = await geocode(destinationName)
//         if (!from || !to || cancelled) return
//         // Fetch route
//         const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`
//         const res = await fetch(url)
//         const data = await res.json()
//         const coords = data?.routes?.[0]?.geometry?.coordinates
//         if (Array.isArray(coords)) {
//           const L = window.L
//           const latlngs = coords.map(([x, y]) => [y, x])
//           // Outline for better visibility
//           routeOutlineRef.current = L.polyline(latlngs, { color: '#ffffff', weight: 9, opacity: 0.9 }).addTo(mapRef.current)
//           // Main highlighted path
//           routeLayerRef.current = L.polyline(latlngs, { color: '#2563eb', weight: 6 }).addTo(mapRef.current)
//           startMarkerRef.current = L.circleMarker([from.lat, from.lng], { radius: 7, color: '#16a34a', fillColor: '#16a34a', fillOpacity: 1 }).addTo(mapRef.current)
//           endMarkerRef.current = L.circleMarker([to.lat, to.lng], { radius: 7, color: '#ef4444', fillColor: '#ef4444', fillOpacity: 1 }).addTo(mapRef.current)
          
//           // Add selected bus location if available
//           if (selectedBus && !cancelled) {
//             // Calculate bus position along the actual route using dynamic progress
//             const routeProgress = busProgress || 0.1 // Start at 10% or use current progress
//             let busLat, busLng
            
//             if (coords && coords.length > 0) {
//               // Use actual route coordinates
//               const routeIndex = Math.floor(coords.length * routeProgress)
//               const routePoint = coords[routeIndex]
//               busLat = routePoint[1] // lat is second element
//               busLng = routePoint[0] // lng is first element
//             } else {
//               // Fallback to linear interpolation
//               busLat = from.lat + (to.lat - from.lat) * routeProgress
//               busLng = from.lng + (to.lng - from.lng) * routeProgress
//             }
            
//             // Store current position for animation
//             setCurrentBusPosition({ lat: busLat, lng: busLng })
            
//             // Create animated bus marker with movement status
//             const busIcon = L.divIcon({
//               className: 'bus-marker',
//               html: `
//                 <div style="
//                   background: linear-gradient(45deg, #3b82f6, #8b5cf6);
//                   width: 55px;
//                   height: 55px;
//                   border-radius: 50%;
//                   border: 4px solid white;
//                   box-shadow: 0 8px 25px rgba(0,0,0,0.5);
//                   display: flex;
//                   align-items: center;
//                   justify-content: center;
//                   font-size: 26px;
//                   animation: ${isMoving ? 'moveAndPulse 2s infinite' : 'pulse 1.5s infinite'};
//                   z-index: 1000;
//                   position: relative;
//                 ">
//                   🚌
//                   <div style="
//                     position: absolute;
//                     top: -8px;
//                     right: -8px;
//                     width: 20px;
//                     height: 20px;
//                     background: ${isMoving ? '#10b981' : '#f59e0b'};
//                     border-radius: 50%;
//                     border: 2px solid white;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     font-size: 10px;
//                     animation: ${isMoving ? 'blink 1s infinite' : 'none'};
//                   ">
//                     ${isMoving ? '▶' : '⏸'}
//                   </div>
//                 </div>
//                 <style>
//                   @keyframes pulse {
//                     0% { transform: scale(1); box-shadow: 0 8px 25px rgba(0,0,0,0.5); }
//                     50% { transform: scale(1.1); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.7); }
//                     100% { transform: scale(1); box-shadow: 0 8px 25px rgba(0,0,0,0.5); }
//                   }
//                   @keyframes moveAndPulse {
//                     0% { transform: scale(1) rotate(0deg); box-shadow: 0 8px 25px rgba(0,0,0,0.5); }
//                     25% { transform: scale(1.1) rotate(2deg); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.7); }
//                     50% { transform: scale(1.2) rotate(0deg); box-shadow: 0 12px 35px rgba(139, 92, 246, 0.8); }
//                     75% { transform: scale(1.1) rotate(-2deg); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.7); }
//                     100% { transform: scale(1) rotate(0deg); box-shadow: 0 8px 25px rgba(0,0,0,0.5); }
//                   }
//                   @keyframes blink {
//                     0%, 50% { opacity: 1; }
//                     51%, 100% { opacity: 0.3; }
//                   }
//                 </style>
//               `,
//               iconSize: [55, 55],
//               iconAnchor: [27.5, 27.5]
//             })
            
//             console.log('Creating bus marker at:', busLat, busLng, 'for bus:', selectedBus.routeName)
            
//             busMarkerRef.current = L.marker([busLat, busLng], { icon: busIcon })
//               .addTo(mapRef.current)
//               .bindPopup(`
//                 <div style="text-align: center; padding: 12px; min-width: 200px;">
//                   <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px;">
//                     <span style="font-size: 24px;">🚌</span>
//                     <h3 style="margin: 0; color: #1f2937; font-size: 18px;">${selectedBus.routeName}</h3>
//                     <div style="
//                       width: 12px; 
//                       height: 12px; 
//                       background: ${isMoving ? '#10b981' : '#f59e0b'}; 
//                       border-radius: 50%; 
//                       animation: ${isMoving ? 'blink 1s infinite' : 'none'};
//                     "></div>
//                   </div>
                  
//                   <div style="background: #f8fafc; padding: 8px; border-radius: 6px; margin-bottom: 8px;">
//                     <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Route Progress</div>
//                     <div style="background: #e2e8f0; height: 6px; border-radius: 3px; overflow: hidden;">
//                       <div style="
//                         background: linear-gradient(90deg, #3b82f6, #8b5cf6); 
//                         height: 100%; 
//                         width: ${Math.round(busProgress * 100)}%; 
//                         transition: width 0.3s ease;
//                       "></div>
//                     </div>
//                     <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${Math.round(busProgress * 100)}% Complete</div>
//                   </div>
                  
//                   <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
//                     <div style="text-align: left;">
//                       <div style="font-size: 11px; color: #64748b;">Status</div>
//                       <div style="font-weight: bold; color: #1f2937; font-size: 13px;">${selectedBus.status}</div>
//                     </div>
//                     <div style="text-align: right;">
//                       <div style="font-size: 11px; color: #64748b;">Capacity</div>
//                       <div style="font-weight: bold; color: #1f2937; font-size: 13px;">${selectedBus.capacityStatus}</div>
//                     </div>
//                   </div>
                  
//                   <div style="border-top: 1px solid #e2e8f0; padding-top: 8px;">
//                     <div style="font-size: 11px; color: #64748b;">Departure Time</div>
//                     <div style="font-weight: bold; color: #1f2937; font-size: 14px;">${selectedBus.departureTime}</div>
//                   </div>
                  
//                   <div style="margin-top: 8px; font-size: 10px; color: #64748b;">
//                     ${isMoving ? '🟢 Live Tracking Active' : '🟡 Bus Stopped'}
//                   </div>
//                 </div>
//               `)
              
//             // Open popup automatically to make it more visible
//             busMarkerRef.current.openPopup()
//           }
          
//           mapRef.current.fitBounds(routeLayerRef.current.getBounds(), { padding: [24, 24] })
//         } else {
//           mapRef.current.setView([from.lat, from.lng], zoom)
//         }
//       } else if (typeof lat === 'number' && typeof lng === 'number') {
//         const L = window.L
//         singleMarkerRef.current = L.marker([lat, lng]).addTo(mapRef.current)
//         mapRef.current.setView([lat, lng], zoom)
//       }
//     }

//     draw()
//     return () => { cancelled = true }
//   }, [originName, destinationName, selectedBus, lat, lng, zoom, hasRoute])
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-4xl">
//       {title && <div className="text-lg font-bold text-gray-900 mb-4">🗺️ {title}</div>}
      
//       {/* Map Legend */}
//       <div className="mb-4 p-4 bg-gray-50 rounded-lg">
//         <h4 className="text-sm font-semibold text-gray-700 mb-3">Map Legend</h4>
//         <div className="flex flex-wrap gap-4 text-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-green-500 rounded-full"></div>
//             <span className="text-gray-600">Start Point</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-red-500 rounded-full"></div>
//             <span className="text-gray-600">Destination</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-1 bg-blue-500"></div>
//             <span className="text-gray-600">Route</span>
//           </div>
//           {selectedBus && (
//             <>
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
//                 <span className="text-gray-600">Live Bus ({selectedBus.routeName})</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-gray-600">Moving</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                 <span className="text-gray-600">Stopped</span>
//               </div>
//             </>
//           )}
//         </div>
//         {selectedBus && (
//           <div className="mt-3 p-3 bg-blue-50 rounded-lg">
//             <div className="flex items-center justify-between text-xs">
//               <span className="text-blue-700 font-medium">Live Tracking Active</span>
//               <span className="text-blue-600">{Math.round(busProgress * 100)}% Complete</span>
//             </div>
//             <div className="mt-2 bg-blue-200 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${Math.round(busProgress * 100)}%` }}
//               ></div>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <div className="relative w-full" style={{ height }}>
//         <div ref={containerRef} className="w-full h-full rounded-lg overflow-hidden" />
//       </div>
//     </div>
//   )
// }


// export default BusMap




import React, { useState, useEffect } from "react";
import {
  MapContainer,TileLayer,Polyline,Marker,Popup,useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, LatLngBoundsExpression } from "leaflet";

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

// Fit map to bounds
const FitBounds: React.FC<{ bounds: LatLngBoundsExpression | null }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds);
  }, [bounds, map]);
  return null;
};

// City coordinates
const cityCoordinates: Record<string, [number, number]> = {
  Tirupathi: [13.6288, 79.4192],
  Renigunta: [13.6540, 79.5120],
  Kadapa: [14.4673, 78.8242],
  Proddutur: [14.7502, 78.5481],
  Kurnool: [15.8281, 78.0373],
  Nandhyala: [15.4945, 78.4831],
  Sreekalahsthi: [13.7498, 79.7036],
  Gudur: [14.1458, 79.8529],
  Jammalamadugu: [14.8465, 78.3823],
  Venkatagiri: [13.9601, 79.5807],
  Mangalam: [13.6117, 79.4374],  // refined
  Satyavedu: [13.4503, 79.9635], // refined
  Tirumala: [13.6833, 79.3500],
  Mydhukur: [14.7333, 78.5667],
  Allagadda: [15.1280, 78.5050],
};
// Bus data (static)
interface BusInfo {
  serviceNo: string;
  deportName: string;
  scheduleDeparture: string;
  scheduleArrival: string;
  coordinates: [number, number];
}

interface RouteBuses {
  [route: string]: {
    [service: string]: BusInfo[];
  };
}

const busData: RouteBuses = {
  "Tirupathi-Renigunta": {
    Pallevelugu: [
      { serviceNo: "MoC1/2", deportName: "Mangalam", scheduleDeparture: "24:30", scheduleArrival: "24:45", coordinates: cityCoordinates["Mangalam"] },
      { serviceNo: "OKT9/6", deportName: "Satyavedu", scheduleDeparture: "16:30", scheduleArrival: "16:40", coordinates: cityCoordinates["Satyavedu"] },
      { serviceNo: "OR04/6", deportName: "Venkatagiri", scheduleDeparture: "17:00", scheduleArrival: "17:32", coordinates: cityCoordinates["Venkatagiri"] },
      { serviceNo: "ST01/6", deportName: "Sreekalahsthi", scheduleDeparture: "05:00", scheduleArrival: "05:20", coordinates: cityCoordinates["Sreekalahsthi"] },
    ],
    Express: [
      { serviceNo: "9101/14", deportName: "Venkatagiri", scheduleDeparture: "14:45", scheduleArrival: "15:00", coordinates: cityCoordinates["Venkatagiri"] },
      { serviceNo: "A122/4", deportName: "Gudur", scheduleDeparture: "15:30", scheduleArrival: "15:45", coordinates: cityCoordinates["Gudur"] },
      { serviceNo: "TP06/2", deportName: "Jammalamadugu", scheduleDeparture: "16:00", scheduleArrival: "16:25", coordinates: cityCoordinates["Jammalamadugu"] },
    ],
  },
  "Kurnool-Nandhyala": {
    Pallevelugu: [
      { serviceNo: "KNL5/6", deportName: "Nandhyala", scheduleDeparture: "06:10", scheduleArrival: "08:15", coordinates: cityCoordinates["Nandhyala"] },
      { serviceNo: "NDL1/1", deportName: "Kurnool", scheduleDeparture: "06:40", scheduleArrival: "08:45", coordinates: cityCoordinates["Kurnool"] },
    ],
  },
};

// Bus Icon
const createBusIcon = (depot: string, serviceNumber: string, arrival: string) =>
  new L.DivIcon({
    html: `<div style="
      background:white; padding:5px 10px; border-radius:8px; border:2px solid #2ecc71;
      text-align:center; font-size:12px; color:#333; box-shadow:0 2px 6px rgba(0,0,0,0.2);
    ">
      <div style="font-size:18px">🚌</div>
      <div><strong>${serviceNumber}</strong></div>
      <div>Depot: ${depot}</div>
      <div>Arrival: ${arrival}</div>
    </div>`,
    className: "",
    iconSize: [100, 50],
    iconAnchor: [50, 50],
  });

// Route interface
interface RouteInfo {
  coordinates: LatLngExpression[];
  distance: number;
  duration: number;
}

// BusMap Props
interface BusMapProps {
  originName: string;
  destinationName: string;
}

const BusMap: React.FC<BusMapProps> = ({ originName, destinationName }) => {
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(null);
  const [upcomingBuses, setUpcomingBuses] = useState<BusInfo[]>([]);

  const fetchRoutesAndBuses = async () => {
    const srcCoord = cityCoordinates[originName];
    const dstCoord = cityCoordinates[destinationName];
    if (!srcCoord || !dstCoord) return;

    try {
      // OSRM API to fetch routes
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${srcCoord[1]},${srcCoord[0]};${dstCoord[1]},${dstCoord[0]}?overview=full&alternatives=true&geometries=geojson`
      );
      const data = await res.json();

      if (data.routes?.length) {
        const allRoutes: RouteInfo[] = data.routes.map((r: any) => ({
          coordinates: r.geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]),
          distance: r.distance,
          duration: r.duration,
        }));
        setRoutes(allRoutes);
        setBounds(L.polyline(allRoutes[0].coordinates).getBounds());
      }

      // Fetch buses for static routes
      const routeKey = `${originName}-${destinationName}`;
      const busesForRoute = busData[routeKey];
      if (!busesForRoute) {
        setUpcomingBuses([]);
        return;
      }
      const allBuses: BusInfo[] = [];
      Object.values(busesForRoute).forEach((service) => allBuses.push(...service));

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const filtered = allBuses.filter((bus) => {
        const [h, m] = bus.scheduleDeparture.split(":").map(Number);
        return h * 60 + m >= currentMinutes;
      });
      setUpcomingBuses(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (originName && destinationName) fetchRoutesAndBuses();
  }, [originName, destinationName]);

  return (
    <div>
      <MapContainer center={[13.6288, 79.4192]} zoom={10} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
        {routes.map((r, idx) => (
          <Polyline
            key={idx}
            positions={r.coordinates}
            color={idx === 0 ? "blue" : "red"} // Shortest route = green
            weight={idx === 0 ? 5 : 3}
            opacity={0.7}
          />
        ))}
        {bounds && <FitBounds bounds={bounds} />}
        {upcomingBuses.map((bus) => {
  // Create a Google-style pin as the base marker
  const baseIcon = new L.Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png", // Google-like pin
    iconSize: [27, 43],
    iconAnchor: [13, 43], // bottom tip of pin
  });

  // Create a DivIcon wrapper with the pointer and label div together
  const combinedIcon = new L.DivIcon({
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
        <!-- Info Card Above -->
        <div style="
          background: white;
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid #2ecc71;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          font-size: 12px;
          white-space: nowrap;
          margin-bottom: 4px;
          text-align: center;
        ">
          <img src="/bus.png" style="width:30px; height:30px; display:block; margin:0 auto 4px;" />
          <strong>${bus.serviceNo}</strong><br/>
          Arrival: ${bus.scheduleArrival}<br />
          Depo:${bus.deportName}
        </div>
        <!-- Google Pin Below -->
        <img 
          src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"
          style="width:27px; height:43px;"
        />
      </div>
    `,
    className: "",
    iconAnchor: [13, 43], // anchor bottom tip of pin
  });
  

  return (
    <Marker
      key={bus.serviceNo}
      position={bus.coordinates}
      icon={combinedIcon}
      zIndexOffset={1000}
    >
      <Popup>
        <div>
          <strong>{bus.serviceNo}</strong>
          <br />
          Departure: {bus.scheduleDeparture}
          <br />
          Arrival: {bus.scheduleArrival}
          <br />
          Depot: {bus.deportName}
        </div>
      </Popup>
    </Marker>
  );
})}

         
      </MapContainer>

      {/* Display all routes below map */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Available Routes:</h2>
        {routes.map((route, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: idx === 0 ? "#d0f0fd" : "#f0f0f0",
            }}
          >
            <strong>{idx === 0 ? "Shortest Route" : `Route ${idx + 1}`}</strong>
            <div>Distance: {(route.distance / 1000).toFixed(2)} km</div>
            <div>Duration: {(route.duration / 60).toFixed(1)} mins</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusMap;
