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
  getIdCustomer,
} = require("../controllers/customerController");
const {
  addGas,
  history,
  getLastStock,
  getMonthlySales,
} = require("../controllers/gasController");
const { getSale, storeSale } = require("../controllers/saleController");
const { getBuyer } = require("../controllers/buyerTypeController");

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
router.post("/add-gas", authMiddleware, addGas);
router.get("/gas", authMiddleware, history);
router.get("/current-gas", authMiddleware, getLastStock);
router.get("/monthlysales", authMiddleware, getMonthlySales);

// Sale
router.get("/sale", authMiddleware, getSale);
router.post("/sale", authMiddleware, storeSale);

// Buyer Type
router.get("/buyerType", authMiddleware, getBuyer);

module.exports = router;
