import React, { useRef, useEffect, useState } from "react";
import "./Map.css";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// import { Map } from "../../Util/stores";

function Map() {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-95.358421);
  const [lat, setLat] = useState(29.749907);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: 'map',
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: false
    });
    console.log(map);
  });

  return (
    <div>
      <div className="sidebar">
        <div className="heading">
          <h1>Our locations</h1>
        </div>
        <div id="listings" className="listings"></div>
      </div>
      <div id="map" className="map"></div>
    </div>
  );
}

export default Map;
