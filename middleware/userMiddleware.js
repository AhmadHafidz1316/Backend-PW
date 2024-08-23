require("dotenv").config()
const jwt = require("jsonwebtoken")
const { AdminModel} = require("../models")

exports.authMiddleware = async (req,res)