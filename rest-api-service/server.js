const app = require("./app");

/**
 * 
 * Start up local express server to run unit tests.
 * Express server will listen to requests made to port 3001.
 * 
 */

app.listen(3001, () => console.log("server starting on port 3001!"));