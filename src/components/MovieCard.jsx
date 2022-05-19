import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import noPoster from "../images/no-movie-poster.jpg";
import { endPointGetW500Img, API_KEY } from "../globals/globals";
import FavButton from "../components/FavButton";
import MoreInfoButton from "../components/MoreInfoButton";
import { addFav, deleteFav } from "../features/favs/favsSlice";

export default function MovieCard({ movieId }) {
  const [movieObj, setMovieObj] = useState(false);
  const [isFav, setIsFave] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // navigate to another page view
  const navigate = useNavigate();
  // redux dispatch action
  const dispatch = useDispatch();

  // pulling localStorage data for favourited movie(s)
  const favs = useSelector(state => state.favs.items);

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
    setIsHovered(!isHovered);
  };

  const handleMoreInfoBtnClick = () => {
    navigate(`/movie/${movieObj.id}`);
  };
  // const handleMovieMouseOver = () => {
  //   // navigate(`/movie/${movieObj.id}`);
  //   setIsHovered(true);
  // };

  // const handleMovieMouseOut = () => {
  //   setIsHovered(false);
  // };

  const handleFavButtonClick = (e, movieObj) => {
    // stop clicking through the fav button
    e.stopPropagation();
    if (isFav) {
      dispatch(deleteFav(movieObj));
      //remove from localStorage and redux store
    } else {
      dispatch(addFav(movieObj));
      //add to localStorage and redux store
    }
  };

  const processMovOverview = movOverview => {
    if (movOverview.length > 125) {
      return `${movOverview.substr(0, 125)} ...`;
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
    return movRating.toFixed(1);
  };

  const processMovGenre = movGenres => {
    if (movGenres.length > 2) {
      movGenres = movGenres.slice(0, 2);
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
      // onMouseOver={handleMovieMouseOver}
      // onMouseOut={handleMovieMouseOut}
      onClick={handleMovieClick}
      className='movie-card'
      tabIndex={0}>
      <div className='default-movie-card'>
        <div className='movie-poster'>
          {movieObj.poster_path === null ? (
            <img src={noPoster} alt='No poster avaliable' />
          ) : (
            movieObj.poster_path !== undefined && (
              <img
                src={endPointGetW500Img + movieObj.poster_path}
                alt={movieObj.title}
              />
            )
          )}
        </div>
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
          <div className='movie-genre-contaniner'>
            {movieObj.genres ? processMovGenre(movieObj.genres) : null}
          </div>
        </div>
        <FavButton
          handleFavButtonClick={e => handleFavButtonClick(e, movieObj)}
          isFav={isFav}
        />
      </div>
      {isHovered && (
        <div className='hovered-movie-card'>
          <div className='movie-backdrop'>
            {movieObj.backdrop_path === null ? (
              <img src={noPoster} alt='No backdrop avaliable' />
            ) : (
              movieObj.backdrop_path !== undefined && (
                <img
                  src={endPointGetW500Img + movieObj.backdrop_path}
                  alt={movieObj.title}
                />
              )
            )}
          </div>
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
              <h3>Overview:</h3>
              {movieObj.overview ? processMovOverview(movieObj.overview) : null}
            </div>
          </div>
          <MoreInfoButton handleMoreInfoBtnClick={handleMoreInfoBtnClick} />
        </div>
      )}
    </div>
  );
}
