import React, { useState, useCallback } from 'react';
import { generateResumeContentStream } from '../services/geminiService';
import { Resume, Experience, Education, Project, Certification, Language, User, Page, Job } from '../types';

interface ResumeBuilderPageProps {
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
    user: User | null;
    setCurrentPage: (page: Page) => void;
    selectedJob: Job | null;
    setSelectedJob: (job: Job | null) => void;
}

const GeneratingIcon: React.FC<{ className?: string }> = ({ className = 'text-white' }) => (
    <svg className={`animate-spin h-4 w-4 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const AIGenerateButton: React.FC<{
    onClick: () => void;
    isGenerating: boolean;
    text?: string;
    small?: boolean;
}> = ({ onClick, isGenerating, text = 'Generate with AI', small = false }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={isGenerating}
        className={`inline-flex items-center justify-center border border-transparent font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none transition-all ${small ? 'text-[10px] px-2 py-1 mt-1.5' : 'text-xs px-3.5 py-1.5 mt-2'}`}
    >
        {isGenerating ? <GeneratingIcon className="mr-1" /> : (
            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-1.5 h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 5a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1V8a1 1 0 011-1zm10-5a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zM5.293 16.293a1 1 0 011.414 0L10 19.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        )}
        <span>{isGenerating ? 'Generating...' : text}</span>
    </button>
);

const LoginModal: React.FC<{
    setShowModal: (show: boolean) => void;
    setCurrentPage: (page: Page) => void;
}> = ({ setShowModal, setCurrentPage }) => (
    <div className="fixed inset-0 bg-gray-600/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Save Your Progress</h3>
            <p className="mt-1.5 text-xs text-gray-500">Please sign up for free or log in to download your resume and save your work.</p>
            <div className="mt-5 flex justify-center gap-3">
                <button onClick={() => setCurrentPage(Page.Login)} className="px-5 py-2 text-xs bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">Log In</button>
                <button onClick={() => setCurrentPage(Page.SignUp)} className="px-5 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">Free Sign Up</button>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 text-xs text-gray-400 hover:text-gray-600 font-medium">Continue without saving</button>
        </div>
    </div>
);

const ResumeBuilderPage: React.FC<ResumeBuilderPageProps> = ({ resume, setResume, user, setCurrentPage, selectedJob, setSelectedJob }) => {
    const [activeTemplate, setActiveTemplate] = useState('modern');
    const [isGenerating, setIsGenerating] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleGenerate = useCallback(async (field: keyof Resume, prompt: string, id?: string) => {
        const generationKey = id ? `${field}-${id}` : field;
        
        let finalPrompt = prompt;

        if (field === 'summary' && selectedJob) {
            finalPrompt = `
You are an expert AI resume writer. Write a professional, 3-4 sentence resume summary.
Base the summary on the user's skills: "${resume.skills}" and their career goal: "${resume.careerGoal}".
Most importantly, you MUST tailor this summary to be a perfect fit for the following job:
- Job Title: "${selectedJob.title}"
- Job Company: "${selectedJob.company}"
- Job Description: "${selectedJob.description}"
Highlight the user's most relevant skills and experience that match this specific job description. The tone should be confident and professional.
`;
        }
        
        setIsGenerating(generationKey);

        const resetAndStream = (updateFn: (chunk: string) => void) => {
            if (field === 'summary') setResume(prev => ({ ...prev, summary: '' }));
            else if (field === 'coverLetter') setResume(prev => ({ ...prev, coverLetter: '' }));
            else if (field === 'experience' && id) {
                 setResume(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, description: '' } : e) }));
            }
             return async (stream: AsyncGenerator<any>) => {
                for await (const chunk of stream) {
                    updateFn(chunk.text);
                }
            };
        };

        const streamHandler = resetAndStream((chunk) => {
            setResume(prev => {
                if (field === 'summary') return { ...prev, summary: prev.summary + chunk };
                if (field === 'coverLetter') return { ...prev, coverLetter: prev.coverLetter + chunk };
                if (field === 'experience' && id) {
                    return { ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, description: e.description + chunk } : e) };
                }
                return prev;
            });
        });

        try {
            const stream = await generateResumeContentStream(finalPrompt);
            await streamHandler(stream);
        } catch (error) {
            console.error(`Failed to generate ${field}:`, error);
        } finally {
            setIsGenerating(null);
        }
    }, [setResume, resume.skills, resume.careerGoal, selectedJob]);

    const handleDownload = () => {
        if (!user) {
            setShowLoginModal(true);
        } else {
            alert("Resume download started!");
        }
    };

    const handleAddExperience = () => {
        setResume(prev => ({
            ...prev,
            experience: [
                ...prev.experience,
                { id: `exp${Date.now()}`, jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }
            ]
        }));
    };

    const handleRemoveExperience = (id: string) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const handleAddEducation = () => {
        setResume(prev => ({
            ...prev,
            education: [
                ...prev.education,
                { id: `edu${Date.now()}`, institution: '', degree: '', fieldOfStudy: '', graduationDate: '' }
            ]
        }));
    };

    const handleRemoveEducation = (id: string) => {
        setResume(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };
    
    return (
        <div className="bg-gray-50 min-h-screen animate-fade-in text-gray-800">
             {showLoginModal && <LoginModal setShowModal={setShowLoginModal} setCurrentPage={setCurrentPage} />}
            <div className="max-w-screen-2xl mx-auto py-4 px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-6">
                {/* Left Sidebar - Templates */}
                <aside className="col-span-12 lg:col-span-2">
                    <div className="sticky top-20 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xs font-bold text-gray-950 mb-3 tracking-tight uppercase">Templates</h3>
                        <div className="space-y-1.5">
                            {['modern', 'classic', 'creative'].map(template => (
                                <button key={template} onClick={() => setActiveTemplate(template)} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${activeTemplate === template ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-650 hover:bg-gray-50'}`}>
                                    {template}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleDownload}
                            className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            Download PDF
                        </button>
                    </div>
                </aside>

                {/* Center - Form */}
                <main className="col-span-12 lg:col-span-5">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-150 space-y-5">
                        
                        {/* Personal Contact Details */}
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-3 uppercase tracking-wide">Contact Details</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={resume.fullName}
                                        onChange={(e) => setResume(p => ({...p, fullName: e.target.value}))}
                                        placeholder="Full Name"
                                        className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={resume.email}
                                        onChange={(e) => setResume(p => ({...p, email: e.target.value}))}
                                        placeholder="Email"
                                        className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={resume.phone}
                                        onChange={(e) => setResume(p => ({...p, phone: e.target.value}))}
                                        placeholder="Phone"
                                        className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">LinkedIn Profile</label>
                                    <input
                                        type="text"
                                        value={resume.linkedin}
                                        onChange={(e) => setResume(p => ({...p, linkedin: e.target.value}))}
                                        placeholder="linkedin.com/in/username"
                                        className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Career Goal Section */}
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2.5 uppercase tracking-wide">Target Role</h2>
                            <input
                                type="text"
                                value={resume.careerGoal}
                                onChange={(e) => setResume(p => ({...p, careerGoal: e.target.value}))}
                                placeholder="e.g., Senior Software Engineer"
                                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>

                        {/* Summary Section */}
                         <div>
                            <h2 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2.5 uppercase tracking-wide">Professional Summary</h2>
                            {selectedJob && (
                                <div className="mt-1.5 mb-2 p-2 bg-indigo-50/70 border border-indigo-100 rounded-lg flex items-center justify-between">
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Tailoring Active For:</p>
                                        <p className="text-xs font-medium text-indigo-900 truncate">{selectedJob.title} at {selectedJob.company}</p>
                                    </div>
                                    <button onClick={() => setSelectedJob(null)} className="p-1 text-indigo-500 hover:bg-indigo-100 rounded-full flex-shrink-0" title="Stop tailoring">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            )}
                            <textarea value={resume.summary} onChange={(e) => setResume(p => ({...p, summary: e.target.value}))} rows={3} placeholder="Write a summaries of your expert experience..." className="mt-1 w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                            <AIGenerateButton onClick={() => handleGenerate('summary', `Write a professional, 3-4 sentence resume summary for a person with skills: "${resume.skills}" and a career goal of "${resume.careerGoal}".`)} isGenerating={isGenerating === 'summary'}/>
                        </div>

                         {/* Experience Section */}
                        <div>
                            <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 mb-2">
                                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Work Experience</h2>
                                <button type="button" onClick={handleAddExperience} className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                    Add Job
                                </button>
                            </div>
                            <div className="space-y-3">
                                {resume.experience.map((exp, index) => (
                                    <div key={exp.id} className="border border-gray-200 p-3 rounded-lg bg-gray-50/40 relative">
                                        <button type="button" onClick={() => handleRemoveExperience(exp.id)} className="absolute top-2.5 right-2.5 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Delete job">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </button>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">Job #{index + 1}</span>
                                        
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Job Title</label>
                                                <input 
                                                    value={exp.jobTitle} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, jobTitle: e.target.value } : item) }))} 
                                                    placeholder="e.g., Software Engineer" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Company</label>
                                                <input 
                                                    value={exp.company} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, company: e.target.value } : item) }))} 
                                                    placeholder="e.g., Google" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mb-2">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Location</label>
                                                <input 
                                                    value={exp.location} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, location: e.target.value } : item) }))} 
                                                    placeholder="e.g., San Francisco" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Start Date</label>
                                                <input 
                                                    value={exp.startDate} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, startDate: e.target.value } : item) }))} 
                                                    placeholder="e.g., Oct 2021" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">End Date</label>
                                                <input 
                                                    value={exp.endDate} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, endDate: e.target.value } : item) }))} 
                                                    placeholder="e.g., Present" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Description & Key Projects</label>
                                            <textarea 
                                                value={exp.description} 
                                                onChange={(e) => setResume(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, description: e.target.value } : item) }))} 
                                                rows={2.5} 
                                                placeholder="Detail your responsibilities and achievements..." 
                                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                            />
                                        </div>
                                        <div className="flex justify-start">
                                            <AIGenerateButton small onClick={() => handleGenerate('experience', `Write 3-4 professional resume bullet points for a ${exp.jobTitle} at ${exp.company}.`, exp.id)} isGenerating={isGenerating === `experience-${exp.id}`} text="Improve descriptions with AI"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* Education Section */}
                        <div>
                            <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 mb-2">
                                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Education</h2>
                                <button type="button" onClick={handleAddEducation} className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                    Add School
                                </button>
                            </div>
                            <div className="space-y-3">
                                {resume.education.map((edu, index) => (
                                    <div key={edu.id} className="border border-gray-200 p-3 rounded-lg bg-gray-50/40 relative">
                                        <button type="button" onClick={() => handleRemoveEducation(edu.id)} className="absolute top-2.5 right-2.5 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Delete education">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </button>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">Education #{index + 1}</span>

                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">School / Institution</label>
                                                <input 
                                                    value={edu.institution} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, education: prev.education.map(item => item.id === edu.id ? { ...item, institution: e.target.value } : item) }))} 
                                                    placeholder="e.g., Stanford University" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Degree</label>
                                                <input 
                                                    value={edu.degree} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, education: prev.education.map(item => item.id === edu.id ? { ...item, degree: e.target.value } : item) }))} 
                                                    placeholder="e.g., BS" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Field of Study</label>
                                                <input 
                                                    value={edu.fieldOfStudy} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, education: prev.education.map(item => item.id === edu.id ? { ...item, fieldOfStudy: e.target.value } : item) }))} 
                                                    placeholder="e.g., Computer Science" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Graduation Date</label>
                                                <input 
                                                    value={edu.graduationDate} 
                                                    onChange={(e) => setResume(prev => ({ ...prev, education: prev.education.map(item => item.id === edu.id ? { ...item, graduationDate: e.target.value } : item) }))} 
                                                    placeholder="e.g., May 2022" 
                                                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Skills Section */}
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2.5 uppercase tracking-wide">Skills</h2>
                             <textarea 
                                value={resume.skills} 
                                onChange={(e) => setResume(p => ({...p, skills: e.target.value}))} 
                                rows={2.5} 
                                placeholder="e.g., React, TypeScript, Node.js, Project Management" 
                                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" 
                             />
                        </div>

                         {/* Cover Letter Section */}
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2 uppercase tracking-wide">Cover Letter</h2>
                            <textarea 
                                value={resume.coverLetter} 
                                onChange={(e) => setResume(p => ({...p, coverLetter: e.target.value}))} 
                                rows={4} 
                                placeholder="A convincing cover letter to accompany your applications..."
                                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" 
                            />
                            <AIGenerateButton 
                                onClick={() => handleGenerate('coverLetter', `Write a compelling cover letter based on this resume summary: "${resume.summary}" and these skills: "${resume.skills}". The tone should be professional and enthusiastic.`)} 
                                isGenerating={isGenerating === 'coverLetter'}
                            />
                        </div>
                    </div>
                </main>
                
                {/* Right Sidebar - Preview */}
                <aside className="col-span-12 lg:col-span-5">
                    <div className="sticky top-20 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className={`${activeTemplate}-template`}>
                            <h2 className="text-center text-xl font-extrabold text-gray-900 tracking-tight">{resume.fullName || 'No Name Provided'}</h2>
                            <p className="text-center text-[11px] text-gray-500 mt-1">
                                {resume.email} {resume.phone && `| ${resume.phone}`} {resume.linkedin && `| ${resume.linkedin}`}
                            </p>
                            {resume.careerGoal && (
                                <p className="text-center text-indigo-600 font-semibold mt-1 text-xs">Objective: {resume.careerGoal}</p>
                            )}
                            
                            {resume.summary && (
                                <div className="mt-4">
                                    <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-100 pb-0.5">Summary</h3>
                                    <p className="mt-1.5 text-xs text-gray-750 leading-relaxed whitespace-pre-wrap">{resume.summary}</p>
                                </div>
                            )}
                            
                            {resume.experience.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-100 pb-0.5">Experience</h3>
                                    <div className="space-y-3">
                                        {resume.experience.map(exp => (
                                            <div key={exp.id} className="mt-2 text-xs">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-800">{exp.jobTitle || 'Untitled Position'}</h4>
                                                    <span className="text-[10px] text-gray-400 font-semibold">{exp.startDate} {exp.endDate && `- ${exp.endDate}`}</span>
                                                </div>
                                                <p className="text-[11px] font-semibold text-gray-600">{exp.company} {exp.location && `(${exp.location})`}</p>
                                                <p className="mt-1 text-[11px] text-gray-750 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {resume.education.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-100 pb-0.5">Education</h3>
                                    <div className="space-y-2">
                                        {resume.education.map(edu => (
                                            <div key={edu.id} className="text-xs mt-1.5">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-800">{edu.degree || 'Degree'} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h4>
                                                    <span className="text-[10px] text-gray-450 font-medium">{edu.graduationDate}</span>
                                                </div>
                                                <p className="text-[11px] font-semibold text-gray-650">{edu.institution}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {resume.skills && (
                                 <div className="mt-4">
                                    <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-100 pb-0.5">Skills</h3>
                                    <p className="mt-1.5 text-xs text-gray-750 leading-relaxed">{resume.skills}</p>
                                </div>
                            )}

                            {resume.coverLetter && (
                                <div className="mt-4">
                                    <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-100 pb-0.5">Cover Letter</h3>
                                    <p className="mt-1.5 text-xs text-gray-750 leading-relaxed whitespace-pre-wrap">{resume.coverLetter}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ResumeBuilderPage;
