import "../blocks/ItemCard.css";
import searchForm from "../assets/SearchForm2.svg";
import { useState, useEffect } from "react";

const ItemCard = ({
  article,
  onSave,
  isLoggedIn,
  savedStatus,
  isSavedView,
  onRemove,
}) => {
  if (!article || typeof article !== "object") {
    console.warn("ItemCard received invalid article:", article);
    return null;
  }

  const {
    source = {},
    title = "No title",
    publishedAt = "Unknown date",
    description = "No description",
    urlToImage,
  } = article;

  const name = source.name || "Unknown source";
  const [showSignInMessage, setShowSignInMessage] = useState(false);

  // Only trigger timeout when message is shown
  useEffect(() => {
    if (showSignInMessage) {
      const timer = setTimeout(() => setShowSignInMessage(false), 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [showSignInMessage]);

  const handleSaveClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowSignInMessage(true);
      return;
    }

    if (isSavedView && typeof onRemove === "function") {
      onRemove(article);
      return;
    }

    if (typeof onSave === "function") {
      onSave(article);
      console.log("saved article at item card:", article.keyword);
    }
  };

  const formattedDate = (() => {
    const date = new Date(publishedAt);
    return isNaN(date.getTime())
      ? "Unknown date"
      : new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date);
  })();

  return (
    <div className="item-card">
      <button
        type="button"
        className={`item-card__save-article-button ${
          isSavedView
            ? "item-card__save-article-button_trash"
            : savedStatus?.[title]
            ? "item-card__save-article-button_activated"
            : "item-card__save-article-button_deactivated"
        }`}
        onClick={handleSaveClick}
        onMouseEnter={() => {
          if (!isLoggedIn) setShowSignInMessage(true);
        }}
        onMouseLeave={() => setShowSignInMessage(false)}
      ></button>

      {showSignInMessage && (
        <div className="item-card__signin-message">
          Sign in to save articles
        </div>
      )}
      {isSavedView && <p className="item-card__keyword">{article.keyword}</p>}

      <img
        className="item-card__image"
        src={urlToImage || searchForm}
        alt={title}
      />

      <div className="item-card__article-container">
        <p className="item-card__date">{formattedDate}</p>

        <h3 className="item-card__title">{title}</h3>
        <p className="item-card__description">{description}</p>
        <h4 className="item-card__source">{name}</h4>
      </div>
    </div>
  );
};

export default ItemCard;
