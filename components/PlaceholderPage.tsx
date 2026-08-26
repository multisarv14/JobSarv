import React from 'react';

interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    return (
        <div className="min-h-[calc(100vh-250px)] flex flex-col items-center justify-center text-center bg-gray-50 p-8 animate-fade-in">
            <div className="max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l-.477-2.387zM12 12a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                    <h1 className="mt-8 text-4xl font-extrabold text-gray-800 tracking-tight">{title}</h1>
                    <p className="mt-4 text-lg text-gray-600">We are preparing a focused workspace for this part of your career journey.</p>
                    <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700">Coming soon to your workspace</div>
            </div>
        </div>
    );
};

export default PlaceholderPage;