import { Certification } from "./certification.schema";
import { Education } from "./education.schema";
import { PersonalInfo } from "./personal.info.schema";
import { ProfessionalExperience } from "./professional.experience.schema";
import { Project } from "./project.schema";
import { Skills } from "./skills.schema";

export interface ApplicationData {
    personal_info: PersonalInfo;
    professional_experience: ProfessionalExperience[];
    education: Education[];
    skills: Skills;
    projects: Project[];
    certifications: Certification[];
}