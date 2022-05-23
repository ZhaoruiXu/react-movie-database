import { NavLink, Link } from "react-router-dom";
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <div className='footer-wrapper'>
        <h2>
          <Link to='/'>.MovDB</Link>
        </h2>
        <nav className='footer-nav'>
          <ul>
            <div className='valid nav-links'>
              <li>
                {" "}
                <NavLink to='/'>home</NavLink>
              </li>
              <li>
                <NavLink to='/about'>about</NavLink>
              </li>
              <li>
                <NavLink to='favourites'>favourites</NavLink>
              </li>
            </div>
            <div className='invalid nav-links'>
              <li>help</li>
              <li>contact</li>
              <li>site map</li>
            </div>
          </ul>
        </nav>
        <div className='social-container'>
          <p>follow us</p>
          <div className='social-icons-container'>
            <a href='https://www.youtube.com/' aria-label='YouTube site'>
              <AiFillYoutube />
            </a>
            <a href='https://www.instagram.com/' aria-label='Instagram site'>
              <AiOutlineInstagram />
            </a>
            <a href='https://twitter.com/' aria-label='Twitter site'>
              <AiOutlineTwitter />
            </a>
          </div>
        </div>
        <div className='disclaimer-and-copyright'>
          <p>for educational purposes only</p>
          <p>
            <span>&copy;</span> Rui Xu {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
