import React, { useCallback } from "react";
import MapGl, { Layer, Source } from "react-map-gl";

type Props = {};

function Map({}: Props) {
  const geojson = {
    type: "Feature",
    geometry: { type: "Point", coordinates: [0, -122.4, 37.8] },
    id: "point",
    properties: {},
  };

  const handleClick = useCallback((evt: mapboxgl.MapLayerMouseEvent) => {
    console.log(evt.point);
  }, []);

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  return (
    <MapGl
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPGL_SK}
      onClick={handleClick}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Source
        id="my-data"
        type="geojson"
        data={{
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, -122.4, 37.8] },
          properties: { layerStyle },
        }}
      >
        <Layer
          id="point"
          type="circle"
          paint={{ "circle-color": "red", "circle-radius": 10 }}
        />
      </Source>
    </MapGl>
  );
}

export default Map;
