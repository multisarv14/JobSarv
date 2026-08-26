import React, { useState, useEffect } from 'react';
import { Page, User } from '../types';
import { signIn, signUp } from '../services/authService';

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
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (mode === 'signup') {
            if (formData.password !== formData.confirmPassword) {
                setErrorMessage('Passwords do not match.');
                return;
            }
        }

        setIsSubmitting(true);
        try {
            const userToLogin = mode === 'signup'
                ? await signUp(formData.fullName, formData.email, formData.password, role)
                : await signIn(formData.email, formData.password, role);
            onLogin(userToLogin);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to complete authentication.';
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isSignup = mode === 'signup';

    return (
        <div className="min-h-[calc(100vh-64px)] flex bg-[#f5f2ea] animate-fade-in">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <div className="flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-2xl font-bold tracking-tight text-gray-900">JobSarv</span>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 leading-tight">
                           {isSignup ? 'Create your' : 'Sign into your'} <span className="capitalize">{role}</span> account
                        </h2>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                             <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">I am an...</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button type="button" onClick={() => setRole('employer')} className={`w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border text-sm font-semibold transition-all ${role === 'employer' ? 'bg-orange-600 text-white border-transparent' : 'bg-white text-gray-500 border-gray-200 hover:bg-orange-50'}`}>Employer</button>
                                    <button type="button" onClick={() => setRole('seeker')} className={`w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border text-sm font-semibold transition-all ${role === 'seeker' ? 'bg-orange-600 text-white border-transparent' : 'bg-white text-gray-500 border-gray-200 hover:bg-orange-50'}`}>Job Seeker</button>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                                {errorMessage && (
                                    <div role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                                        {errorMessage}
                                    </div>
                                )}
                                {isSignup && (
                                    <div>
                                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                                        <input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleInputChange} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 sm:text-sm" placeholder="Full Name"/>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleInputChange} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 sm:text-sm" placeholder="Email address"/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleInputChange} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 sm:text-sm" placeholder="Password"/>
                                </div>
                                {isSignup && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                        <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleInputChange} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 sm:text-sm" placeholder="Confirm Password"/>
                                    </div>
                                )}
                                <div>
                                    <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        {isSubmitting ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
                                    </button>
                                </div>
                            </form>
                             <div className="mt-6">
                                <p className="text-sm text-center text-gray-600">
                                    {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                                    <button onClick={() => setMode(isSignup ? 'login' : 'signup')} className="font-bold text-orange-700 hover:text-orange-600">
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
                <div className="absolute inset-0 bg-[#14212b]/80" aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                    <h2 className="text-4xl font-bold">
                        {role === 'employer' ? 'Find the perfect candidate.' : 'Land your dream job.'}
                    </h2>
                    <p className="mt-4 text-lg text-orange-100">
                        {role === 'employer' ? 'Access a global pool of talent and streamline your hiring process with our powerful tools.' : 'Join millions of job seekers and get access to exclusive opportunities from top companies.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;