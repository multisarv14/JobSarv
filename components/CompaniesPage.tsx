import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { MOCK_COMPANY_DI_PROFILES } from '../constants';

const CompaniesPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
                    >
                        Top Companies Hiring Now
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Explore company profiles and find your perfect workplace culture.
                    </motion.p>
                    
                    <div className="mt-8 max-w-xl mx-auto relative">
                        <input 
                            type="text" 
                            placeholder="Search companies by name or industry..." 
                            className="w-full px-5 py-4 pl-12 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-indigo-500 transition-shadow"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_COMPANY_DI_PROFILES.map((company, index) => (
                        <motion.div 
                            key={company.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="h-16 w-16 rounded-2xl overflow-hidden bg-gray-50 p-2 border border-gray-100">
                                    <img src={company.logo} alt={company.name} className="h-full w-full object-contain" />
                                </div>
                                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                    <Star className="h-3 w-3 fill-current" />
                                    <span>{company.diScore}% D&I Score</span>
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{company.name}</h3>
                            <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Global Headquarters
                            </p>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Users className="h-4 w-4 text-indigo-500" />
                                    <span>5,000+ Employees</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {company.initiatives.slice(0, 2).map(init => (
                                        <span key={init} className="text-[10px] uppercase tracking-wider font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg">
                                            {init}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-indigo-600 transition-all">
                                View Profile <ArrowRight className="h-4 w-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompaniesPage;
