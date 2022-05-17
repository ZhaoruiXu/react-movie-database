import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavMain from "./NavMain";
import MenuButton from "./MenuButton";

import { useDispatch, useSelector } from "react-redux";
import { updateNavState } from "../features/nav/navSlice";
import { useEffect, useRef } from "react";

const Header = () => {
  const isNavOpen = useSelector(state => state.navState.item);
  const dispatch = useDispatch();
  const insideHeader = useRef(null);
  const insideMenuButton = useRef(null);

  useEffect(() => {
    const listener = e => {
      if (
        insideHeader.current &&
        insideMenuButton.current &&
        e.target &&
        !insideHeader.current.contains(e.target) &&
        !insideMenuButton.current.contains(e.target) &&
        isNavOpen
      ) {
        dispatch(updateNavState(false));
        return;
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [insideHeader, dispatch, isNavOpen]);

  return (
    <header>
      <div className='header-wrapper'>
        <h1>
          <Link to='/'>
            <span>.</span>
            <span>m</span>
            <span>o</span>
            <span>v</span>
            <span>d</span>
            <span>b</span>
          </Link>
        </h1>
        <div className='search-and-nav-wrapper'>
          <SearchBar />
          <MenuButton reference={insideMenuButton} />
        </div>
      </div>
      <NavMain reference={insideHeader} />
    </header>
  );
};

export default Header;
