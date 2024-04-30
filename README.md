# Vivacity Technical Exercise

This project is a technical assignment for the Full Stack Developer position at Vivacity-Tech.

## Description

This application serves as a demonstration of skills for the Full Stack Developer position. It includes backend API development using Node.js and Express, database management with PostgreSQL, and unit testing with Jest.

## Installation

To install and run this application locally, follow these steps:

1. Clone the repository:

```bash
git clone git@github.com:vbpradoo/vivacity.git
```

2. Navigate to the project directory:

```bash
cd vivacity
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the root directory of the project and add the necessary environment variables.

1. Initialize and populate the database:

```bash
npm run initAndPopulateDb
```

This command will execute the `init.db.sh` script to initialize and populate the PostgreSQL database.

## Usage

To run the application in development mode with hot reloading:

```bash
npm run dev
```

To start the application in production mode:

```bash
npm start
```

To run tests:

```bash
npm test
```

## API Documentation

### Get Applicant Information

Retrieves the default applicant or the applicant specified by their ID.

- **URL:** `/awesome/applicant/:id`
- **Method:** `GET`
- **URL Parameters:**
  - `id` (optional): The UUID of the applicant. If not provided, the default applicant is retrieved.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    {
        "personal_info": {
            "id": "3d5c8ad8-55dc-4b9e-a80d-cc10c94c1645",
            "name": "VICTOR BOVEDA PRADO",
            "location": "Chicago, IL 60657",
            "phone": "(872) 294-1860",
            "email": "vbpradoo@gmail.com",
            "linkedin": "linkedin.com/in/victor-boveda-prado/",
            "github": "github.com/vbpradoo"
        },
        "professional_experience": [...],
        "education": [...],
        "skills": {...},
        "projects": [...],
        "certifications": [...]
    }
    ```
- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Failed to retrieve applicant info" }
    ```

### Get All Applicants Information

Retrieves information for all applicants.

- **URL:** `/awesome/applicant`
- **Method:** `GET`
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    [
        {
            "personal_info": {...},
            "professional_experience": [...],
            "education": [...],
            "skills": {...},
            "projects": [...],
            "certifications": [...]
        },
        ...
    ]
    ```
- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Failed to retrieve all applicants info" }
    ```

### Add Applicant Information

Adds information for a new applicant.

- **URL:** `/awesome/applicant`
- **Method:** `POST`
- **Data Parameters:** JSON object containing applicant information
- **Success Response:**
  - **Code:** `201 Created`
  - **Content:** 
    ```json
    { "message": "Applicant information added successfully", "uuid": "8fad4f47-38ea-4f97-b80a-9e588079e46f" }
    ```
- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Error adding applicant information" }
    ```

### Update Applicant Information

Updates information for an existing applicant.

- **URL:** `/awesome/applicant/:id`
- **Method:** `PUT`
- **URL Parameters:**
  - `id`: The UUID of the applicant to update
- **Data Parameters:** JSON object containing updated applicant information
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `"Applicant information with id {id} updated successfully"`
- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Error updating applicant information" }
    ```

### Delete Applicant Information

Deletes information for an existing applicant.

- **URL:** `/awesome/applicant/:id`
- **Method:** `DELETE`
- **URL Parameters:**
  - `id`: The UUID of the applicant to delete
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `"Applicant with id {id} deleted successfully"`
- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Content:** 
    ```json
    { "error": "Failed to delete applicant data" }
    ```

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Jest
- Supertest

## Author

[Victor Boveda](https://github.com/vbpradoo)
[LinkedIn - Victor Boveda](https://www.linkedin.com/in/victor-boveda-prado/)

## License

This project is licensed under the [ISC License](LICENSE).
