import "../blocks/Profile.css";

import ItemCard from "./ItemCard";

import "../blocks/Main.css";

function Profile({ savedArticles = [], onSaveArticle, isLoggedIn, onRemove }) {
  const savedCount = savedArticles.length;

  console.log("Articles to render:", savedArticles);

  function generateKeywordSummary(articles) {
    const keywordSet = new Set();

    articles.forEach((article) => {
      if (article.keyword) {
        keywordSet.add(article.keyword);
      }
    });

    const keywords = Array.from(keywordSet);
    const count = keywords.length;

    if (count === 0) return "No keywords";

    if (count === 1) return keywords[0];
    if (count === 2) return `${keywords[0]} and ${keywords[1]}`;
    if (count === 3)
      return `${keywords[0]}, ${keywords[1]}, and ${keywords[2]}`;

    return `${keywords[0]}, ${keywords[1]}, and ${count - 2} other${
      count - 2 > 1 ? "s" : ""
    }`;
  }

  const keywordSummary = generateKeywordSummary(savedArticles);

  return (
    <>
      <div className="profile">
        <div className="profile__container">
          <p className="profile__description profile__description_grey">
            Saved articles
          </p>
          <h1 className="profile__title">
            Elise, you have {savedCount} saved article
            {savedCount !== 1 ? "s" : ""}
          </h1>
          <p className="profile__description profile__description_black">
            By keywords:&nbsp;
            <span className="profile__description_span">{keywordSummary}</span>
          </p>
        </div>
      </div>
      <div className="item-cards profile__item-cards-padding">
        <ul className="item-cards__container">
          {savedArticles.map((item, index) => (
            <ItemCard
              key={item.url || index}
              article={item}
              onSave={onSaveArticle}
              isSavedView={true}
              isLoggedIn={isLoggedIn}
              onRemove={onRemove}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
export default Profile;
