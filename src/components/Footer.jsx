import "../blocks/Footer.css";
import fb from "../assets/fb.svg";
import github from "../assets/github.svg";
import { Link } from "react-router-dom";

function Footer({ setActiveTab }) {
  return (
    <footer className="footer">
      <p className="footer__credit">© 2025 Supersite, Powered by News API</p>
      <div className="footer__right-container">
        <div className="footer__nav-container">
          <Link to="/">
            <button
              type="button"
              className="footer__button"
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
          </Link>
          <a
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__button"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__social-container">
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
        </div>
      </div>
    </footer>
  );
}
export default Footer;
