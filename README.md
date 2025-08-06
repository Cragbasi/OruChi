# News Explorer App

## Project Overview

NewsExplorer is a responsive, full-stack web application that allows users to search for news articles by keyword, save articles to their personal account, and manage saved content. It features dynamic rendering, keyword tracking, user authentication, and a polished UI optimized for both desktop and mobile experiences.

The app is designed to simulate real-world news aggregation and personalization, with a focus on clean architecture, reusable components, and robust state management.

---

## Technologies and Implementation

- **Frontend:** React (with hooks), JSX, CSS (BEM methodology)
- **State Management:** React `useState`, `useEffect`, `useContext`
- **Routing:** React Router DOM
- **API Integration:** Custom `NewsApi` fetch logic with dynamic query parameters
- **Authentication:** Token-based login with `localStorage` persistence
- **UX Enhancements:** Preloader animation, error handling, conditional rendering, and keyword-based summaries

---

## Core Dependencies

- `react`
- `react-dom`
- `react-router-dom`
- `vite` (or `webpack`, depending on setup)
- `classnames` (optional for cleaner conditional styling)
- Custom modules:
  - `NewsApi` (for external news fetching)
  - `ProtectedRoute` (for route guarding)
  - `ItemCard`, `SearchForm`, `Profile`, `Navigation`, `Header`

---

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/cragbasi/news-explorer.git
   cd news-explorer
   ```

## Project Structure

src/
├── components/
│ ├── Header.jsx
│ ├── Navigation.jsx
│ ├── SearchForm.jsx
│ ├── ItemCard.jsx
│ ├── Profile.jsx
│ └── App.jsx
├── utils/
│ ├── NewsApi.js
│ ├── ProtectedRoute.jsx
│ └── auth.js
├── assets/
│ └── images, logos, icons
├── styles/
│ └── blocks/
│ └── \*.css (BEM-structured styles)
└── index.js

## Features

- 🔍 Search by Keyword: Users can search for articles using a single keyword.
- 📥 Save Articles: Authenticated users can save articles to their personal list.
- 🗑️ Delete Saved Articles: Articles can be removed from the saved list.
- 📊 Keyword Summary: Saved articles are summarized by keyword frequency.
- 📱 Responsive Design: Optimized for mobile and desktop.
- ⏳ Preloader Animation: Displays while fetching search results.
- ❌ Error Handling: Displays messages for empty results or failed requests.

## Authorization

- Sign In / Sign Up: Users can create an account or log in using email and password.
- Token Storage: JWT tokens are stored in localStorage for session persistence.
- Protected Routes: Access to saved articles and profile is restricted to authenticated users.
- Sign Out: Clears token and resets user state.

## Links

- Live Demo: Coming soon
- Frontend Repo: https://github.com/cragbasi/news-explorer
- API Documentation: NewsAPI.org
