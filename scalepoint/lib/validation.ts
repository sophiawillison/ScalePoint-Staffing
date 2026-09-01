import { z } from 'zod';

// Shared server + client validation (spec §8, §12, §14).
// Current-salary fields are optional/configurable per U.S. jurisdiction rules (spec §17).

const email = z.string().trim().email('Enter a valid email address.');
const phone = z.string().trim().min(7, 'Enter a valid phone number.');
const required = (label: string) => z.string().trim().min(1, `${label} is required.`);
const optional = z.string().trim().optional().or(z.literal(''));

// ---- Executive application (specific opportunity) — 5 steps ----
export const executiveApplicationSchema = z.object({
  opportunitySlug: z.string().min(1),
  opportunityTitle: z.string().min(1),
  // Step 1
  fullName: required('Full name'),
  email,
  phone,
  city: required('City'),
  state: required('State'),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, 'Enter a valid U.S. ZIP code.'),
  linkedin: optional,
  // Step 2
  currentTitle: required('Current job title'),
  currentCompany: required('Current company'),
  industry: required('Industry'),
  yearsExperience: required('Years of experience'),
  currentLocation: optional,
  preferredLocation: optional,
  employmentStatus: optional,
  availability: optional,
  // Step 3 — compensation (current optional/configurable)
  currentBaseSalary: optional,
  expectedBaseSalary: required('Expected base salary'),
  totalCompensation: optional,
  annualBonus: optional,
  equity: optional,
  // Step 4 — leadership profile
  functions: optional,
  leadershipLevel: optional,
  teamSize: optional,
  pnlResponsibility: optional,
  boardExperience: optional,
  maExperience: optional,
  transformationExperience: optional,
  internationalExperience: optional,
  // Step 5
  coverNote: optional,
  additionalInfo: optional,
  // upload handled separately (multipart); resumeFileName carried for record
  resumeFileName: z.string().min(1, 'Please attach your resume.'),
});

// ---- General executive profile ----
export const executiveProfileSchema = z.object({
  fullName: required('Full name'),
  email,
  phone,
  location: required('Location'),
  currentTitle: required('Current title'),
  currentCompany: optional,
  yearsExperience: required('Years of experience'),
  industry: required('Industry'),
  functionalExpertise: optional,
  targetCompensation: optional,
  preferredRole: optional,
  preferredLocation: optional,
  linkedin: optional,
  additionalInfo: optional,
  resumeFileName: z.string().min(1, 'Please attach your resume.'),
});

// ---- Employer hiring requirement — 8 steps ----
export const employerRequirementSchema = z.object({
  // 1 Organization
  organizationName: required('Organization name'),
  organizationType: required('Organization type'),
  industry: required('Industry'),
  website: optional,
  headquarters: optional,
  employees: optional,
  // 2 Contact
  contactName: required('Contact name'),
  contactTitle: required('Title'),
  workEmail: email,
  contactPhone: phone,
  // 3 Position
  jobTitle: required('Job title'),
  department: optional,
  location: required('Location'),
  workModel: optional,
  employmentType: optional,
  reporting: optional,
  // 4 Compensation & timing
  salaryRange: required('Salary range'),
  bonus: optional,
  equity: optional,
  experienceRequired: optional,
  targetStart: optional,
  searchPriority: optional,
  // 5 Mandate
  roleOverview: required('Role overview'),
  keyResponsibilities: optional,
  firstYearOutcomes: optional,
  // 6 Candidate profile
  requiredSkills: optional,
  preferredBackground: optional,
  leadershipRequirements: optional,
  education: optional,
  preferredProfile: optional,
  // 7 Search context & confidentiality
  searchContext: optional,
  confidentiality: optional,
  existingSearchStatus: optional,
  additionalNotes: optional,
  // 8 documents handled via multipart; optional
  documentFileName: optional,
});

export type ExecutiveApplicationInput = z.infer<typeof executiveApplicationSchema>;
export type ExecutiveProfileInput = z.infer<typeof executiveProfileSchema>;
export type EmployerRequirementInput = z.infer<typeof employerRequirementSchema>;

// ---- General contact enquiry ----
export const contactSchema = z.object({
  name: required('Name'),
  email,
  phone: optional,
  company: optional,
  role: z.string().trim().min(1, 'Please tell us who you are.'), // Executive / Employer / Other
  subject: required('Subject'),
  message: z.string().trim().min(10, 'Please add a little more detail (at least 10 characters).'),
  consent: z
    .string()
    .refine((v) => ['true', 'on', '1'].includes(v), { message: 'Please agree before sending.' }),
});
export type ContactInput = z.infer<typeof contactSchema>;

// Flatten zod errors to { field: message }
export function flattenErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join('.') || '_form';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
