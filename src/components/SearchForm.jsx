import { useState } from "react";
import "../blocks/SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim().length > 0) {
      onSearch(keyword.trim());
    }
  };

  return (
    <div className="search-form">
      <div className="search-form__container">
        <form className="search-form__form-container" onSubmit={handleSubmit}>
          <h1 className="search-form__title">What's going on in the world?</h1>
          <p className="search-form__description">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <input
            name="keywords"
            className="search-form__input"
            placeholder="Enter topic"
            minLength="1"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="search-form__button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
