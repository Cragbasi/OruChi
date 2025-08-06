import { Link } from "react-router-dom";

import "../blocks/Header.css";
import logout from "../assets/logout.svg";
import logoutWhite from "../assets/logout-white.svg";
import close from "../assets/mobile-close.svg";

function Navigation({
  isLoggedIn,
  onOpenSignUpModal,
  handleSignOut,
  onViewSavedArticles,
  setActiveTab,
  activeTab,
  handleMobileMenuOpen,
  isMobileMenuOpen,
  onClose,
}) {
  return (
    <div className="header__container ">
      {!isLoggedIn ? (
        <>
          <button type="button" className="header__home-button">
            Home
          </button>
          <button
            type="button"
            className="header__sign-in-button"
            onClick={onOpenSignUpModal}
          >
            Sign in
          </button>
        </>
      ) : (
        <>
          <Link to="/">
            <button
              type="button"
              className={`header__home-button  ${
                activeTab === "home"
                  ? "header__home-button_active"
                  : "header__home-button_logged-in"
              }`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
          </Link>
          <button
            type="button"
            className={`header__home-button  ${
              activeTab === "saved"
                ? "header__saved-articles header__saved-articles_active "
                : "header__saved-articles header__saved-articles_inactive"
            }`}
            onClick={() => {
              setActiveTab("saved");
              onViewSavedArticles();
            }}
          >
            Saved articles
          </button>
          <button
            type="button"
            className={`header__sign-in-button header__sign-in-button_log-out ${
              activeTab === "home" ? "header__log-out-button_white" : ""
            }`}
            onClick={() => {
              handleSignOut();
            }}
          >
            Elise
            <img
              src={activeTab === "home" ? logoutWhite : logout}
              alt="Logout"
              className="header__logout-button"
            />
          </button>
        </>
      )}
      {!isMobileMenuOpen ? (
        <button
          type="button"
          className={`header__menu-button ${
            activeTab === "saved" ? "header__menu-button_saved-artiles" : ""
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
    </div>
  );
}

export default Navigation;
