import React from "react";
import "./Map.css";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// import { Map } from "../../Util/stores";

function Map() {
  //   mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

  // mapboxgl.accessToken = "pk.eyJ1IjoiZGVyb25tYWMiLCJhIjoiY2tra2RydGRmMDhkaDJvcHB5bW45NmF3bSJ9.FtCWlzl41UQWKoIqIfE29w";
  
  // const map = new mapboxgl.Map({
  //   container: "map", // container ID
  //   style: "mapbox://styles/mapbox/streets-v11", // style URL
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 9, // starting zoom
  // });

  return (
    <div>
      <div class="sidebar">
        <div class="heading">
          <h1>Our locations</h1>
        </div>
        <div id="listings" class="listings"></div>
      </div>
      <div id="map" class="map"></div>
    </div>
  );
}

export default Map;
