const express = require('express');
const dotenv = require('dotenv');
const setRouter = require('./routes/setRoute');
const playerRouter = require('./routes/playerRoute');
const matchRouter = require('./routes/matchRoute');
const userRouter = require('./routes/userRoute');

const globalErrorHandling = require('./controllers/errorController');
const cors = require('cors');

const app = express();
app.use(cors());

dotenv.config({ path: './config.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/sets', setRouter);
app.use('/api/v1/match', matchRouter);
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/users', userRouter);

app.use(globalErrorHandling);

module.exports = app;
