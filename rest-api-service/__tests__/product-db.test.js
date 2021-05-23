var AWSMock = require('aws-sdk-mock');
var AWS = require('aws-sdk');
const { mockDdbScanCallback, generateDummyProducts } = require('../utils');
const { retrieveAllProducts } = require('../db/product-db');

describe("DB - retrieveAllItems test", () => {
  test("should return a list of products - small data set", async () => {
    const products = generateDummyProducts(40);
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, mockDdbScanCallback(params, products));
    });

    expect(await retrieveAllProducts(new AWS.DynamoDB.DocumentClient())).toEqual(products);
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  test("should return a list of products - medium data set", async () => {
    const products = generateDummyProducts(400);
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, mockDdbScanCallback(params, products));
    });

    expect(await retrieveAllProducts(new AWS.DynamoDB.DocumentClient())).toEqual(products);
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  test("should return a list of products - large data set", async () => {
    const products = generateDummyProducts(4000);
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, mockDdbScanCallback(params, products));
    });

    expect(await retrieveAllProducts(new AWS.DynamoDB.DocumentClient())).toEqual(products);
    AWSMock.restore('DynamoDB.DocumentClient');
  });
});