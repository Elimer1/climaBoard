import axios from "axios";

export const getLocations = async (search: string) => {
  const response = await axios.get("http://127.0.0.1:8000/search", {
    params: { search },
  });
  return response.data.results;
};
