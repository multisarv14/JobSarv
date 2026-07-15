import React, { useState, useEffect } from 'react';
import { Page, User } from '../types';

interface AuthPageProps {
    mode: 'login' | 'signup';
    setCurrentPage: (page: Page) => void;
    onLogin: (user: User) => void;
    initialRole?: 'seeker' | 'employer';
}

const AuthPage: React.FC<AuthPageProps> = ({ mode: initialMode, setCurrentPage, onLogin, initialRole }) => {
    const [mode, setMode] = useState(initialMode);
    const [role, setRole] = useState<'seeker' | 'employer'>(initialRole || 'seeker');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);
    
    useEffect(() => {
        if(initialRole) {
            setRole(initialRole);
        }
    }, [initialRole]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let userToLogin: User;

        if (mode === 'signup') {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            userToLogin = {
                fullName: formData.fullName,
                email: formData.email,
                role: role,
                plan: role === 'seeker' ? 'Free Seeker' : 'Free Employer',
            };
        } else {
             userToLogin = {
                fullName: formData.email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
                email: formData.email,
                role: role,
                plan: role === 'seeker' ? 'Free Seeker' : 'Free Employer', // Mock plan for login
            };
        }
        
        onLogin(userToLogin);
    };

    const isSignup = mode === 'signup';

    return (
        <div className="min-h-[calc(100vh-64px)] flex bg-gray-50 animate-fade-in">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <div className="flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-2xl font-bold text-gray-800">JobSarv</span>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                           {isSignup ? 'Create your' : 'Sign into your'} <span className="capitalize">{role}</span> account
                        </h2>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I am an...</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button type="button" onClick={() => setRole('employer')} className={`w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-medium transition-all ${role === 'employer' ? 'bg-indigo-600 text-white border-transparent' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>Employer</button>
                                    <button type="button" onClick={() => setRole('seeker')} className={`w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-medium transition-all ${role === 'seeker' ? 'bg-indigo-600 text-white border-transparent' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>Job Seeker</button>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                                {isSignup && (
                                    <div>
                                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                                        <input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleInputChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Full Name"/>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleInputChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address"/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleInputChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password"/>
                                </div>
                                {isSignup && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                        <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleInputChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Confirm Password"/>
                                    </div>
                                )}
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        {isSignup ? 'Create Account' : 'Sign In'}
                                    </button>
                                </div>
                            </form>
                             <div className="mt-6">
                                <p className="text-sm text-center text-gray-600">
                                    {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                                    <button onClick={() => setMode(isSignup ? 'login' : 'signup')} className="font-medium text-indigo-600 hover:text-indigo-500">
                                        {isSignup ? 'Sign in' : 'Sign up for free'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <img className="absolute inset-0 h-full w-full object-cover" src={role === 'employer' ? "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" : "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"} alt="" />
                <div className="absolute inset-0 bg-indigo-900 mix-blend-multiply" aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                    <h2 className="text-4xl font-bold">
                        {role === 'employer' ? 'Find the perfect candidate.' : 'Land your dream job.'}
                    </h2>
                    <p className="mt-4 text-lg text-indigo-200">
                        {role === 'employer' ? 'Access a global pool of talent and streamline your hiring process with our powerful tools.' : 'Join millions of job seekers and get access to exclusive opportunities from top companies.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;