import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../blocks/App.css";
import { fetchNews } from "../utils/NewsApi.js";
import { setToken, getToken } from "../utils/token.js";
import { apiKey } from "../utils/constants.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu.jsx";
import RegisterModal from "./RegisterModal.jsx";
import Profile from "./Profile.jsx";
import LoginModal from "./LoginModal.jsx";
import ProtectedRoute from "../utils/ProtectedRoute";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import { authorize, checkToken } from "../utils/auth.js";
import { saveArticle, getItems } from "../utils/api.js";
import fallback from "../assets/SearchForm.svg";

const BASE_URL = "https://newsapi.org/v2/everything";
function invokeFetchNews({
  apiKey,
  baseUrl = BASE_URL,
  q = "",
  searchIn,
  sources,
  domains,
  excludeDomains,
  from,
  to,
  language = "en",
  sortBy = "publishedAt",
  pageSize = 100,
  page = 1,
}) {
  // fetchNews is imported
  return fetchNews({
    apiKey,
    q,
    searchIn,
    sources,
    domains,
    excludeDomains,
    from,
    to,
    language,
    sortBy,
    pageSize,
    page,
  });
}

const formatArticles = (apiResponseEnriched) => {
  const formatedArticles = apiResponseEnriched.map((article) => ({
    source: { name: article.source?.name || "Unknown Source" },
    title: article.title || "No title",
    publishedAt: article.publishedAt || "Unknown date",
    description: article.description || "No description available.",
    urlToImage: article.urlToImage || fallback, // Optional fallback image
    keyword: article.keyword,
  }));
  // console.log("articleData:", articleData);
  return formatedArticles;
};

function App() {
  // Add states variable with default values.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    avatar: "",
    email: "",
    name: "",
    __v: "",
    _id: "",
  });
  const [savedArticles, setSavedArticles] = useState([]);
  const [savedStatus, setSavedStatus] = useState({});
  const [activeTab, setActiveTab] = useState("home");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  const handleOpenisLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };
  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const handleCloseisLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Call NewsApi with search request
  const searchRequest = (searchRequest) => {
    setSearchKeyword(searchRequest.keyword);
    setIsLoading(true);
    setIsError(false);
    setHasSearched(true);

    invokeFetchNews(searchRequest)
      .then((articles) => {
        console.log("Fetched results:", articles);

        const enriched = articles.map((article) => ({
          ...article,
          keyword: searchRequest.keyword,
        }));

        setNewsArticles(formatArticles(enriched));
      })
      .catch((err) => {
        console.error("Search error:", err.message);
        setIsError(true);
        setNewsArticles([]); // clear results on error
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log("NewsArticles updated:", newsArticles);
  }, [newsArticles]);

  function handleLogIn({ email, password }) {
    authorize(email, password)
      .then((res) => {
        const token = res.token;
        console.log("Received token:", token);

        // Simulate storing token (e.g., in localStorage)
        setToken(token);

        handleCloseisLoginModal();
        return checkToken(token);
      })
      .then((userData) => {
        console.log("User data:", userData.data);
        // Update state with user info
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
        setActiveTab("home");
        console.log("New sign up:", currentUser);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  }

  const handleSignUp = (item) => {
    const { email, password } = item;
    handleLogIn({ email, password });
    handleCloseSignUpModal();
  };

  const handleSignOut = () => {
    setToken("");
    setIsLoggedIn(false);
    setActiveTab("home");
    setCurrentUser({
      avatar: "",
      email: "",
      name: "",
      __v: "",
      _id: "",
    });
  };

  // useEffect(() => {
  //   getItems().then((items) => setSavedArticles(items));
  // }, []);

  function handleSaveArticle(article) {
    console.log("Saving article:", article);
    console.log("searchKeyword state:", searchKeyword);
    const enrichedArticle = {
      ...article,
      keyword: article.keyword || searchKeyword, // attach
    };
    console.log("Article being saved with keyword:", enrichedArticle);
    saveArticle(enrichedArticle).then((saved) => {
      setSavedArticles((prev) => [...prev, saved]);
      setSavedStatus((prev) => ({ ...prev, [article.title]: true }));
      console.log("saved article:", saved);
    });
  }

  useEffect(() => {
    console.log("savedArticles after save:", savedArticles);
  }, [savedArticles]);

  function handleRemoveArticle(article) {
    const { title } = article;

    // Remove from savedArticles
    setSavedArticles((prev) => prev.filter((item) => item.title !== title));

    // Remove from savedStatus
    setSavedStatus((prev) => {
      const updated = { ...prev };
      delete updated[title];
      return updated;
    });

    console.log(`Removed article: ${title}`);
  }

  function handleViewSavedArticles() {
    navigate("/saved-articles");
  }
  function handleViewHome() {
    navigate("/");
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData.data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          handleMobileMenuOpen={handleMobileMenuOpen}
          onOpenSignUpModal={handleOpenSignUpModal}
          handleSignOut={handleSignOut}
          onViewSavedArticles={handleViewSavedArticles}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          isMobileMenuOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                searchRequest={searchRequest}
                isLoggedIn={isLoggedIn}
                onSave={handleSaveArticle}
                onRemove={handleRemoveArticle}
                savedStatus={savedStatus}
                savedArticles={savedArticles}
                articlesData={newsArticles}
                setSearchKeyword={setSearchKeyword}
                isLoading={isLoading}
                isError={isError}
                hasSearched={hasSearched}
              />
            }
          />

          <Route
            path="/saved-articles"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  savedArticles={savedArticles}
                  isLoggedIn={isLoggedIn}
                  onRemove={handleRemoveArticle}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer setActiveTab={setActiveTab} />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          isLoggedIn={isLoggedIn}
          onClose={handleMobileMenuClose}
          onOpenLoginModal={() => {
            handleOpenSignUpModal();
            handleMobileMenuClose();
          }}
          handleSignOut={() => {
            handleSignOut();
            setIsMobileMenuOpen(false);
          }}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          onViewSavedArticles={handleViewSavedArticles}
          onViewHome={handleViewHome}
        />

        {isSignUpModalOpen && (
          <RegisterModal
            onClose={handleCloseSignUpModal}
            // isOpen={isSignUpModalOpen}
            onSignUp={handleSignUp}
            onOpenLoginModal={handleOpenisLoginModal}
          ></RegisterModal>
        )}
        {isLoginModalOpen && (
          <LoginModal
            onClose={handleCloseisLoginModal}
            isOpen={isLoginModalOpen}
            onLogIn={handleLogIn}
            onOpenSignUpModal={handleOpenSignUpModal}
          ></LoginModal>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
