import express from 'express';

import path from 'path';

import 'express-async-errors';

import './database/connection';

// import cors from 'cors';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);
app.use(cors());

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
  });
