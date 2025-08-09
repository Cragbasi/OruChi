import "../blocks/Footer.css";
import fb from "../assets/fb.svg";
import github from "../assets/github.svg";
import { Link } from "react-router-dom";
function Footer({ setActiveTab }) {
  return (
    <footer className="footer">
      <p className="footer__credit">© 2025 Supersite, Powered by News API</p>

      <div className="footer__right-container">
        {/* Navigation Links */}
        <nav className="footer__nav-container" aria-label="Footer navigation">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <Link to="/">
                <button
                  type="button"
                  className="footer__button"
                  onClick={() => setActiveTab("home")}
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="footer__nav-item">
              <a
                href="https://tripleten.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__button"
              >
                TripleTen
              </a>
            </li>
          </ul>
        </nav>

        {/* Social Media Links */}
        <div
          className="footer__social-container"
          aria-label="Social media links"
        >
          <ul className="footer__social-list">
            <li className="footer__social-item">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="footer__button footer__button_social-icon"
                  src={github}
                  alt="Github logo"
                />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="footer__button footer__button_social-icon"
                  src={fb}
                  alt="Facebook logo"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
