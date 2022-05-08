import { useEffect, useState } from "react";
import { appTitle, API_KEY } from "../globals/globals";
import { useParams } from "react-router-dom";
import Movies from "../components/Movies";

const PageSearch = () => {
  const { query } = useParams();

  const [moviesDataByQuery, setMoviesDataByQuery] = useState(false);

  useEffect(() => {
    document.title = `${appTitle} | Search`;

    if (query) {
      const fetchMoviesByQuery = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false`
        );
        let data = await res.json();
        setMoviesDataByQuery(data);
      };
      fetchMoviesByQuery();
    }
  }, [query]);

  return (
    <section className='home-page'>
      <h2>Search Page</h2>
      <p>
        Search Results:{" "}
        {moviesDataByQuery.results !== undefined &&
          moviesDataByQuery.results.length}
      </p>
      {moviesDataByQuery.resutls !== false && (
        <Movies moviesData={moviesDataByQuery.results} />
      )}
    </section>
  );
};

export default PageSearch;
