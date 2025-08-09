import { Link } from "react-router-dom";

import "../blocks/Header.css";
import logout from "../assets/logout.svg";
import logoutWhite from "../assets/logout-white.svg";
import close from "../assets/mobile-close.svg";

function Navigation({
  isLoggedIn,
  onOpenLoginModal,
  handleSignOut,
  onViewSavedArticles,
  setActiveTab,
  activeTab,
  handleMobileMenuOpen,
  isMobileMenuOpen,
  onClose,
  isLoginModalOpen,
  isSignUpModalOpen,
}) {
  return (
    <nav className="header__container">
      <ul className="header__nav-list">
        {!isLoggedIn ? (
          <>
            <li>
              <button type="button" className="header__home-button">
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className="header__sign-in-button"
                onClick={onOpenLoginModal}
              >
                Sign in
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">
                <button
                  type="button"
                  className={`header__home-button ${
                    activeTab === "home"
                      ? "header__home-button_active"
                      : "header__home-button_logged-in"
                  }`}
                  onClick={() => setActiveTab("home")}
                >
                  Home
                </button>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className={`header__home-button ${
                  activeTab === "saved"
                    ? "header__saved-articles header__saved-articles_active"
                    : "header__saved-articles header__saved-articles_inactive"
                }`}
                onClick={() => {
                  setActiveTab("saved");
                  onViewSavedArticles();
                }}
              >
                Saved articles
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`header__sign-in-button header__sign-in-button_log-out ${
                  activeTab === "home" ? "header__log-out-button_white" : ""
                }`}
                onClick={handleSignOut}
              >
                Elise
                <img
                  src={activeTab === "home" ? logoutWhite : logout}
                  alt="Logout"
                  className="header__logout-button"
                />
              </button>
            </li>
          </>
        )}
        {!isLoginModalOpen && !isSignUpModalOpen && (
          <li>
            {!isMobileMenuOpen ? (
              <button
                type="button"
                className={`header__menu-button ${
                  activeTab === "saved"
                    ? "header__menu-button_saved-artiles"
                    : ""
                }`}
                onClick={handleMobileMenuOpen}
              ></button>
            ) : (
              <button
                type="button"
                className="header__close-mobile-menu-button"
                onClick={onClose}
              >
                <img src={close} alt="Close button" />
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
