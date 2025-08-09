import { Link } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import "../blocks/Header.css";

function Header({
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
    <div className="header">
      <div className="header__container ">
        <Link to="/">
          <p
            className={`header__logo ${
              activeTab === "saved" && !isMobileMenuOpen
                ? "header__logo_logged-in"
                : activeTab === "saved" && isMobileMenuOpen
                ? "header__logo"
                : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            NewsExplorer
          </p>
        </Link>
      </div>
      <Navigation
        isLoggedIn={isLoggedIn}
        onOpenLoginModal={onOpenLoginModal}
        handleSignOut={handleSignOut}
        onViewSavedArticles={onViewSavedArticles}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuOpen={handleMobileMenuOpen}
        onClose={onClose}
        isLoginModalOpen={isLoginModalOpen}
        isSignUpModalOpen={isSignUpModalOpen}
      />
    </div>
  );
}

export default Header;
