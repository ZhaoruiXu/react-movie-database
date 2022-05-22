import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  appTitle,
  API_KEY,
  endPointGetW500Img,
  endPointGetOriginalImg,
} from "../globals/globals";
import moviePosterPlaceHolder from "../images/movie-poster-placeholder.svg";
import movieBackdropPlaceHolder from "../images/movie-backdrop-placeholder.svg";
import FavButton from "../components/FavButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFav, deleteFav } from "../features/favs/favsSlice";

const numMovGeners = 5;
const movRatingDigits = 1;

const PageIndividual = () => {
  const { id } = useParams();
  const [movieObj, setMovieObj] = useState(false);
  const [isFav, setIsFave] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const favs = useSelector(state => state.favs.items);

  useEffect(() => {
    if (id || id !== undefined) {
      const fetchMovieObj = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        if (!res.ok) {
          navigate("/");
        } else {
          let data = await res.json();
          setMovieObj(data);
        }
      };
      fetchMovieObj();
    }
  }, [id, navigate, location]);

  useEffect(() => {
    document.title = `${appTitle} - ${movieObj.title}`;
    const isFav = favs.some(obj => obj.id === movieObj.id);
    setIsFave(isFav);
  }, [movieObj, favs]);

  const handleFavButtonClick = movieObj => {
    if (isFav) {
      dispatch(deleteFav(movieObj));
    } else {
      dispatch(addFav(movieObj));
    }
  };

  const handleBackButtonClick = () => {
    // go back to previous path
    navigate(-1);
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
    return (
      <>
        <span>{movRating.toFixed(movRatingDigits)}</span> / 10
      </>
    );
  };

  const processMovGenre = movGenres => {
    if (movGenres.length > numMovGeners) {
      movGenres = movGenres.slice(0, numMovGeners);
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
    <section className='individual-page'>
      <div
        className='detail-movie-card-wrapper'
        style={{
          backgroundImage:
            movieObj.backdrop_path !== null &&
            movieObj.backdrop_path !== undefined
              ? `url(${endPointGetOriginalImg + movieObj.backdrop_path})`
              : "none",
        }}>
        <div className='detail-moive-card'>
          <div className='movie-poster-wrapper'>
            <div className='movie-poster'>
              {movieObj.poster_path === null ? (
                <img src={moviePosterPlaceHolder} alt='No poster avaliable' />
              ) : (
                movieObj.poster_path !== undefined && (
                  <img
                    src={endPointGetW500Img + movieObj.poster_path}
                    alt={movieObj.title}
                  />
                )
              )}
            </div>
          </div>

          <div className='movie-info'>
            <h3 className='movie-title'>
              {movieObj.title ? movieObj.title : null}
            </h3>

            <p className='movie-tagline'>
              {movieObj.tagline ? movieObj.tagline : null}
            </p>

            <div className='movie-stats-info'>
              <p className='movie-released-date'>
                {movieObj.release_date
                  ? processMovReleaseDate(movieObj.release_date)
                  : null}
              </p>

              {movieObj.release_date && movieObj.runtime ? (
                <span className='info-spacer'> | </span>
              ) : null}

              <p className='movie-runtime'>
                {movieObj.runtime ? processMovRuntime(movieObj.runtime) : null}
              </p>

              {movieObj.runtime && movieObj.vote_average ? (
                <span className='info-spacer'> | </span>
              ) : null}

              <p className='movie-rating'>
                {movieObj.vote_average
                  ? processMovRating(movieObj.vote_average)
                  : null}{" "}
              </p>
            </div>

            <div className='movie-genre-container'>
              {movieObj.genres ? processMovGenre(movieObj.genres) : null}
            </div>

            <div className='movie-overview'>
              <h3>Overview:</h3>
              <p>{movieObj.overview ? movieObj.overview : null}</p>
            </div>
          </div>

          <button className='back-button' onClick={handleBackButtonClick}>
            back
          </button>

          <FavButton
            handleFavButtonClick={() => handleFavButtonClick(movieObj)}
            isFav={isFav}
          />
        </div>
      </div>
    </section>
  );
};

export default PageIndividual;
