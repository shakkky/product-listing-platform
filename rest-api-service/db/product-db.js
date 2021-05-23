var AWS = require('aws-sdk');

// If running locally, use LocalStack.
AWS.config.update(process.env.STAGE === 'local' ? {
    endpoint: `${process.env.AWS_ENDPOINT}`,
    region: 'localhost',
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy'
} : {
    region: process.env.REGION
});

var docClient = new AWS.DynamoDB.DocumentClient();

/**
 * 
 * @param {Object} client 
 * @returns A list of all items stored in 'products' table. DynamoDB scan will paginate results for large data sets. This function recursively calls DynamoDB to handle pagination.
 */
const retrieveAllProducts = async (client = docClient) => {
    var params = {
        TableName: 'products'
    };
    return new Promise(async(resolve, reject) => {
        var response = [];
        var data;
        do {
            data = await client.scan(params).promise().catch((err) => {
                reject(err);
            })
            data.Items.forEach((item) => response.push(item));
            params.ExclusiveStartKey  = data.LastEvaluatedKey;
        } while (typeof data.LastEvaluatedKey !== "undefined");
        resolve(response);
    });
}

module.exports = { retrieveAllProducts }