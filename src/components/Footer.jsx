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
            <div className='nav-links'>
              <NavLink to='/'>
                <li>home</li>
              </NavLink>
              <NavLink to='/about'>
                <li>about</li>
              </NavLink>
              <NavLink to='favourites'>
                <li>favourites</li>
              </NavLink>
            </div>
            <div className='nav-links'>
              <li>help</li>
              <li>contact</li>
              <li>site map</li>
            </div>
          </ul>
        </nav>
        <div className='social-container'>
          <p>follow us</p>
          <div className='social-icons-container'>
            <a href='https://www.youtube.com/'>
              <AiFillYoutube />
            </a>
            <a href='https://www.instagram.com/'>
              <AiOutlineInstagram />
            </a>
            <a href='https://twitter.com/'>
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
