import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA";

const TOKEN =
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

  //run only at initialisation
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

    newMap.loadImage("/poiMarker.png", function (error, image) {
      if (error) throw error;
      newMap.addImage("cat", image);
    });


    setMap(newMap);
  }, []);

  // run when the user journey input is updated
  useEffect(() => {
    if (map && props.journey !== {}) {
      console.log("props.journey has been updated");

      // extract the user input into their respective fields
      const start = props.journey.origin;
      const end = props.journey.destination;
      const mode = props.journey.mode;

      // finds the relevant data on a waypoint
      function searchWaypoint(place) {
        return new Promise((resolve, reject) => {
          const searchWaypointUrl =
            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            place +
            ".json?proximity=" +
            lngLatZoom.lng +
            "," +
            lngLatZoom.lat +
            "&country=AU&access_token=" +
            TOKEN;
          fetch(searchWaypointUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.features[0] === undefined) {
                // features[0] is undefined if the place doesnt exist
                alert("Places could not be found");
                reject("searchWaypoint reject");
              } else {
                console.log("searchWaypoint data:", data);
                resolve(data); // extract the coordinates
              }
            });
        });
      }

      // gets the route from a start and end latitude and longitude
      function getRoute(start, end) {
        return new Promise((resolve, reject) => {
          const getRouteUrl =
            "https://api.mapbox.com/directions/v5/mapbox/" + mode +
            start[0] +
            "," +
            start[1] +
            ";" +
            end[0] +
            "," +
            end[1] +
            "?steps=true&geometries=geojson&access_token=" +
            TOKEN;
          fetch(getRouteUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.routes === undefined) {
                reject(new Error("getRoute reject"));
              } else {
                resolve(data);
              }
            });
        });
      }

      // get the startCoord, then get the endCoord, then get the Route
      searchWaypoint(start).then((start) =>
        searchWaypoint(end)
          .then((end) => {
            return getRoute(
              start.features[0].geometry.coordinates,
              end.features[0].geometry.coordinates
            );
          })
          .then((route) => {
            console.log("route coordinates", route.routes[0].geometry.coordinates);
            setRouteCoords(route.routes[0].geometry.coordinates);
          })
      );
    }
  }, [props.journey]);

  // draw the route (run when route coordinates are updated)
  useEffect(() => {
    if (map && routeCoords) {

      let routeData = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoords,
        }
      };

      // add a "route" resource to map
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
  }, [routeCoords]);

  // search for nearby POIs
  useEffect(() => {
    if (routeCoords) {

      const poi = props.journey.poi;

      // finds the relevant data on a POI
      function searchPOI(place, proximity) {
        return new Promise((resolve, reject) => {
          // search for POIs near along the route
          const searchPOIUrl =
            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            place +
            ".json?proximity=" +
            proximity[0] +
            "," +
            proximity[1] +
            "&country=AU&access_token=" +
            TOKEN;
          fetch(searchPOIUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.features === undefined) {
                // features is undefined if the place doesnt exist
                alert("Places could not be found");
                reject("searchPOI reject");
              } else {
                console.log("searchPOI data:", data);
                resolve(data.features); // extract the coordinates
              }
            });
        });
      }

      searchPOI(poi, routeCoords[0]).then((poi) => {
        setPoiFeatures(poi);
      });
    }
  }, [routeCoords])

  //draw the POIs (run when POIs are updated)
  useEffect(() => {

    if (poiFeatures != null) {

      let poiData = {
        type: "FeatureCollection",
        features: poiFeatures,
      }


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
        let popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        map.on("mouseenter", "places", function (e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          let coordinates = e.features[0].geometry.coordinates.slice();
          let description = e.features[0].properties.address;

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

        map.on("mouseleave", "places", function () {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      }
    }
  }, [poiFeatures]);


  const { lng, lat, zoom } = lngLatZoom;
  return (
    // Using Fragments:
    // https://reactjs.org/docs/fragments.html#short-syntax
    // https://stackoverflow.com/questions/47761894/why-are-fragments-in-react-16-better-than-container-divs
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
