import { useState } from "react";

import "../blocks/Main.css";
import SearchForm from "./SearchForm";
import ItemCard from "./ItemCard";
import About from "./About.jsx";
import Preloader from "./Preloader.jsx";
import { apiKey } from "../utils/constants.js";

function Main({
  searchRequest,
  articlesData,
  isLoggedIn,
  onSave,
  onRemove,
  savedStatus,
  setSearchKeyword,
  isLoading,
  isError,
  hasSearched,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);

    const dynamicRequest = {
      apiKey: apiKey,
      q: keyword,
      searchIn: "title,description,content",
      sources: "bbc-news,cnn,reuters,nba",
      domains: "bbc.com,cnn.com,nba.com",
      excludeDomains: "",
      from: "2025-08-01",
      to: "2025-08-05",
      language: "en",
      sortBy: "relevancy",
      pageSize: 50,
      page: 1,
      keyword, // attach keyword for enrichment
    };

    searchRequest(dynamicRequest);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="main">
      <SearchForm onSearch={handleSearch} />
      {isLoading && <Preloader />}

      {!isLoading && isError && (
        <div className="item-cards">
          <h2 className="item-cards__title">
            Sorry, something went wrong during the request.
          </h2>
          <p>Please try again later.</p>
        </div>
      )}

      {!isLoading && !isError && hasSearched && articlesData.length === 0 && (
        <div className="item-cards">
          <h2 className="item-cards__title">Nothing Found</h2>
          <p>Sorry, but nothing matched your search. Try another keyword.</p>
        </div>
      )}

      {!isLoading && !isError && articlesData.length > 0 && (
        <div className="item-cards">
          <h2 className="item-cards__title">Search results</h2>
          <ul className="item-cards__container">
            {articlesData.slice(0, visibleCount).map((item, index) => (
              <ItemCard
                key={item.url || index}
                article={item}
                isLoggedIn={isLoggedIn}
                onSave={onSave}
                onRemove={onRemove}
                savedStatus={savedStatus}
              />
            ))}
          </ul>
          {visibleCount < articlesData.length && (
            <button
              type="button"
              className="item-cards__show-more-button"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </div>
      )}
      <About />
    </div>
  );
}
export default Main;
