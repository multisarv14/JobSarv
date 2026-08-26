import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Briefcase, Users, TrendingUp, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Page, Job, User } from '../types';
import { MOCK_JOBS } from '../constants';
import JobCard from './JobCard';
import { getJobs } from '../services/jobService';

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
        <p className="text-2xl lg:text-4xl font-extrabold text-orange-600 group-hover:scale-105 transition-transform">{value}</p>
        <p className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{label}</p>
    </motion.div>
);

const HomePage: React.FC<HomePageProps> = ({ user, setCurrentPage, savedJobIds, toggleSaveJob, setSelectedJobForModal }) => {
    const [liveJobs, setLiveJobs] = useState<Job[]>([]);

    useEffect(() => {
        getJobs().then(setLiveJobs).catch(error => console.error('Failed to load featured jobs:', error));
    }, []);

    const featuredJobs = liveJobs.length > 0 ? liveJobs : MOCK_JOBS;

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#f5f2ea] border-b border-[#e8e2d7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
                        <div>
                            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700">
                                <span className="h-2 w-2 rounded-full bg-orange-600" /> The career platform for your next chapter
                            </motion.div>
                            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-5 max-w-2xl text-4xl sm:text-5xl lg:text-[4.4rem] font-bold text-[#16202a] leading-[0.98] tracking-[-0.04em]">
                                Make your next move <span className="text-orange-600">count.</span>
                            </motion.h1>
                            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-xl text-base lg:text-lg text-slate-600 leading-relaxed">
                                Search roles that fit your skills, sharpen your resume with AI, and apply with confidence.
                            </motion.p>
                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-8 flex flex-wrap items-center gap-4">
                                <button onClick={() => setCurrentPage(Page.FindJobs)} className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-700 transition-colors">
                                    Explore open roles <ArrowRight className="h-4 w-4" />
                                </button>
                                <button onClick={() => setCurrentPage(Page.ResumeBuilder)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-orange-400 hover:text-orange-700 transition-colors">
                                    Build your resume
                                </button>
                            </motion.div>
                            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
                                <span><strong className="text-slate-900">85k+</strong> open roles</span>
                                <span><strong className="text-slate-900">12k+</strong> companies</span>
                                <span><strong className="text-slate-900">2.5M</strong> candidates</span>
                            </div>
                        </div>

                        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="relative">
                            <div className="absolute -inset-4 rounded-3xl bg-orange-200/40 rotate-2" />
                            <div className="relative rounded-2xl bg-[#14212b] p-6 sm:p-8 text-white shadow-2xl">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Today on Jobsarv</p>
                                        <h2 className="mt-3 text-2xl font-bold">Roles worth a closer look</h2>
                                    </div>
                                    <Briefcase className="h-7 w-7 text-orange-300" />
                                </div>
                                <div className="mt-7 space-y-3">
                                    {featuredJobs.slice(0, 3).map(job => (
                                        <button key={job.id} onClick={() => setCurrentPage(Page.FindJobs)} className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition-colors">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-bold text-white truncate">{job.title}</span>
                                                <ArrowRight className="h-4 w-4 shrink-0 text-orange-300" />
                                            </div>
                                            <p className="mt-1 text-sm text-slate-300">{job.company} · {job.location}</p>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setCurrentPage(Page.FindJobs)} className="mt-6 text-sm font-bold text-orange-300 hover:text-white transition-colors">View all opportunities →</button>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_16px_40px_rgba(30,41,59,0.1)]">
                        <div className="grid md:grid-cols-[1fr_1fr_auto] gap-2">
                            <label className="relative flex items-center"><Search className="absolute left-4 h-4 w-4 text-slate-400" /><input type="text" placeholder="Job title, skills, or company" className="h-12 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/30" /></label>
                            <label className="relative flex items-center"><MapPin className="absolute left-4 h-4 w-4 text-slate-400" /><input type="text" placeholder="City, country, or remote" className="h-12 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/30" /></label>
                            <button onClick={() => setCurrentPage(Page.FindJobs)} className="h-12 rounded-xl bg-orange-600 px-7 text-sm font-bold text-white hover:bg-orange-700 transition-colors">Search jobs</button>
                        </div>
                    </motion.div>
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
                                Featured <span className="text-orange-600">Opportunities</span>
                            </motion.h2>
                            <p className="text-sm text-gray-500 mt-1">Hand-picked roles from global industry leaders actively scaling their teams.</p>
                        </div>
                        <button onClick={() => setCurrentPage(Page.FindJobs)} className="flex items-center gap-1 group text-orange-700 font-bold text-sm">
                            Browse All Jobs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {featuredJobs.slice(0, 6).map((job, idx) => (
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
            <section className="py-14 bg-[#14212b] text-white overflow-hidden relative">
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
                                <div className="h-10 w-10 rounded-lg bg-orange-600 flex items-center justify-center mb-4 shadow-md">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Launch Profile</h3>
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">Build a digital presence that demands attention. Our AI optimizes your data for recruiter visibility.</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -4 }}
                            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
                        >
                                <div className="h-10 w-10 rounded-lg bg-orange-600 flex items-center justify-center mb-4 shadow-md">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Match & Apply</h3>
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">Get matched with roles based on sentiment and skill fit. Apply with one-click using AI resumes.</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -4 }}
                            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
                        >
                                <div className="h-10 w-10 rounded-lg bg-orange-600 flex items-center justify-center mb-4 shadow-md">
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
            <section className="bg-orange-600 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                            BUILD A RESUME THAT WINS.
                        </h2>
                        <p className="text-sm text-orange-50 font-medium">
                            Recruiters spend 6 seconds on a resume. Our AI ensures yours makes every second count by tailoring content to job descriptions.
                        </p>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentPage(Page.ResumeBuilder)}
                        className="px-8 py-3.5 bg-white text-orange-700 text-sm font-extrabold rounded-xl shadow-lg hover:bg-orange-50 transition-colors uppercase tracking-tight"
                    >
                        Build My Resume
                    </motion.button>
                </div>
                {/* Animated blob */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500 rounded-full blur-[100px] opacity-30"
                ></motion.div>
            </section>
        </div>
    );
};

export default HomePage;
