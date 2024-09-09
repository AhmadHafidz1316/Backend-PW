const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/userMiddleware");
const { RegisterAdmin, Login } = require("../controllers/authController");
const { getAdmin } = require("../controllers/adminController");
const {
  getCustomer,
  storeCustomer,
  updateCustomer,
  deleteCustomer,
  getIdCustomer
} = require("../controllers/customerController");
const { createGasStock } = require("../controllers/gasController");

// admin
router.get("/admin", getAdmin);

// Auth
router.post("/register", RegisterAdmin);
router.post("/login", Login);

// Customer
router.get("/customer", authMiddleware, getCustomer);
router.post("/customer", authMiddleware, storeCustomer);
router.put("/customer/:id", authMiddleware, updateCustomer);
router.delete("/customer/:id", authMiddleware, deleteCustomer);
router.get("/customer/:id", authMiddleware, getIdCustomer);


// Gas Stock
router.post("/add-gas", authMiddleware, createGasStock);

module.exports = router;
