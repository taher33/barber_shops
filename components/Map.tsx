import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import MapGl, { Layer, Marker, Popup, Source } from "react-map-gl";
import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

type Props = {
  points: number[][];
};

function Map({ points }: Props) {
  const [viewState, setViewState] = useState({
    longitude: 12,
    latitude: 36,
    zoom: 14,
  });
  const mapRef = useRef(null);

  const geocoder = useMemo(
    () =>
      new MapboxGeocoder({
        accessToken: process.env.NEXT_PUBLIC_MAPGL_SK || "",
        types: "country,region,place,postcode,locality,neighborhood",
      }),
    []
  );

  const handleClick = useCallback((evt: mapboxgl.MapLayerMouseEvent) => {
    console.log("clicked", evt.lngLat);
  }, []);

  useEffect(() => {
    try {
      geocoder.addTo("#search");
      console.log("added", geocoder);
    } catch (error) {
      console.log(error);
    }

    geocoder.on("result", (e) => {
      console.log(e);
    });

    geocoder.on("loading", (e) => {
      console.log("loading", e);
    });
  }, [geocoder]);

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
    <>
      <div id="search"></div>

      <MapGl
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPGL_SK}
        onClick={handleClick}
        {...viewState}
        style={{ width: 600, height: 400, border: "solid black 1px" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={onMove}
        testMode={true}
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
        <Marker color="red" scale={2} longitude={3.1468} latitude={36.7642}>
          <div className="bg-gray-50 p-2 rounded-xl hover:scale-110 transition-all .3s ease-in hover:cursor-pointer">
            <h1 className="text-xl">barber2</h1>
            <p>great barber here</p>
          </div>
          <IoLocationSharp
            className="hover:cursor-pointer hover:scale-110 transition-all .3s ease-in"
            style={{ color: "red", fontSize: "2rem" }}
          />
        </Marker>
      </MapGl>
    </>
  );
}

export default Map;
