import { BiSearch } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchQuery } from "../features/searchQuery/searchQuerySlice";

const SearchBar = ({ reference }) => {
  const previousSearchQuery = useRef("");
  const searchInput = useSelector(state => state.searchQuery.item);
  const dispatch = useDispatch();

  // navigate to another page view
  const navigate = useNavigate();

  // auto-update search result
  useEffect(() => {
    const updateSearch = () => {
      // store previous search query state value
      // console.log(searchInput, previousSearchQuery.current);
      if (searchInput && searchInput !== previousSearchQuery.current) {
        navigate(`/search/${searchInput}`);
      } else if (searchInput === "" && previousSearchQuery.current !== "") {
        navigate("/");
      }
    };

    // debouce function to reduce API calls
    const timer = setTimeout(updateSearch, 750);

    return () => {
      clearTimeout(timer);
      previousSearchQuery.current = searchInput; // setting previous state to useRef
    };
  }, [searchInput]);

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
        onFocus={() => navigate(`/search/${searchInput}`)}
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
