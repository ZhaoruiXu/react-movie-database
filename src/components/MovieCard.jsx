import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import noPoster from "../images/no-movie-poster.jpg";
import { endPointGetPoster, API_KEY } from "../globals/globals";
import FavButton from "../components/FavButton";
import { addFav, deleteFav } from "../features/favs/favsSlice";

export default function MovieCard({ movieId }) {
  const [movieObj, setMovieObj] = useState(false);
  const [isFav, setIsFave] = useState(false);
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
    navigate(`/movie/${movieObj.id}`);
  };

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

  const processMovTitle = movTitle => {
    // if (movTitle.length > 28) {
    //   return `${movTitle.substr(0, 28)} ...`;
    // }
    return movTitle;
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

  return (
    <div onClick={handleMovieClick} className='movie-card'>
      <div className='movie-poster'>
        {movieObj.poster_path === null ? (
          <img src={noPoster} alt='No poster avaliable' />
        ) : (
          movieObj.poster_path !== undefined && (
            <img
              src={endPointGetPoster + movieObj.poster_path}
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
  );
}
