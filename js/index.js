const STORAGE_KEY = "MY_BOOK";
const myBooks = [];
const RENDER_DATA = "render_data";

window.document.addEventListener("DOMContentLoaded", () => {
  const newBookForm = document.getElementById("new-book-form");
  newBookForm.addEventListener("submit", () => {
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
  myBooks.push(bookData);
  document.dispatchEvent(new Event(RENDER_DATA));
  saveData();
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
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(myBooks);
    localStorage.setItem(STORAGE_KEY, parsed);
  }
}
const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
};

document.addEventListener(RENDER_DATA, () => {
  const belumDibaca = document.getElementById("belum-dibaca");
  belumDibaca.innerHTML = "";

  const sudahDibaca = document.getElementById("sudah-dibaca");
  sudahDibaca.innerHTML = "";

  myBooks.forEach((book) => {
    const booksElement = getBooksElement(book);
    if (!book.isComplete) {
      belumDibaca.append(booksElement);
    } else {
      sudahDibaca.append(booksElement);
    }
  });
});
const getBooksElement = (book) => {
  // Membuat Card Title
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = book.title;

  // Membuat Card Text Author
  const cardTextAuthor = document.createElement("p");
  cardTextAuthor.classList.add("card-text", "my-1");
  cardTextAuthor.innerHTML = `Penulis: ${book.author}`;

  // Membuat Card Text Year
  const cardTextYear = document.createElement("p");
  cardTextYear.classList.add("card-text");
  cardTextYear.innerHTML = `Tahun Terbit: ${book.year}`;

  // Membuat Card Body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Menggabungkan Element ke Card Body
  cardBody.append(cardTitle, cardTextAuthor, cardTextYear);

  // Membuat Pengkondisian Button
  if (book.isCompleted) {
    const btnBelumDibaca = document.createElement("button");
    btnBelumDibaca.classList.add("btn-belum-dibaca", "btn", "btn-success");
    btnBelumDibaca.innerText = "Tandai Belum Dibaca";

    btnBelumDibaca.addEventListener("click", function () {
      bukuBelumDibaca(book.id);
    });

    const btnHapusBuku = document.createElement("button");
    btnHapusBuku.classList.add("btn-hapus-buku", "btn", "btn-danger");
    btnHapusBuku.innerText = "Hapus Buku";

    btnHapusBuku.addEventListener("click", function () {
      hapusBuku(book.id);
    });

    cardBody.append(btnBelumDibaca, btnHapusBuku);
  } else {
    const btnSudahDibaca = document.createElement("button");
    btnSudahDibaca.classList.add(
      "btn-belum-dibaca",
      "btn",
      "btn-success",
      "me-2"
    );
    btnSudahDibaca.innerText = "Tandai Sudah Dibaca";

    btnSudahDibaca.addEventListener("click", function () {
      bukuSudahDibaca(book.id);
    });

    const btnHapusBuku = document.createElement("button");
    btnHapusBuku.classList.add("btn-hapus-buku", "btn", "btn-danger");
    btnHapusBuku.innerText = "Hapus Buku";

    btnHapusBuku.addEventListener("click", function () {
      hapusBuku(book.id);
    });

    cardBody.append(btnSudahDibaca, btnHapusBuku);
  }

  // Membuat Pembungkus Card
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "my-3");

  // Menggabungkan Card Body ke Card Container
  cardContainer.append(cardBody);

  return cardContainer;
};
const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    data.forEach((value) => {
      myBooks.push(value);
    });
  }

  document.dispatchEvent(new Event(RENDER_DATA));
};
const cariIndexbuku = (idBuku) => {
  for (const index in myBooks) {
    if (myBooks[index].id === idBuku) {
      return index;
    }
  }

  return -1;
};
const hapusBuku = (id) => {
  const bookTarget = cariIndexbuku(id);
  console.log(bookTarget);

  if (bookTarget === -1) {
    return;
  }
  myBooks.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_DATA));
  saveData();
};
