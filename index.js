const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes/routes");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk menangani form-data
app.use(morgan("dev"));

// Static file handling
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api", router);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Endpoint untuk mendapatkan gambar berdasarkan customerId
app.get("/api/customer/:customerId/gambar", (req, res) => {
  const customerId = req.params.customerId;

  // Path gambar berdasarkan customerId (sesuaikan dengan logika Anda)
  const gambarPath = `uploads/${customerId}.jpg`;

  // Jika gambar ada, kirimkan path yang sesuai
  res.json({ gambar: gambarPath });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
