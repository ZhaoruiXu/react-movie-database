import { BiSearch } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchQuery } from "../features/searchQuery/searchQuerySlice";

const SearchBar = ({ reference }) => {
  const previousSearchQuery = useRef("");
  const previousPath = useRef("/");
  const searchInput = useSelector(state => state.searchQuery.item);
  const dispatch = useDispatch();
  const location = useLocation();

  // navigate to another page view
  const navigate = useNavigate();

  // auto-update search result
  useEffect(() => {
    const updateSearch = () => {
      if (searchInput && searchInput !== previousSearchQuery.current) {
        navigate(`/search/${searchInput}`);
      } else if (searchInput === "" && previousSearchQuery.current !== "") {
        navigate(previousPath.current);
      }
    };

    // debouce function to reduce API calls
    const timer = setTimeout(updateSearch, 750);

    return () => {
      clearTimeout(timer);
      previousSearchQuery.current = searchInput; // setting previous state to useRef
      previousPath.current = location.pathname; // setting previous path
    };
  }, [searchInput, navigate, location]);

  const handleSearchInputFocus = () => {
    if (searchInput !== "") {
      navigate(`/search/${searchInput}`);
    }
  };

  return (
    <div className='search-bar' style={{ width: searchInput && "50%" }}>
      <div className='search-icon'>
        <BiSearch />
      </div>
      <input
        type='text'
        placeholder='Search for a movie by title'
        value={searchInput}
        onChange={e => dispatch(updateSearchQuery(e.target.value))}
        onFocus={handleSearchInputFocus}
        ref={reference}
      />
      {searchInput && (
        <div
          className='search-clear-btn'
          onClick={() => dispatch(updateSearchQuery(""))}>
          <TiDelete />
        </div>
      )}
    </div>
  );
};
export default SearchBar;
