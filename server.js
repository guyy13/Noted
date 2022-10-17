const express = require("express");
const bodyParser = require("body-parser");

const noteRouter = require("./routes/Note");

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/note", noteRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
