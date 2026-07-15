import React from 'react';
import { motion } from 'motion/react';
import { PenTool, BrainCircuit, Network, Globe, FolderPlus, WhatsappIcon, MessageCircle, FileText, ArrowRight } from 'lucide-react';
import { Page } from '../types';

const tools = [
    { name: 'AI Resume Builder', desc: 'Craft precision resumes with AI-driven content generation.', page: Page.ResumeBuilder, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Career Coach AI', desc: 'Personalized career advice and interview preparation.', page: Page.CareerCoachAI, icon: BrainCircuit, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { name: 'Portfolio Builder', desc: 'Showcase your work with a stunning web portfolio.', page: Page.PortfolioBuilder, icon: FolderPlus, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Networking Zone', desc: 'Connect with mentors and industry peers globally.', page: Page.NetworkingZone, icon: Network, color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'Global Jobs', desc: 'Explore opportunities across borders and regions.', page: Page.GlobalJobs, icon: Globe, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { name: 'Hire via WhatsApp', desc: 'Direct communication with recruiters via WhatsApp.', page: Page.HireViaWhatsApp, icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' },
];

const CareerToolsPage: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">AI-Powered <span className="text-indigo-600">Career Arsenal</span></h1>
                    <p className="text-xl text-gray-500 max-w-2xl">Deploy our cutting-edge tools to accelerate your professional growth and visibility.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <motion.div 
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setCurrentPage(tool.page)}
                            className="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100 group"
                        >
                            <div className={`h-14 w-14 rounded-2xl ${tool.bg} flex items-center justify-center ${tool.color} mb-8 transform group-hover:rotate-6 transition-transform`}>
                                <tool.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{tool.name}</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">{tool.desc}</p>
                            <div className="flex items-center gap-2 text-indigo-600 font-bold group-hover:translate-x-2 transition-transform">
                                Launch Tool <ArrowRight className="h-5 w-5" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerToolsPage;
