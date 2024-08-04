// amplify/backend/function/recentActivitiesFunction/src/index.js

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const app = express();

app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// GET recent activities
app.get('/recent-activities', async (req, res) => {
  try {
    const params = {
      TableName: 'ActivitiesTable',
      Limit: 10,
      ScanIndexForward: false
    };
    const result = await dynamodb.scan(params).promise();
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve recent activities' });
  }
});

app.listen(3000, () => {
  console.log(`Recent activities function started on port 3000`);
});

module.exports = app;