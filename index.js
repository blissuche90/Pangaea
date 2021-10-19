import express from 'express';
import pkg from 'body-parser';
const { json } = pkg;
const app = express();

import { PORT } from './config/config.js';
import { errorHandler } from './src/middlewares/error_handler.js';

import { appRouter } from './src/routes/routes.js';

app.use(json())
app.use('/', appRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});