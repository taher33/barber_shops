import React, { useCallback, useEffect, useState } from "react";
import MapGl, { Layer, Marker, Popup, Source } from "react-map-gl";
import { BiCurrentLocation } from "react-icons/bi";
import mapboxgl from "mapbox-gl";

type Props = {
  points: number[][];
};

function Map({ points }: Props) {
  const [viewState, setViewState] = useState({
    longitude: 12,
    latitude: 36,
    zoom: 14,
  });

  const handleClick = useCallback((evt: mapboxgl.MapLayerMouseEvent) => {
    console.log("clicked", evt.lngLat);
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
      style={{ width: 600, height: 400, border: "solid black 1px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={onMove}
    >
      {points.map((point, id) => (
        <div key={id}>
          <Popup
            closeOnClick={false}
            // onOpen={(evt) =>
            //   setViewState((prev) => {
            //     return {
            //       ...prev,
            //       latitude: evt.target.options.latitude,
            //       longitude: evt.target.options.longitude,
            //     };
            //   })
            // }

            latitude={point[0]}
            longitude={point[1]}
            offset={{
              "bottom-left": [12, -38],
              bottom: [0, -38],
              "bottom-right": [-12, -38],
            }}
          >
            <h1 className="text-color-red">shop {id}</h1>
          </Popup>
          <Marker
            color="red"
            scale={2}
            longitude={point[0]}
            latitude={point[1]}
          >
            <BiCurrentLocation style={{ color: "red" }} />
          </Marker>
        </div>
      ))}
    </MapGl>
  );
}

export default Map;
