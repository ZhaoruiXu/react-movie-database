// import searchIcon from "../images/search-icon.svg";
import { BiSearch } from "react-icons/bi";
// import { FaBeer } from "react-icons/fa";
const SearchBar = () => {
  return (
    <div className='search-bar'>
      <input type='text' placeholder='Search' />
      {/* <img src={searchIcon} alt='search icon' /> */}
      {/* <BiSearch /> */}
      <BiSearch />
    </div>
  );
};
export default SearchBar;
