import { useEffect } from "react";
import { appTitle } from "../globals/globals";

const PageAbout = () => {
  useEffect(() => {
    document.title = `${appTitle} | About`;
  }, []);

  return (
    <main>
      <section className='about-page'>
        <h2>About Page</h2>
      </section>
    </main>
  );
};

export default PageAbout;
