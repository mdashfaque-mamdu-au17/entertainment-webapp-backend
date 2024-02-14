const express = require('express');
const router = express.Router();

const { getAllChartsData } = require('../controllers/charts');

router.route('/').get(getAllChartsData);

module.exports = router;
