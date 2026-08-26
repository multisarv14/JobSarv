import React, { useState, useRef, useEffect } from 'react';
import { Page, User } from '../types';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    user: User | null;
    onLogout: () => void;
    setDashboardSection: (section: string) => void;
}

const NavLink: React.FC<{
    page: Page;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    children: React.ReactNode;
    className?: string;
}> = ({ page, currentPage, setCurrentPage, children, className = '' }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                ? 'text-white bg-orange-600'
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            } ${className}`}
        >
            {children}
        </button>
    );
};

const DropdownMenu: React.FC<{
    title: string;
    pages: { page: Page; label: string }[];
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}> = ({ title, pages, currentPage, setCurrentPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const pageEnums = pages.map(p => p.page);
    const isActive = pageEnums.includes(currentPage);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                    ? 'text-white bg-orange-600'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
            >
                <span>{title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    {pages.map(({ page, label }) => (
                         <NavLink key={page} page={page} currentPage={currentPage} setCurrentPage={setCurrentPage} className="w-full text-left !font-normal">
                            {label}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

const MobileNavLink: React.FC<{
    page: Page;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    children: React.ReactNode;
    onClick: () => void;
}> = ({ page, currentPage, setCurrentPage, children, onClick }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => { setCurrentPage(page); onClick(); }}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
        >
            {children}
        </button>
    );
};

const MobileDropdown: React.FC<{
    title: string;
    pages: { page: Page; label: string }[];
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    closeMenu: () => void;
}> = ({ title, pages, currentPage, setCurrentPage, closeMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pageEnums = pages.map(p => p.page);
    const isActive = pageEnums.includes(currentPage);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
            >
                <span>{title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <div className="pl-4 mt-1 space-y-1">
                    {pages.map(({ page, label }) => (
                        <MobileNavLink key={page} page={page} currentPage={currentPage} setCurrentPage={setCurrentPage} onClick={closeMenu}>
                            {label}
                        </MobileNavLink>
                    ))}
                </div>
            )}
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, user, onLogout, setDashboardSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const handlePostJobClick = () => {
        if (user?.role === 'employer') {
            setDashboardSection('post-job-section');
            setCurrentPage(Page.EmployerDashboard);
        } else {
            setCurrentPage(Page.EmployerSignUp);
        }
    };

    const resourcesPages = [
        { page: Page.EventsWebinars, label: 'Events & Webinars' },
        { page: Page.CareerBlogs, label: 'Career Blogs' },
        { page: Page.ScholarshipsGrants, label: 'Scholarships & Grants' },
        { page: Page.CommunityForum, label: 'Community Forum' },
        { page: Page.DiversityInclusion, label: 'Diversity & Inclusion' },
    ];

    const careerToolsPages = [
        { page: Page.ResumeBuilder, label: 'Resume Builder' },
        { page: Page.CareerCoachAI, label: 'Career Coach AI' },
        { page: Page.SkillHub, label: 'Skill Hub' },
        { page: Page.PortfolioBuilder, label: 'Portfolio Builder' },
        { page: Page.NetworkingZone, label: 'Networking Zone' },
        { page: Page.SalaryInsights, label: 'Salary Insights' },
    ];

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 max-w-[1440px] mx-auto">
                    <div className="flex items-center">
                        <button onClick={() => setCurrentPage(Page.Home)} className="flex-shrink-0 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                             <span className="text-2xl font-bold tracking-tight text-gray-900">JobSarv</span>
                        </button>
                    </div>
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavLink>
                        <NavLink page={Page.FindJobs} currentPage={currentPage} setCurrentPage={setCurrentPage}>Find Jobs</NavLink>
                        <DropdownMenu title="Career Tools" pages={careerToolsPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        <NavLink page={Page.Companies} currentPage={currentPage} setCurrentPage={setCurrentPage}>Companies</NavLink>
                        <DropdownMenu title="Resources" pages={resourcesPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        <NavLink page={Page.PlansPricing} currentPage={currentPage} setCurrentPage={setCurrentPage}>Pricing</NavLink>
                         {user?.role === 'admin' && (
                             <NavLink page={Page.AdminDashboard} currentPage={currentPage} setCurrentPage={setCurrentPage}>Admin</NavLink>
                         )}
                         {user?.role === 'employer' && (
                             <NavLink page={Page.EmployerDashboard} currentPage={currentPage} setCurrentPage={setCurrentPage}>Dashboard</NavLink>
                         )}
                          {user?.role === 'seeker' && (
                             <NavLink page={Page.JobSeekerDashboard} currentPage={currentPage} setCurrentPage={setCurrentPage}>Dashboard</NavLink>
                         )}
                    </nav>
                    <div className="hidden md:flex items-center space-x-3">
                         {user ? (
                             <div className="relative">
                                {user.role === 'employer' && (
                                     <button onClick={handlePostJobClick} className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-orange-700 bg-orange-50 border border-orange-100 rounded-md hover:bg-orange-100 transition-colors">
                                        Post a Job
                                    </button>
                                )}
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span>{user.fullName}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                                        <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Log Out
                                        </button>
                                    </div>
                                )}
                             </div>
                         ) : (
                            <>
                                <button onClick={handlePostJobClick} className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-orange-700 bg-orange-50 border border-orange-100 rounded-md hover:bg-orange-100 transition-colors">
                                    Post a Job for Free
                                </button>
                                <button onClick={() => setCurrentPage(Page.Login)} className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                                    Log In
                                </button>
                                <button onClick={() => setCurrentPage(Page.SignUp)} className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 transition-colors">
                                    Free Sign Up
                                </button>
                            </>
                         )}
                    </div>
                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink page={Page.Home} currentPage={currentPage} setCurrentPage={setCurrentPage} onClick={closeMobileMenu}>Home</MobileNavLink>
                        <MobileNavLink page={Page.FindJobs} currentPage={currentPage} setCurrentPage={setCurrentPage} onClick={closeMobileMenu}>Find Jobs</MobileNavLink>
                        <MobileNavLink page={Page.Companies} currentPage={currentPage} setCurrentPage={setCurrentPage} onClick={closeMobileMenu}>Companies</MobileNavLink>
                        
                        {user?.role === 'admin' && <MobileNavLink page={Page.AdminDashboard} currentPage={currentPage} setCurrentPage={setCurrentPage} onClick={closeMobileMenu}>Admin</MobileNavLink>}
                        {user?.role === 'employer' && <MobileNavLink page={Page.EmployerDashboard} currentPage={currentPage} setCurrentPage={setCurrentPage} onClick={closeMobileMenu}>Dashboard</MobileNavLink>}
                        {user?.role === 'seeker' && <MobileNavLink page={Page.JobSeekerDashboard} currentPage={currentPage} setCurrentPage={setCurrentPage} onClick={closeMobileMenu}>Dashboard</MobileNavLink>}
                        
                        <MobileDropdown title="Career Tools" pages={careerToolsPages} currentPage={currentPage} setCurrentPage={setCurrentPage} closeMenu={closeMobileMenu} />
                        <MobileDropdown title="Resources" pages={resourcesPages} currentPage={currentPage} setCurrentPage={setCurrentPage} closeMenu={closeMobileMenu} />

                        <MobileNavLink page={Page.PlansPricing} currentPage={currentPage} setCurrentPage={setCurrentPage} onClick={closeMobileMenu}>Pricing</MobileNavLink>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                            {user ? (
                                <>
                                    <div className="flex items-center px-3 mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">{user.fullName}</div>
                                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                         {user.role === 'employer' && (
                                            <button onClick={() => { handlePostJobClick(); closeMobileMenu(); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                                Post a Job
                                            </button>
                                        )}
                                        <button onClick={() => { onLogout(); closeMobileMenu(); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                            Log Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <button onClick={() => { handlePostJobClick(); closeMobileMenu(); }} className="block w-full text-center px-4 py-2 text-base font-medium text-indigo-600 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200">
                                        Post a Job for Free
                                    </button>
                                    <button onClick={() => { setCurrentPage(Page.Login); closeMobileMenu(); }} className="block w-full text-center px-4 py-2 text-base font-medium text-indigo-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                                        Log In
                                    </button>
                                    <button onClick={() => { setCurrentPage(Page.SignUp); closeMobileMenu(); }} className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                                        Free Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
