import React from 'react';
import { MOCK_COMPANY_DI_PROFILES } from '../../constants';
import { CompanyDIProfile } from '../../types';
import { Page } from '../../types';

const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-yellow-500';
    return 'text-red-500';
};

const CompanyDICard: React.FC<{ profile: CompanyDIProfile; onViewJobs: () => void }> = ({ profile, onViewJobs }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <div className="p-6">
            <div className="flex items-center gap-4">
                <img src={profile.logo} alt={profile.name} className="w-16 h-16 rounded-lg border" />
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-500">{profile.industry}</p>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-600">D&I Score:</p>
                <p className={`text-3xl font-bold ${getScoreColor(profile.diScore)}`}>{profile.diScore}/100</p>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Key Initiatives:</h4>
                <ul className="space-y-2">
                    {profile.initiatives.map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                            <svg className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-600">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-3">
            <button type="button" onClick={onViewJobs} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View Jobs</button>
        </div>
    </div>
);

const DiversityInclusionPage: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
    return (
        <div className="bg-gray-50 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Find an Inclusive Workplace</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Explore companies that are committed to diversity, equity, and inclusion.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {MOCK_COMPANY_DI_PROFILES.map(profile => (
                        <CompanyDICard key={profile.id} profile={profile} onViewJobs={() => setCurrentPage(Page.FindJobs)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiversityInclusionPage;
