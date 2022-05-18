import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNavState } from "../features/nav/navSlice";
import { useEffect } from "react";

export default function NavMain({ reference }) {
  const isNavOpen = useSelector(state => state.navState.item);
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = () => {
      if (window.innerWidth >= 800) {
        dispatch(updateNavState(false));
        return;
      }
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [dispatch]);

  return (
    <nav
      className={`nav-menu ${isNavOpen ? "expand-nav-menu" : ""}`}
      ref={reference}
      // style={{ height: isNavOpen ? "154.78px" : "0" }}
      // style={{ transform: `translateY(${isNavOpen ? "0" : "-100%"})` }}
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
