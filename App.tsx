import React, { useState, useEffect } from 'react';
import { Page, Resume, User, Job } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import JobsPage from './components/JobsPage';
import ResumeBuilderPage from './components/ResumeBuilderPage';
import AuthPage from './components/AuthPage';
import EmployerDashboardPage from './components/EmployerDashboardPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import JobSeekerDashboardPage from './components/JobSeekerDashboardPage';
import JobDetailModal from './components/JobDetailModal';
import PricingPage from './components/PricingPage';
import CareerToolsPage from './components/CareerToolsPage';
import SkillHubPage from './components/SkillHubPage';
import EventsWebinarsPage from './components/EventsWebinarsPage';
import CareerBlogsPage from './components/CareerBlogsPage';
import CompaniesPage from './components/CompaniesPage';
import SalaryInsightsPage from './components/SalaryInsightsPage';
import AboutContactPage from './components/AboutContactPage';
import PlaceholderPage from './components/PlaceholderPage';
import { auth } from './services/firebase';
import { getCurrentUserProfile, logout } from './services/authService';
import { onAuthStateChanged } from 'firebase/auth';

// Innovative Tools Pages
import CareerCoachAIPage from './components/innovative-tools/CareerCoachAIPage';
import NetworkingZonePage from './components/innovative-tools/NetworkingZonePage';
import PortfolioBuilderPage from './components/innovative-tools/PortfolioBuilderPage';
import ReferralZonePage from './components/innovative-tools/ReferralZonePage';
import InternshipsFreelancePage from './components/innovative-tools/InternshipsFreelancePage';
import GlobalJobsPage from './components/innovative-tools/GlobalJobsPage';
import DiversityInclusionPage from './components/innovative-tools/DiversityInclusionPage';
import ScholarshipsGrantsPage from './components/innovative-tools/ScholarshipsGrantsPage';
import HireViaWhatsAppPage from './components/innovative-tools/HireViaWhatsAppPage';
import CommunityForumPage from './components/innovative-tools/CommunityForumPage';


const initialResumeState: Resume = {
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    linkedin: 'linkedin.com/in/janedoe',
    summary: 'A passionate and results-driven professional with over 5 years of experience in project management and software development. Seeking to leverage strong technical and leadership skills to drive innovation in a dynamic tech environment.',
    experience: [
        { id: 'exp1', jobTitle: 'Senior Project Manager', company: 'Tech Solutions Inc.', location: 'San Francisco, CA', startDate: 'Jan 2020', endDate: 'Present', description: '- Led a team of 10 developers in an Agile environment.\n- Managed project budgets exceeding $2M.' },
    ],
    education: [
        { id: 'edu1', institution: 'State University', degree: 'Bachelor of Science', fieldOfStudy: 'Computer Science', graduationDate: 'May 2018' },
    ],
    skills: 'React, TypeScript, Node.js, Project Management, Agile Methodologies, Figma, SQL',
    projects: [],
    certifications: [],
    languages: [],
    careerGoal: 'Senior Frontend Engineer',
    coverLetter: '',
};


const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
    const [resume, setResume] = useState<Resume>(initialResumeState);
    const [user, setUser] = useState<User | null>(null);
    const [dashboardSection, setDashboardSection] = useState<string | undefined>();
    const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
    const [selectedJobForResume, setSelectedJobForResume] = useState<Job | null>(null);
    const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);

    useEffect(() => {
        try {
            const storedSavedJobs = localStorage.getItem('jobSarv-savedJobs');
            if (storedSavedJobs) {
                setSavedJobIds(JSON.parse(storedSavedJobs));
            }
        } catch (error) {
            console.error("Failed to parse saved jobs from localStorage", error);
            localStorage.removeItem('jobSarv-savedJobs');
        }
    }, []);

    useEffect(() => {
        return onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                return;
            }

            try {
                const profile = await getCurrentUserProfile(firebaseUser);
                if (profile) {
                    setUser(profile);
                }
            } catch (error) {
                console.error('Failed to restore the Firebase session', error);
            }
        });
    }, []);

    const toggleSaveJob = (jobId: number) => {
        setSavedJobIds(prevSavedIds => {
            const isSaved = prevSavedIds.includes(jobId);
            const newSavedIds = isSaved
                ? prevSavedIds.filter(id => id !== jobId)
                : [...prevSavedIds, jobId];
            localStorage.setItem('jobSarv-savedJobs', JSON.stringify(newSavedIds));
            return newSavedIds;
        });
    };

    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
        if (loggedInUser.role === 'employer') {
            setCurrentPage(Page.EmployerDashboard);
        } else {
            setCurrentPage(Page.JobSeekerDashboard);
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setCurrentPage(Page.Home);
    };

    const renderPage = () => {
        const commonPageProps = { user, setCurrentPage, savedJobIds, toggleSaveJob, setSelectedJobForModal };
        switch (currentPage) {
            case Page.Home:
                return <HomePage {...commonPageProps} />;
            case Page.FindJobs:
                return <JobsPage resume={resume} setSelectedJobForResume={setSelectedJobForResume} {...commonPageProps} />;
            case Page.ResumeBuilder:
                return <ResumeBuilderPage 
                    resume={resume} 
                    setResume={setResume} 
                    user={user} 
                    setCurrentPage={setCurrentPage} 
                    selectedJob={selectedJobForResume}
                    setSelectedJob={setSelectedJobForResume}
                />;
            case Page.Login:
                return <AuthPage mode="login" setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
            case Page.SignUp:
                return <AuthPage mode="signup" setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
            case Page.EmployerSignUp:
                return <AuthPage mode="signup" setCurrentPage={setCurrentPage} onLogin={handleLogin} initialRole="employer" />;
            case Page.EmployerDashboard:
                return user?.role === 'employer' ? <EmployerDashboardPage user={user} initialSection={dashboardSection} setInitialSection={setDashboardSection} /> : <HomePage {...commonPageProps} />;
            case Page.AdminDashboard:
                return user?.role === 'admin' ? <AdminDashboardPage user={user} /> : <HomePage {...commonPageProps} />;
            case Page.JobSeekerDashboard:
                return user?.role === 'seeker' ? <JobSeekerDashboardPage {...commonPageProps} /> : <HomePage {...commonPageProps} />;
            case Page.PlansPricing:
                return <PricingPage />;
            // Resources Pages
            case Page.CareerTools:
                return <CareerToolsPage setCurrentPage={setCurrentPage} />;
            case Page.SkillHub:
                return <SkillHubPage />;
            case Page.EventsWebinars:
                return <EventsWebinarsPage />;
            case Page.CareerBlogs:
                return <CareerBlogsPage />;
            case Page.Companies:
                return <CompaniesPage />;
            case Page.SalaryInsights:
                return <SalaryInsightsPage />;
            case Page.AboutContact:
                return <AboutContactPage />;
            // Innovative Tools Pages
            case Page.CareerCoachAI:
                return <CareerCoachAIPage />;
            case Page.NetworkingZone:
                return <NetworkingZonePage />;
            case Page.PortfolioBuilder:
                return <PortfolioBuilderPage />;
            case Page.ReferralZone:
                return <ReferralZonePage {...commonPageProps} />;
            case Page.InternshipsFreelance:
                return <InternshipsFreelancePage {...commonPageProps} />;
            case Page.GlobalJobs:
                return <GlobalJobsPage {...commonPageProps} />;
            case Page.DiversityInclusion:
                return <DiversityInclusionPage />;
            case Page.ScholarshipsGrants:
                return <ScholarshipsGrantsPage />;
            case Page.HireViaWhatsApp:
                return <HireViaWhatsAppPage />;
            case Page.CommunityForum:
                return <CommunityForumPage />;
            default:
                return <HomePage {...commonPageProps} />;
        }
    };
    
    const showFooterPages = [
        Page.Home, Page.FindJobs, Page.ResumeBuilder, Page.PlansPricing, Page.CareerTools, Page.SkillHub, 
        Page.EventsWebinars, Page.CareerBlogs, Page.Companies, Page.SalaryInsights, Page.AboutContact,
        Page.CareerCoachAI, Page.NetworkingZone, Page.PortfolioBuilder, Page.ReferralZone,
        Page.InternshipsFreelance, Page.GlobalJobs, Page.DiversityInclusion,
        Page.ScholarshipsGrants, Page.HireViaWhatsApp, Page.CommunityForum
    ];
    const showFooter = showFooterPages.includes(currentPage);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} setDashboardSection={setDashboardSection} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            {showFooter && <Footer setCurrentPage={setCurrentPage} />}
             <JobDetailModal
                job={selectedJobForModal}
                user={user}
                onClose={() => setSelectedJobForModal(null)}
                setCurrentPage={setCurrentPage}
                savedJobIds={savedJobIds}
                toggleSaveJob={toggleSaveJob}
            />
        </div>
    );
};

export default App;
