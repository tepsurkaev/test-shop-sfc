const express = require('express');
import sequelize from './config';
const models = require('./models/models');
const cors = require('cors');
const indexRoute = require('./routes/index');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', indexRoute);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e: any) {
    console.log(e.toString());
  }
};

start();
