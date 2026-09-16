import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = <T,>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("useFetch is running");
    fetchFn()
      .then((result) => setData(result))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading, error };
};

export default useFetch;
