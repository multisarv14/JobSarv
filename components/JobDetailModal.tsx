import React from 'react';
import { Job, User, Page } from '../types';

interface JobDetailModalProps {
    job: Job | null;
    user: User | null;
    onClose: () => void;
    setCurrentPage: (page: Page) => void;
    savedJobIds: number[];
    toggleSaveJob: (jobId: number) => void;
}

const WorkModelIcon: React.FC<{ model: Job['workModel'] }> = ({ model }) => {
    const icons = {
        Remote: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
        Hybrid: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v1h10V7a5 5 0 00-5-5zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" /></svg>,
        'On-site': <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>,
    };
    return icons[model] || null;
};

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, user, onClose, setCurrentPage, savedJobIds, toggleSaveJob }) => {
    if (!job) return null;

    const isSaved = savedJobIds.includes(job.id);

    const handleApply = () => {
        if (user) {
            alert(`Successfully applied for ${job.title} at ${job.company}!`);
        } else {
            setCurrentPage(Page.Login);
        }
        onClose();
    };

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            toggleSaveJob(job.id);
        } else {
            setCurrentPage(Page.Login);
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b">
                    <div className="flex items-center space-x-4">
                        <img src={job.logo} alt={`${job.company} logo`} className="w-16 h-16 rounded-lg object-cover border" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                            <p className="text-gray-600">{job.company} &middot; {job.location}</p>
                            <p className="text-gray-800 font-bold text-lg mt-1">{job.salary}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium rounded-full"><WorkModelIcon model={job.workModel} /> {job.workModel}</span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium rounded-full">{job.type}</span>
                        {job.tags.map(tag => (
                            <span key={tag} className="bg-indigo-50 text-indigo-700 px-3 py-1 text-sm font-medium rounded-full">{tag}</span>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">Job Description</h3>
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                        {job.description}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end p-4 border-t mt-auto bg-gray-50 rounded-b-xl gap-3">
                     <button
                        onClick={handleSave}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isSaved ? 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200' : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {isSaved ? 'Saved' : 'Save Job'}
                    </button>
                    <button onClick={handleApply} className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailModal;
