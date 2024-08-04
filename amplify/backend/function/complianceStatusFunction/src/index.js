// amplify/backend/function/complianceStatusFunction/src/index.js

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

// GET compliance status
app.get('/compliance-status', async (req, res) => {
  try {
    const params = {
      TableName: 'TasksTable'
    };
    const result = await dynamodb.scan(params).promise();
    const tasks = result.Items;

    const status = {
      completedTasks: tasks.filter(task => task.status === 'completed').length,
      pendingTasks: tasks.filter(task => task.status === 'pending').length,
      overdueTasks: tasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'completed').length
    };

    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve compliance status' });
  }
});

app.listen(3000, () => {
  console.log(`Compliance status function started on port 3000`);
});

module.exports = app;