import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNavState } from "../features/nav/navSlice";

export default function NavMain({ reference }) {
  const isNavOpen = useSelector(state => state.navState.item);
  const dispatch = useDispatch();

  return (
    <nav
      className='nav-menu'
      ref={reference}
      style={{ height: isNavOpen ? "154.78px" : "0" }}
      onClick={() => {
        dispatch(updateNavState(false));
      }}>
      <ul>
        <NavLink to='/'>
          <li>Home</li>
        </NavLink>
        <NavLink to='/about'>
          <li>About</li>
        </NavLink>
        <NavLink to='favourites'>
          <li>Favourites</li>
        </NavLink>
      </ul>
    </nav>
  );
}
