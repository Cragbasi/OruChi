const BASE_URL = "https://newsapi.org/v2/everything";

export async function fetchNews({
  apiKey,
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
  const params = new URLSearchParams();

  if (q) params.append("q", encodeURIComponent(q));
  if (searchIn) params.append("searchIn", searchIn);
  if (sources) params.append("sources", sources);
  if (domains) params.append("domains", domains);
  if (excludeDomains) params.append("excludeDomains", excludeDomains);
  if (from) params.append("from", from);
  if (to) params.append("to", to);
  if (language) params.append("language", language);
  if (sortBy) params.append("sortBy", sortBy);
  if (pageSize) params.append("pageSize", pageSize);
  if (page) params.append("page", page);

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.articles || [];
  } catch (err) {
    console.error("News API error:", err.message);
    return [];
  }
}
