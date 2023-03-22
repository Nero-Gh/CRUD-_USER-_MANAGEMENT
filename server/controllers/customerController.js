const Customer = require("../models/Customer");
const mongoose = require("mongoose");

/**
 * GET
 * Homepage
 */

// exports.homepage = async (req, res) => {
// const messages = await req.consumeFlash("success");
// const messages = await res.send(req.flash("success"));

//   const locals = {
//     title: "Home",
//     description: "First CRUD app with NodeJS and MongoDB",
//   };

//   try {
//     const customers = await Customer.find({}).limit(22).sort({ date: -1 });
//     res.render("index", { locals, customers });
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Free NodeJs User Management System",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  // const messages = await req.consumeFlash('info');
  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  //pagination starts here
  let perPage = 6;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.count();

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET
 * New Customer form
 */

exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add Customer",
    description: "First CRUD app with NodeJS and MongoDB",
  };

  res.render("pages/customer/add", locals);
};

/**
 * POST
 * Create New Customer
 */

exports.postCustomer = async (req, res) => {
  console.log(req.body); // allows to grab the data from the form

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    details: req.body.details,
  });

  try {
    await Customer.create(newCustomer);
    // await req.flash("info", "New Customer added successfully");
    // await req.flash("success", "New Customer added successfully");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Customer View Data
 */
exports.viewCustomer = async (req, res) => {
  try {
    //to find the id
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("pages/customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Customer Data
 */
exports.editCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("pages/customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Customer Data
 */
exports.editPostCustomer = async (req, res) => {
  try {
    //geting the data from db
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Customer Data
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Customer Data
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;

    //remove special characters
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
