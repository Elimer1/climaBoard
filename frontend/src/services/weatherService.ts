import axios from "axios";
import type { DailyWeather, LocationWeather } from "../types";

export const getCurrentWeather = async (
  latitude: number,
  longitude: number,
): Promise<LocationWeather> => {
  console.log("coordinates:", latitude, longitude);
  const response = await axios.get("http://127.0.0.1:8000/weather/current", {
    params: { latitude, longitude },
  });
  return response.data;
};

export const getDailyWeather = async (
  latitude: number,
  longitude: number,
): Promise<DailyWeather> => {
  console.log("coordinates:", latitude, longitude);
  const response = await axios.get("http://127.0.0.1:8000/weather/daily", {
    params: { latitude, longitude },
  });
  return response.data;
};
