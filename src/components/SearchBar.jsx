import { BiSearch } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  // navigate to another page view
  const navigate = useNavigate();

  const handleSearchSubmit = e => {
    e.preventDefault();
    navigate(`/search/${searchInput}`);
  };

  return (
    <div className='search-bar'>
      <form onSubmit={e => handleSearchSubmit(e)}>
        <BiSearch />
        <input
          type='text'
          placeholder='Search'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <div onClick={() => setSearchInput("")}>
          <TiDelete />
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
