import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      <NavLink to={"/app"}>Dashboard</NavLink>
      <NavLink to={"/app/search"}>Search</NavLink>
      <NavLink to={"/app/favorites"}>Favorites</NavLink>
      <NavLink to={"/app/compare"}>Compare</NavLink>
    </nav>
  );
};

export default NavBar;
