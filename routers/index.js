const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homw_controller');

router.get('/', homeController.home);
router.use('/project', require('./prject'))

module.exports = router;