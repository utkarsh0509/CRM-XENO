const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const orderController = require('../controllers/orderController');
const segmentController = require('../controllers/segmentController');
const campaignController = require('../controllers/campaignController');

router.post('/customers', customerController.createCustomer);
router.get('/customers', customerController.getCustomers);
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);


// Segment routes
router.post('/segments', segmentController.createSegment);
router.get('/segments', segmentController.getSegments);

// Campaign routes
router.post('/campaigns', campaignController.createCampaign);
router.get('/campaigns', campaignController.getCampaigns);


module.exports = router;

