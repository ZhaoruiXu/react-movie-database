import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  appTitle,
  API_KEY,
  endPointGetW500Img,
  endPointGetOriginalImg,
} from "../globals/globals";
import noPoster from "../images/no-movie-poster.jpg";
import FavButton from "../components/FavButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFav, deleteFav } from "../features/favs/favsSlice";

const PageIndividual = () => {
  const { id } = useParams();
  const [movieObj, setMovieObj] = useState(false);
  const [isFav, setIsFave] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favs = useSelector(state => state.favs.items);

  useEffect(() => {
    if (id || id !== undefined) {
      const fetchMovieObj = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        if (res.status !== 200) {
          console.log(res.status);
          navigate("/");
        } else {
          let data = await res.json();
          setMovieObj(data);
        }
      };
      fetchMovieObj();
    }
  }, [id, navigate]);

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

  return (
    <section className='individual-page'>
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

      <div className='movie-backdrop'>
        {movieObj.backdrop_path === null ? (
          <img src={noPoster} alt='No backdrop avaliable' />
        ) : (
          movieObj.poster_path !== undefined && (
            <img
              src={endPointGetOriginalImg + movieObj.backdrop_path}
              alt={movieObj.title}
            />
          )
        )}
      </div>

      <div className='movie-info'>
        <h3>{movieObj.title ? movieObj.title : "Title N/A"}</h3>
        <p>{movieObj.tagline ? movieObj.tagline : "Tagline N/A"}</p>
        <p>{movieObj.runtime ? movieObj.runtime : "Run Time N/A"}</p>
        <p>{movieObj.vote_average ? movieObj.vote_average : "Rating N/A"}</p>
        <p>
          {movieObj.release_date ? movieObj.release_date : "Release Date N/A"}
        </p>
        {movieObj.genres &&
          movieObj.genres.map(oneMovGenre => {
            return <p key={oneMovGenre.id}>{oneMovGenre.name}</p>;
          })}
      </div>
      <FavButton
        handleFavButtonClick={() => handleFavButtonClick(movieObj)}
        isFav={isFav}
      />
    </section>
  );
};

export default PageIndividual;
