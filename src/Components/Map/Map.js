import React from "react";
import "./Map.css";

// import { Map } from "../../Util/stores";

function Map() {
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
