import { useEffect, useState, useRef } from "react";
import { appTitle, API_KEY } from "../globals/globals";
import Movies from "../components/Movies";
import CategoryBar from "../components/CategoryBar";
import LoadMoreButton from "../components/LoadMoreButton";
import { useSelector } from "react-redux";

const PageHome = () => {
  const [totalMoviesDataByCategory, setTotalMoviesDataByCategory] = useState(
    []
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [isMoreToLoad, setIsMoreToLoad] = useState(false);
  const movieCategory = useSelector(state => state.cats.item);
  const previousPageNumber = useRef(0);
  const previousMovieCategory = useRef("");

  useEffect(() => {
    document.title = `${appTitle} - Home`;

    if (movieCategory) {
      console.log(pageNumber, movieCategory);
      console.log(previousMovieCategory.current, movieCategory);
      if (movieCategory !== previousMovieCategory.current) {
        // check if there is a change in catergory
        setPageNumber(1);
        setTotalMoviesDataByCategory([]);
      }

      const fetchMoviesByCategory = async () => {
        if (pageNumber !== previousPageNumber.current || pageNumber === 1) {
          // check if there is a new page number OR pageNumber equal 1 (occurs when a new catergory is selected, including initial loading)
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieCategory}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
          );
          let data = await res.json();

          if (data.resutls !== false) {
            setTotalMoviesDataByCategory(prev => {
              return [...prev, ...data.results];
            });
          }

          if (data.total_pages <= pageNumber) {
            setIsMoreToLoad(false);
          } else {
            setIsMoreToLoad(true);
          }
        }
      };
      fetchMoviesByCategory();
    }
    return () => {
      previousPageNumber.current = pageNumber;
      previousMovieCategory.current = movieCategory;
    };
  }, [movieCategory, pageNumber]);

  const handleLoadMoreBtnClick = () => {
    setPageNumber(prev => prev + 1);
  };

  return (
    <section className='home-page'>
      <h2 className='screen-reader-text'>Home Page</h2>
      <CategoryBar />
      {totalMoviesDataByCategory !== false && (
        <Movies moviesData={totalMoviesDataByCategory} />
      )}
      {isMoreToLoad && (
        <LoadMoreButton handleLoadMoreBtnClick={handleLoadMoreBtnClick} />
      )}
    </section>
  );
};

export default PageHome;
