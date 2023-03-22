/**
 * GET
 * Homepage
 */

exports.homepage = async (req, res) => {
  const locals = {
    title: "Home",
    description: "First CRUD app with NodeJS and MongoDB",
  };
  res.render("index", locals);
};
