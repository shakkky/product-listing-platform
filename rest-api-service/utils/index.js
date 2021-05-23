'use strict';

/**
 * 
 * Returns a JSON.stringified version of the object provided.
 * 
 * @param { object } object Object to be stringified.
 */
const serialize = (object) => {
  return JSON.stringify(object, null, 2);
}

/**
 * 
 * Translates input object's values back to integers if they have been converted to strings during stringification. Returns a new object.
 * 
 * @param { object } obj Object to be translated.
 */
const translateObjectIntStrings = (obj) => {
  const res = {}
  for (const key in obj) {
    res[key] = {};
    for (const prop in obj[key]) {
      const parsed = parseInt(obj[key], 10);
      res[key] = isNaN(parsed) ? obj[key] : parsed;
    }
  }
  return res;
}

/**
 * 
 * Returns an Error HTTP Response.
 * 
 * @param { object } error Error to be returned with the response.
 */
const formatError = (error) => {
  var response = {
    "statusCode": error.code ? error.code : error.statusCode,
    "headers": {
      "Content-Type": "text/plain",
      "x-amzn-ErrorType": error.code
    },
    "isBase64Encoded": false,
    "body": error.code + ": " + error.message
  }
  return response
}


/**
 * 
 * Returns a HTTP 200 response.
 * 
 * @param { object } body Payload to be returned with the response.
 */
const formatResponse = (body) => {
  var response = {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    "body": body
  }
  return response
}

/**
 * 
 * Returns a HTTP 301 response.
 * 
 * @param { String } location re-direction location.
 */
 const formatRedirect = (location) => {
  var response = {
    "statusCode": 301,
    "headers": {
      "Location": location
    }
  }
  return response
}

/**
 * 
 * @param {Object} params 
 * @param {Array} data 
 * @returns Mocks AWS DynamoDB SDK by paginating the results of large data sets.
 */
const mockDdbScanCallback = (params, data) => {
  var responseLimit = 50;
  var indexOfStartKey;
  var response = {
    Items: data
  };
  var paginatedShifts = [];

  if (params.ExclusiveStartKey){
    indexOfStartKey = findIndexOf(params.ExclusiveStartKey, data);
    for (var i = indexOfStartKey + 1; i < data.length; i++){
      paginatedShifts.push(data[i]);
    }

    if (paginatedShifts.length > responseLimit){
      indexOfStartKey = findIndexOf(params.ExclusiveStartKey, data);
      paginatedShifts = [];
      for (var i = indexOfStartKey + 1; i < indexOfStartKey + 1 + responseLimit; i++){
        paginatedShifts.push(data[i]);
      }

      response.Items = paginatedShifts;
      response.LastEvaluatedKey = paginatedShifts[paginatedShifts.length -1];
      return response;
    } else {
      response.Items = paginatedShifts;
      return response;
    }
  } else {
    if (data.length > responseLimit){
      var paginatedShifts = [];
      for (var i = 0; i < responseLimit; i++){
        paginatedShifts.push(data[i]);
      }
      response.Items = paginatedShifts;
      response.LastEvaluatedKey = data[paginatedShifts.length -1];
      return response;
    }
    return response;
  }
};

/**
 * 
 * @param {Object} obj 
 * @param {Array} arr 
 * @returns The index of the object provided in the array provided
 */
const findIndexOf = (obj, arr) => {
  for (var i = 0; i < arr.length; i++){
    if (JSON.stringify(arr[i]) === JSON.stringify(obj)){
      return i;
    }
  }
  return -1;
}

/**
 * 
 * @param {Int} size 
 * @returns An array of length {size} containing dunny products.
 * Used by test cases to generate varying size of data sets.
 */
const generateDummyProducts = (size) => {
  var response = [];
  for (var i = 1; i < size; i++){
    response.push({
      "id":i,"price":"$87.68","product_name":"Amitriptyline Hydrochloride","description":"synergize efficient metrics","product_image":"http://dummyimage.com/307x328.bmp/ff4444/ffffff"
    });
  }
  return response;
}

module.exports = { serialize, translateObjectIntStrings , formatError, formatResponse, formatRedirect, mockDdbScanCallback, findIndexOf, generateDummyProducts };