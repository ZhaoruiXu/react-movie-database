import { useEffect } from "react";
import { appTitle } from "../globals/globals";
import Movies from "../components/Movies";
import { useSelector } from "react-redux";

const PageFavourites = () => {
  const favs = useSelector(state => state.favs.items);

  useEffect(() => {
    document.title = `${appTitle} | Favourites`;
  }, []);

  return (
    <main>
      <section className='favourites-page'>
        <h2>Favourites Page</h2>
        <Movies moviesData={favs} />
      </section>
    </main>
  );
};

export default PageFavourites;
