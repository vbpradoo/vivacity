import request from 'supertest';
import { app } from './index';
import { beforeAll, describe, afterAll, it, expect } from '@jest/globals';
import { applicantMock } from './mocks/applicant.mock';
import { ApplicationData } from './schemas/application.schema';



// Define CRUD tests for the applicant API endpoints
describe('Applicant API endpoints', () => {
    const endpoint = '/awesome/applicant'
    let dbApplicantData: ApplicationData;
    let defaultID: string = ''; // UUID var for testing


    // Test for creating an applicant
    it('Should create a new applicant', async () => {
      const testNewApplicant = JSON.parse(JSON.stringify(applicantMock)); // Deep Clones mock
      testNewApplicant.personal_info.name = "TEST CASE - VICTOR BOVEDA PRADO";
      
      const response = await request(app)
        .post(endpoint)
        .send(testNewApplicant);
      expect(response.status).toBe(201);
      defaultID = response.body.uuid;
      console.log(`This is the dafault ID: ${defaultID}`)
    });
  
    // Test for retrieving applicant information
    it('Should retrieve applicant information', async () => {
      const response = await request(app).get(`${endpoint}/${defaultID}`); 
      expect(response.status).toBe(200);
      dbApplicantData = response.body
    });
  
    // Test for updating applicant information
    it('Should update applicant information', async () => {
      const updatedApplicant = JSON.parse(JSON.stringify(dbApplicantData)); // Deep Clones object
      const newName = "TEST CASE - UPDATED NAME";
      updatedApplicant.personal_info.name = newName;

      const response = await request(app)
        .put(`${endpoint}/${defaultID}`) 
        .send(updatedApplicant);
      expect(response.status).toBe(200);

      // Checks if the name has change
      const responseForNameCheck = await request(app)
      .get(`${endpoint}/${defaultID}`);    
      expect(responseForNameCheck.body.personal_info.name).toBe(newName);
    });
  
    // Test for deleting an applicant
    it('Should delete an applicant', async () => {
      const response = await request(app).delete(`${endpoint}/${defaultID}`);
      expect(response.status).toBe(200);
    });

});


// Define CRUD tests for the applicants API endpoint
describe('All Applicants API endpoint', () => {
    const endpoint = '/awesome/applicants'

    // Test for retrieving all applicants information
    it('Should retrieve all applicants information', async () => {
        const response = await request(app).get(`${endpoint}`); 
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    
    // Test will look if my default applicant info is in. 
    // And check if this corresponds to the mock I have defined.
    it('Should contain my default applicant information', async () => {
        const response = await request(app).get(`${endpoint}`); 
        expect(response.status).toBe(200);
        expect(response.body[0]).toMatchObject(applicantMock);
      });

});