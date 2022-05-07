import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
// import NavMain from "./NavMain";

const Header = () => {
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
      <SearchBar />

      {/* <NavMain /> */}
    </header>
  );
};

export default Header;
