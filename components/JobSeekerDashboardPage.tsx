import React, { useState } from 'react';
import { User, Page, AppliedJob, Job, Plan } from '../types';
import { MOCK_APPLIED_JOBS, MOCK_JOBS, JOB_SEEKER_PLANS } from '../constants';
import JobCard from './JobCard';

interface JobSeekerDashboardPageProps {
    user: User;
    setCurrentPage: (page: Page) => void;
    savedJobIds: number[];
    toggleSaveJob: (jobId: number) => void;
    setSelectedJobForModal: (job: Job) => void;
}

const ICONS: { [key: string]: React.ReactElement } = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    applications: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    saved: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>,
    recommendations: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
    'skill-builder': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L9 9.58v4.42l-4.5-2.25a1 1 0 00-1 1.732l5.5 2.75a1 1 0 001 0l5.5-2.75a1 1 0 00-1-1.732L11 13.998V9.582l6.394-2.58a1 1 0 000-1.84l-7-3zM9 11.582l-4-2v-1.132l4 2v1.132zm2 0v-1.132l4-2v1.132l-4 2z" /></svg>,
    'career-goals': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    'ai-resume-review': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A1 1 0 0111.293 2.707l4 4A1 1 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
    'mock-interview': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" /><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h1a2 2 0 002-2V9a2 2 0 00-2-2h-1z" /></svg>,
    achievements: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01-.948-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.948-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.286-.948zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,
    subscriptions: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1H9.5a2.5 2.5 0 00-2.5 2.5v1.5H15V6.5A2.5 2.5 0 0012.5 4H12z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>,
};


const SidebarLink: React.FC<{
    icon: string;
    label: string;
    sectionId: string;
    activeSection: string;
    onClick: () => void;
}> = ({ icon, label, sectionId, activeSection, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === sectionId
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
    >
        <span className="mr-3">{ICONS[icon]}</span>
        <span>{label}</span>
    </button>
);

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactElement; color: string; }> = ({ title, value, icon, color }) => (
     <div className={`p-5 rounded-lg shadow-sm bg-white border-l-4 ${color}`}>
        <div className="flex justify-between items-center">
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
            <div className="text-4xl text-gray-300">{icon}</div>
        </div>
    </div>
);

const DashboardSection: React.FC<{ user: User; setCurrentPage: (page: Page) => void; savedJobIds: number[]; toggleSaveJob: (jobId: number) => void; onViewDetails: (job: Job) => void; }> = ({ user, setCurrentPage, savedJobIds, toggleSaveJob, onViewDetails }) => (
    <div className="space-y-8">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 p-4 rounded-md shadow-sm">
            <h4 className="font-bold">Welcome back, {user.fullName}!</h4>
            <p>Here's a quick overview of your job search activity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Applications" value="12" icon={ICONS.applications} color="border-indigo-500" />
            <StatCard title="Saved Jobs" value={savedJobIds.length} icon={ICONS.saved} color="border-sky-500" />
            <StatCard title="Interviews" value="3" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} color="border-red-500" />
            <StatCard title="Profile Views" value="24" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} color="border-purple-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Jobs</h3>
            {MOCK_JOBS.filter(j => j.recommended).slice(0, 4).map(job => (
                <JobCard key={job.id} job={job} variant="compact" user={user} setCurrentPage={setCurrentPage} savedJobIds={savedJobIds} toggleSaveJob={toggleSaveJob} onViewDetails={onViewDetails} />
            ))}
        </div>
    </div>
);

const ApplicationsSection: React.FC = () => {
    const getStatusBadge = (status: AppliedJob['status']) => {
        switch (status) {
            case 'Applied': return 'bg-blue-100 text-blue-800';
            case 'Under Review': return 'bg-yellow-100 text-yellow-800';
            case 'Interview': return 'bg-green-100 text-green-800';
            case 'Not Selected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">My Applications</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-sm font-semibold text-gray-600">Job Title</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Company</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Applied</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Status</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_APPLIED_JOBS.map(job => (
                            <tr key={job.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 text-gray-800 font-medium">{job.title}</td>
                                <td className="p-3 text-gray-700">{job.company}</td>
                                <td className="p-3 text-gray-500">{job.applied}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusBadge(job.status)}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const SavedJobsSection: React.FC<{
    user: User;
    setCurrentPage: (page: Page) => void;
    savedJobIds: number[];
    toggleSaveJob: (jobId: number) => void;
    onViewDetails: (job: Job) => void;
}> = ({ user, setCurrentPage, savedJobIds, toggleSaveJob, onViewDetails }) => {
    const savedJobs = MOCK_JOBS.filter(job => savedJobIds.includes(job.id));

    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
             <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Saved Jobs</h2>
             {savedJobs.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            user={user}
                            setCurrentPage={setCurrentPage}
                            savedJobIds={savedJobIds}
                            toggleSaveJob={toggleSaveJob}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
             ) : (
                <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">No saved jobs yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Start browsing jobs and save the ones you're interested in.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => setCurrentPage(Page.FindJobs)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Find Jobs
                        </button>
                    </div>
                </div>
             )}
        </div>
    );
};

const PlanCard: React.FC<{ plan: Plan; isCurrent: boolean }> = ({ plan, isCurrent }) => (
    <div className={`border rounded-lg shadow-lg p-8 flex flex-col ${isCurrent ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'}`}>
        {plan.isPopular && !isCurrent && (
            <div className="text-center">
                <span className="inline-block bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">Most Popular</span>
            </div>
        )}
        <h3 className="text-2xl font-semibold text-gray-800 text-center mt-4">{plan.name}</h3>
        <div className="mt-4 text-center text-gray-900">
            <span className="text-4xl font-extrabold">{plan.price.startsWith('$') ? plan.price.split(' ')[0] : plan.price}</span>
            {plan.price.startsWith('$') && <span className="text-base font-medium text-gray-500">{plan.price.split(' ').slice(1).join(' ')}</span>}
        </div>
        <ul className="mt-6 space-y-4 text-gray-600">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">{feature}</span>
                </li>
            ))}
        </ul>
        <div className="mt-auto pt-6">
            <button
                disabled={isCurrent}
                className={`w-full px-6 py-3 text-base font-medium rounded-md transition-colors ${
                    isCurrent
                        ? 'text-gray-500 bg-gray-200 cursor-default'
                        : plan.isPopular
                        ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                        : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                }`}
            >
                {isCurrent ? 'Current Plan' : 'Choose Plan'}
            </button>
        </div>
    </div>
);


const SubscriptionSection: React.FC<{ user: User }> = ({ user }) => (
    <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Subscriptions</h2>
        <p className="text-gray-600 mb-8">You are currently on the <span className="font-semibold text-indigo-600">{user.plan}</span> plan. Upgrade to unlock more features.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {JOB_SEEKER_PLANS.map(plan => (
                <PlanCard key={plan.name} plan={plan} isCurrent={user.plan === plan.name} />
            ))}
        </div>
    </div>
);

const PlaceholderSection: React.FC<{title: string}> = ({title}) => (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center h-full flex flex-col justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{title}</h2>
        <p className="mt-2 text-gray-500">This feature is under construction. Check back soon!</p>
    </div>
);

const JobSeekerDashboardPage: React.FC<JobSeekerDashboardPageProps> = ({ user, setCurrentPage, savedJobIds, toggleSaveJob, setSelectedJobForModal }) => {
    const [activeSection, setActiveSection] = useState('dashboard-section');

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard-section': 
                return <DashboardSection user={user} setCurrentPage={setCurrentPage} savedJobIds={savedJobIds} toggleSaveJob={toggleSaveJob} onViewDetails={setSelectedJobForModal} />;
            case 'applications-section': 
                return <ApplicationsSection />;
            case 'saved-jobs-section': 
                return <SavedJobsSection user={user} setCurrentPage={setCurrentPage} savedJobIds={savedJobIds} toggleSaveJob={toggleSaveJob} onViewDetails={setSelectedJobForModal} />;
            case 'subscriptions-section':
                return <SubscriptionSection user={user} />;
            case 'recommendations-section':
                return <PlaceholderSection title="AI Job Recommendations" />;
            case 'skill-builder-section':
                return <PlaceholderSection title="Skill Builder" />;
            case 'career-goals-section':
                return <PlaceholderSection title="Career Goals" />;
            case 'ai-resume-review-section':
                return <PlaceholderSection title="AI Resume Review" />;
            case 'mock-interview-section':
                return <PlaceholderSection title="Mock Interview Practice" />;
            case 'achievements-section':
                return <PlaceholderSection title="My Achievements" />;
            default: 
                return <DashboardSection user={user} setCurrentPage={setCurrentPage} savedJobIds={savedJobIds} toggleSaveJob={toggleSaveJob} onViewDetails={setSelectedJobForModal} />;
        }
    };
    
    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 p-4">
                 <div className="text-center mb-8 pt-4">
                    <img src={`https://picsum.photos/seed/${user.email}/80`} alt="User Avatar" className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-indigo-200"/>
                    <h6 className="font-semibold text-gray-800">{user.fullName}</h6>
                    <span className="text-xs text-gray-500">Job Seeker</span>
                </div>
                <nav className="flex-grow space-y-2">
                    <SidebarLink icon="dashboard" label="My Dashboard" sectionId="dashboard-section" activeSection={activeSection} onClick={() => setActiveSection('dashboard-section')} />
                    <SidebarLink icon="saved" label="Saved Jobs" sectionId="saved-jobs-section" activeSection={activeSection} onClick={() => setActiveSection('saved-jobs-section')} />
                    <SidebarLink icon="applications" label="Applications" sectionId="applications-section" activeSection={activeSection} onClick={() => setActiveSection('applications-section')} />
                    <SidebarLink icon="recommendations" label="Recommendations" sectionId="recommendations-section" activeSection={activeSection} onClick={() => setActiveSection('recommendations-section')} />
                    <SidebarLink icon="skill-builder" label="Skill Builder" sectionId="skill-builder-section" activeSection={activeSection} onClick={() => setActiveSection('skill-builder-section')} />
                    <SidebarLink icon="career-goals" label="Career Goals" sectionId="career-goals-section" activeSection={activeSection} onClick={() => setActiveSection('career-goals-section')} />
                    <SidebarLink icon="ai-resume-review" label="AI Resume Review" sectionId="ai-resume-review-section" activeSection={activeSection} onClick={() => setActiveSection('ai-resume-review-section')} />
                    <SidebarLink icon="mock-interview" label="Mock Interview" sectionId="mock-interview-section" activeSection={activeSection} onClick={() => setActiveSection('mock-interview-section')} />
                    <SidebarLink icon="achievements" label="Achievements" sectionId="achievements-section" activeSection={activeSection} onClick={() => setActiveSection('achievements-section')} />
                    <SidebarLink icon="subscriptions" label="Subscriptions" sectionId="subscriptions-section" activeSection={activeSection} onClick={() => setActiveSection('subscriptions-section')} />
                </nav>
            </aside>

            {/* Right Content Area */}
            <main key={activeSection} className="flex-1 p-8 overflow-y-auto animate-fade-in">
                 {renderSection()}
            </main>
        </div>
    );
};

export default JobSeekerDashboardPage;