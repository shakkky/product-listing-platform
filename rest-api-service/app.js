const express = require("express");
var cors = require('cors');
const app = express();
const routes = require("./routes");
const { initDb, populateTable } = require('./db/setup-db');

/**
 * 
 * Set up local express server to run unit tests.
 * Express will process requests to different routes based on the routes provided below.
 * 
 */

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);

/**
 * This is a hook to define any local database related setup
 */
setTimeout(() => {
  initDb().then(() => {
    console.log('Table created successfully');
  }).catch((err) => {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  });
  
  populateTable().then(() => {
    console.log('Reference data created successfully');
  }).catch((err) => {
    console.error("Unable to populate reference data. Error JSON:", JSON.stringify(err, null, 2));
  });
}, 12 * 1000); // We wait 12 seconds to allow for LocalStack to spin up before populating with data

app.get("/",async (req, res) => {
  return res.json({ operational: true });
});

module.exports = app;