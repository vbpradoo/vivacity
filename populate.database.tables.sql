DO $$
DECLARE 
    app_data_uuid UUID;
BEGIN
    
    -- Code to generate a first entry using a auto generated UUID
    -- Generate UUID for application_data
    -- IF NOT EXISTS (SELECT 1 FROM application_data) THEN
    --     INSERT INTO application_data(id) VALUES (uuid_generate_v4());
    --     -- Retrieve the UUID of the application_data
    --     SELECT id FROM application_data LIMIT 1 INTO app_data_uuid;
    -- END IF;

    -- Code to generate first entry with default harcoded UUID
    IF NOT EXISTS (SELECT 1 FROM application_data) THEN
        INSERT INTO application_data(id) VALUES ('8fad4f47-38ea-4f97-b80a-9e588079e46f');
        -- Retrieve the UUID of the application_data
        SELECT id FROM application_data LIMIT 1 INTO app_data_uuid;
    END IF;
  
    -- Insert PersonalInfo
    INSERT INTO personal_info (application_data_id, name, location, phone, email, linkedin, github)
    VALUES (app_data_uuid, 'VICTOR BOVEDA PRADO', 'Chicago, IL 60657', '(872) 294-1860', 'vbpradoo@gmail.com', 'linkedin.com/in/victor-boveda-prado/', 'github.com/vbpradoo');

    -- Insert ProfessionalExperience
    INSERT INTO professional_experience (application_data_id, position, company, location, duration, bullet_points)
    VALUES 
      (app_data_uuid, 'Software Developer and Solutions Assistant', 'NTT DATA Europe & Latam', 'Madrid, Spain', 'February 2020 - August 2023', 
       '{"Propelled the AIRUS Suite forward through hands-on development using Django, Angular, Docker, PostgreSQL, Geoserver, Figma, and other top-tier tools, ensuring a seamless and impactful user experience.", 
         "Led a 4-member front-end team, driving a 15% enhancement in productivity by implementing agile methodologies and conducting routine performance assessments.", 
         "Led collaborations with ITG and partners such as AXEGA, Cranfield, Catec, INECO, EHang, and Airbus, increasing joint research projects by 25% and implementing innovative solutions to AIRUS Suite.", 
         "Played a pivotal role in development of AIRUS Suite, dedicated to managing UAS and UAV air traffic, resulting in its recognition as a top market solution [Link].", 
         "Acknowledged and showcased at esteemed events including ATM World Congress and Mobile World Congress in Barcelona, presenting to 100k+ audience."}'),
      (app_data_uuid, 'Software Developer as Research Assistant Staff', 'Galician Center for Aerospace', 'Vigo, Spain', 'July 2018 - July 2019', 
       '{"Architected, configured, and authored software solutions for small satellite deployment and operation at a leading research center affiliated with the University of Vigo and Alen Space, resulting in top market solution.", 
         "Played a crucial role in operation of two space missions, notably contributing to success of LUME-1 project.", 
         "Led enhancements to ground station software, resulting in a remarkable 20% increase in service efficiency for satellite operations.", 
         "Developed and implemented a task scheduling system for small satellites, resulting in a remarkable 80% increase in daily mission operations efficiency.", 
         "Maximized productivity by employing Django, Angular, Docker, Python, and API design in daily workflows."}'),
      (app_data_uuid, 'Internship In Teledocency Service', 'University of Vigo', 'Vigo, Spain', 'May 2017 - September 2017', 
       '{"Played a key role in migration of college courses and managed platforms such as Joomla, Moodle, and Claroline. Resulting in a 20% increase in user satisfaction.", 
         "Delivered comprehensive support to users across 25 bachelor''s degrees, 3 double degrees, 40 university master''s degrees, and doctoral programs, servicing approximately 22,000 users across 15 centers."}');

    -- Insert Education
    INSERT INTO education (application_data_id, degree, institution, location, completion_date, concentration, gpa)
    VALUES 
      (app_data_uuid, 'Professional Master of Computer Science', 'Illinois Institute of Technology', 'Chicago, IL', 'August 2023', 'Artificial Intelligence', 3.62),
      (app_data_uuid, 'Master''s in Telecommunications Engineering', 'Technical University of Madrid', 'Madrid, Spain', 'August 2022', 'Telematics and Machine Learning', NULL),
      (app_data_uuid, 'Bachelor''s in Telecommunications Engineering', 'University of Vigo', 'Vigo, Spain', 'November 2019', 'Signal Processing', NULL);

    -- Insert Skills
    INSERT INTO skills (application_data_id, languages, project_management_tools, programming_languages, databases, frameworks, testing_frameworks, 
      message_brokers, task_queues, real_time_communication, ai_frameworks_and_libraries, 
      cloud_development_and_management_tools_and_services, web_libraries, gis_software, ux_ui_design_software, 
      documentation_frameworks_and_libraries, agile_methodologies)
    VALUES (
      app_data_uuid,
      '{"English", "Spanish", "Galician", "Portuguese"}',
      '{"MS Project", "Slack", "Asana", "JIRA"}',
      '{"C", "C++", "Java", "Python", "PHP", "TypeScript", "JavaScript", "HTML", "CSS", "SCSS", "Dart", "SQL"}',
      '{"PostgreSQL", "MongoDB", "InfluxDB"}',
      '{"Django", "CodeIgniter", "Angular", "React", "Flutter", "Ionic", "SpringBoot", "Unity"}',
      '{"Jasmine"}',
      '{"Kafka", "Redis", "Mosquitto", "RabbitMQ"}',
      '{"Celery"}',
      '{"Socket.io", "Robust-Websocket"}',
      '{"TensorFlow", "Keras", "PyTorch"}',
      '{"OpenAPI", "Postman", "IBM Rational DOORS", "DBeaver", "Docker", "Amazon Web Services (EC2, S3 Buckets, Lambda, SageMaker Studio)", "Jenkins"}',
      '{"Bootstrap", "Angular Materials", "WebGL", "CesiumJS", "ThreeJS"}',
      '{"Geoserver", "QGIS"}',
      '{"Figma", "Adobe XD"}',
      '{"Sphinx", "Docusaurus", "Compodoc"}',
      '{"Scrum", "Kanban"}'
    );

    -- Insert Projects
    INSERT INTO projects (application_data_id, name, duration, description, benefits, features, impact, services)
    VALUES 
      (app_data_uuid, 'Pelfix', 'May 2018 - May 2018', 
       'Teamed up with University of Vigo''s faculties to create an innovative Android app for postoperative prostate rehabilitation, benefiting 80% of test patients.', 
       NULL,
       '{"Engineered the Android app''s user experience (UX) and user interface (UI) to ensure intuitive navigation and user-friendly interactions, resulting in a 100% increase in user engagement and satisfaction.", 
         "Developed all interfaces between probe and Android app, seamlessly integrating USB and Bluetooth connectivity options for optimal performance. Thus, enabling accessibility for up to 80% of users.", 
         "Implemented robust features within app to monitor and track progress of rehabilitation exercises, resulting in a remarkable 90% success rate in completing exercises."}',
       NULL,
       NULL),
      (app_data_uuid, 'Foro Tecnoloxico de Emprego - Career Fair', 'January 2016 - December 2017', 
       'Sourced and secured participation of 50+ new companies to exhibit at the Foro Tecnoloxico career fair.', 
       NULL,
       NULL,
       NULL,
       NULL),
      (app_data_uuid, 'Meet Program', 'January 2016 - December 2017', 
       'Served as a mentor in a program focused on assisting freshmen during initial year of schooling.', 
       NULL,
       NULL,
       NULL,
       NULL);

    -- Insert Certifications
    INSERT INTO certifications (application_data_id, name)
    VALUES 
      (app_data_uuid, 'Angular Advanced: Take your basics to the next level.'),
      (app_data_uuid, 'Legacy - Flutter: Your complete guide for IOS and Android.'),
      (app_data_uuid, 'Senior Program of Technology Project Management - RED.es.'),
      (app_data_uuid, 'High-School Scholarship Program.');

END $$;
