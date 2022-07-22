import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { appTitle } from "../globals/globals";
import Movies from "../components/Movies";
import CategoryBar from "../components/CategoryBar";
import LoadMoreButton from "../components/LoadMoreButton";

const PageHome = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalMoviesDataByCategory, setTotalMoviesDataByCategory] = useState(
    []
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [isMoreToLoad, setIsMoreToLoad] = useState(false);
  const [buttonDelay, setButtonDelay] = useState(false);
  const movieCategory = useSelector(state => state.cats.item);
  const previousPageNumber = useRef(0);
  const previousMovieCategory = useRef("");
  const insideMoreInfoBtn = useRef(null);

  useEffect(() => {
    document.title = `${appTitle} - Home`;

    if (movieCategory) {
      // check if there is a change in catergory
      if (movieCategory !== previousMovieCategory.current) {
        setPageNumber(1);
        setTotalMoviesDataByCategory([]);
        setIsLoaded(false);
      }

      const fetchMoviesByCategory = async () => {
        if (pageNumber !== previousPageNumber.current || pageNumber === 1) {
          // check if there is a new page number OR pageNumber equal 1 (occurs when a new catergory is selected, including initial loading)
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieCategory}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNumber}`
          );

          if (res.ok) {
            setIsLoaded(true);

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
          } else {
            setIsLoaded(false);
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

  useEffect(() => {
    // to prevent flashing button between movie card loads
    setButtonDelay(false);
    const timer = setTimeout(() => {
      setButtonDelay(true);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoaded, isMoreToLoad]);

  const handleLoadMoreBtnClick = () => {
    setPageNumber(prev => prev + 1);
    insideMoreInfoBtn.current.blur();
  };

  return (
    <section className='home-page'>
      <CategoryBar />

      {/* show skeleton before data loads up */}
      {/* {!isLoaded && <Loading />} */}

      {isLoaded && <Movies moviesData={totalMoviesDataByCategory} />}

      {/* make sure there is more movies to be loaded */}
      {isLoaded && isMoreToLoad && buttonDelay && (
        <LoadMoreButton
          reference={insideMoreInfoBtn}
          handleLoadMoreBtnClick={handleLoadMoreBtnClick}
        />
      )}
    </section>
  );
};

export default PageHome;
