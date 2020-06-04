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
  const [lngLatZoom, setLngLatZoom] = useState({ lng: 144.9631, lat: -37.8136, zoom: 14 });
  const [routeCoords, setRouteCoords] = useState(null);
  const [endCoord, setEndCoord] = useState(null);
  const [poiFeatures, setPoiFeatures] = useState(null);
  const mapContainer = useRef(null);
  // For useRef:
  // https://reactjs.org/docs/hooks-reference.html#useref
  // https://reactjs.org/docs/refs-and-the-dom.html

  // Run at initialisation and everytime props.journey is updated.
  // second argument of useEffect is an array which defines the variables it tracks for changes
  // it runs whenever one of these variables changes
  useEffect(() => {
    console.log("Map Component has been mounted");
    const { lng, lat, zoom } = lngLatZoom;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom, // short hand for zoom: zoom
    });

    // add event listener that responds to moving the map
    map.on("move", () => {
      setLngLatZoom({
        lng: map.getCenter().lng,
        lat: map.getCenter().lat,
        zoom: map.getZoom(),
        // removed .toFixed as that converts to String,
        // but latLngZoom uses Number as defined in the argument of useState above
      });
    });

    // things to do when loading map
    map.on("load", () => {
      // add a "route" resource to map
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

      // display the end marker
      if (endCoord != null) {
        new mapboxgl.Marker().setLngLat(endCoord[0]).addTo(map);
      }
    });

    // things to do when loading map
    if (routeCoords != null) {
      map.on('load', function () {

        map.loadImage(
          '/poiMarker.png',
          function(error, image) {
          if (error) throw error;
          map.addImage('cat', image);
        });

        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': poiFeatures,
          }
        });

        // Add a layer showing the places.
        map.addLayer({
          'id': 'places',
          'type': 'symbol',
          'source': 'places',
          'layout': {
            'icon-image': 'cat',
            'icon-allow-overlap': true
          }
        });

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.on('mouseenter', 'places', function (e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer';

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.address;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
        });

        map.on('mouseleave', 'places', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    }
    //
  }, [routeCoords]);

  useEffect(() => {
    console.log("props.journey has been updated");

    function searchWaypoint(place) {
      return new Promise((resolve, reject) => {
        const searchWaypointUrl =
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          place + ".json?proximity=" + 
          lngLatZoom.lng + "," + 
          lngLatZoom.lat + "&country=AU&access_token=" +
          TOKEN;
        fetch(searchWaypointUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.features[0] === undefined) {
              // features[0] is undefined if the place doesnt exist
              reject("its undefined here");
            } else {
              console.log("searchWaypoint data:", data);
              resolve(data); // extract the coordinates
            }
          });
      });
    }

    function getRoute(start, end) {
      return new Promise((resolve, reject) => {
        const getRouteUrl =
          "https://api.mapbox.com/directions/v5/mapbox/driving/" +
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
              reject(new Error("route is undefined"));
            } else {
              resolve(data);
            }
          });
      });
    }

    // if start and end are not undefined then
    const start = props.journey.origin;
    const end = props.journey.destination;
    const poi = "Coffee";

    // get the startCoord, then get the endCoord, then get the Route
    searchWaypoint(start).then((start) =>
      searchWaypoint(end)
        .then((end) => {
          return getRoute(start.features[0].geometry.coordinates, end.features[0].geometry.coordinates);
        })
        .then((route) => {
          console.log("route coordinates", route.routes[0].geometry.coordinates);
          setEndCoord(route.routes[0].geometry.coordinates.slice(-1));
          setRouteCoords(route.routes[0].geometry.coordinates);
        })
    );
    searchWaypoint(poi).then((poi) => {
      console.log("poi features:", poi.features);
      // add place names to the description to display on marker
      setPoiFeatures(poi.features);
    })
  }, [props.journey]);

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
