import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// mapbox
mapboxgl.accessToken =
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


  // Run during initialisation; only runs once as [] was passed ot the second argument
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

    return (() => {
      console.log("Map Component has been unmounted")
      map.remove()
    });
  }, []);

  // Allows the render to reload whenever props.journey changes
  useEffect(() => {
    console.log("Current Journey received by Map Component: (refer log directly below)")
    console.log(props.journey)
  },[props.journey])


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

/* Class Version
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 144.9,
      lat: -37.8,
      zoom: 10,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    // var start =

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <div className="sidebarStyle">
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}
*/