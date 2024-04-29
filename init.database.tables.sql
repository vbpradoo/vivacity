CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the ApplicationData table
CREATE TABLE IF NOT EXISTS application_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
);

-- Create the PersonalInfo table
CREATE TABLE IF NOT EXISTS personal_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    location VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    application_data_id UUID REFERENCES application_data(id) ON DELETE CASCADE
);

-- Create the ProfessionalExperience table
CREATE TABLE IF NOT EXISTS professional_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    duration VARCHAR(50),
    bullet_points TEXT[],
    application_data_id UUID REFERENCES application_data(id) ON DELETE CASCADE
);

-- Create the Education table
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    degree VARCHAR(255),
    institution VARCHAR(255),
    location VARCHAR(255),
    completion_date VARCHAR(50),
    concentration VARCHAR(255),
    gpa NUMERIC,
    application_data_id UUID REFERENCES application_data(id) ON DELETE CASCADE
);

-- Create the Skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    languages VARCHAR[],
    project_management_tools VARCHAR[],
    programming_languages VARCHAR[],
    databases VARCHAR[],
    frameworks VARCHAR[],
    testing_frameworks VARCHAR[],
    message_brokers VARCHAR[],
    task_queues VARCHAR[],
    real_time_communication VARCHAR[],
    ai_frameworks_and_libraries VARCHAR[],
    cloud_development_and_management_tools_and_services VARCHAR[],
    web_libraries VARCHAR[],
    gis_software VARCHAR[],
    ux_ui_design_software VARCHAR[],
    documentation_frameworks_and_libraries VARCHAR[],
    agile_methodologies VARCHAR[],
    application_data_id UUID REFERENCES application_data(id) ON DELETE CASCADE
);

-- Create the Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    duration VARCHAR(50),
    description TEXT,
    benefits TEXT,
    features TEXT[],
    impact TEXT,
    services TEXT[],
    application_data_id UUID REFERENCES application_data(id) ON DELETE CASCADE
);

-- Create the Certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    application_data_id UUID REFERENCES application_data(id) ON DELETE CASCADE
);
