const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/userMiddleware");
const { RegisterAdmin, Login } = require("../controllers/authController");
const { getAdmin, addAdmin } = require("../controllers/adminController");
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
const { getSale, storeSale, getDailySales, getMonthlySalesByBuyerType, getSalePDF } = require("../controllers/saleController");
const { getBuyer } = require("../controllers/buyerTypeController");
const { exportDailySalesToExcel, exportWeeklySalesToExcel, exportMonthlySalesToExcel } = require("../controllers/exportController");

// admin
router.get("/admin", getAdmin);
router.post("/admin", addAdmin);

// Auth
router.post("/register", RegisterAdmin);
router.post("/login", Login);

// Customer
router.get("/customer", authMiddleware, getCustomer);
router.post("/customer", authMiddleware, storeCustomer);
router.put("/customer/:id", authMiddleware, updateCustomer);
router.delete("/customer/:id", authMiddleware, deleteCustomer);
router.get("/customer/:id", authMiddleware, getIdCustomer);

router.post("/add-gas", authMiddleware, addGas);
router.get("/gas", authMiddleware, history);
router.get("/current-gas", authMiddleware, getLastStock);

// Sale
router.get("/sale", authMiddleware, getSale);
router.post("/sale", authMiddleware, storeSale);
router.get("/monthlysales", authMiddleware, getMonthlySales);
router.get("/dailysales", authMiddleware, getDailySales);
router.get("/buyertypesale", authMiddleware, getMonthlySalesByBuyerType)

// Buyer Type
router.get("/buyerType", authMiddleware, getBuyer);

// Export Excel
router.get("/dailyexcel", exportDailySalesToExcel )
router.get("/weeklyexcel", exportWeeklySalesToExcel )
router.get("/monthlyexcel", exportMonthlySalesToExcel )

// Export PDF Pembelian
router.get("/sale/pdf/:sale_id", getSalePDF);

module.exports = router;
