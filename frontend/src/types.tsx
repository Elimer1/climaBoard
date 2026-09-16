export type CityResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
};

export type CityFavorite = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};

export type LocationWeather = {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
};

export type DailyWeather = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
};

export type Favorite = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};
