import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  // navigate to another page view
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    navigate(`/search/${searchInput}`);
  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleSearchSubmit}>
        <input
          type='text'
          placeholder='Search'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <BiSearch />
      </form>
    </div>
  );
};
export default SearchBar;
