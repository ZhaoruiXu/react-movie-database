import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearchQuery } from "../features/searchQuery/searchQuerySlice";
import { useParams } from "react-router-dom";
import { appTitle, API_KEY } from "../globals/globals";
import Movies from "../components/Movies";

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
    <section
      className={`search-page ${
        moviesDataByQuery.results !== undefined &&
        moviesDataByQuery.results.length < 1
          ? "center"
          : ""
      }`}>
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
        moviesDataByQuery.results !== undefined &&
        moviesDataByQuery.results.length < 1 && <h2> No Search Results</h2>
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
