document.addEventListener("DOMContentLoaded", function () {
  loadBooks();

  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      searchBook();
    });
});

async function loadBooks() {
  try {
    const response = await axios.get("/books");
    displayBooks(response.data);
  } catch (error) {
    console.error("Error loading books:", error);
  }
}

async function searchBook() {
  const bookName = document.getElementById("bookSearch").value;
  if (!bookName.trim()) {
    alert("Please enter a book name");
    return;
  }

  try {
    const response = await axios.get(`/books/search?name=${bookName}`);
    if (response.data.length === 0) {
      await addBook(bookName);
    } else {
      displayBooks(response.data);
    }
  } catch (error) {
    console.error("Error searching for books:", error);
  }

  document.getElementById("bookSearch").value = "";
}

async function addBook(bookName) {
  try {
    const response = await axios.post("/books", { title: bookName });
    loadBooks();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

function displayBooks(books) {
  const takenBooksList = document.getElementById("takenBooksList");
  const returnedBooksList = document.getElementById("returnedBooksList");
  takenBooksList.innerHTML = "";
  returnedBooksList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = createBookElement(book);
    if (book.isTaken) {
      takenBooksList.appendChild(bookElement);
    } else {
      returnedBooksList.appendChild(bookElement);
    }
  });
}

function createBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.className = "book-item";
  bookElement.innerHTML = `
      <strong>${book.title}</strong><br>
      Status: ${book.isTaken ? "Taken" : "Returned"}<br>
      Taken Time: ${book.takenTime || "N/A"}<br>
      Return Time: ${book.returnTime || "N/A"}<br>
      Fine: ${book.fine || "0"} Rs.<br>
    `;

  if (book.isTaken) {
    const returnButton = document.createElement("button");
    returnButton.innerText = "Return Book";
    returnButton.onclick = function () {
      returnBook(book.id);
    };
    bookElement.appendChild(returnButton);
  } else if (book.fine > 0) {
    const payFineButton = document.createElement("button");
    payFineButton.innerText = `Pay Fine: ${book.fine} Rs.`;
    payFineButton.onclick = function () {
      alert(`Fine of ${book.fine} Rs. paid. Returning book...`);
      returnBook(book.id);
    };
    bookElement.appendChild(payFineButton);
  }

  return bookElement;
}

async function returnBook(bookId) {
  try {
    const response = await axios.put(`/books/${bookId}/return`);
    loadBooks();
  } catch (error) {
    console.error("Error returning book:", error);
  }
}
