const Book = require("../models/model");

async function getBooks(req, res, next) {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function addBook(req, res, next) {
  try {
    const books = await Book.findAll({
      where: { title: req.query.name },
    });
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function postBook(req, res, next) {
  try {
    const book = await Book.create({
      title: req.body.title,
      isTaken: true,
      takenTime: new Date(),
      returnTime: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour from now
      fine: 0,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function returnBook(req, res, next) {
  try {
    const book = await Book.findByPk(req.params.bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    const currentTime = new Date();
    let fine = 0;
    if (currentTime > book.returnTime) {
      const hoursLate = Math.ceil(
        (currentTime - book.returnTime) / (1000 * 60 * 60)
      );
      fine = hoursLate * 10;
    }

    await book.update({ isTaken: false, fine: fine });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getBooks,
  addBook,
  postBook,
  returnBook,
};
