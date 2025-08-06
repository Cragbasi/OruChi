// Return fake cards from the database, etc. Just return a promise that resolves to what your backend would send back.

export function getItems() {
  return new Promise((resolve, reject) =>
    resolve([
      {
        _id: "65f7368dfb74bd6a92114c85", // I just generated this at random from a mongodb id generator website
        title: "Some news article",
        url: "put some actual article URL here",
        // ...etc, whatever properties it's supposed to have
      },
      {
        // ...another one
      },
      // and have however many you want to show on the saved-news page
    ])
  );
}

export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a0",
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
      description: article.description,
      publishedAt: article.publishedAt,
      source: article.source,
      keyword: article.keyword,
    });
  });
}
