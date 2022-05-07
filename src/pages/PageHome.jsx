import { useEffect, useState } from "react";
import { appTitle, API_KEY } from "../globals/globals";
import Movies from "../components/Movies";

const PageHome = () => {
  const [moviesDataByCategory, setMoviesDataByCategory] = useState(false);

  // const [movieCategory, setMovieCategory] = useState("popular");
  const movieCategory = "popular";

  useEffect(() => {
    document.title = `${appTitle} | Home`;

    const fetchMoviesByCategory = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieCategory}?api_key=${API_KEY}&language=en-US&page=1 `
      );
      let data = await res.json();
      setMoviesDataByCategory(data);
    };
    fetchMoviesByCategory();
  }, []);

  return (
    <section className='home-page'>
      <h2>Home Page</h2>
      {moviesDataByCategory.resutls !== false && (
        <Movies moviesData={moviesDataByCategory.results} />
      )}
    </section>
  );
};

export default PageHome;
