// Import statements
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as db from './app.controller';

dotenv.config();

const app = express();
const port: number = Number(process.env.APP_PORT);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request: Request, response: Response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

// Required endpoint in the exercise definition
app.get('/awesome/applicant', db.getApplicantInfo);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
