const express = require("express")
const router = express.Router()
const { RegisterAdmin, Login } = require("../controllers/authController")
const { getAdmin } = require("../controllers/adminController")
const { getCustomer } = require("../controllers/customerController")

// admin
router.get("/admin", getAdmin)

// Auth 
router.post("/register", RegisterAdmin)
router.post("/login", Login )

// Customer
router.get("/customer", getCustomer)




module.exports = router