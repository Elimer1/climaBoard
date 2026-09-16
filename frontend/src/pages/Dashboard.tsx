import useFetch from "../hooks/useFetch";
import { getCurrentWeather } from "../services/weatherService";

const Dashboard = () => {
  console.log("DASHBOARD RENDER");
  const lastCity = localStorage.getItem("lastViewedCity");
  const { name, latitude, longitude } = lastCity
    ? JSON.parse(lastCity)
    : { name: "Tel Aviv", latitude: 32.0853, longitude: 34.7818 };

  const user = localStorage.getItem("explorerName");

  const { data, loading, error } = useFetch(() =>
    getCurrentWeather(latitude, longitude),
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { temperature_2m: temp, wind_speed_10m: wind_speed } = data!;
  return (
    <div>
      <h1>Hello {user}</h1>
      <h2>Weather in {name}</h2>
      <p>Temperature: {temp}F</p>
      <p>Wind speed: {wind_speed}</p>
    </div>
  );
};

export default Dashboard;
