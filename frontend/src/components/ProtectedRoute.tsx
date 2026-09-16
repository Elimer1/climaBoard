import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const explorerName = localStorage.getItem("explorerName");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    if (!explorerName) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);

        !localStorage.getItem("lastViewedCity") &&
          localStorage.setItem(
            "lastViewedCity",
            JSON.stringify({
              name: "current location",
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          );
      },
      (error) => {
        setError(error);
        setLoading(false);
      },
    );
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {isError.message}</div>;

  if (!explorerName) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
