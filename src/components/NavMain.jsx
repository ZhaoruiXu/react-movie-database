import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNavState } from "../features/nav/navSlice";
import { useEffect, useState } from "react";

export default function NavMain({ reference }) {
  const isNavOpen = useSelector(state => state.navState.item);
  const dispatch = useDispatch();
  const [isDesktopView, setIsDesktopView] = useState();

  useEffect(() => {
    const listener = () => {
      if (window.innerWidth >= 800) {
        setIsDesktopView(true);
        dispatch(updateNavState(false));
        return;
      } else {
        setIsDesktopView(false);
      }
    };
    window.addEventListener("load", listener);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("load", listener);
      window.removeEventListener("resize", listener);
    };
  }, [dispatch]);

  return (
    <nav
      className={`nav-menu ${isNavOpen ? "expand-nav-menu" : ""}`}
      ref={reference}
      onClick={() => {
        dispatch(updateNavState(false));
      }}>
      <ul>
        <NavLink to='/' tabIndex={isDesktopView ? 0 : isNavOpen ? 0 : -1}>
          <li>Home</li>
        </NavLink>
        <NavLink to='/about' tabIndex={isDesktopView ? 0 : isNavOpen ? 0 : -1}>
          <li>About</li>
        </NavLink>
        <NavLink
          to='favourites'
          tabIndex={isDesktopView ? 0 : isNavOpen ? 0 : -1}>
          <li>Favourites</li>
        </NavLink>
      </ul>
    </nav>
  );
}
