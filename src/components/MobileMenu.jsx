import "../blocks/MobileMenu.css";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function MobileMenu({
  isOpen,
  onClose,
  isLoggedIn,
  onOpenLoginModal,
  handleSignOut,
  setActiveTab,
  activeTab,
  onViewSavedArticles,
  onViewHome,
}) {
  const currentUser = useContext(CurrentUserContext);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose, isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="mobile-menu mobile-menu_opened"
          onClick={handleOverlayClick}
        >
          <nav
            className="mobile-menu__container"
            aria-label="Mobile navigation menu"
          >
            <ul className="mobile-menu__list">
              <li className="mobile-menu__item">
                <button
                  type="button"
                  className="mobile-menu__home-button"
                  onClick={() => {
                    if (activeTab === "home" && isLoggedIn) {
                      setActiveTab("saved");
                      onViewSavedArticles();
                      onClose();
                    } else {
                      setActiveTab("home");
                      onViewHome();
                      onClose();
                    }
                  }}
                >
                  {activeTab === "saved"
                    ? "Home"
                    : activeTab === "home" && isLoggedIn
                    ? "Saved articles"
                    : "Home"}
                </button>
              </li>
              <li className="mobile-menu__item">
                <button
                  type="button"
                  className="mobile-menu__sign-in-button"
                  onClick={isLoggedIn ? handleSignOut : onOpenLoginModal}
                >
                  {isLoggedIn ? "Log out" : "Sign in"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
