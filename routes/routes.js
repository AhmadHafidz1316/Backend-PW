const express = require("express")
const router = express.Router()
const { authMiddleware } = require("../middleware/userMiddleware")
const { RegisterAdmin, Login } = require("../controllers/authController")
const { getAdmin } = require("../controllers/adminController")
const { getCustomer, storeCustomer, updateCustomer } = require("../controllers/customerController")

// admin
router.get("/admin", getAdmin)
 
// Auth 
router.post("/register", RegisterAdmin)
router.post("/login", Login )

// Customer
router.get("/customer", authMiddleware,getCustomer)
router.post("/customer", authMiddleware, storeCustomer)
router.put("/customer/:id", updateCustomer)




module.exports = router