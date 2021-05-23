const { productHandler }  = require('../services/product-service');

/*
 * call other imported services, or same service but different functions here if you need to
*/
const productController = async (req, res) => {
    try {
      const resp = await productHandler({
        pathParameters: req.params,
        body: req.body
      });
      res.status(resp.statusCode).json(resp);
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500);
    }
};

module.exports = {
  productController
}