var AWS = require('aws-sdk');
var products = require('../data/products.json');

// If running locally, use LocalStack.
AWS.config.update(process.env.STAGE === 'local' ? {
    endpoint: `${process.env.AWS_ENDPOINT}`,
    region: 'localhost',
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy'
} : {
    region: process.env.REGION
});

var ddbClient = new AWS.DynamoDB();

/**
 * 
 * @param {Object} client 
 * @returns A promise to create a new table called 'products' with 'id' as hash key.
 */
const initDb = (client = ddbClient) => {
    var params = {
        TableName: 'products',
        KeySchema: [
            {
                AttributeName: "id",
                KeyType: "HASH"
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "N"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1200,
            WriteCapacityUnits: 1200
        }
    };
    return new Promise((resolve, reject) => {
        client.createTable(params, (err, data) => {
            if (err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

/**
 * 
 * @returns A promise to call 'batchWrite' for all batches of items to be written to the 'products' table.
 */
const populateTable = () => {
    return new Promise((resolve, reject) => {
        const batches = getWriteBatches(products);
        batches.forEach((batch) => {
            var params = {
                'RequestItems': {
                    'products': batch
                }
            };
            batchWrite(params).then((resp) => {
                console.log(resp);
            }).catch((err) => {
                reject(err);
            })
        });
        resolve(batches);
    });
}

/**
 * 
 * @param {Object} params 
 * @param {Object} client 
 * @returns A promise to write one batch of items to the 'products' table.
 */
const batchWrite = (params, client = ddbClient) => {
    return new Promise((resolve, reject) => {
        client.batchWriteItem(params, (err, data) => {
            if (err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

/**
 * 
 * @param {Array} items 
 * @returns An array of batches to be written to the 'products' table.
 */
const getWriteBatches = (items) => {
    var maxBatchLimit = 3;
    var currentBatchNumber = 0;
    var batches = [[]];
    
    items.forEach((item) => {
        item = AWS.DynamoDB.Converter.marshall(item);
        var itemRequest = {
            'PutRequest': {
                Item: item
            }
        }
        if (batches[currentBatchNumber].length < maxBatchLimit){
            batches[currentBatchNumber].push(
                itemRequest
            );
        } else {
            batches.push(
                [itemRequest]
            );
            currentBatchNumber++;
        }
    });
    return batches;
}

module.exports = { initDb, populateTable }