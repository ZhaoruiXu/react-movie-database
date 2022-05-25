import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFav, deleteFav } from "../features/favs/favsSlice";
import moviePosterPlaceHolder from "../images/movie-poster-placeholder.svg";
import movieBackdropPlaceHolder from "../images/movie-backdrop-placeholder.svg";
import { endPointGetW500Img, API_KEY } from "../globals/globals";
import FavButton from "../components/FavButton";
import MoreInfoButton from "../components/MoreInfoButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NUM_MOVIE_GENRE = 2;
const NUM_MOVIE_OVERVIEW_CHAR = 150;
const MOVIE_RATING_DIGITS = 1;

export default function MovieCard({ movieId }) {
  const [movieObj, setMovieObj] = useState(false);
  const [isFav, setIsFave] = useState(false);
  // hovered state movie card
  const [cardOpen, setCardOpen] = useState(false);
  // latch is whether the movie card is physically clicked
  const [latchOpen, setLatchOpen] = useState(false);
  // navigate to another page view
  const navigate = useNavigate();
  // redux dispatch action
  const dispatch = useDispatch();
  // pulling localStorage data for favourited movie(s)
  const favs = useSelector(state => state.favs.items);
  // fav button reference
  const insideFavButton = useRef(null);

  useEffect(() => {
    if (movieId) {
      const isFav = favs.some(obj => obj.id === movieId);
      setIsFave(isFav);
      if (isFav) {
        const cachedMovieObj = favs.find(obj => obj.id === movieId);
        setMovieObj(cachedMovieObj);
      } else {
        const fetchMovieObj = async () => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
          );
          let data = await res.json();

          setMovieObj(data);
        };
        fetchMovieObj();
      }
    }
  }, [movieId, favs]);

  const handleMovieClick = () => {
    if (latchOpen) {
      // was clicked on, then click it off
      setCardOpen(false);
    } else {
      // if was not clicked, then click it on
      setCardOpen(true);
    }
    setLatchOpen(!latchOpen);
  };

  const handleMovieMouseEnter = () => {
    if (!latchOpen) {
      // if was not clicked, then hover it on
      setCardOpen(true);
    }
  };

  const handleMovieMouseLeave = () => {
    if (!latchOpen) {
      // if was not clicked, then hover it off
      setCardOpen(false);
    }
  };

  const handleFavButtonClick = (e, movieObj) => {
    // stop clicking through the fav button
    e.stopPropagation();

    // unfocus the fav button
    insideFavButton.current.blur();

    if (isFav) {
      dispatch(deleteFav(movieObj));
      //remove from localStorage and redux store
    } else {
      dispatch(addFav(movieObj));
      //add to localStorage and redux store
    }
    if (!latchOpen) {
      //if was not clicked
      // When clicking the fav button, don't change the card open state
      setCardOpen(cardOpen);
    }
  };

  const handleMovieCardFocus = () => {
    if (!latchOpen) {
      // if was not clicked, then hover it on
      setCardOpen(true);
    }
  };

  const handleMovieCardBlur = () => {
    if (!latchOpen) {
      // if was not clicked, then hover it off
      setCardOpen(false);
    }
  };

  const handleMoreInfoBtnClick = () => {
    navigate(`/movie/${movieObj.id}`);
  };

  const processMovOverview = movOverview => {
    if (movOverview.length > NUM_MOVIE_OVERVIEW_CHAR) {
      return `${movOverview.substr(0, NUM_MOVIE_OVERVIEW_CHAR)} ...`;
    }
    return movOverview;
  };

  const processMovRuntime = totalMinutes => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if (hours === 0 && minutes === 0) {
      return;
    } else if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
  };

  const processMovRating = movRating => {
    return movRating.toFixed(MOVIE_RATING_DIGITS);
  };

  const processMovGenre = movGenres => {
    if (movGenres.length > NUM_MOVIE_GENRE) {
      movGenres = movGenres.slice(0, NUM_MOVIE_GENRE);
    }
    return movGenres.map(oneMovGenre => {
      return (
        <p className='movie-genre' key={oneMovGenre.id}>
          {oneMovGenre.name}
        </p>
      );
    });
  };

  const processMovReleaseDate = movReleaseDate => {
    return movReleaseDate.replaceAll("-", "/");
  };

  return (
    <div
      onClick={handleMovieClick}
      onMouseEnter={handleMovieMouseEnter}
      onMouseLeave={handleMovieMouseLeave}
      className={`movie-card ${cardOpen ? "is-hovered" : ""}`}>
      <div className='default-movie-card'>
        <div className='movie-poster'>
          {movieObj.poster_path === null ? (
            <LazyLoadImage
              src={moviePosterPlaceHolder}
              alt='No poster avaliable'
              effect='opacity'
            />
          ) : (
            movieObj.poster_path !== undefined && (
              <LazyLoadImage
                src={endPointGetW500Img + movieObj.poster_path}
                alt={movieObj.title}
                effect='opacity'
              />
            )
          )}
        </div>

        {movieObj.poster_path !== undefined && (
          <>
            <div className='movie-info'>
              <h3 className='movie-title'>
                {movieObj.title ? movieObj.title : null}
              </h3>
              <p className='movie-run-time'>
                {movieObj.runtime ? processMovRuntime(movieObj.runtime) : null}
              </p>
              <p className='movie-rating'>
                {movieObj.vote_average
                  ? processMovRating(movieObj.vote_average)
                  : null}
              </p>
              <div className='movie-genre-container'>
                {movieObj.genres ? processMovGenre(movieObj.genres) : null}
              </div>
            </div>

            <FavButton
              handleFavButtonClick={e => handleFavButtonClick(e, movieObj)}
              isFav={isFav}
              reference={insideFavButton}
            />
          </>
        )}
      </div>

      <div className={`hovered-movie-card ${cardOpen ? "is-hovered" : ""}`}>
        <div className='movie-backdrop'>
          {movieObj.backdrop_path === null ? (
            <LazyLoadImage
              src={movieBackdropPlaceHolder}
              alt='No backdrop avaliable'
              effect='opacity'
            />
          ) : (
            movieObj.backdrop_path !== undefined && (
              <LazyLoadImage
                src={endPointGetW500Img + movieObj.backdrop_path}
                alt={movieObj.title}
                effect='opacity'
              />
            )
          )}
        </div>

        {movieObj.backdrop_path !== undefined && (
          <>
            <div className='movie-info'>
              <p className='movie-released-date'>
                {movieObj.release_date
                  ? processMovReleaseDate(movieObj.release_date)
                  : null}
              </p>
              <p className='movie-rating'>
                {movieObj.vote_average
                  ? processMovRating(movieObj.vote_average)
                  : null}
              </p>
              <div className='movie-overview'>
                {movieObj.overview && <h3>Overview:</h3>}
                <p>
                  {movieObj.overview
                    ? processMovOverview(movieObj.overview)
                    : null}
                </p>
              </div>
            </div>

            <MoreInfoButton
              handleMoreInfoBtnClick={handleMoreInfoBtnClick}
              isCardOpen={cardOpen}
              handleMovieCardFocus={handleMovieCardFocus}
              handleMovieCardBlur={handleMovieCardBlur}
            />
          </>
        )}
      </div>
    </div>
  );
}
