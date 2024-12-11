const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", router);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {  
  console.log(`Server running at http://localhost:${port}/`);
});


