const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//MongoDB setup
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected to mongodb');
});

require('./routes')(app);

const port = config.port;

app.listen(port, () => console.log(`Server started on ${port}`));
