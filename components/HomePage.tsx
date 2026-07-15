import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Briefcase, Users, TrendingUp, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Page, Job, User } from '../types';
import { MOCK_JOBS } from '../constants';
import JobCard from './JobCard';

interface HomePageProps {
    user: User | null;
    setCurrentPage: (page: Page) => void;
    savedJobIds: number[];
    toggleSaveJob: (jobId: number) => void;
    setSelectedJobForModal: (job: Job) => void;
}

const StatCard: React.FC<{ value: string; label: string; index: number }> = ({ value, label, index }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className="text-center group"
    >
        <p className="text-2xl lg:text-4xl font-extrabold text-indigo-600 group-hover:scale-105 transition-transform">{value}</p>
        <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{label}</p>
    </motion.div>
);

const HomePage: React.FC<HomePageProps> = ({ user, setCurrentPage, savedJobIds, toggleSaveJob, setSelectedJobForModal }) => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gray-50 overflow-hidden pt-10 pb-14 lg:pt-16 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-50 bg-white shadow-sm mb-5"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                            <span className="text-xs font-bold text-gray-600 tracking-tight">AI-Powered Career Matching is live</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.05]"
                        >
                            Your <span className="text-indigo-600">Future</span> Starts Right Now.
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-gray-500 font-medium leading-relaxed"
                        >
                            The world's most intelligent job portal. Built with AI to streamline your search, optimize your resume, and land top-tier roles.
                        </motion.p>
                        
                        {/* Search Bar */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="mt-8 max-w-3xl mx-auto bg-white p-2.5 rounded-xl shadow-lg border border-gray-150 flex flex-col md:flex-row items-center gap-2.5 group"
                        >
                            <div className="relative flex-grow w-full">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Job title, skills, or company" 
                                    className="w-full h-10 pl-10 pr-3 text-gray-900 border border-gray-200 bg-gray-55/40 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-medium outline-none"
                                />
                            </div>
                             <div className="relative flex-grow w-full">
                                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="City or Remote" 
                                    className="w-full h-10 pl-10 pr-3 text-gray-900 border border-gray-200 bg-gray-55/40 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-medium outline-none"
                                />
                            </div>
                            <button onClick={() => setCurrentPage(Page.FindJobs)} className="w-full md:w-auto h-10 inline-flex items-center justify-center px-6 text-xs font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md">
                                Find Job
                            </button>
                        </motion.div>
                        
                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
                            <StatCard value="85k+" label="Openings" index={0} />
                            <StatCard value="12k+" label="Companies" index={1} />
                            <StatCard value="2.5M" label="Job Seekers" index={2} />
                            <StatCard value="99%" label="Match Rate" index={3} />
                        </div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-200 rounded-full blur-[80px] opacity-20"></div>
                    <div className="absolute top-1/2 -right-48 w-80 h-80 bg-indigo-300 rounded-full blur-[100px] opacity-10"></div>
                </div>
            </section>

            {/* Featured Opportunities */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <motion.h2 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight"
                            >
                                Featured <span className="text-indigo-600">Opportunities</span>
                            </motion.h2>
                            <p className="text-sm text-gray-500 mt-1">Hand-picked roles from global industry leaders actively scaling their teams.</p>
                        </div>
                        <button onClick={() => setCurrentPage(Page.FindJobs)} className="flex items-center gap-1 group text-indigo-600 font-bold text-sm">
                            Browse All Jobs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {MOCK_JOBS.slice(0, 6).map((job, idx) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                            >
                                <JobCard job={job} user={user} setCurrentPage={setCurrentPage} savedJobIds={savedJobIds} toggleSaveJob={toggleSaveJob} onViewDetails={setSelectedJobForModal} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-14 bg-gray-900 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 tracking-tight">HIRED IN 3 STEPS</h2>
                        <p className="text-sm text-gray-400 font-medium max-w-xl mx-auto">The path to your next break is shorter than ever. Let AI handle the heavy lifting.</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        <motion.div 
                            whileHover={{ y: -4 }}
                            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
                        >
                            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center mb-4 shadow-md">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Launch Profile</h3>
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">Build a digital presence that demands attention. Our AI optimizes your data for recruiter visibility.</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -4 }}
                            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
                        >
                            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center mb-4 shadow-md">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Match & Apply</h3>
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">Get matched with roles based on sentiment and skill fit. Apply with one-click using AI resumes.</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -4 }}
                            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
                        >
                            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center mb-4 shadow-md">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Land Offer</h3>
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">Ace the interview with prep from our AI Career Coach and sign that offer with confidence.</p>
                        </motion.div>
                    </div>
                </div>
                {/* Decorative mesh */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
            </section>
            
            {/* CTA Banner Section */}
            <section className="bg-indigo-600 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                            BUILD A RESUME THAT WINS.
                        </h2>
                        <p className="text-sm text-indigo-100 font-medium">
                            Recruiters spend 6 seconds on a resume. Our AI ensures yours makes every second count by tailoring content to job descriptions.
                        </p>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentPage(Page.ResumeBuilder)}
                        className="px-8 py-3.5 bg-white text-indigo-600 text-sm font-extrabold rounded-xl shadow-lg hover:bg-indigo-50 transition-colors uppercase tracking-tight"
                    >
                        Build My Resume
                    </motion.button>
                </div>
                {/* Animated blob */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500 rounded-full blur-[100px] opacity-40"
                ></motion.div>
            </section>
        </div>
    );
};

export default HomePage;
