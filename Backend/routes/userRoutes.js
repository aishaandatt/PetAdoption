const express = require("express");
const { authenticateToken, } = require("../middleware/authenticateToken");
const { getUserByName, updateUserProfile } = require("../controllers/userController");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const router = express.Router();
router.get("/user", authenticateToken, getUserByName);
router.put('/users/:id', updateUserProfile);
module.exports = router;
