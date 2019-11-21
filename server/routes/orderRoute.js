const express = require('express');
const router = express.Router();
const { orderCreate, getordersByUserID } = require("../controllers/orderController");
const { protect } = require('../middleware/authMiddleware');

router.post("/ordercreate", protect, orderCreate);
router.route('/getorder').get(protect, getordersByUserID)


module.exports = router;