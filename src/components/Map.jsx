import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// mapbox

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA";

/*
export default function Map() {
  const [latLngZoom, setLatLngZoom] = useState({ lng: 5, lat: 34, zoom: 1.5 });
  const mapContainer = useRef(null);

  // Initialization.
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [5, 34],
      zoom: 1.5
    });

    map.on("move", () => {
      const { lng, lat } = map.getCenter();
      setLatLngZoom({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    return map.remove();
  }, []);

  const { lng, lat, zoom } = latLngZoom;
  return (
    <div>
      <div>
        <div className="sidebarStyle">
          Longitude: {lng} | Latitude: {lat} | Zoom:{" "}
          {zoom}
        </div>
      </div>
      <div ref={mapContainer} className="mapContainer" />
    </div>
  );
}
*/

/*
export default function Map(props) {
  const [lng, setLng] = useState(144.9)
  const [lat, setLat] = useState(-37.8)
  const [zoom, setZoom] = useState(10)
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      setLng(map.getCenter().lng)
      setLat(map.getCenter().lat)
      setZoom(map.getZoom())
    });

    return map.remove();
  }, []);

  return (
    <div>
      <div>
        <div className="sidebarStyle">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div ref={mapContainer} className="mapContainer" />
    </div>
  );
}
*/


/*
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

// ReactDOM.render(<Application />, document.getElementById("app"));
