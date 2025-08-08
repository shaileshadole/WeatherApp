import React from "react";
import styles from "./WeatherCard.module.css";

const WeatherCard = ({ data }) => {
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌦️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[iconCode] || "☀️";
  };

  return (
    <div className={styles.weatherCard}>
      {/* section 1 */}
      <div className={styles.weatherHeader}>
        <div>
          <h2>{data.name}, {data.sys.country}</h2>
          <p className={styles.weatherDate}>
            {new Date(data.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <button className={styles.unitToggle}>°C</button>
      </div>

      {/* section 2 */}
      <div className={styles.weatherMain}>
        <div className={styles.weatherIcon}>
          {getWeatherIcon(data.weather[0].icon)}
        </div>
        <div>
          <div className={styles.weatherTemp}>
            {Math.round(data.main.temp)}
            {"°C"}
          </div>
          <div className={styles.weatherDesc}>
            {data.weather[0].description}
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className={styles.weatherDetails}>
        {/* Wind */}
        <div className={styles.detailItem}>
          <div className={styles.detailIcon}>💨</div>
          <div>
            <p className={styles.detailLabel}>Wind</p>
            <p className={styles.detailValue}>
              {data.wind.speed.toFixed(1)}
              {" m/s"}
            </p>
          </div>
        </div>
        {/* Humidity */}
        <div className={styles.detailItem}>
          <div className={styles.detailIcon}>💧</div>
          <div>
            <p className={styles.detailLabel}>Humidity</p>
            <p className={styles.detailValue}> {data.main.humidity}%</p>
          </div>
        </div>
        {/* Feels Like */}
        <div className={styles.detailItem}>
          <div className={styles.detailIcon}>🌡️</div>
          <div>
            <p className={styles.detailLabel}>Feels Like</p>
            <p className={styles.detailValue}>
              {Math.round(data.main.feels_like)}°C
            </p>
          </div>
        </div>
        {/* Visibility */}
        <div className={styles.detailItem}>
          <div className={styles.detailIcon}>👁️</div>
          <div>
            <p className={styles.detailLabel}>Visibility</p>
            <p className={styles.detailValue}>{(data.visibility)/1000}km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
