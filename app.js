const bodyParser = require("body-parser");
const express = require("express");
const sequelize = require("./util/database");
const bookRoute = require('./routes/book')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.use('/books',bookRoute)

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
