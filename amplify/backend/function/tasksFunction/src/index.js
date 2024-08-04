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

// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const params = {
      TableName: 'TasksTable'
    };
    const result = await dynamodb.scan(params).promise();
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve tasks' });
  }
});

// POST new task
app.post('/tasks', async (req, res) => {
  try {
    const task = req.body;
    const params = {
      TableName: 'TasksTable',
      Item: task
    };
    await dynamodb.put(params).promise();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Could not create task' });
  }
});

// PUT update task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const params = {
      TableName: 'TasksTable',
      Key: { id },
      UpdateExpression: 'set #status = :status',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':status': status }
    };
    await dynamodb.update(params).promise();
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not update task' });
  }
});

app.listen(3000, () => {
  console.log(`Tasks function started on port 3000`);
});

module.exports = app;