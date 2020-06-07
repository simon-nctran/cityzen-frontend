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
  const [lngLatZoom, setLngLatZoom] = useState({
    lng: 144.9631,
    lat: -37.8136,
    zoom: 14,
  });
  const [routeCoords, setRouteCoords] = useState(null);
  const [endCoord, setEndCoord] = useState(null);
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
    map.on("load", function () {
      // load image onto map
      map.loadImage(
        "/logo192.png", // https://commons.wikimedia.org/wiki/Location_markers#/media/File:Red_Arrow_Down.svg",
        function (error, image) {
          if (error) throw error;
          // map.addImage("cat", image);
        }
      );
      // add "places" resource to map
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              id: "poi.154618893324",
              type: "Feature",
              place_type: ["poi"],
              relevance: 1,
              properties: {
                description:
                  "have no idea why .place_name doesnt work but .properties.description works",
                landmark: true,
                address: "297 Little Collins St.",
                category: "cafe, coffee, tea, tea house",
                maki: "cafe",
                name: "Sensory Lab, 297 Little Collins St., Melbourne, Victoria 3000, Australia",
              },
              text: "Sensory Lab",
              place_name:
                "Sensory Lab, 297 Little Collins St., Melbourne, Victoria 3000, Australia",
              center: [144.965098, -37.814806],
              geometry: {
                coordinates: [144.965098, -37.814806],
                type: "Point",
              },
              context: [
                {
                  id: "locality.5321754973111320",
                  wikidata: "Q6811747",
                  text: "Melbourne",
                },
                {
                  id: "postcode.12767122704801890",
                  text: "3000",
                },
                {
                  id: "place.7068896531111320",
                  wikidata: "Q3141",
                  text: "Melbourne",
                },
                {
                  id: "region.9994502542038050",
                  short_code: "AU-VIC",
                  wikidata: "Q36687",
                  text: "Victoria",
                },
                {
                  id: "country.9665923154346070",
                  short_code: "au",
                  wikidata: "Q408",
                  text: "Australia",
                },
              ],
            },
          ],
        },
      });
      // add a layer to map that displays "places" resource
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "cat",
          "icon-allow-overlap": true,
        },
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on("click", "places", function (e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { description } = e.features[0].properties;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "places", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "places", function () {
        map.getCanvas().style.cursor = "";
      });
    });
    //
  }, [routeCoords]);

  useEffect(() => {
    console.log("props.journey has been updated");

    function getLngLat(place) {
      return new Promise((resolve, reject) => {
        const getLngLatUrl =
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          place +
          ".json?proximity=144.9631,-37.8136&country=AU&access_token=" +
          TOKEN;
        fetch(getLngLatUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.features[0] === undefined) {
              // features is list of possible places
              // features[0] is undefined if the place doesnt exist
              reject("its undefined here");
            } else {
              console.log(data);
              resolve(data.features[0].geometry.coordinates); // extract the coordinates
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

    // get the startCoord, then get the endCoord, then get the Route
    getLngLat(start).then((startCoord) =>
      getLngLat(end)
        .then((endCoord) => {
          return getRoute(startCoord, endCoord);
        })
        .then((route) => {
          console.log(route.routes[0].geometry.coordinates);
          setEndCoord(route.routes[0].geometry.coordinates.slice(-1));
          setRouteCoords(route.routes[0].geometry.coordinates);
        })
        .catch((err) => {
          console.error(err);
          alert("Map failed");
        })
    );
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
