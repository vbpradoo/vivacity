import { Request, Response } from "express";
import { Pool } from "pg";
import { ApplicationData } from "./schemas/application.schema";
import dotenv from "dotenv";
dotenv.config();

// PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// GET Method that retrieves the default applicant or whatever applicant given its ID
export const getApplicantInfo = async (
  request: Request,
  response: Response
): Promise<void> => {
  const client = await pool.connect();
  const applicationDataId =
    request.params.id || "8fad4f47-38ea-4f97-b80a-9e588079e46f"; //Add default value

  try {
    // Execute SQL queries
    const personalInfoQuery = `SELECT * FROM personal_info WHERE application_data_id = $1`;
    const professionalExperienceQuery = `SELECT * FROM professional_experience WHERE application_data_id = $1`;
    const educationQuery = `SELECT * FROM education WHERE application_data_id = $1`;
    const skillsQuery = `SELECT * FROM skills WHERE application_data_id = $1`;
    const projectsQuery = `SELECT * FROM projects WHERE application_data_id = $1`;
    const certificationsQuery = `SELECT * FROM certifications WHERE application_data_id = $1`;

    // Fetch data from the database
    const personalInfoResult = await client.query(personalInfoQuery, [
      applicationDataId,
    ]);
    const professionalExperienceResult = await client.query(
      professionalExperienceQuery,
      [applicationDataId]
    );
    const educationResult = await client.query(educationQuery, [
      applicationDataId,
    ]);
    const skillsResult = await client.query(skillsQuery, [applicationDataId]);
    const projectsResult = await client.query(projectsQuery, [
      applicationDataId,
    ]);
    const certificationsResult = await client.query(certificationsQuery, [
      applicationDataId,
    ]);

    // Map data to TypeScript interface
    const applicationData: ApplicationData = {
      personal_info: personalInfoResult.rows[0], // Because there's only one personal info record
      professional_experience: professionalExperienceResult.rows,
      education: educationResult.rows,
      skills: skillsResult.rows[0], // Because there's only one skills record
      projects: projectsResult.rows,
      certifications: certificationsResult.rows,
    };

    const applicationFilteredData = removeApplicationDataId(applicationData)

    response.status(200).json(applicationFilteredData);
  } catch (error) {
    console.error("Error retrieving applicant info:", error);
    response.status(500).json({ error: "Failed to retrieve applicant info" });
  } finally {
    client.release();
  }
};

// GET Method that retrieves the default applicant or whatever applicant given its ID
export const getAllApplicantInfo = async (
  request: Request,
  response: Response
): Promise<void> => {
  const client = await pool.connect();

  try {
    const applicationDataQuery = `SELECT * FROM application_data`;

    // Fetch data from the database
    const applicationDataIds = await client.query(applicationDataQuery);
    let applicationAllData: ApplicationData[] = [];

    for (let rowInfo of applicationDataIds.rows) {
      const applicationDataId = rowInfo.id;

      // Execute SQL queries
      const personalInfoQuery = `SELECT * FROM personal_info WHERE application_data_id = $1`;
      const professionalExperienceQuery = `SELECT * FROM professional_experience WHERE application_data_id = $1`;
      const educationQuery = `SELECT * FROM education WHERE application_data_id = $1`;
      const skillsQuery = `SELECT * FROM skills WHERE application_data_id = $1`;
      const projectsQuery = `SELECT * FROM projects WHERE application_data_id = $1`;
      const certificationsQuery = `SELECT * FROM certifications WHERE application_data_id = $1`;

      // Fetch data from the database
      const personalInfoResult = await client.query(personalInfoQuery, [
        applicationDataId,
      ]);
      const professionalExperienceResult = await client.query(
        professionalExperienceQuery,
        [applicationDataId]
      );
      const educationResult = await client.query(educationQuery, [
        applicationDataId,
      ]);
      const skillsResult = await client.query(skillsQuery, [applicationDataId]);
      const projectsResult = await client.query(projectsQuery, [
        applicationDataId,
      ]);
      const certificationsResult = await client.query(certificationsQuery, [
        applicationDataId,
      ]);

      // Map data to TypeScript interface
      const applicationData: ApplicationData = {
        personal_info: personalInfoResult.rows[0], // Because there's only one personal info record
        professional_experience: professionalExperienceResult.rows,
        education: educationResult.rows,
        skills: skillsResult.rows[0], // Because there's only one skills record
        projects: projectsResult.rows,
        certifications: certificationsResult.rows,
      };

      const applicationFilteredData = removeApplicationDataId(applicationData)
      applicationAllData.push(applicationFilteredData);
    }
    response.status(200).json(applicationAllData);
  } catch (error) {
    console.error("Error retrieving all applicants info:", error);
    response
      .status(500)
      .json({ error: "Failed to retrieve all applicants info" });
  } finally {
    client.release();
  }
};

export const addApplicantInfo = async (
  request: Request,
  response: Response
): Promise<void> => {
  const client = await pool.connect();

  try {
    // Extract data from request body
    const {
      personal_info,
      professional_experience,
      education,
      skills,
      projects,
      certifications,
    } = request.body;

    await client.query("BEGIN");

    // Insert into application_data table and retrieve the generated UUID
    const applicationDataResult = await client.query(
      "INSERT INTO application_data DEFAULT VALUES RETURNING id"
    );
    const applicationDataId: string = applicationDataResult.rows[0].id;

    // Insert personal info if it exists, otherwise insert
    await client.query(
      `INSERT INTO personal_info (application_data_id, name, location, phone, email, linkedin, github) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [applicationDataId, ...Object.values(personal_info)]
    );

    // Insert professional experience records
    for (const experience of professional_experience) {
      await client.query(
        `INSERT INTO professional_experience (application_data_id, position, company, location, duration, bullet_points)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [applicationDataId, ...Object.values(experience)]
      );
    }

    // Insert education
    for (const education_entry of education) {
      await client.query(
        `INSERT INTO education (application_data_id, degree, institution, location, completion_date, concentration, gpa)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [applicationDataId, ...Object.values(education_entry)]
      );
    }

    // Insert skills
    await client.query(
      `INSERT INTO skills (application_data_id, languages, project_management_tools, programming_languages, databases, frameworks, testing_frameworks, 
        message_brokers, task_queues, real_time_communication, ai_frameworks_and_libraries, 
        cloud_development_and_management_tools_and_services, web_libraries, gis_software, ux_ui_design_software, 
        documentation_frameworks_and_libraries, agile_methodologies)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
      [applicationDataId, ...Object.values(skills)]
    );

    // Insert projects
    for (const project of projects) {
      await client.query(
        `INSERT INTO projects (application_data_id, name, duration, description, benefits, features, impact, services)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [applicationDataId, ...Object.values(project)]
      );
    }

    // Insert certifications
    for (const certification of certifications) {
      await client.query(
        `INSERT INTO certifications (application_data_id, name)
         VALUES ($1, $2)`,
        [applicationDataId, ...Object.values(certification)]
      );
    }

    await client.query("COMMIT");
    const responseBody = {
      message: "Applicant information added successfully",
      uuid: applicationDataId,
    };

    response.status(201).json(responseBody);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding applicant information:", error);
    response.status(500).send("Error adding applicant information");
  } finally {
    client.release();
  }
};


export const updateApplicantInfo = async (
  request: Request,
  response: Response
): Promise<void> => {
  
  const client = await pool.connect();
  const applicationDataId = request.params.id;

  try {
    // Extract data from request body
    const {
      personal_info,
      professional_experience,
      education,
      skills,
      projects,
      certifications,
    } = request.body;

    await client.query("BEGIN");

    // Update personal info
    await client.query(
      `UPDATE personal_info 
       SET name = $2, location = $3, phone = $4, email = $5, linkedin = $6, github = $7
       WHERE application_data_id = $8 AND id = $1`,
      [...Object.values(personal_info), applicationDataId]
    );

    // Update professional experience
    for (const experience of professional_experience) {
      await client.query(
        `UPDATE professional_experience 
         SET position = $2, company = $3, location = $4, duration = $5, bullet_points = $6
         WHERE application_data_id = $7 AND id = $1`,
        [...Object.values(experience), applicationDataId]
      );
    }

    // Update education
    for (const education_entry of education) {
      await client.query(
        `UPDATE education 
         SET degree = $2, institution = $3, location = $4, completion_date = $5, concentration = $6, gpa = $7
         WHERE application_data_id = $8 AND id = $1`,
        [...Object.values(education_entry), applicationDataId]
      );
    }

    // Update skills
    await client.query(
      `UPDATE skills 
       SET languages = $2, project_management_tools = $3, programming_languages = $4, databases = $5, frameworks = $6, testing_frameworks = $7,
           message_brokers = $8, task_queues = $9, real_time_communication = $10, ai_frameworks_and_libraries = $11,
           cloud_development_and_management_tools_and_services = $12, web_libraries = $13, gis_software = $14, ux_ui_design_software = $15,
           documentation_frameworks_and_libraries = $16, agile_methodologies = $17
       WHERE application_data_id = $18 AND id = $1`,
      [...Object.values(skills), applicationDataId]
    );

    // Update projects
    for (const project of projects) {
      await client.query(
        `UPDATE projects 
         SET name = $2, duration = $3, description = $4, benefits = $5, features = $6, impact = $7, services = $8
         WHERE application_data_id = $9 AND id = $1`,
        [...Object.values(project), applicationDataId]
      );
    }

    // Update certifications
    for (const certification of certifications) {
      await client.query(
        `UPDATE certifications 
         SET name = $2
         WHERE application_data_id = $3 AND id = $1`,
        [...Object.values(certification), applicationDataId]
      );
    }

    await client.query("COMMIT");

    response.status(200).send(`Applicant information with id ${applicationDataId} updated successfully`);

  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating applicant information:", error);
    response.status(500).send("Error updating applicant information");
  } finally {
    client.release();
  }
};


export const deleteApplicantInfo = async (
  request: Request,
  response: Response
): Promise<void> => {
  const client = await pool.connect();
  const applicationDataId = request.params.id;

  try {
    // Delete the record from the application_data table
    await client.query("DELETE FROM application_data WHERE id = $1", [
      applicationDataId,
    ]);

    response
      .status(200)
      .json({ message: `Applicant with id ${applicationDataId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting applicant data:", error);
    response.status(500).json({ error: "Failed to delete applicant data" });
  } finally {
    client.release();
  }
};


function removeApplicationDataId(data: any) {

  // Remove application_data_id from personal_info
  delete data.personal_info.application_data_id;

  // Remove application_data_id from each professional_experience item
  data.professional_experience.forEach((experience: any) => {
      delete experience.application_data_id;
  });

  // Remove application_data_id from each education item
  data.education.forEach((edu: any) => {
      delete edu.application_data_id;
  });

  // Remove application_data_id from skills
  delete data.skills.application_data_id;

  // Remove application_data_id from each project item
  data.projects.forEach((project: any) => {
      delete project.application_data_id;
  });

  // Remove application_data_id from each certification item
  data.certifications.forEach((certification: any) => {
      delete certification.application_data_id;
  });

  return data;
}