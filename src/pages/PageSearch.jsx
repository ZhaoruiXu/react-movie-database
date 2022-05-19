import { useEffect, useState } from "react";
import { appTitle, API_KEY } from "../globals/globals";
import { useParams } from "react-router-dom";
import Movies from "../components/Movies";
import { useDispatch } from "react-redux";
import { updateSearchQuery } from "../features/searchQuery/searchQuerySlice";

const PageSearch = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  const [moviesDataByQuery, setMoviesDataByQuery] = useState(false);

  useEffect(() => {
    document.title = `${appTitle} - Search`;

    if (query) {
      dispatch(updateSearchQuery(query));

      const fetchMoviesByQuery = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false`
        );
        let data = await res.json();
        setMoviesDataByQuery(data);
      };
      fetchMoviesByQuery();
    }
  }, [query, dispatch]);

  return (
    <section className='search-page'>
      {/* <h2>Search Results</h2> */}
      {/* <p>
        Number of Search Results:{" "}
        {moviesDataByQuery.results !== undefined &&
          moviesDataByQuery.results.length}
      </p> */}

      {moviesDataByQuery.results !== undefined &&
      moviesDataByQuery.results.length > 0 ? (
        <h2>Search Results</h2>
      ) : (
        <h2> No Search Results</h2>
      )}

      {moviesDataByQuery.results !== undefined &&
        (moviesDataByQuery.results.length > 0 ? (
          <Movies moviesData={moviesDataByQuery.results} />
        ) : (
          <div className='no-search-result-message'>
            <p>\(o_o)?</p>
            <p>Sorry, please try another search</p>
          </div>
        ))}
    </section>
  );
};

export default PageSearch;
