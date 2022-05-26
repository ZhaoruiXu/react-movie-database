import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { appTitle, API_KEY } from "../globals/globals";
import Movies from "../components/Movies";
import CategoryBar from "../components/CategoryBar";
import LoadMoreButton from "../components/LoadMoreButton";
import Loading from "../components/Loading";

const PageHome = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalMoviesDataByCategory, setTotalMoviesDataByCategory] = useState(
    []
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [isMoreToLoad, setIsMoreToLoad] = useState(false);
  const movieCategory = useSelector(state => state.cats.item);
  const previousPageNumber = useRef(0);
  const previousMovieCategory = useRef("");
  const insideMoreInfoBtn = useRef(null);

  useEffect(() => {
    document.title = `${appTitle} - Home`;

    if (movieCategory) {
      // console.log(pageNumber, movieCategory);
      // console.log(previousMovieCategory.current, movieCategory);
      if (movieCategory !== previousMovieCategory.current) {
        // check if there is a change in catergory

        setPageNumber(1);
        setTotalMoviesDataByCategory([]);
        setIsLoaded(false);
      }

      const fetchMoviesByCategory = async () => {
        if (pageNumber !== previousPageNumber.current || pageNumber === 1) {
          // check if there is a new page number OR pageNumber equal 1 (occurs when a new catergory is selected, including initial loading)
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieCategory}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
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

  const handleLoadMoreBtnClick = () => {
    setPageNumber(prev => prev + 1);
    insideMoreInfoBtn.current.blur();
  };

  return (
    <section className='home-page'>
      <CategoryBar />
      {/* {isLoaded ? (
        <Movies moviesData={totalMoviesDataByCategory} />
      ) : (
        <Loading />
      )} */}

      {!isLoaded && <Loading />}

      {isLoaded && <Movies moviesData={totalMoviesDataByCategory} />}

      {isLoaded && isMoreToLoad && (
        <LoadMoreButton
          reference={insideMoreInfoBtn}
          handleLoadMoreBtnClick={handleLoadMoreBtnClick}
        />
      )}
    </section>
  );
};

export default PageHome;
