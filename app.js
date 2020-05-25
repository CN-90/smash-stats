const express = require('express');
const dotenv = require('dotenv');
const matchesRouter = require('./routes/matchesRoute');
const playerRouter = require('./routes/playerRoute');
const userRouter = require('./routes/userRoute');
const tournamentRouter = require('./routes/tournamentRoute');
const globalErrorHandling = require('./controllers/errorController');
const cors = require('cors');

const app = express();
app.use(cors());

dotenv.config({ path: './config.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/matches', matchesRouter);
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tournament', tournamentRouter);

app.use(globalErrorHandling);

module.exports = app;
