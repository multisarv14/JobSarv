import React, { useState } from 'react';
import { Job, User, Page } from '../../types';
import { MOCK_INTERNSHIPS } from '../../constants';
import JobCard from '../JobCard';

interface InternshipsFreelancePageProps {
    user: User | null;
    setCurrentPage: (page: Page) => void;
    savedJobIds: number[];
    toggleSaveJob: (jobId: number) => void;
    setSelectedJobForModal: (job: Job) => void;
}


const InternshipsFreelancePage: React.FC<InternshipsFreelancePageProps> = (props) => {
    const [jobType, setJobType] = useState<'All' | 'Internship' | 'Freelance'>('All');
    
    const filteredJobs = MOCK_INTERNSHIPS.filter(job => {
        if (jobType === 'All') return true;
        return job.type === jobType;
    });

    return (
        <div className="bg-gray-50 min-h-screen animate-fade-in">
             <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Internships & Freelance</h1>
                    <p className="mt-4 text-lg text-gray-600">Find flexible opportunities to grow your career and gain experience.</p>
                </div>
                
                <div className="flex justify-center gap-4 mb-8">
                    <button onClick={() => setJobType('All')} className={`px-4 py-2 rounded-full font-semibold ${jobType === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}>All</button>
                    <button onClick={() => setJobType('Internship')} className={`px-4 py-2 rounded-full font-semibold ${jobType === 'Internship' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}>Internships</button>
                    <button onClick={() => setJobType('Freelance')} className={`px-4 py-2 rounded-full font-semibold ${jobType === 'Freelance' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}>Freelance</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} {...props} onViewDetails={props.setSelectedJobForModal} />
                    ))}
                </div>
             </div>
        </div>
    );
};

export default InternshipsFreelancePage;
