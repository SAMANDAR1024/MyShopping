import React, { useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
} from "@iminside/react-yandex-maps";

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
    <div className="container flex justify-center flex-col   mx-auto py-10">
      <h2 className="py-7 text-2xl font-bold">Biz Haqimizda</h2>
      <div>
        <YMaps>
          <Map style={{ width: "100%", height: 400 }} state={defaultState}>
            {langlot && (
              <Placemark geometry={[langlot.latitude, langlot.longitude]} />
            )}
            <ZoomControl />
          </Map>
        </YMaps>
      </div>
      <div className="flex gap-2 justify-center my-10 items-center">
        <h2>Biz haqimizda</h2>
        <button
          className="bg-blue-500 p-2 rounded-2xl text-white "
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
          meni Top {loading && "Loading"}
        </button>
      </div>
    </div>
  );
}
