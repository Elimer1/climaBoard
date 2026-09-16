import { getCurrentWeather, getDailyWeather } from "../services/weatherService";
import useFetch from "../hooks/useFetch";
import { weatherInfo } from "../utils/weatherCode";
import { addFavorites } from "../services/favoritesService";
import type { CityFavorite } from "../types";
import { Heart } from "lucide-react";

const CityDetails = () => {
  const lastCity = localStorage.getItem("lastViewedCity");

  if (!lastCity) {
    return <div>No city selected</div>;
  }

  const { name, latitude, longitude } = JSON.parse(lastCity);

  const { data, loading, error } = useFetch(() =>
    getCurrentWeather(latitude, longitude),
  );

  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useFetch(() => getDailyWeather(latitude, longitude));

  if (loading || loading2) return <div>Loading...</div>;
  if (error || error2) return <div>Error: {error ? error : error2}</div>;
  if (!data || !data2) {
    return <div>No weather data</div>;
  }

  const { temperature_2m, weather_code, wind_speed_10m } = data;
  const {
    time: time2,
    temperature_2m_max,
    temperature_2m_min,
    weather_code: code,
  } = data2;

  const handleFavoritesAdd = (favorite: CityFavorite) => {
    const name = localStorage.getItem("explorerName");

    addFavorites(name!, favorite)
      .then(() => {
        console.log(`${favorite.name} added to favorites`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h1>{name}</h1>
        <button onClick={() => handleFavoritesAdd(JSON.parse(lastCity))}>
          <Heart />
        </button>
      </div>

      <h3>{temperature_2m} F</h3>
      <p>Conditions: {weatherInfo[weather_code].description}</p>
      <p>{wind_speed_10m} mph</p>

      <ul>
        {time2.map((time, index) => (
          <li key={time}>
            <article>
              <h4>
                {new Date(time).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </h4>
              <p>Low: {temperature_2m_min[index]}</p>
              <p>High: {temperature_2m_max[index]}</p>
              <p>Conditions: {weatherInfo[code[index]].description}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CityDetails;
