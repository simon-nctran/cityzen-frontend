import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { searchRoute, searchWaypoint, getPoiRoute, searchPoiRoute } from "../apiMap";

// mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA";

// MapBox API: https://docs.mapbox.com/mapbox-gl-js/api/
// Official examples for MapBox with React: https://github.com/mapbox/mapbox-react-examples

// Main reference used to convert to functional component:
// https://github.com/bryik/mapbox-react-examples/blob/basic-hooks/basic/src/index.js
export default function Map(props) {
  const [map, setMap] = useState(null);
  const [lngLatZoom, setLngLatZoom] = useState({ lng: 144.9631, lat: -37.8136, zoom: 14 });
  const [routeCoords, setRouteCoords] = useState(null);
  const [poiFeatures, setPoiFeatures] = useState(null);
  const mapContainer = useRef(null);
  // For useRef:
  // https://reactjs.org/docs/hooks-reference.html#useref
  // https://reactjs.org/docs/refs-and-the-dom.html

  const { lng, lat, zoom } = lngLatZoom;

  const routeData = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: "",
    },
  };

  const poiData = {
    type: "FeatureCollection",
    features: "",
  };

  // draw the Route onto the map
  function mapAddRoute() {
    if (map.getSource("route")) {
      map.getSource("route").setData(routeData);
    } else {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoords,
          },
        },
      });
      // add a layer to map that displays "route" resource
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    }
  }

  // draw the POIs onto the map
  function mapAddPOI() {
    if (map.getSource("places")) {
      map.getSource("places").setData(poiData);
    } else {
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: poiFeatures,
        },
      });

      // Add a layer showing the places.
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "cat",
          "icon-allow-overlap": true,
        },
      });

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mouseenter", "places", (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.address;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
      });

      const { mode } = props.journey;

      map.on("click", "places", function(e) {
        const poi = e.features[0].geometry.coordinates.slice();
        console.log(poi);
        getPoiRoute(routeCoords[0], poi, routeCoords.slice(-1)[0], mode)
          .then((route) => {
            // const { newCoordinates } = route.routes[0].geometry.coordinates;
            console.log("POI route coordinates", route.routes[0].geometry.coordinates);
            setRouteCoords(route.routes[0].geometry.coordinates);
          });
        
      });

      map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    }
  }


  // Mount the map
  useEffect(() => {
    console.log("Map Component has been mounted");
    const { lng, lat, zoom } = lngLatZoom;
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom, // short hand for zoom: zoom
    });

    // add event listener that responds to moving the map
    newMap.on("move", () => {
      setLngLatZoom({
        lng: newMap.getCenter().lng,
        lat: newMap.getCenter().lat,
        zoom: newMap.getZoom(),
        // removed .toFixed as that converts to String,
        // but latLngZoom uses Number as defined in the argument of useState above
      });
    });

    newMap.loadImage("/poiMarker.png", (error, image) => {
      if (error) {
        throw error;
      }
      newMap.addImage("cat", image);
    });

    setMap(newMap);
  }, []);

  // Search for the Route
  useEffect(() => {
    if (map && props.journey !== {}) {
      console.log("props.journey has been updated");

      // extract the user input into their respective fields
      const { origin, destination, mode } = props.journey;

      searchRoute(origin, destination, mode, lng, lat)
        .then((route) => {
          const { coordinates } = route.routes[0].geometry;
          console.log("route coordinates", coordinates);
          setRouteCoords(coordinates);
        })
        .catch((err) => {
          console.error("error has occurred when searching for routes");
          console.error(err);
        });

    }
  }, [props.journey]);

  // draw the Route and the POIs when route coordinates are updated
  useEffect(() => {
    if (map && routeCoords) {
      // const source = "route";
      routeData.geometry.coordinates = routeCoords;

      // add a "route" resource to map
      mapAddRoute(routeData, routeCoords);

      const { poi } = props.journey;

      searchWaypoint(poi, routeCoords[0][0], routeCoords[0][1]).then((data) => {
        setPoiFeatures(data);
      });
    }
  }, [routeCoords]);

  // draw the POIs (run when POIs are updated)
  useEffect(() => {
    if (poiFeatures != null) {
      poiData.features = poiFeatures;

      mapAddPOI(poiData, poiFeatures);
    }
  }, [poiFeatures]);

  return (
    <>
      <>
        <div className="sidebarStyle">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </>
      <div ref={mapContainer} className="mapContainer" />
    </>
  );
}
