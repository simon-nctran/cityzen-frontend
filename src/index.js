import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// mapbox
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aGdpYW5nIiwiYSI6ImNrOXdtNmJpZDBhem4zbG1rODNrYmxrZnAifQ.QyMjlGdfO2PcviXkyb_xVA';

class Application extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        lng: 144.9,
        lat: -37.8,
        zoom: 10
      };
  }

  componentDidMount() {
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
      });
      map.on('move', () => {
        this.setState({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
  }
  
  render() {
      return (
        <div>
          <div>
            <div className="sidebarStyle">Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
            </div>
          </div>
          <div ref={el => this.mapContainer = el}  className="mapContainer"/>
        </div>
      )
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
