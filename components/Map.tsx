import React, { useCallback, useEffect, useState } from "react";
import MapGl, { Layer, Source } from "react-map-gl";

type Props = {};

function Map({}: Props) {
  const [points, setPoints] = useState<mapboxgl.Point[]>([]);
  const [viewState, setViewState] = useState({
    longitude: 2,
    latitude: 36,
    zoom: 10,
  });

  const handleClick = useCallback((evt: mapboxgl.MapLayerMouseEvent) => {
    console.log("clicked", evt.point);
    setPoints((prev) => {
      prev.push(evt.point);
      return prev;
    });
  }, []);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((data) => {
        setViewState((prev) => {
          return {
            ...prev,
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          };
        });
      });
    };
    getLocation();
  }, []);

  const onMove = useCallback(({ viewState }) => {
    setViewState(viewState);
  }, []);

  return (
    <MapGl
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPGL_SK}
      onClick={handleClick}
      {...viewState}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={onMove}
    >
      {points.map((point, _id) => (
        <Source
          id="my-data"
          type="geojson"
          key={_id}
          data={{
            type: "Feature",
            geometry: { type: "Point", coordinates: [point.x, point.y] },
            properties: {},
          }}
        >
          <Layer
            id="point"
            type="circle"
            paint={{ "circle-color": "red", "circle-radius": 10 }}
          />
        </Source>
      ))}
    </MapGl>
  );
}

export default Map;
