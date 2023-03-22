const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

/**
 * Customer Routes
 */

router.get("/", customerController.homepage);
router.get("/about", customerController.about);

//get and add customer
router.get("/add", customerController.addCustomer);
router.post("/add", customerController.postCustomer);

//get user id
router.get("/view/:id", customerController.viewCustomer);

//get and edit customer
router.get("/edit/:id", customerController.editCustomer);
router.put("/edit/:id", customerController.editPostCustomer);
router.delete("/edit/:id", customerController.deleteCustomer);

//search customer
router.post("/search", customerController.searchCustomers);

module.exports = router;
