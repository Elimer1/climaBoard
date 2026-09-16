import { useEffect, useRef, useState } from "react";
import { getLocations } from "../services/locationService";
import { useNavigate } from "react-router-dom";
import type { CityResult } from "../types";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const [result, setResults] = useState<CityResult[]>([]);
  const lastSearchId = useRef(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCityClick = (city: CityResult) => {
    localStorage.setItem(
      "lastViewedCity",
      JSON.stringify({
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        country: city.country,
      }),
    );
    navigate(`/app/city/${city.id}`);
  };

  useEffect(() => {
    if (search.length < 2) {
      setResults([]);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      lastSearchId.current += 1;
      const thisSearchId = lastSearchId.current;

      setLoading(true);
      getLocations(search)
        .then((data) => {
          if (lastSearchId.current === thisSearchId) {
            setResults(data);
            setError(null);
          }
        })
        .catch((err) => {
          if (lastSearchId.current === thisSearchId) {
            setError(err.message || "something went wrong");
          }
        })
        .finally(() => {
          if (lastSearchId.current === thisSearchId) {
            setLoading(false);
          }
        });
    }, 400);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter location..."
        onChange={handleChange}
        value={search}
      />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {isError}</div>}
      {!result && <div>No results found</div>}
      <ul>
        {result &&
          result.map((city) => {
            return (
              <li key={city.id} onClick={() => handleCityClick(city)}>
                {city.name} - {city.admin1} - {city.country}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Search;
