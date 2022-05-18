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
  const insideSearchBar = useRef(null);

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

  const blurSearch = () => {
    insideSearchBar.current.blur();
  };

  return (
    <header>
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
      {/* <NavMain reference={insideHeader} /> */}
      <div className='search-and-nav-wrapper'>
        <SearchBar reference={insideSearchBar} />
        <MenuButton reference={insideMenuButton} blurSearch={blurSearch} />
      </div>
      <NavMain reference={insideHeader} />
    </header>
  );
};

export default Header;
