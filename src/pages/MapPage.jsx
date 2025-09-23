import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const INDIA_CENTER = [22.0, 80.0];
const INDIA_BOUNDS = [[6.0, 68.0], [37.0, 97.5]];
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "YOUR_API_KEY";

// Component for overlays
function WeatherOverlay({ layerKey, apiKey, opacity = 0.5 }) {
  if (!apiKey || apiKey === "YOUR_API_KEY") return null;
  const url = `https://tile.openweathermap.org/map/${layerKey}/{z}/{x}/{y}.png?appid=${apiKey}`;
  return <TileLayer key={layerKey} url={url} opacity={opacity} />;
}

export default function MapPage({ onBack }) {
  const [base, setBase] = useState("osm");
  const [precip, setPrecip] = useState(true);
  const [clouds, setClouds] = useState(false);
  const [temp, setTemp] = useState(false);

  return (
    <div className="map-wrapper">
      {/* Back button */}
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      {/* Side control panel */}
      <div className="map-panel">
        <h3>Weather Maps</h3>
        <div className="base-switch">
          <button
            className={base === "osm" ? "active" : ""}
            onClick={() => setBase("osm")}
          >
            Map
          </button>
          <button
            className={base === "sat" ? "active" : ""}
            onClick={() => setBase("sat")}
          >
            Satellite
          </button>
        </div>

        <hr />
        <div className="layer-list">
          <label>
            <input
              type="checkbox"
              checked={precip}
              onChange={(e) => setPrecip(e.target.checked)}
            />{" "}
            Precipitation
          </label>
          <label>
            <input
              type="checkbox"
              checked={clouds}
              onChange={(e) => setClouds(e.target.checked)}
            />{" "}
            Clouds
          </label>
          <label>
            <input
              type="checkbox"
              checked={temp}
              onChange={(e) => setTemp(e.target.checked)}
            />{" "}
            Temperature
          </label>
        </div>
      </div>

      {/* Map itself */}
      <MapContainer
  center={INDIA_CENTER}
  zoom={5}
  style={{ height: "100vh", width: "100%" }}
  maxBounds={INDIA_BOUNDS}
  maxBoundsViscosity={0.8}
  minZoom={4}
>
  {/* Base layers */}
  {base === "osm" ? (
    <TileLayer
      key="osm"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  ) : (
    <TileLayer
      key="sat"
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    />
  )}

  {/* Weather overlays with stable keys */}
  {precip && (
    <TileLayer
      key={`precip_${precip}`}
      url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
      opacity={0.6}
    />
  )}
  {clouds && (
    <TileLayer
      key={`clouds_${clouds}`}
      url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
      opacity={0.5}
    />
  )}
  {temp && (
    <TileLayer
      key={`temp_${temp}`}
      url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
      opacity={0.5}
    />
  )}
</MapContainer>

    </div>
  );
}
