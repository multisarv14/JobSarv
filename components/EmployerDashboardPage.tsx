import React, { useState, useEffect } from 'react';
import { User, Application, EmployerJob, Plan, Candidate, MessageThread, ChatMessage } from '../types';
import { MOCK_EMPLOYER_JOBS, MOCK_APPLICATIONS, EMPLOYER_PLANS, MOCK_CANDIDATES, MOCK_MESSAGE_THREADS, MOCK_CHAT_HISTORY } from '../constants';

interface EmployerDashboardPageProps {
    user: User;
    initialSection?: string;
    setInitialSection: (section?: string) => void;
}

const ICONS: { [key: string]: React.ReactElement } = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    post: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    jobs: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    applications: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    resumes: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>,
    messages: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    profile: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    reports: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
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

const DashboardSection: React.FC<{ user: User }> = ({ user }) => (
    <div className="space-y-8">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 p-4 rounded-md shadow-sm">
            <h4 className="font-bold">Welcome back, {user.fullName}!</h4>
            <p>Here's a quick overview of your hiring activity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Active Jobs" value={MOCK_EMPLOYER_JOBS.filter(j => j.status === 'Active').length} icon={ICONS.jobs} color="border-indigo-500" />
            <StatCard title="New Applications" value={MOCK_APPLICATIONS.filter(a => a.status === 'New').length} icon={ICONS.applications} color="border-sky-500" />
            <StatCard title="Candidates to Review" value="8" icon={ICONS.resumes} color="border-red-500" />
            <StatCard title="Unread Messages" value={MOCK_MESSAGE_THREADS.reduce((sum, t) => sum + t.unreadCount, 0)} icon={ICONS.messages} color="border-purple-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Applications</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <tbody>
                        {MOCK_APPLICATIONS.slice(0, 4).map(app => (
                            <tr key={app.id} className="border-b last:border-b-0">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={app.candidatePhoto} alt={app.candidateName} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-medium text-gray-800">{app.candidateName}</p>
                                        <p className="text-sm text-gray-500">{app.experience} experience</p>
                                    </div>
                                </td>
                                <td className="p-3 text-gray-700">{app.jobTitle}</td>
                                <td className="p-3 text-gray-500">{app.appliedDate}</td>
                                <td className="p-3"><span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">{app.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const ApplicationsSection: React.FC = () => {
    const getStatusBadge = (status: Application['status']) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'Reviewed': return 'bg-yellow-100 text-yellow-800';
            case 'Shortlisted': return 'bg-purple-100 text-purple-800';
            case 'Interview': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Manage Applications</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-sm font-semibold text-gray-600">Candidate</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Applied For</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Date Applied</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Status</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_APPLICATIONS.map(app => (
                            <tr key={app.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={app.candidatePhoto} alt={app.candidateName} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-medium text-gray-800">{app.candidateName}</p>
                                        <p className="text-sm text-gray-500">{app.experience} experience</p>
                                    </div>
                                </td>
                                <td className="p-3 text-gray-700">{app.jobTitle}</td>
                                <td className="p-3 text-gray-500">{app.appliedDate}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusBadge(app.status)}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="p-3 space-x-2">
                                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View</button>
                                    <button className="text-gray-500 hover:text-gray-800 text-sm font-medium">Message</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const BrowseResumesSection: React.FC = () => (
    <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Browse Resumes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CANDIDATES.map(candidate => (
                <div key={candidate.id} className="bg-gray-50 p-6 rounded-lg border hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={candidate.photo} alt={candidate.name} className="w-16 h-16 rounded-full" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">{candidate.name}</h3>
                            <p className="text-sm text-gray-600">{candidate.title}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500"><span className="font-semibold">Experience:</span> {candidate.experience} years</p>
                    <p className="text-sm text-gray-500"><span className="font-semibold">Location:</span> {candidate.location}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="bg-indigo-100 text-indigo-800 px-2 py-1 text-xs font-medium rounded-full">{skill}</span>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700">View Profile</button>
                </div>
            ))}
        </div>
    </div>
);

const MessagesSection: React.FC = () => {
    const [activeThread, setActiveThread] = useState<MessageThread>(MOCK_MESSAGE_THREADS[1]);
    const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_HISTORY[activeThread.id]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const msg: ChatMessage = {
            id: `msg${Date.now()}`,
            sender: 'me',
            text: newMessage,
            timestamp: 'Just now'
        };
        setMessages([...messages, msg]);
        setNewMessage('');
    };

    return (
        <div className="flex h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Thread List */}
            <aside className="w-1/3 border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                </div>
                <div className="overflow-y-auto h-full">
                    {MOCK_MESSAGE_THREADS.map(thread => (
                        <button key={thread.id} onClick={() => { setActiveThread(thread); setMessages(MOCK_CHAT_HISTORY[thread.id]); }} className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 ${activeThread.id === thread.id ? 'bg-indigo-50' : ''}`}>
                            <img src={thread.candidatePhoto} className="w-12 h-12 rounded-full" />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-800">{thread.candidateName}</p>
                                    {thread.unreadCount > 0 && <span className="text-xs bg-indigo-600 text-white font-bold px-2 py-1 rounded-full">{thread.unreadCount}</span>}
                                </div>
                                <p className="text-sm text-gray-600 truncate">{thread.lastMessage}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>
            {/* Chat Window */}
            <main className="w-2/3 flex flex-col">
                <div className="p-4 border-b flex items-center gap-3">
                    <img src={activeThread.candidatePhoto} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-gray-800">{activeThread.candidateName}</p>
                        <p className="text-sm text-gray-500">Regarding: {activeThread.jobTitle}</p>
                    </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.sender === 'me' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-500'}`}>{msg.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Type a message..." className="w-full p-2 border rounded-md" />
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700">Send</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

const PlaceholderSection: React.FC<{title: string}> = ({title}) => (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center h-full flex flex-col justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{title}</h2>
        <p className="mt-2 text-gray-500">This feature is under construction. Check back soon!</p>
    </div>
);


const EmployerDashboardPage: React.FC<EmployerDashboardPageProps> = ({ user, initialSection, setInitialSection }) => {
    const [activeSection, setActiveSection] = useState(initialSection || 'dashboard-section');

    useEffect(() => {
        if (initialSection) {
            setActiveSection(initialSection);
            setInitialSection(undefined); // Clear after setting
        }
    }, [initialSection, setInitialSection]);

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard-section': return <DashboardSection user={user} />;
            case 'post-job-section': return <PlaceholderSection title="Post a New Job" />;
            case 'manage-jobs-section': return <PlaceholderSection title="Manage Jobs" />;
            case 'applications-section': return <ApplicationsSection />;
            case 'browse-resumes-section': return <BrowseResumesSection />;
            case 'messages-section': return <MessagesSection />;
            case 'company-profile-section': return <PlaceholderSection title="Company Profile" />;
            case 'reports-analytics-section': return <PlaceholderSection title="Reports & Analytics" />;
            case 'subscriptions-section': return <PlaceholderSection title="Subscriptions" />;
            default: return <DashboardSection user={user} />;
        }
    };
    
    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 p-4">
                 <div className="text-center mb-8 pt-4">
                    <img src={`https://picsum.photos/seed/${user.email}/80`} alt="User Avatar" className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-indigo-200"/>
                    <h6 className="font-semibold text-gray-800">{user.fullName}</h6>
                    <span className="text-xs text-gray-500">Employer</span>
                </div>
                <nav className="flex-grow space-y-2">
                    <SidebarLink icon="dashboard" label="Dashboard" sectionId="dashboard-section" activeSection={activeSection} onClick={() => setActiveSection('dashboard-section')} />
                    <SidebarLink icon="post" label="Post a Job" sectionId="post-job-section" activeSection={activeSection} onClick={() => setActiveSection('post-job-section')} />
                    <SidebarLink icon="jobs" label="Manage Jobs" sectionId="manage-jobs-section" activeSection={activeSection} onClick={() => setActiveSection('manage-jobs-section')} />
                    <SidebarLink icon="applications" label="Applications" sectionId="applications-section" activeSection={activeSection} onClick={() => setActiveSection('applications-section')} />
                    <SidebarLink icon="resumes" label="Browse Resumes" sectionId="browse-resumes-section" activeSection={activeSection} onClick={() => setActiveSection('browse-resumes-section')} />
                    <SidebarLink icon="messages" label="Messages" sectionId="messages-section" activeSection={activeSection} onClick={() => setActiveSection('messages-section')} />
                    <SidebarLink icon="profile" label="Company Profile" sectionId="company-profile-section" activeSection={activeSection} onClick={() => setActiveSection('company-profile-section')} />
                    <SidebarLink icon="reports" label="Reports" sectionId="reports-analytics-section" activeSection={activeSection} onClick={() => setActiveSection('reports-analytics-section')} />
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

export default EmployerDashboardPage;
