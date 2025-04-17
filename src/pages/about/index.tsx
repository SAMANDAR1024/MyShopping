import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@iminside/react-yandex-maps";

export default function About() {
  const [loading, setLoading] = useState(false);
  const [langlot, setLanglot] = useState<{
    longitude: number;
    latitude: number;
  }>();
  const defaultState = {
    center: [langlot?.latitude || 41, langlot?.longitude || 69],
    zoom: 12,
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        <h2>Biz haqimizda</h2>
        <button
          className="bg-blue-500 p-2"
          onClick={() => {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
              (data) => {
                setLanglot({
                  longitude: data.coords.longitude,
                  latitude: data.coords.latitude,
                });
                setLoading(false);
                console.log(data);
              },
              (e) => {
                console.log(e);
                setLoading(false);
              }
            );
          }}
        >
          meni Top {loading&& "Loading"}
        </button>
      </div>
      <div>
        <YMaps>
          <Map style={{ width: "100%", height: 400 }} state={defaultState}>
            {langlot && (
              <Placemark geometry={[langlot.latitude, langlot.longitude]} />
            )}
          </Map>
        </YMaps>
      </div>
    </div>
  );
}
