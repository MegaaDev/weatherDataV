import React, { useRef } from "react";
import "./home.styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../chart/chart";

export const Home = () => {
  const [dataTemp, setDataTemp] = useState([]);
  const [dataTime, setDataTime] = useState([]);
  const [it, setIt] = useState(false);
  const [lat, setLat] = useState(10.7612);
  const [long, setLong] = useState(78.809);
  const [latTemp, setLatTemp] = useState();
  const [longTemp, setLongTemp] = useState();

  useEffect(() => {
    const func = async () => {
      const data = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`
      );
      console.log(data.data.hourly.temperature_2m);
      console.log(data);

      setDataTemp(data.data.hourly.temperature_2m);
      setDataTime(data.data.hourly.time);
      setIt(true);
    };
    func();
  }, [lat, long]);

  useEffect(() => {
    console.log("dataTime:", dataTime);
    console.log("temperatureData:", dataTemp);
  }, [dataTime, dataTemp]);
  return (
    <div className="home">
      <div className="title">Weather Data Visualizer</div>

      <div className="input">
        <input
          type="text"
          placeholder="Lat"
          value={latTemp}
          onChange={(e) => {
            if (e.target.value > 90) {
              alert("Latitude must be less than 90°N");
            } else if (e.target.value < -90) {
              alert("Latitude must be greater than -90°N");
            } else {
              setLatTemp(e.target.value);
            }
          }}
        />
        <input
          type="text"
          placeholder="Long"
          value={longTemp}
          onChange={(e) => {
            if (e.target.value > 180) {
              alert("Longitude must be less than 180°E");
            } else if (e.target.value < -180) {
              alert("Longitude must be greater than -180°E");
            } else {
              setLongTemp(e.target.value);
            }
          }}
        />
        <button
          onClick={() => {
            setLat(latTemp);
            setLong(longTemp);
            setLatTemp("");
            setLongTemp("");
          }}
        >
          submit
        </button>
      </div>
      <div className="showLocation">
        {lat}° N, {long}° E
      </div>
      <Chart dataTime={dataTime} dataTemp={dataTemp} />
    </div>
  );
};
