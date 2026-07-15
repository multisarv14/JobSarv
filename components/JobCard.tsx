import React from 'react';
import { Job, User, Page } from '../types';

interface MatchInfo {
    score: number;
    justification: string;
}

interface JobCardProps {
    job: Job;
    matchInfo?: MatchInfo | null;
    variant?: 'default' | 'compact';
    user: User | null;
    setCurrentPage: (page: Page) => void;
    savedJobIds: number[];
    toggleSaveJob: (jobId: number) => void;
    onTailorResume?: (job: Job) => void;
    onViewDetails?: (job: Job) => void;
}

const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
};

const WorkModelIcon: React.FC<{ model: Job['workModel'] }> = ({ model }) => {
    const icons = {
        Remote: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
        Hybrid: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v1h10V7a5 5 0 00-5-5zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" /></svg>,
        'On-site': <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>,
    };
    return icons[model] || null;
};


const JobCard: React.FC<JobCardProps> = ({ job, matchInfo, variant = 'default', user, setCurrentPage, savedJobIds, toggleSaveJob, onTailorResume, onViewDetails }) => {
    const handleApply = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            alert(`Successfully applied for ${job.title} at ${job.company}!`);
        } else {
            setCurrentPage(Page.Login);
        }
    };

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            toggleSaveJob(job.id);
        } else {
            setCurrentPage(Page.Login);
        }
    };

    const isSaved = savedJobIds.includes(job.id);

    if (variant === 'compact') {
        return (
             <div onClick={() => onViewDetails?.(job)} className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer p-2 rounded-md">
                <div className="flex items-center space-x-4">
                    <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg" />
                    <div>
                        <p className="font-bold text-gray-800">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                     <button
                        onClick={handleSave}
                        className={`p-2 rounded-lg transition-colors duration-200 ${isSaved ? 'text-indigo-600 bg-indigo-100' : 'text-gray-400 hover:bg-gray-100 hover:text-indigo-600'}`}
                        title={isSaved ? 'Unsave Job' : 'Save Job'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                    <button onClick={handleApply} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap">Apply</button>
                </div>
            </div>
        )
    }

    return (
        <div
            onClick={() => onViewDetails?.(job)}
            className="relative bg-white p-6 rounded-xl border border-gray-200 hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer"
        >
            {job.recommended && !matchInfo && (
                 <div className="absolute top-0 right-0 -mt-3 -mr-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V8h-1a1 1 0 110-2h1V5a1 1 0 011-1zM5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                       </svg>
                    </span>
                     <span className="absolute top-full right-0 mt-1 text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full whitespace-nowrap">AI Recommended</span>
                </div>
            )}
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <img src={job.logo} alt={`${job.company} logo`} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-indigo-600">{job.company}</p>
                            <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-indigo-700 transition-colors">{job.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                        </div>
                        {matchInfo && (
                            <div className="relative group flex items-center">
                                <div className={`px-3 py-1 text-sm rounded-full font-bold border cursor-help ${getScoreColor(matchInfo.score)}`}>
                                    Match: {matchInfo.score}%
                                </div>
                                <div className="absolute bottom-full left-1/2 z-10 -translate-x-1/2 mb-2 w-64 p-3 text-sm font-normal text-white bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300" role="tooltip">
                                    <p className="text-center">{matchInfo.justification}</p>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 text-xs font-medium rounded-full"><WorkModelIcon model={job.workModel} /> {job.workModel}</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 text-xs font-medium rounded-full">{job.type}</span>
                {job.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium rounded-full">{tag}</span>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
                <span className="text-gray-800 font-bold text-lg">{job.salary}</span>
                <div className="flex items-center gap-2">
                    {onTailorResume && user && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onTailorResume(job); }}
                            className="px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors whitespace-nowrap"
                            title="Tailor resume for this job"
                        >
                            Tailor Resume
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        className={`p-2 rounded-lg transition-colors duration-200 ${isSaved ? 'text-indigo-600 bg-indigo-100' : 'text-gray-400 hover:bg-gray-100 hover:text-indigo-600'}`}
                        title={isSaved ? 'Unsave Job' : 'Save Job'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                    <button onClick={handleApply} className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;