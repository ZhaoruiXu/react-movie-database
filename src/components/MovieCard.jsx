import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import noPoster from "../images/no-movie-poster.jpg";
import { endPointGetPoster, API_KEY } from "../globals/globals";
import FavButton from "../components/FavButton";
import { useDispatch } from "react-redux";
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
          console.log(data.title);

          setMovieObj(data);
        };
        fetchMovieObj();
      }
    }
  }, [movieId, isFav, favs]);

  // useEffect(() => {
  //   const isFav = favs.some(obj => obj.id === movieId);
  //   setIsFave(isFav);
  // }, [movieId, favs]);

  const handleMovieClick = () => {
    navigate(`/movie/${movieObj.id}`);
    console.log("nav");
  };

  const handleFavButtonClick = (e, movieObj) => {
    // stop clicking through the fav button
    e.stopPropagation();
    if (isFav) {
      dispatch(deleteFav(movieObj));
      console.log("fav delete");
      //remove from localStorage
    } else {
      dispatch(addFav(movieObj));
      console.log("fav added");
      //add to localStorage
    }
  };

  return (
    <div onClick={handleMovieClick} className='movie-card'>
      <div className='movie-poster'>
        {movieObj.poster_path === undefined ? (
          <img src={noPoster} alt='No poster avaliable' />
        ) : (
          <img
            src={endPointGetPoster + movieObj.poster_path}
            alt={movieObj.title}
          />
        )}
      </div>
      <div className='movie-info'>
        <h3>{movieObj.title ? movieObj.title : "N/A"}</h3>
        <p>{movieObj.runtime ? movieObj.runtime : "N/A"}</p>
        <p>{movieObj.vote_average ? movieObj.vote_average : "N/A"}</p>
        {movieObj.genres &&
          movieObj.genres.map(oneMovGenre => {
            return <p key={oneMovGenre.id}>{oneMovGenre.name}</p>;
          })}
      </div>
      <FavButton
        handleFavButtonClick={e => handleFavButtonClick(e, movieObj)}
        isFav={isFav}
      />
    </div>
  );
}
