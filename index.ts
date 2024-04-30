// Import statements
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as db from './app.controller';

dotenv.config();

export const app = express();
const port: number = Number(process.env.APP_PORT || 3000); // Add default port

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
app.get('/awesome/applicant/:id', db.getApplicantInfo);
app.post('/awesome/applicant', db.addApplicantInfo);
app.put('/awesome/applicant/:id', db.updateApplicantInfo);
app.delete('/awesome/applicant/:id', db.deleteApplicantInfo);

// Debug endpoint that retrieves all candidates
app.get('/awesome/applicants', db.getAllApplicantInfo);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
