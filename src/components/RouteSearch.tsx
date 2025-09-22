import { useState } from "react";
import "./RouteSearch.css";

const cityCoordinates: Record<string, [number, number]> = {
  Tirupathi: [13.6288, 79.4192],
  Renigunta: [13.654, 79.512],
  Kadapa: [14.4673, 78.8242],
  Proddutur: [14.7502, 78.5481],
  Kurnool: [15.8281, 78.0373],
  Nandhyala: [15.4945, 78.4831],
  Sreekalahsthi: [13.7498, 79.7036],
  Gudur: [14.1458, 79.8529],
  Jammalamadugu: [14.8465, 78.3823],
  Venkatagiri: [13.9601, 79.5807],
  Mangalam: [13.6117, 79.4374],
  Satyavedu: [13.4503, 79.9635],
  Tirumala: [13.6833, 79.35],
  Mydhukur: [14.7333, 78.5667],
  Allagadda: [15.128, 78.505],
};

interface RouteSearchProps {
  defaultOrigin?: string;
  defaultDestination?: string;
  onSearch: (origin: string, destination: string) => Promise<void> | void;
}

function RouteSearch({
  defaultOrigin = "",
  defaultDestination = "",
  onSearch,
}: RouteSearchProps) {
  const [origin, setOrigin] = useState(defaultOrigin);
  const [destination, setDestination] = useState(defaultDestination);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);

  const filterSuggestions = (value: string) =>
    Object.keys(cityCoordinates).filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrigin(value);
    setOriginSuggestions(value ? filterSuggestions(value) : []);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    setDestinationSuggestions(value ? filterSuggestions(value) : []);
  };

  const selectSuggestion = (value: string, type: "origin" | "destination") => {
    if (type === "origin") {
      setOrigin(value);
      setOriginSuggestions([]);
    } else {
      setDestination(value);
      setDestinationSuggestions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const o = origin.trim();
    const d = destination.trim();
    if (!o || !d) return;
    try {
      setIsSubmitting(true);
      await Promise.resolve(onSearch(o, d));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="route-form-card">
      <h2 className="route-title">🔍 Find Your Bus Route</h2>
      <div className="route-fields">
        {/* Origin */}
        <div className="input-wrapper">
          <label>From</label>
          <input
            value={origin}
            onChange={handleOriginChange}
            placeholder="Type origin..."
            className="route-input"
          />
          {originSuggestions.length > 0 && (
            <ul className="suggestions">
              {originSuggestions.map((city) => (
                <li key={city} onMouseDown={() => selectSuggestion(city, "origin")}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Arrow */}
        <span className="route-arrow">→</span>

        {/* Destination */}
        <div className="input-wrapper">
          <label>To</label>
          <input
            value={destination}
            onChange={handleDestinationChange}
            placeholder="Type destination..."
            className="route-input"
          />
          {destinationSuggestions.length > 0 && (
            <ul className="suggestions">
              {destinationSuggestions.map((city) => (
                <li
                  key={city}
                  onMouseDown={() => selectSuggestion(city, "destination")}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="route-button"
        disabled={!origin || !destination || isSubmitting}
      >
        {isSubmitting ? "Searching…" : "Search"}
      </button>
    </form>
  );
}

export default RouteSearch;
