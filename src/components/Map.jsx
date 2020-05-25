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

    // create a dummy route
    map.on("load", () => {
      map.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': [[144.966995,-37.800068],[144.967117,-37.799343],[144.967194,-37.798923],[144.967209,-37.79882],[144.967224,-37.798775],[144.967239,-37.798702],[144.967255,-37.798607],[144.967255,-37.798542],[144.967316,-37.798271],[144.967361,-37.797989],[144.967407,-37.797695],[144.967422,-37.797626],[144.967422,-37.797581],[144.967438,-37.797413],[144.967468,-37.797264],[144.967468,-37.797192],[144.967484,-37.797127],[144.967499,-37.797089],[144.967499,-37.797031],[144.967499,-37.797024],[144.967529,-37.796852],[144.967545,-37.796749],[144.967651,-37.796173],[144.967667,-37.79604],[144.967697,-37.795918],[144.967804,-37.795296],[144.967941,-37.794498],[144.967941,-37.794434],[144.967941,-37.794361],[144.967941,-37.7943],[144.967972,-37.79414],[144.967987,-37.794071],[144.968002,-37.794022],[144.968018,-37.79393],[144.968048,-37.793804],[144.968063,-37.79372],[144.968079,-37.79369],[144.968094,-37.793579],[144.96817,-37.793152],[144.96817,-37.793056],[144.968185,-37.793026],[144.968185,-37.79298],[144.968185,-37.792938],[144.968201,-37.792843],[144.968246,-37.792625],[144.968246,-37.792599],[144.968277,-37.792477]]
          }
        }
        });
        map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });    })
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
            resolve(data.features[0].geometry.coordinates)  //extract the coordinates
          }
        })
      })
    }

    function getRoute(start, end) {
      return new Promise(function(resolve, reject) {
        let getRouteUrl = "https://api.mapbox.com/directions/v5/mapbox/driving/" + start[0] + "," + start[1] + ";" + end[0] + "," + end[1] + "?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA"
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
      .then(route => {
        console.log(route)
        return route})
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
