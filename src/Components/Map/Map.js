import React, { useRef, useEffect, useState } from "react";
import "./Map.css";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { stores } from "../../Util/stores";

function Map() {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

  // const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-95.358421);
  const [lat, setLat] = useState(29.749907);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom: 10,
      maxZoom: 15,
      minZoom: 9,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("load", () => {
      /* Add the data to your map as a layer */
      map.current.addLayer({
        id: "locations",
        type: "circle",
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: "geojson",
          data: stores,
        },
      });
      buildLocationList(stores);
    });
  });

  function buildLocationList(stores) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById("listings");
      const listing = listings.appendChild(document.createElement("div"));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${store.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = "item";

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement("a"));
      link.href = "#";
      link.className = "title";
      link.id = `link-${store.properties.id}`;
      link.innerHTML = `${store.properties.Name}`;

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement("div"));
      details.innerHTML = `${store.properties.Address}`;
      if (store.properties.phone) {
        details.innerHTML += ` · ${store.properties.phoneFormatted}`;
      }
      if (store.properties.distance) {
        const roundedDistance =
          Math.round(store.properties.distance * 100) / 100;
        details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
      }
    }
  }
  function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
  }

  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`
      )
      .addTo(map);
  }

  return (
    <div>
      <div className="sidebar">
        <div className="heading">
          <h1>Black Owned Restaurants</h1>
        </div>
        <div id="listings" className="listings"></div>
      </div>
      <div id="map" className="map"></div>
    </div>
  );
}

export default Map;
