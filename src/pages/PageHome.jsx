import { useEffect, useState } from "react";
import { appTitle, API_KEY } from "../globals/globals";
import Movies from "../components/Movies";
import CategoryBar from "../components/CategoryBar";
import { useSelector } from "react-redux";

const PageHome = () => {
  const [moviesDataByCategory, setMoviesDataByCategory] = useState(false);
  const movieCategory = useSelector(state => state.cats.item);

  useEffect(() => {
    document.title = `${appTitle} - Home`;

    if (movieCategory) {
      const fetchMoviesByCategory = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieCategory}?api_key=${API_KEY}&language=en-US&page=1`
        );
        let data = await res.json();
        setMoviesDataByCategory(data);
      };
      fetchMoviesByCategory();
    }
  }, [movieCategory]);

  return (
    <section className='home-page'>
      <h2 className='screen-reader-text'>Home Page</h2>
      <CategoryBar />
      {moviesDataByCategory.resutls !== false && (
        <Movies moviesData={moviesDataByCategory.results} />
      )}
    </section>
  );
};

export default PageHome;
