import axios from "axios";
import type { Favorite } from "../types";

export const addFavorites = async (
  explorer_name: string,
  favorites: Favorite,
) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/favorites/add",
    favorites,
    {
      params: { explorer_name },
    },
  );
  return response.data;
};
