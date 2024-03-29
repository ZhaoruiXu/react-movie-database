import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNavState } from "../features/nav/navSlice";
import { useEffect, useState } from "react";

export default function NavMain({ reference }) {
  const isNavOpen = useSelector(state => state.navState.item);
  const dispatch = useDispatch();
  const [isDesktopView, setIsDesktopView] = useState();

  useEffect(() => {
    const listener = e => {
      if (e.matches) {
        setIsDesktopView(true);
        dispatch(updateNavState(false));
      } else {
        setIsDesktopView(false);
      }
    };

    let mediaQuery = window.matchMedia("(min-width: 56.25rem)");

    listener(mediaQuery);

    mediaQuery.addEventListener("change", listener);
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeEventListener("change", listener);
  }, [dispatch]);

  return (
    <nav
      className={`nav-menu ${isNavOpen ? "expand-nav-menu" : ""}`}
      ref={reference}
      onClick={() => {
        dispatch(updateNavState(false));
      }}>
      <ul>
        <li onClick={e => e.target.blur()}>
          <NavLink to='/' tabIndex={isDesktopView ? 0 : isNavOpen ? 0 : -1}>
            Home
          </NavLink>
        </li>
        <li onClick={e => e.target.blur()}>
          <NavLink
            to='/about'
            tabIndex={isDesktopView ? 0 : isNavOpen ? 0 : -1}>
            About
          </NavLink>
        </li>
        <li onClick={e => e.target.blur()}>
          <NavLink
            to='/favourites'
            tabIndex={isDesktopView ? 0 : isNavOpen ? 0 : -1}>
            Favourites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
