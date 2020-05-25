import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA";

let TOKEN = 
  "pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA";

// MapBox API: https://docs.mapbox.com/mapbox-gl-js/api/
// Official examples for MapBox with React: https://github.com/mapbox/mapbox-react-examples

// Main reference used to convert to functional component:
// https://github.com/bryik/mapbox-react-examples/blob/basic-hooks/basic/src/index.js
export default function Map(props) {
  const [lngLatZoom, setLngLatZoom] = useState({ lng: 144.9, lat: -37.8, zoom: 10 });
  const mapContainer = useRef(null);
  // For useRef:
  // https://reactjs.org/docs/hooks-reference.html#useref
  // https://reactjs.org/docs/refs-and-the-dom.html


  // Run at initialisation and everytime props.journey is updated.
  // second argument of useEffect is an array which defines the variables it tracks for changes
  // it runs whenever one of these variables changes
  useEffect(() => {
    console.log("Map Component has been mounted")
    const { lng, lat, zoom } = lngLatZoom
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });

    map.on("move", () => {
      setLngLatZoom({
        lng: map.getCenter().lng,
        lat: map.getCenter().lat,
        zoom: map.getZoom()
        // removed .toFixed as that converts to String,
        // but latLngZoom uses Number as defined in the argument of useState above
      });
    });

    // dummy marker
    map.on("load", () => {
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [144.966316, -37.803921]
              }
            }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });  
    })
  }, []);

  useEffect(() => {
    console.log("props.journey has been updated");

    function getLngLat(place) {
      return new Promise(function(resolve, reject) {
        let getLngLatUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + place + ".json?proximity=144.9,-37.8&country=AU&access_token=" + TOKEN;
        fetch(getLngLatUrl)
        .then(response => response.json())
        .then(data => {
          if (data.features[0] === undefined) { //features[0] is undefined if the place doesnt exist
            reject("its undefined here")
          } else {
            resolve(data.features[0].geometry.coordinates)
          }
        })
      })
    }

    function getRoute(start, end) {
      return new Promise(function(resolve, reject) {
        let getRouteUrl = "https://api.mapbox.com/directions/v5/mapbox/driving/" + start[0] + "," + start[1] + ";" + end[0] + "," + end[1] + "?access_token=pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA"
        fetch(getRouteUrl)
        .then(response => response.json())
        .then(data => {
          if (data.routes === undefined) {
            reject("route is undefined")
          } else {
            resolve(data)
          }
        })
      })
    }

    // if start and end are not undefined then    
    let start = props.journey.origin;
    let end = props.journey.destination;

    // get the startCoord, then get the endCoord, then get the Route
    getLngLat(start)
    .then(startCoord => getLngLat(end)
      .then(endCoord => getRoute(startCoord, endCoord))
      .then(route => console.log(route))
    )
    
  }, [props.journey]);

  const { lng, lat, zoom } = lngLatZoom;
  return (
    // Using Fragments:
    // https://reactjs.org/docs/fragments.html#short-syntax
    // https://stackoverflow.com/questions/47761894/why-are-fragments-in-react-16-better-than-container-divs
    <>
      <>
        <div className="sidebarStyle">
          Longitude: {lng} | Latitude: {lat} | Zoom:{" "}
          {zoom}
        </div>
      </>
      <div ref={mapContainer} className="mapContainer" />
    </>
  );
}
