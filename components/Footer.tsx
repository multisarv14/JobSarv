import React from 'react';
import { Page } from '../types';

const Footer: React.FC<{ setCurrentPage?: (page: Page) => void }> = ({ setCurrentPage }) => {
    const goTo = (page: Page) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setCurrentPage?.(page);
    };

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-3 xl:col-span-1">
                         <div className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-lg font-bold text-gray-800">JobSarv</span>
                        </div>
                        <p className="text-gray-500 text-xs">Your AI-powered partner in career advancement.</p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4 xl:mt-0 xl:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Job Seekers</h3>
                                <ul className="mt-2 space-y-1.5">
                                    <li><a href="#find-jobs" onClick={goTo(Page.FindJobs)} className="text-xs text-gray-500 hover:text-indigo-600">Find Jobs</a></li>
                                    <li><a href="#resume-builder" onClick={goTo(Page.ResumeBuilder)} className="text-xs text-gray-500 hover:text-indigo-600">Resume Builder</a></li>
                                    <li><a href="#career-tools" onClick={goTo(Page.CareerTools)} className="text-xs text-gray-500 hover:text-indigo-600">Career Tools</a></li>
                                    <li><a href="#salary-insights" onClick={goTo(Page.SalaryInsights)} className="text-xs text-gray-500 hover:text-indigo-600">Salary Insights</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Employers</h3>
                                <ul className="mt-2 space-y-1.5">
                                    <li><a href="#post-job" onClick={goTo(Page.EmployerSignUp)} className="text-xs text-gray-500 hover:text-indigo-600">Post a Job</a></li>
                                    <li><a href="#employer" onClick={goTo(Page.EmployerSignUp)} className="text-xs text-gray-500 hover:text-indigo-600">Browse Resumes</a></li>
                                    <li><a href="#pricing" onClick={goTo(Page.PlansPricing)} className="text-xs text-gray-500 hover:text-indigo-600">Plans & Pricing</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Resources</h3>
                                <ul className="mt-2 space-y-1.5">
                                    <li><a href="#skill-hub" onClick={goTo(Page.SkillHub)} className="text-xs text-gray-500 hover:text-indigo-600">Skill Hub</a></li>
                                    <li><a href="#events" onClick={goTo(Page.EventsWebinars)} className="text-xs text-gray-500 hover:text-indigo-600">Events & Webinars</a></li>
                                    <li><a href="#blogs" onClick={goTo(Page.CareerBlogs)} className="text-xs text-gray-500 hover:text-indigo-600">Career Blogs</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Company</h3>
                                <ul className="mt-2 space-y-1.5">
                                    <li><a href="#about" onClick={goTo(Page.AboutContact)} className="text-xs text-gray-500 hover:text-indigo-600">About</a></li>
                                    <li><a href="#contact" onClick={goTo(Page.AboutContact)} className="text-xs text-gray-500 hover:text-indigo-600">Contact</a></li>
                                    <li><a href="#terms" onClick={goTo(Page.AboutContact)} className="text-xs text-gray-500 hover:text-indigo-600">Privacy & Terms</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-[10px] text-gray-400">&copy; 2025 JobSarv. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;