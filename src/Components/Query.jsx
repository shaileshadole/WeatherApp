import React, { useState } from "react";
import styles from "./Query.module.css";
import { configDotenv } from "dotenv";
import axios from "axios";

const Query = ({setData, setLoading}) => {  
  const [query, setQuery] = useState("");

  const loading = false;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    setLoading(true);

    if(query == ""){
      setData(null);
      setLoading(false);
      return;
    }

    //Setting up the co-ordinates from the given location
    try {
      const geoRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`
      );

      if (geoRes.data.length === 0) {
        setLoading(false);
        alert("Location not found");
        return;
      }

      const { lat, lon } = geoRes.data[0];

      // setCor({ lat: res.data.lat, lon: res.data.lon });
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setData(res.data);
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }finally{      
      setLoading(false);
    }
  };

  return (
    <div className={styles.QueryContainer}>
      <header className={styles.appHeader}>
        <h1>Weather Forecast</h1>
        <p>Get real-time weather updates</p>
      </header>
      <form onSubmit={handleSubmit} className={styles.searchform}>
          <div className={styles.searchinputcontainer}>
            <input
              type="text"
              placeholder="Enter city name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchinput}
            />
            <span className={styles.searchicon}>🔍</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.searchbutton}
          >Search</button>
      </form>
    </div>
  );
};

export default Query;
