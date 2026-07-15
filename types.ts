// FIX: Removed circular self-import of `Page` which caused declaration conflicts.
export enum Page {
    Home = 'HOME',
    FindJobs = 'FIND_JOBS',
    ResumeBuilder = 'RESUME_BUILDER',
    Login = 'LOGIN',
    SignUp = 'SIGNUP',
    EmployerSignUp = 'EMPLOYER_SIGNUP',
    EmployerDashboard = 'EMPLOYER_DASHBOARD',
    JobSeekerDashboard = 'JOB_SEEKER_DASHBOARD',
    // Existing Menu Pages
    CareerTools = 'CAREER_TOOLS',
    SkillHub = 'SKILL_HUB',
    EventsWebinars = 'EVENTS_WEBINARS',
    CareerBlogs = 'CAREER_BLOGS',
    Companies = 'COMPANIES',
    SalaryInsights = 'SALARY_INSIGHTS',
    PlansPricing = 'PLANS_PRICING',
    AboutContact = 'ABOUT_CONTACT',
    // New Innovative Menu Pages
    CareerCoachAI = 'CAREER_COACH_AI',
    NetworkingZone = 'NETWORKING_ZONE',
    PortfolioBuilder = 'PORTFOLIO_BUILDER',
    ReferralZone = 'REFERRAL_ZONE',
    InternshipsFreelance = 'INTERNSHIPS_FREELANCE',
    GlobalJobs = 'GLOBAL_JOBS',
    DiversityInclusion = 'DIVERSITY_INCLUSION',
    ScholarshipsGrants = 'SCHOLARSHIPS_GRANTS',
    HireViaWhatsApp = 'HIRE_VIA_WHATSAPP',
    CommunityForum = 'COMMUNITY_FORUM',
}

export interface User {
    fullName: string;
    email: string;
    role: 'seeker' | 'employer';
    plan: string; // e.g., 'Free Seeker', 'Pro Employer'
}

export interface Plan {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    role: 'seeker' | 'employer';
}

export interface Job {
    id: number;
    title: string;
    company: string;
    logo: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
    workModel: 'Remote' | 'Hybrid' | 'On-site';
    salary: string;
    minSalary: number;
    maxSalary: number;
    experienceLevel: 'Entry-level' | 'Mid-level' | 'Senior-level' | 'Lead';
    description: string;
    tags: string[];
    recommended: boolean;
    region?: 'North America' | 'Europe' | 'Asia' | 'South America' | 'Africa' | 'Australia';
}

export interface Project {
    id: string;
    name: string;
    description: string;
    link: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
}

export interface Language {
    id: string;
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

export interface Resume {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string;
    projects: Project[];
    certifications: Certification[];
    languages: Language[];
    careerGoal: string;
    coverLetter: string;
}

export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationDate: string;
}

export interface Application {
    id: string;
    candidateName: string;
    candidatePhoto: string;
    jobTitle: string;
    experience: string;
    appliedDate: string;
    status: 'New' | 'Reviewed' | 'Shortlisted' | 'Interview' | 'Rejected';
}

export interface EmployerJob {
    id: string;
    title: string;
    applications: number;
    posted: string;
    status: 'Active' | 'Expiring' | 'Closed';
}

export interface AppliedJob {
    id: string;
    title: string;
    company: string;
    applied: string;
    status: 'Applied' | 'Under Review' | 'Interview' | 'Not Selected';
}

export interface SavedJob {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    savedDate: string;
}

export interface Candidate {
    id: string;
    name: string;
    photo: string;
    title: string;
    location: string;
    experience: number; // years
    skills: string[];
    availability: 'Immediate' | '2 Weeks' | '1 Month';
}

export interface MessageThread {
    id: string;
    candidateName: string;
    candidatePhoto: string;
    jobTitle: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
}

export interface ChatMessage {
    id: string;
    sender: 'me' | 'candidate';
    text: string;
    timestamp: string;
}

export interface NetworkingProfile {
    id: string;
    name: string;
    photo: string;
    title: string;
    company: string;
    location: string;
    industry: string;
}

export interface Scholarship {
    id: string;
    title: string;
    provider: string;
    amount: string;
    deadline: string;
    fieldOfStudy: string;
}

export interface ForumThread {
    id: string;
    title: string;
    author: string;
    authorPhoto: string;
    category: string;
    replies: number;
    lastActivity: string;
}

export interface CompanyDIProfile {
    id: string;
    name: string;
    logo: string;
    industry: string;
    diScore: number; // out of 100
    initiatives: string[];
}
