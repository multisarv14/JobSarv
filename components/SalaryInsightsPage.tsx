import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, DollarSign, PieChart, Briefcase, MapPin, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { name: 'Software Eng', salary: 145000, color: '#4f46e5' },
    { name: 'Product Mgr', salary: 135000, color: '#6366f1' },
    { name: 'Data Scientist', salary: 155000, color: '#818cf8' },
    { name: 'UX Designer', salary: 110000, color: '#a5b4fc' },
    { name: 'DevOps', salary: 140000, color: '#c7d2fe' },
];

const SalaryInsightsPage: React.FC = () => {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [result, setResult] = useState('');

    const handleAnalysis = (event: React.FormEvent) => {
        event.preventDefault();
        if (!role.trim() || !location.trim()) return;
        setResult(`Based on current Jobsarv benchmarks, ${role} roles in ${location} are trending competitively.`);
    };

    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6"
                    >
                        <TrendingUp className="h-4 w-4" /> Updated for 2025
                    </motion.div>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-6xl mb-6 tracking-tight">
                        Know Your <span className="text-indigo-600">Market Value</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500">
                        Detailed salary data and compensation trends for the world's most in-demand roles.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-indigo-600" /> Average Base Salary by Role
                        </h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                                    <Tooltip 
                                        cursor={{ fill: 'transparent' }} 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="salary" radius={[8, 8, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white/20 rounded-2xl">
                                    <Briefcase className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">Fastest Growing</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <span className="font-medium">AI Engineer</span>
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">+42% YoY</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <span className="font-medium">Cloud Architect</span>
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">+28% YoY</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Cybersecurity Analst</span>
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">+31% YoY</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <Search className="h-6 w-6 text-indigo-600 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Check Your Salary</h3>
                            <p className="text-gray-500 text-sm mb-6">Input your details to see how your compensation compares.</p>
                            <form onSubmit={handleAnalysis} className="space-y-4">
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input value={role} onChange={event => setRole(event.target.value)} type="text" placeholder="Job Title" className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input value={location} onChange={event => setLocation(event.target.value)} type="text" placeholder="Location" className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                    Get Analysis
                                </button>
                                {result && <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg p-3">{result}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryInsightsPage;
