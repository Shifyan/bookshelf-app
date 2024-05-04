const STORAGE_KEY = "MY_BOOK";

window.document.addEventListener("DOMContentLoaded", () => {
  const newBookForm = document.getElementById("new-book-form");
  newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

const addBook = () => {
  const bookId = generateId();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const isComplete = document.getElementById("is-complete").checked;

  const bookData = {
    id: bookId,
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };
  console.log(bookData);
};

const generateId = () => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = now.getMonth().toString();
  const date = now.getDate().toString();
  const hours = now.getHours().toString();
  const minutes = now.getMinutes().toString();
  const seconds = now.getSeconds().toString();

  const randomNumber = Math.floor(Math.random() * (100 - 1 + 1));
  const myId = seconds + minutes + hours + date + month + year + randomNumber;
  return myId;
};

const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
};

const loadDataFromStorage = () => {
  const localStorageData = localStorage.getItem(STORAGE_KEY);
  console.log(typeof localStorageData);
};
