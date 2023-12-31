const express = require("express");
const router = express.Router();
const {
  getBooks,
  addBook,
  postBook,
  returnBook,
} = require("../controllers/book");

router.get("/", getBooks);

router.get("/search", addBook);

router.post("/", postBook);

router.put("/:bookId/return", returnBook);

module.exports = router;
