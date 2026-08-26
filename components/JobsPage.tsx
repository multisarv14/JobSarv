import React, { useState, useMemo, useEffect } from 'react';
import { Job, Resume, User, Page } from '../types';
import { MOCK_JOBS } from '../constants';
import { generateResumeContentStream } from '../services/geminiService';
import { getJobs } from '../services/jobService';
import JobCard from './JobCard';

interface MatchInfo {
    score: number;
    justification: string;
}

const GeneratingIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

interface JobsPageProps {
    resume: Resume;
    user: User | null;
    setCurrentPage: (page: Page) => void;
    savedJobIds: number[];
    toggleSaveJob: (jobId: number) => void;
    setSelectedJobForResume: (job: Job) => void;
    setSelectedJobForModal: (job: Job) => void;
}

const salaryRanges = {
  'All': 'All Ranges',
  '0-60000': '< $60k',
  '60000-100000': '$60k - $100k',
  '100000-150000': '$100k - $150k',
  '150000-9999999': '> $150k',
};


const JobsPage: React.FC<JobsPageProps> = ({ resume, user, setCurrentPage, savedJobIds, toggleSaveJob, setSelectedJobForResume, setSelectedJobForModal }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('All');
    const [workModel, setWorkModel] = useState('All');
    const [experienceLevel, setExperienceLevel] = useState('All');
    const [salaryRange, setSalaryRange] = useState('All');
    const [isMatching, setIsMatching] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [matchScores, setMatchScores] = useState<{ [key: number]: MatchInfo | null }>({});
    const [sortBy, setSortBy] = useState<'default' | 'match_desc' | 'match_asc'>('default');

    useEffect(() => {
        getJobs()
            .then(loadedJobs => setJobs(loadedJobs.length > 0 ? loadedJobs : MOCK_JOBS))
            .catch(error => {
                console.error('Failed to load jobs:', error);
                setLoadError('Jobs could not be loaded right now. Please try again later.');
            })
            .finally(() => setIsLoading(false));
    }, []);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
            const matchesType = jobType === 'All' || job.type === jobType;
            const matchesWorkModel = workModel === 'All' || job.workModel === workModel;
            const matchesExperience = experienceLevel === 'All' || job.experienceLevel === experienceLevel;
            const matchesSalary = salaryRange === 'All' || (() => {
                const [min, max] = salaryRange.split('-').map(Number);
                return job.maxSalary >= min && job.minSalary <= max;
            })();

            return matchesSearch && matchesLocation && matchesType && matchesWorkModel && matchesExperience && matchesSalary;
        });
    }, [jobs, searchTerm, location, jobType, workModel, experienceLevel, salaryRange]);
    
    // Clear scores and sorting when filters change
    useEffect(() => {
        setMatchScores({});
        setSortBy('default');
    }, [filteredJobs]);

    const displayedJobs = useMemo(() => {
        if (sortBy === 'default' || Object.keys(matchScores).length === 0) {
            return filteredJobs;
        }

        return [...filteredJobs].sort((a, b) => {
            const scoreA = matchScores[a.id]?.score ?? -1;
            const scoreB = matchScores[b.id]?.score ?? -1;

            if (sortBy === 'match_desc') {
                return scoreB - scoreA;
            } else { // 'match_asc'
                return scoreA - scoreB;
            }
        });
    }, [filteredJobs, matchScores, sortBy]);


    const handleAnalyzeMatches = async () => {
        setIsMatching(true);
        setMatchScores({});

        const prompt = `
You are an expert AI career assistant. Your task is to analyze a user's resume against a list of job descriptions and provide a match score from 0 to 100 for each job, along with a brief one-sentence justification.

**User's Resume Details:**
- Summary: ${resume.summary}
- Skills: ${resume.skills}

**Job Postings:**
${filteredJobs.map(job => `
- Job ID: ${job.id}
  - Title: ${job.title}
  - Description: ${job.description}
`).join('')}

**Instructions:**
- Evaluate how well the user's summary and skills align with the requirements in each job description.
- Return a valid JSON string ONLY. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
- The JSON object should have job IDs as keys.
- Each value should be an object with two keys: "score" (a number from 0 to 100) and "justification" (a brief string explaining the score).

**Example Output Format:**
{
  "${filteredJobs[0]?.id || 1}": { "score": 85, "justification": "Strong alignment in required technical skills." },
  "${filteredJobs[1]?.id || 2}": { "score": 45, "justification": "Lacks direct experience in the core domain." }
}
`;
        try {
            const stream = await generateResumeContentStream(prompt);
            let jsonResponse = '';
            for await (const chunk of stream) {
                jsonResponse += chunk.text;
            }

            // Clean potential markdown formatting
            const cleanedJson = jsonResponse.replace(/```json|```/g, '').trim();
            const parsedScores = JSON.parse(cleanedJson);
            setMatchScores(parsedScores);
            setSortBy('match_desc'); // Default to sorting by highest match after analysis

        } catch (error) {
            console.error("Failed to analyze job matches:", error);
            alert("Sorry, there was an error analyzing job matches. Please try again.");
        } finally {
            setIsMatching(false);
        }
    };
    
    const canAnalyze = resume.summary.trim() !== '' && resume.skills.trim() !== '';

    const handleTailorResume = (job: Job) => {
        setSelectedJobForResume(job);
        setCurrentPage(Page.ResumeBuilder);
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900">Find Your Dream Job</h1>
                <p className="mt-4 text-lg text-gray-600">Search through thousands of open positions worldwide.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Filter Jobs</h3>
                        <div className="space-y-6 mt-4">
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700">Job Title or Company</label>
                                <input
                                    type="text"
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="e.g., React Developer"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g., San Francisco"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
                                <select
                                    id="jobType"
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                                >
                                    <option>All</option>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="workModel" className="block text-sm font-medium text-gray-700">Work Model</label>
                                <select
                                    id="workModel"
                                    value={workModel}
                                    onChange={(e) => setWorkModel(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                                >
                                    <option>All</option>
                                    <option>On-site</option>
                                    <option>Hybrid</option>
                                    <option>Remote</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">Experience Level</label>
                                <select
                                    id="experienceLevel"
                                    value={experienceLevel}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                                >
                                    <option>All</option>
                                    <option>Entry-level</option>
                                    <option>Mid-level</option>
                                    <option>Senior-level</option>
                                    <option>Lead</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
                                <select
                                    id="salaryRange"
                                    value={salaryRange}
                                    onChange={(e) => setSalaryRange(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                                >
                                    {Object.entries(salaryRanges).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Job Listings */}
                <main className="lg:col-span-3 space-y-6">
                     <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-gray-700 font-medium">Found {displayedJobs.length} jobs.</p>
                            <div className="relative">
                                <label htmlFor="sortBy" className="sr-only">Sort by</label>
                                <select
                                    id="sortBy"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'default' | 'match_desc' | 'match_asc')}
                                    className="pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    disabled={Object.keys(matchScores).length === 0}
                                    title={Object.keys(matchScores).length === 0 ? 'Analyze matches to enable sorting by score' : 'Sort by match score'}
                                >
                                    <option value="default">Default Order</option>
                                    <option value="match_desc">Match: High to Low</option>
                                    <option value="match_asc">Match: Low to High</option>
                                </select>
                            </div>
                        </div>
                        <div title={!canAnalyze ? 'Please complete your resume summary and skills to enable AI matching.' : ''}>
                             <button
                                onClick={handleAnalyzeMatches}
                                disabled={isMatching || !canAnalyze}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                            >
                                {isMatching ? <GeneratingIcon /> : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                    </svg>
                                )}
                                {isMatching ? 'Analyzing...' : 'Analyze Job Matches'}
                            </button>
                        </div>
                    </div>
                    
                    {isLoading ? (
                        <div className="bg-white text-center p-12 rounded-lg shadow-md">
                            <p className="text-gray-600">Loading jobs...</p>
                        </div>
                    ) : loadError ? (
                        <div className="bg-white text-center p-12 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800">Unable to load jobs</h3>
                            <p className="mt-2 text-gray-500">{loadError}</p>
                        </div>
                    ) : displayedJobs.length > 0 ? (
                        displayedJobs.map(job => <JobCard key={job.id} job={job} matchInfo={matchScores[job.id] || null} user={user} setCurrentPage={setCurrentPage} savedJobIds={savedJobIds} toggleSaveJob={toggleSaveJob} onTailorResume={handleTailorResume} onViewDetails={setSelectedJobForModal} />)
                    ) : (
                        <div className="bg-white text-center p-12 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800">No jobs found</h3>
                            <p className="mt-2 text-gray-500">Try adjusting your search filters to find what you're looking for.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default JobsPage;