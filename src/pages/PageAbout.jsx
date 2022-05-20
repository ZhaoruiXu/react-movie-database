import { useEffect } from "react";
import { appTitle } from "../globals/globals";
import TMDBLogo from "../images/tmdb-logo.svg";

const PageAbout = () => {
  useEffect(() => {
    document.title = `${appTitle} - About`;
  }, []);

  return (
    <section className='about-page'>
      <h2>about</h2>
      <div className='about-content'>
        <p>
          .MovDb is an online movie database where you can browse for your
          favourite films.
        </p>
        <p>
          Have not decided on the movie for Friday night? .MovDb provides a full
          list of movies choose from based on popularity, top rating, now
          playing, and upcoming.
        </p>
        <p>
          Want to build a list of your favourite movies? With a click of a
          button, you can build your own movie list.
        </p>
        <p>
          *This product uses the
          <a href='https://developers.themoviedb.org/3/getting-started/introduction'>
            {" "}
            TMDB (the movie database) API{" "}
          </a>{" "}
          but is not endorsed or certified by TMDB.
        </p>
        <img src={TMDBLogo} alt='TMDB logo' />
      </div>
    </section>
  );
};

export default PageAbout;
