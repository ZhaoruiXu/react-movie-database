import { NavLink } from "react-router-dom";

export default function NavMain() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
        <li>
          <NavLink to='favourites'>Favourites</NavLink>
        </li>
      </ul>
    </nav>
  );
}
