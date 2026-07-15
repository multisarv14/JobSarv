import React from 'react';
import { Job, Page, User } from '../../types';
import { MOCK_JOBS } from '../../constants';

interface ReferralZonePageProps {
    user: User | null;
    setCurrentPage: (page: Page) => void;
    setSelectedJobForModal: (job: Job) => void;
}

const ReferralJobCard: React.FC<{ job: Job; bonus: number; onViewDetails: (job: Job) => void; }> = ({ job, bonus, onViewDetails }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-indigo-500">
        <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
                <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-lg border" />
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
                </div>
            </div>
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 text-center">
                <p className="text-sm font-semibold">Referral Bonus</p>
                <p className="text-2xl font-bold">${bonus.toLocaleString()}</p>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
            <button onClick={() => onViewDetails(job)} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                View Details
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
                Share Referral
            </button>
        </div>
    </div>
);


const ReferralZonePage: React.FC<ReferralZonePageProps> = ({ setSelectedJobForModal }) => {
    // Adding mock referral bonuses to some jobs
    const referralJobs = MOCK_JOBS.slice(0, 6).map((job, index) => ({
        ...job,
        bonus: [2000, 1500, 1000, 2500, 3000, 1000][index]
    }));

    return (
        <div className="bg-gray-100 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Employee Referral Zone</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Earn rewards by helping your network find their next great opportunity.
                    </p>
                </div>

                 <div className="mt-12 bg-white rounded-lg shadow p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <input type="text" placeholder="Search by job title or company..." className="w-full md:flex-1 p-2 border border-gray-300 rounded-md" />
                    <button className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Search Referrals</button>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {referralJobs.map(job => (
                        <ReferralJobCard key={job.id} job={job} bonus={job.bonus} onViewDetails={setSelectedJobForModal} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReferralZonePage;
