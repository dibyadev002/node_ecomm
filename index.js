const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const vegetableRoutes = require('./routes/vegetables');
const cors = require("cors")
const app = express();
const awsServerlessExpress = require('aws-serverless-express');

const port = 3000;

app.use(bodyParser.json());
app.use(cors())

mongoose.connect("mongodb+srv://saraswatipanda:saraswatipanda@cluster0.ylqrokp.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/vegetables', vegetableRoutes);

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
