import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { appTitle } from "../globals/globals";
import Movies from "../components/Movies";

import { AiFillHeart } from "react-icons/ai";

const PageFavourites = () => {
  const favs = useSelector(state => state.favs.items);

  useEffect(() => {
    document.title = `${appTitle} - Favourites`;
  }, []);

  return (
    <section
      className={`favourites-page ${favs && favs.length < 1 && "center"}`}>
      <h2>favourites</h2>
      {favs && favs.length > 0 ? (
        <Movies moviesData={favs} />
      ) : (
        <div className='no-favourites-message'>
          <p>\(o_o)/</p>
          <p>Sorry, You Do Not Have Favourite Movies Yet</p>
          <p>
            Click On The <AiFillHeart /> To Create Today!
          </p>
          <Link to='/'>Back To Home</Link>
        </div>
      )}
    </section>
  );
};

export default PageFavourites;
