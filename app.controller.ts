import { Request, Response } from 'express';
import { Pool, QueryResult } from 'pg';
import { ApplicationData } from './schemas/application.schema';
import dotenv from 'dotenv';
dotenv.config();

// PostgreSQL 
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT)
})


export const getApplicantInfo = async (request: Request, response: Response): Promise<void> => {
  const client = await pool.connect();
  const applicationDataId = parseInt(request.params.id) || '8fad4f47-38ea-4f97-b80a-9e588079e46f'; //Add default value
  
  try {
      // Execute SQL queries
      const personalInfoQuery = `SELECT * FROM personal_info WHERE application_data_id = $1`;
      const professionalExperienceQuery = `SELECT * FROM professional_experience WHERE application_data_id = $1`;
      const educationQuery = `SELECT * FROM education WHERE application_data_id = $1`;
      const skillsQuery = `SELECT * FROM skills WHERE application_data_id = $1`;
      const projectsQuery = `SELECT * FROM projects WHERE application_data_id = $1`;
      const certificationsQuery = `SELECT * FROM certifications WHERE application_data_id = $1`;


      // Fetch data from the database
      const personalInfoResult = await client.query(personalInfoQuery, [applicationDataId]);
      const professionalExperienceResult = await client.query(professionalExperienceQuery, [applicationDataId]);
      const educationResult = await client.query(educationQuery, [applicationDataId]);
      const skillsResult = await client.query(skillsQuery, [applicationDataId]);
      const projectsResult = await client.query(projectsQuery, [applicationDataId]);
      const certificationsResult = await client.query(certificationsQuery, [applicationDataId]);

      // Map data to TypeScript interface
      const applicationData: ApplicationData = {
          personal_info: personalInfoResult.rows[0], // Because there's only one personal info record
          professional_experience: professionalExperienceResult.rows,
          education: educationResult.rows,
          skills: skillsResult.rows[0], // Because there's only one skills record
          projects: projectsResult.rows,
          certifications: certificationsResult.rows,
      };

      response.status(200).json(applicationData);
  }
  catch (error) {
    console.error('Error retrieving applicant info:', error);
    response.status(500).json({ error: 'Failed to retrieve applicant info' });
} finally {
    client.release();
}
}
