import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto">
            {icon}
        </div>
        <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-600">{description}</p>
    </div>
);


const HireViaWhatsAppPage: React.FC = () => {
    return (
        <div className="bg-gray-50 animate-fade-in">
            {/* Hero Section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                        Hire Faster with <span className="text-green-500">WhatsApp</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
                        Connect with candidates directly, schedule interviews, and make offers all within the world's most popular messaging app.
                    </p>
                    <div className="mt-10">
                        <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg transform hover:scale-105">
                            Get Started for Free
                        </button>
                    </div>
                </div>
            </section>
            
            {/* How it works section */}
            <section className="py-20">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Connect in 3 Simple Steps</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            A seamless process to streamline your hiring workflow.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-10 md:grid-cols-3">
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>}
                            title="1. Post Your Job"
                            description="Create your job listing and enable the 'Hire via WhatsApp' option to attract actively engaged candidates."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                            title="2. Chat Instantly"
                            description="Receive applications directly in your WhatsApp. Screen candidates, answer questions, and build rapport in real-time."
                        />
                        <FeatureCard 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            title="3. Hire with Confidence"
                            description="Schedule interviews, send offers, and confirm acceptance instantly. Reduce time-to-hire by up to 50%."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HireViaWhatsAppPage;
