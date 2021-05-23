'use strict';
const { formatError, formatResponse } = require("../utils");
const { retrieveAllProducts } = require("../db/product-db");

const productHandler = async (event) => {
  try {
    //insert item into table
    var dbRes = await retrieveAllProducts();
    console.log(`Item Retrieved: ${JSON.stringify(dbRes)}`);

    // Response
    return formatResponse(dbRes);
  } catch (e){

    // an error has occured. Log the error
    console.log(e);

    // format and return the error
    return formatError(e);
  }
};

module.exports = { productHandler };