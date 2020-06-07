/* eslint-disable react-hooks/exhaustive-deps,react/destructuring-assignment */
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { searchWaypoint, getPoiRoute, getRoute } from "../apiMap";

// mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiY2l0eXplbi1hcHAiLCJhIjoiY2thdjIyZ2Z6MmU0NjJ4cDE2NHI1bzh2NSJ9.ZFCggjeuB6rV6qnUtjHvTQ";

// MapBox API: https://docs.mapbox.com/mapbox-gl-js/api/
// Official examples for MapBox with React: https://github.com/mapbox/mapbox-react-examples

const routeDataTemplate = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    // add a coordinate property
  },
};

const poiDataTemplate = {
  type: "FeatureCollection",
  // add a features property
};

const locationDataTemplate = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        // add a coordinates property
      },
      properties: {},
    },
  ],
};

// Main reference used to convert to functional component:
// https://github.com/bryik/mapbox-react-examples/blob/basic-hooks/basic/src/index.js
export default function Map(props) {
  const [map, setMap] = useState(null);
  const [lngLatZoom, setLngLatZoom] = useState({ lng: 144.9631, lat: -37.8136, zoom: 14 });
  const [routeCoords, setRouteCoords] = useState(null);
  const [poiFeatures, setPoiFeatures] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selection, setSelection] = useState(null);
  const mapContainer = useRef(null);
  // For useRef:
  // https://reactjs.org/docs/hooks-reference.html#useref
  // https://reactjs.org/docs/refs-and-the-dom.html

  const { lng, lat, zoom } = lngLatZoom;

  // draw the Route onto the map
  function mapAddRoute(routeData) {
    if (map.getSource("route")) {
      map.getSource("route").setData(routeData);
    } else {
      map.addSource("route", {
        type: "geojson",
        data: routeData,
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
          "line-color": "#FFFF66",
          "line-width": 8,
        },
      });
    }
  }

  // draw the POIs onto the map
  function mapAddPOI(poiData, poiIcon) {
    if (map.getSource("places")) {
      map.getSource("places").setData(poiData);
    } else {
      map.addSource("places", {
        type: "geojson",
        data: poiData,
      });

      // Add a layer showing the places.
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": poiIcon,
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
        console.log("e.features", e.features);
        console.log("e.features[0]", e.features[0]);

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.place_name;

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

      map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      const { mode } = props.journey;
      map.on("click", "places", (e) => {
        const poiSelection = e.features[0].geometry.coordinates.slice();
        console.log("e.features[0]", e.features[0]);
        setSelection(e.features[0]);
        getPoiRoute(routeCoords[0], poiSelection, routeCoords.slice(-1)[0], mode).then((route) => {
          const { coordinates: newCoordinates } = route.routes[0].geometry;
          console.log("new route coordinates", newCoordinates);
          setRouteCoords(newCoordinates);
        });
      });
    }
  }

  function mapFlyTo(Coords) {
    map.flyTo({
      center: [Coords[0], Coords[1]],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  }

  async function searchRoute(start, end) {
    const { mode } = props.journey;
    const startPoint = await searchWaypoint(start, lng, lat);
    console.log("start point", startPoint);
    setOrigin(startPoint);
    const endPoint = await searchWaypoint(end, lng, lat);
    console.log("end point", endPoint);
    setDestination(endPoint);
    const startCoordinate = startPoint[0].geometry.coordinates;
    const endCoordinate = endPoint[0].geometry.coordinates;

    return getRoute(startCoordinate, endCoordinate, mode);
  }

  // Mount the map
  useEffect(() => {
    console.log("Map Component has been mounted");
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

    newMap.loadImage("/flag.png", (error, image) => {
      if (error) {
        throw error;
      }
      newMap.addImage("POI", image);
    });
    newMap.loadImage("/marker.png", (error, image) => {
      if (error) {
        throw error;
      }
      newMap.addImage("Marker", image, { pixelRatio: 2 });
    });
    newMap.loadImage("https://img.icons8.com/color/96/000000/near-me--v1.png", (error, image) => {
      if (error) {
        throw error;
      }
      newMap.addImage("origin", image, { pixelRatio: 4 });
    });
    newMap.loadImage("https://img.icons8.com/color/96/000000/place-marker.png", (error, image) => {
      if (error) {
        throw error;
      }
      newMap.addImage("destination", image, { pixelRatio: 3 });
    });
    newMap.loadImage("https://img.icons8.com/color/96/000000/place-marker.png", (error, image) => {
      if (error) {
        throw error;
      }
      newMap.addImage("selection", image, { pixelRatio: 3 });
    });
    newMap.loadImage("https://img.icons8.com/color/96/000000/cafe.png", (error, image) => {
      if (error) {
        throw error;
      }
      newMap.addImage("Coffee", image, { pixelRatio: 3 });
    });

    setMap(newMap);

    // Search for a route
    console.log("props.journey", props.journey);
    if (props.journey !== null) {
      console.log("props.journey has been updated");

      // extract the user input into their respective fields
      const { origin: start, destination: end } = props.journey;

      searchRoute(start, end)
        .then((route) => {
          const { coordinates } = route.routes[0].geometry;
          console.log("route coordinates", coordinates);
          setRouteCoords(coordinates);
        })
        .catch((err) => {
          console.error("error has occurred when searching for routes");
          console.error(err);
          alert("Places could not be found");
        });
    }
  }, [props.journey]);

  // draw the Route and the POIs when route coordinates are updated
  useEffect(() => {
    if (map && routeCoords) {
      console.log("routeCoords has been updated");
      const routeData = { ...routeDataTemplate };
      routeData.geometry.coordinates = routeCoords;

      // add a "route" resource to map
      mapAddRoute(routeData);

      // only generate poi once
      if (poiFeatures === null) {
        mapFlyTo(routeCoords[0]);
        // add markers for origin and destination
        const originData = { ...locationDataTemplate }; // shallow copy location data template (this means the properties share references)
        originData.features[0].geometry.coordinates = [routeCoords[0][0], routeCoords[0][1]];
        console.log("origin", origin);
        originData.features[0].properties.place_name = origin[0].place_name;
        console.log("originData", originData);
        if (map.getSource("origin")) {
          map.getSource("origin").setData(originData);
        } else {
          map.addSource("origin", {
            type: "geojson",
            data: originData,
          });
          map.addLayer({
            id: "origin",
            type: "symbol",
            source: "origin",
            layout: {
              "icon-image": "origin",
              "icon-size": 1.5,
              "icon-allow-overlap": true,
            },
          });
          const originPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });
          map.on("mouseenter", "origin", (e) => {
            map.getCanvas().style.cursor = "pointer";
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.place_name;
            const html = "<h3>Origin</h3><p>" + description + "</p>";
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            originPopup.setLngLat(coordinates).setHTML(html).addTo(map);
          });
          map.on("mouseleave", "origin", () => {
            map.getCanvas().style.cursor = "";
            originPopup.remove();
          });
        }
        const destinationData = { ...locationDataTemplate };
        destinationData.features[0].geometry.coordinates = [
          routeCoords.slice(-1)[0][0],
          routeCoords.slice(-1)[0][1],
        ];
        console.log("destination", destination);
        destinationData.features[0].properties.place_name = destination[0].place_name;
        console.log("destinationData", destinationData);
        if (map.getSource("destination")) {
          map.getSource("destination").setData(destinationData);
        } else {
          map.addSource("destination", {
            type: "geojson",
            data: destinationData,
          });
          map.addLayer({
            id: "destination",
            type: "symbol",
            source: "destination",
            layout: {
              "icon-image": "destination",
              "icon-size": 1.5,
              "icon-allow-overlap": true,
            },
          });
          const destinationPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });
          map.on("mouseenter", "destination", (e) => {
            map.getCanvas().style.cursor = "pointer";
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.place_name;
            const html = "<h3>Destination</h3><p>" + description + "</p>";
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            destinationPopup.setLngLat(coordinates).setHTML(html).addTo(map);
          });
          map.on("mouseleave", "destination", () => {
            map.getCanvas().style.cursor = "";
            destinationPopup.remove();
          });
        }

        const { poi } = props.journey;

        // !!!! This uses searchWaypoint but assumes that there are no errors, cannot handle errors
        const promises = [];
        // https://stackoverflow.com/questions/50243782/create-array-of-promises
        for (let i = 0; i < routeCoords.length; i += 1) {
          const promise = searchWaypoint(poi, routeCoords[i][0], routeCoords[i][1]);
          promises.push(promise);
        }

        Promise.all(promises).then((poiArrayArray) => {
          // https://stackoverflow.com/questions/43455911/using-es6-spread-to-concat-multiple-arrays
          const mergedPoiArrays = [].concat(...poiArrayArray);

          // how to remove duplicates: https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
          const poiSet = new Set(mergedPoiArrays.map((a) => a.id));
          const poiArray = Array.from(poiSet).map((id) => mergedPoiArrays.find((a) => a.id === id));
          const updatedPoiArray = poiArray.map((poiJson) => {
            const newPoiJson = { ...poiJson };
            newPoiJson.properties.place_name = poiJson.place_name;
            return newPoiJson;
          });

          setPoiFeatures(updatedPoiArray);
        });
      } else {
        setPoiFeatures(null);
      }
    }
  }, [routeCoords]);

  // draw the POIs (run when POIs are updated)
  useEffect(() => {
    if (map) {
      console.log("poiFeatures has been updated", poiFeatures);
      const poiData = { ...poiDataTemplate };
      if (poiFeatures === null) {
        poiData.features = [];
      } else {
        poiData.features = poiFeatures;
      }
      const { poi } = props.journey;
      mapAddPOI(poiData, poi);
    }
  }, [poiFeatures]);

  useEffect(() => {
    if (map && selection !== null) {
      console.log("selection has been updated", selection);
      const selectionData = { ...locationDataTemplate };
      mapFlyTo(selection.geometry.coordinates);
      selectionData.features[0].geometry.coordinates = selection.geometry.coordinates;
      selectionData.features[0].properties.place_name = selection.properties.place_name;
      console.log("selectionData", selectionData);
      if (map.getSource("selection")) {
        console.log("already have selection data");
        map.getSource("selection").setData(selectionData);
      } else {
        map.addSource("selection", {
          type: "geojson",
          data: selectionData,
        });
        const { poi } = props.journey;
        map.addLayer({
          id: "selection",
          type: "symbol",
          source: "selection",
          layout: {
            "icon-image": poi,
            "icon-size": 1.5,
            "icon-allow-overlap": true,
          },
        });
        console.log("added selection layer");
        const selectionPopup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
        map.on("mouseenter", "selection", (e) => {
          map.getCanvas().style.cursor = "pointer";
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.place_name;
          const html = "<h3>Selection</h3><p>" + description + "</p>";
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          selectionPopup.setLngLat(coordinates).setHTML(html).addTo(map);
        });
        map.on("mouseleave", "selection", () => {
          map.getCanvas().style.cursor = "";
          selectionPopup.remove();
        });
      }
    }
  }, [selection]);

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
