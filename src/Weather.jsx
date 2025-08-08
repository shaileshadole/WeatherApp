import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = ({ data }) => {

    const [location, setLocation] = useState("");

    const fetchData = async () => {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        try{
            const res = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&limit=1&appid=${apiKey}`);
            setLocation(res.data[0].name);
        }catch(error){
            console.log(error);            
        }
    }


    useEffect(() => {
        fetchData();
    }, [data]);

  return (
    <div>
      <h3>Your Weather Data is here</h3>
      <h1>{location}</h1>
      <h3>{data.weather[0].main}</h3>
      <p>Temperature: {data.main.temp}</p>
      <p>Pressure: {data.main.pressure}</p>
      <p>humidity: {data.main.humidity}</p>
      <p>Wind Speed: {data.wind.speed}</p>
    </div>
  );
};

export default Weather;
