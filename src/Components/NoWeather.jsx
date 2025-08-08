import React from "react";
import styles from "./NoWeather.module.css";

const NoWeather = () => {
  return (
    <div className={styles.welcomeMessage}>
      <div className={styles.welcomeIcon}>🌤️</div>
      <h3>Search for a Location</h3>
      <p>Enter a city name to get weather information</p>
    </div>
  );
};

export default NoWeather;
