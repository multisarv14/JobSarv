import React, { useState, useMemo } from 'react';
import { Job, User, Page } from '../../types';
import { MOCK_JOBS } from '../../constants';
import JobCard from '../JobCard';

type Region = 'All' | 'North America' | 'Europe' | 'Asia' | 'South America' | 'Africa' | 'Australia';

interface GlobalJobsPageProps {
    user: User | null;
    setCurrentPage: (page: Page) => void;
    savedJobIds: number[];
    toggleSaveJob: (jobId: number) => void;
    setSelectedJobForModal: (job: Job) => void;
}

const GlobalJobsPage: React.FC<GlobalJobsPageProps> = (props) => {
    const [selectedRegion, setSelectedRegion] = useState<Region>('All');

    const filteredJobs = useMemo(() => {
        if (selectedRegion === 'All') {
            return MOCK_JOBS.filter(job => job.region);
        }
        return MOCK_JOBS.filter(job => job.region === selectedRegion);
    }, [selectedRegion]);

    const regions: Region[] = ['All', 'North America', 'Europe', 'Asia', 'South America', 'Africa', 'Australia'];

    return (
        <div className="bg-white min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Explore Global Opportunities</h1>
                    <p className="mt-4 text-lg text-gray-600">Your next career move could be anywhere in the world.</p>
                </div>
                
                <div className="relative mb-12">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" alt="World Map" className="w-full h-auto object-contain" />
                    {/* This is a simplified map. A real implementation would use an interactive SVG map library. */}
                </div>
                
                <div className="flex justify-center flex-wrap gap-2 mb-8">
                    {regions.map(region => (
                        <button 
                            key={region}
                            onClick={() => setSelectedRegion(region)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedRegion === region ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {region}
                        </button>
                    ))}
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Jobs in {selectedRegion}</h2>
                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map(job => (
                                <JobCard key={job.id} job={job} {...props} onViewDetails={props.setSelectedJobForModal} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-700">No jobs found in this region.</h3>
                            <p className="mt-2 text-gray-500">Try selecting a different region to see available opportunities.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalJobsPage;
