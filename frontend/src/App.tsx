import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import CityDetails from "./pages/CityDetails";
import NotFound from "./pages/NotFound";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/app/search" element={<Search />} />
            <Route path="/app/city/:cityId" element={<CityDetails />} />
            <Route path="/app/favorites" element={<Favorites />} />
            <Route path="/app/compare" element={<Compare />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
