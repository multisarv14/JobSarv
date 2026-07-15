import { Job, Plan, EmployerJob, Application, AppliedJob, SavedJob, Candidate, MessageThread, ChatMessage, NetworkingProfile, CompanyDIProfile, Scholarship, ForumThread } from './types';

export const MOCK_JOBS: Job[] = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'Innovate Inc.',
        logo: 'https://picsum.photos/seed/company1/100',
        location: 'San Francisco, CA',
        type: 'Full-time',
        workModel: 'Hybrid',
        salary: '$150k - $180k',
        minSalary: 150000,
        maxSalary: 180000,
        experienceLevel: 'Senior-level',
        description: 'Lead the development of our next-generation user interfaces using React and TypeScript.',
        tags: ['React', 'TypeScript', 'Tailwind CSS'],
        recommended: true,
        region: 'North America'
    },
    {
        id: 2,
        title: 'Product Manager',
        company: 'Solutions Co.',
        logo: 'https://picsum.photos/seed/company2/100',
        location: 'New York, NY',
        type: 'Full-time',
        workModel: 'On-site',
        salary: '$140k - $170k',
        minSalary: 140000,
        maxSalary: 170000,
        experienceLevel: 'Senior-level',
        description: 'Define product vision, strategy, and roadmap for our market-leading SaaS platform.',
        tags: ['SaaS', 'Agile', 'Roadmap'],
        recommended: false,
        region: 'North America'
    },
    {
        id: 3,
        title: 'UX/UI Designer',
        company: 'Creative Studio',
        logo: 'https://picsum.photos/seed/company3/100',
        location: 'Remote',
        type: 'Contract',
        workModel: 'Remote',
        salary: '$80 - $100 / hr',
        minSalary: 166400, // $80/hr * 2080 hrs
        maxSalary: 208000, // $100/hr * 2080 hrs
        experienceLevel: 'Mid-level',
        description: 'Design intuitive and beautiful user experiences for our mobile and web applications.',
        tags: ['Figma', 'User Research', 'Prototyping'],
        recommended: false,
        region: 'Europe'
    },
    {
        id: 4,
        title: 'Backend Developer (Go)',
        company: 'DataStream',
        logo: 'https://picsum.photos/seed/company4/100',
        location: 'Austin, TX',
        type: 'Full-time',
        workModel: 'On-site',
        salary: '$130k - $160k',
        minSalary: 130000,
        maxSalary: 160000,
        experienceLevel: 'Mid-level',
        description: 'Build and maintain scalable microservices and APIs using Go and Kubernetes.',
        tags: ['Go', 'Microservices', 'Kubernetes'],
        recommended: false,
        region: 'North America'
    },
     {
        id: 5,
        title: 'Data Scientist',
        company: 'QuantumLeap AI',
        logo: 'https://picsum.photos/seed/company5/100',
        location: 'Boston, MA',
        type: 'Full-time',
        workModel: 'Hybrid',
        salary: '$160k - $190k',
        minSalary: 160000,
        maxSalary: 190000,
        experienceLevel: 'Senior-level',
        description: 'Leverage machine learning and statistical models to extract insights from large datasets.',
        tags: ['Python', 'Machine Learning', 'SQL'],
        recommended: true,
        region: 'North America'
    },
    {
        id: 6,
        title: 'DevOps Engineer',
        company: 'CloudNine',
        logo: 'https://picsum.photos/seed/company6/100',
        location: 'Remote',
        type: 'Full-time',
        workModel: 'Remote',
        salary: '$145k - $175k',
        minSalary: 145000,
        maxSalary: 175000,
        experienceLevel: 'Senior-level',
        description: 'Automate and streamline our operations and processes, build and maintain tools for deployment, monitoring and operations.',
        tags: ['AWS', 'Terraform', 'CI/CD'],
        recommended: true,
        region: 'Europe'
    },
    {
        id: 7,
        title: 'Software Engineer',
        company: 'NextGen Solutions',
        logo: 'https://picsum.photos/seed/company7/100',
        location: 'Tokyo, Japan',
        type: 'Full-time',
        workModel: 'On-site',
        salary: '¥8M - ¥12M',
        minSalary: 60000,
        maxSalary: 90000,
        experienceLevel: 'Mid-level',
        description: 'Join our team in Tokyo to build innovative software solutions.',
        tags: ['Java', 'Spring', 'Cloud'],
        recommended: false,
        region: 'Asia'
    },
    {
        id: 8,
        title: 'Marketing Manager',
        company: 'Growth Accelerators',
        logo: 'https://picsum.photos/seed/company8/100',
        location: 'London, UK',
        type: 'Full-time',
        workModel: 'Hybrid',
        salary: '£60k - £75k',
        minSalary: 75000,
        maxSalary: 94000,
        experienceLevel: 'Senior-level',
        description: 'Develop and execute marketing strategies to drive growth.',
        tags: ['Digital Marketing', 'SEO', 'Content'],
        recommended: false,
        region: 'Europe'
    }
];

export const MOCK_INTERNSHIPS: Job[] = [
    {
        id: 101,
        title: 'Frontend Developer Intern',
        company: 'Innovate Inc.',
        logo: 'https://picsum.photos/seed/company1/100',
        location: 'Remote',
        type: 'Internship',
        workModel: 'Remote',
        salary: '$25 / hr',
        minSalary: 52000,
        maxSalary: 52000,
        experienceLevel: 'Entry-level',
        description: 'Assist the frontend team in developing and maintaining web applications.',
        tags: ['React', 'HTML', 'CSS'],
        recommended: true
    },
    {
        id: 102,
        title: 'Freelance UX Writer',
        company: 'Creative Studio',
        logo: 'https://picsum.photos/seed/company3/100',
        location: 'Remote',
        type: 'Freelance',
        workModel: 'Remote',
        salary: '$50 / hr',
        minSalary: 104000,
        maxSalary: 104000,
        experienceLevel: 'Mid-level',
        description: 'Craft clear, concise, and compelling copy for user interfaces.',
        tags: ['UX Writing', 'Content Strategy'],
        recommended: false
    },
    {
        id: 103,
        title: 'Data Science Intern',
        company: 'QuantumLeap AI',
        logo: 'https://picsum.photos/seed/company5/100',
        location: 'Boston, MA',
        type: 'Internship',
        workModel: 'Hybrid',
        salary: '$30 / hr',
        minSalary: 62400,
        maxSalary: 62400,
        experienceLevel: 'Entry-level',
        description: 'Work on real-world data science projects and learn from experienced mentors.',
        tags: ['Python', 'Pandas', 'Scikit-learn'],
        recommended: true
    }
];

export const JOB_SEEKER_PLANS: Plan[] = [
    {
        name: 'Free Seeker',
        price: 'Free',
        features: ['Browse and apply to jobs', 'Basic resume builder', 'Save up to 5 jobs', 'Career article access'],
        role: 'seeker'
    },
    {
        name: 'Pro Seeker',
        price: '$15 / month',
        features: ['Everything in Free', 'AI-powered resume summary', 'AI cover letter generation', 'Unlimited job applications & saves', 'Priority job alerts'],
        isPopular: true,
        role: 'seeker'
    }
];

export const EMPLOYER_PLANS: Plan[] = [
    {
        name: 'Free Employer',
        price: 'Free',
        features: ['Post 1 job per month', 'View up to 10 candidate profiles', 'Basic company branding', 'Email support'],
        role: 'employer'
    },
    {
        name: 'Pro Employer',
        price: '$99 / month',
        features: ['Post up to 5 jobs', 'Access to full candidate database', 'Applicant tracking system integration', 'Premium company branding', 'Priority support'],
        isPopular: true,
        role: 'employer'
    }
];


export const MOCK_EMPLOYER_JOBS: EmployerJob[] = [
    { id: 'job1', title: 'Senior Web Developer', applications: 24, posted: '2 days ago', status: 'Active' },
    { id: 'job2', title: 'UX/UI Designer', applications: 18, posted: '1 week ago', status: 'Active' },
    { id: 'job3', title: 'Marketing Specialist', applications: 12, posted: '2 weeks ago', status: 'Active' },
    { id: 'job4', title: 'Data Analyst', applications: 8, posted: '3 weeks ago', status: 'Expiring' },
    { id: 'job5', title: 'Sales Executive', applications: 5, posted: '1 month ago', status: 'Closed' }
];

export const MOCK_APPLICATIONS: Application[] = [
    { id: 'app1', candidateName: 'John Doe', candidatePhoto: 'https://picsum.photos/seed/user1/50', jobTitle: 'Senior Web Developer', experience: '5 years', appliedDate: '10 min ago', status: 'New' },
    { id: 'app2', candidateName: 'Sarah Smith', candidatePhoto: 'https://picsum.photos/seed/user2/50', jobTitle: 'UX/UI Designer', experience: '3 years', appliedDate: '1 hour ago', status: 'Reviewed' },
    { id: 'app3', candidateName: 'Michael Johnson', candidatePhoto: 'https://picsum.photos/seed/user3/50', jobTitle: 'Data Analyst', experience: '4 years', appliedDate: '3 hours ago', status: 'Shortlisted' },
    { id: 'app4', candidateName: 'Emily Wilson', candidatePhoto: 'https://picsum.photos/seed/user4/50', jobTitle: 'Marketing Specialist', experience: '2 years', appliedDate: '1 day ago', status: 'Interview' },
];

export const MOCK_APPLIED_JOBS: AppliedJob[] = [
    { id: 'applied1', title: 'Senior Web Developer', company: 'Tech Solutions Inc.', applied: 'Today', status: 'Applied' },
    { id: 'applied2', title: 'Frontend Engineer', company: 'Digital Creations', applied: '2 days ago', status: 'Under Review' },
    { id: 'applied3', title: 'UX Designer', company: 'Creative Minds', applied: '1 week ago', status: 'Interview' },
    { id: 'applied4', title: 'Data Analyst', company: 'Analytics Pro', applied: '2 weeks ago', status: 'Not Selected' },
];

export const MOCK_CANDIDATES: Candidate[] = [
    { id: 'cand1', name: 'Alex Morgan', photo: 'https://picsum.photos/seed/cand1/100', title: 'Senior Go Developer', location: 'Austin, TX', experience: 8, skills: ['Go', 'Kubernetes', 'Microservices', 'AWS'], availability: '2 Weeks' },
    { id: 'cand2', name: 'Brenda Lee', photo: 'https://picsum.photos/seed/cand2/100', title: 'Product Designer', location: 'Remote', experience: 5, skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems'], availability: 'Immediate' },
    { id: 'cand3', name: 'Carlos Gomez', photo: 'https://picsum.photos/seed/cand3/100', title: 'Data Scientist', location: 'Boston, MA', experience: 6, skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'], availability: '1 Month' },
    { id: 'cand4', name: 'Diana Prince', photo: 'https://picsum.photos/seed/cand4/100', title: 'DevOps Engineer', location: 'Remote', experience: 7, skills: ['Terraform', 'CI/CD', 'Docker', 'GCP'], availability: '2 Weeks' },
];

export const MOCK_MESSAGE_THREADS: MessageThread[] = [
    { id: 'thread1', candidateName: 'John Doe', candidatePhoto: 'https://picsum.photos/seed/user1/50', jobTitle: 'Senior Web Developer', lastMessage: 'That sounds great, I look forward to it!', timestamp: '10 min ago', unreadCount: 0 },
    { id: 'thread2', candidateName: 'Sarah Smith', candidatePhoto: 'https://picsum.photos/seed/user2/50', jobTitle: 'UX/UI Designer', lastMessage: 'Yes, Tuesday at 2 PM works for me.', timestamp: '1 hour ago', unreadCount: 2 },
    { id: 'thread3', candidateName: 'Michael Johnson', candidatePhoto: 'https://picsum.photos/seed/user3/50', jobTitle: 'Data Analyst', lastMessage: 'Thank you for the opportunity!', timestamp: '3 hours ago', unreadCount: 0 },
];

export const MOCK_CHAT_HISTORY: { [key: string]: ChatMessage[] } = {
    'thread1': [
        { id: 'msg1', sender: 'candidate', text: 'Hello, I have a question about the role.', timestamp: 'Yesterday' },
        { id: 'msg2', sender: 'me', text: 'Of course, ask away!', timestamp: 'Yesterday' },
        { id: 'msg3', sender: 'candidate', text: 'That sounds great, I look forward to it!', timestamp: '10 min ago' },
    ],
    'thread2': [
        { id: 'msg4', sender: 'me', text: 'Hi Sarah, are you available for a quick chat next week?', timestamp: '2 hours ago' },
        { id: 'msg5', sender: 'candidate', text: 'Absolutely. How about Tuesday or Wednesday afternoon?', timestamp: '1 hour ago' },
        { id: 'msg6', sender: 'me', text: 'Tuesday at 2 PM?', timestamp: '1 hour ago' },
        { id: 'msg7', sender: 'candidate', text: 'Yes, Tuesday at 2 PM works for me.', timestamp: '1 hour ago' },
    ],
    'thread3': [
         { id: 'msg8', sender: 'me', text: 'We were very impressed with your interview and would like to extend an offer.', timestamp: '4 hours ago' },
         { id: 'msg9', sender: 'candidate', text: 'Thank you for the opportunity!', timestamp: '3 hours ago' },
    ]
};


export const MOCK_NETWORKING_PROFILES: NetworkingProfile[] = [
    { id: 'net1', name: 'David Chen', photo: 'https://picsum.photos/seed/net1/100', title: 'Lead Engineer', company: 'Innovate Inc.', location: 'San Francisco, CA', industry: 'Technology' },
    { id: 'net2', name: 'Maria Garcia', photo: 'https://picsum.photos/seed/net2/100', title: 'Marketing Director', company: 'Solutions Co.', location: 'New York, NY', industry: 'Marketing' },
    { id: 'net3', name: 'Kenji Tanaka', photo: 'https://picsum.photos/seed/net3/100', title: 'Art Director', company: 'Creative Studio', location: 'Remote', industry: 'Design' },
    { id: 'net4', name: 'Fatima Ahmed', photo: 'https://picsum.photos/seed/net4/100', title: 'CEO', company: 'DataStream', location: 'Austin, TX', industry: 'Technology' },
    { id: 'net5', name: 'Leo Martinez', photo: 'https://picsum.photos/seed/net5/100', title: 'Senior Data Scientist', company: 'QuantumLeap AI', location: 'Boston, MA', industry: 'AI/ML' },
    { id: 'net6', name: 'Chloe Dubois', photo: 'https://picsum.photos/seed/net6/100', title: 'Cloud Architect', company: 'CloudNine', location: 'Remote', industry: 'Cloud Computing' },
];

export const MOCK_COMPANY_DI_PROFILES: CompanyDIProfile[] = [
    { id: 'di1', name: 'Innovate Inc.', logo: 'https://picsum.photos/seed/company1/100', industry: 'Technology', diScore: 92, initiatives: ['Women in Tech Mentorship', 'Unconscious Bias Training', 'Diverse Hiring Panels'] },
    { id: 'di2', name: 'Solutions Co.', logo: 'https://picsum.photos/seed/company2/100', industry: 'SaaS', diScore: 88, initiatives: ['Employee Resource Groups (ERGs)', 'Pay Equity Audits', 'Accessible Product Design'] },
    { id: 'di3', name: 'Creative Studio', logo: 'https://picsum.photos/seed/company3/100', industry: 'Design', diScore: 95, initiatives: ['Partnerships with HBCUs', 'Inclusive Language Guide', 'Flexible Work Policies'] },
    { id: 'di4', name: 'QuantumLeap AI', logo: 'https://picsum.photos/seed/company5/100', industry: 'AI/ML', diScore: 85, initiatives: ['AI Ethics Board', 'Neurodiversity Hiring Program', 'Cultural Celebration Events'] },
];

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
    { id: 'sch1', title: 'Future Leaders in Tech Scholarship', provider: 'Innovate Inc.', amount: '$10,000', deadline: '2025-12-31', fieldOfStudy: 'Technology' },
    { id: 'sch2', title: 'Creative Minds Design Grant', provider: 'Creative Studio', amount: '$5,000', deadline: '2025-11-30', fieldOfStudy: 'Design' },
    { id: 'sch3', title: 'Data for Good Fellowship', provider: 'QuantumLeap AI', amount: '$15,000', deadline: '2026-01-15', fieldOfStudy: 'AI/ML' },
    { id: 'sch4', title: 'Solutions Co. Business Scholarship', provider: 'Solutions Co.', amount: '$7,500', deadline: '2025-10-31', fieldOfStudy: 'Business' },
];

export const MOCK_FORUM_THREADS: ForumThread[] = [
    { id: 'thr1', title: 'Tips for acing a technical interview for a FAANG company?', author: 'Alex Morgan', authorPhoto: 'https://picsum.photos/seed/cand1/50', category: 'Interview Prep', replies: 42, lastActivity: '2 hours ago' },
    { id: 'thr2', title: 'Best way to build a portfolio that stands out?', author: 'Brenda Lee', authorPhoto: 'https://picsum.photos/seed/cand2/50', category: 'Career Advice', replies: 28, lastActivity: '5 hours ago' },
    { id: 'thr3', title: 'Salary negotiation: How to ask for what you\'re worth?', author: 'Carlos Gomez', authorPhoto: 'https://picsum.photos/seed/cand3/50', category: 'Compensation', replies: 61, lastActivity: '1 day ago' },
    { id: 'thr4', title: 'Is learning Go worth it in 2025?', author: 'Diana Prince', authorPhoto: 'https://picsum.photos/seed/cand4/50', category: 'Tech Trends', replies: 112, lastActivity: '2 days ago' },
];
