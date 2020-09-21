const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const mongoUri = config.get("mongoURI");

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
  })
  .catch((err) => console.log(err));
