import { fakeEmails } from "../utils/constants.js";
// Return fake from the database, etc. Just return a promise that resolves to what your backend would send back.

export const authorize = (email, password) => {
  // Pretend we did a fetch request that gave us back a token
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@example,com", _id: "fake-id" },
    });
  });
};

export function onSignUp({ name, email, password }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (fakeEmails.includes(email.toLowerCase())) {
        resolve({ success: false, error: "EMAIL_TAKEN" });
      } else {
        resolve({ success: true });
      }
    }, 500);
  });
}
