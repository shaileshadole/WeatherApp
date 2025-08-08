import React, { useState } from "react";
import styles from "./App.module.css";
import axios from "axios";
import Query from "./Components/Query";
import NoWeather from "./Components/NoWeather";
import WeatherCard from "./Components/WeatherCard";
import Loader from "./Components/Loader";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  //Fetch Weather by coordinates
  const fetchHomeWeather = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    setLoading(true);

    //Setting up the co-ordinates from the given location
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Your Location
  const yourLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          await fetchHomeWeather(latitude, longitude);
          setLoading(false);
        },
        (err) => {
          console.error("Location access Denied: ", err);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
      setLoading(false);
    }
  };

  //Changing the background color of body
  const getWeatherClass = () => {
    if (data == null) return "defaultBG";

    const hour = new Date(data.dt * 1000).getHours();
    const isDay = hour > 6 && hour < 20;

    switch (data.weather[0].main.toLowerCase()) {
      case "clear":
        return isDay ? "clearDay" : "clearNight";
      case "clouds":
        return "cloudy";
      case "rain":
        return "rainy";
      case "snow":
        return "snowy";
      case "thunderstorm":
        return "stormy";
      case "mist":
      case "smoke":
      case "haze":
      case "fog":
        return "foggy";
      default:
        return "defaultBG";
    }
  };

  return (
    <div className={`${styles.container0} ${styles[getWeatherClass()]}`}>
      <div className={styles.container}>
        <Query setData={setData} setLoading={setLoading} />

        {loading && <Loader />}

        {data === null ? <NoWeather /> : <WeatherCard data={data} />}

        <button disabled={loading} className={styles.yourLocation} onClick={() => yourLocation()}>
          { loading ? "Loading..." : "Get Weather of Your Location" }
        </button>
        <footer className={styles.appFooter}>
          <p>© {new Date().getFullYear()} Weather App</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
