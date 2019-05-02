const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('db connected'))
  .catch(e => {
    console.log('Error, exiting', e);
    process.exit();
  });

const app = express();

app.use(express.static(path.resolve(__dirname, '../clsient/build')));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({message: 'up and running'});
});

app.get('/api/data', (req, res) => {
  res.send({message: 'ok', secret: process.env.SECRET});
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

require('./app/routes/auth.routes.js')(app);
require('./app/routes/score.routes.js')(app);

app.listen(process.env.PORT, () => {
  console.log(`Server luistert op poort ${process.env.PORT}`);
});
