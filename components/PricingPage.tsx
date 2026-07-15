import React from 'react';
import { Plan } from '../types';
import { JOB_SEEKER_PLANS, EMPLOYER_PLANS } from '../constants';

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => (
    <div className={`border rounded-lg shadow-lg p-8 flex flex-col ${plan.isPopular ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'}`}>
        {plan.isPopular && (
            <div className="text-center">
                <span className="inline-block bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">Most Popular</span>
            </div>
        )}
        <h3 className="text-2xl font-semibold text-gray-800 text-center mt-4">{plan.name}</h3>
        <div className="mt-4 text-center text-gray-900">
            <span className="text-4xl font-extrabold">{plan.price.startsWith('$') ? plan.price.split(' ')[0] : plan.price}</span>
            {plan.price.startsWith('$') && <span className="text-base font-medium text-gray-500">{plan.price.split(' ').slice(1).join(' ')}</span>}
        </div>
        <ul className="mt-6 space-y-4 text-gray-600">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">{feature}</span>
                </li>
            ))}
        </ul>
        <div className="mt-auto pt-6">
            <button
                className={`w-full px-6 py-3 text-base font-medium rounded-md transition-colors ${
                    plan.isPopular
                        ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                        : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                }`}
            >
                Choose Plan
            </button>
        </div>
    </div>
);


const PricingPage: React.FC = () => {
    return (
        <div className="bg-white animate-fade-in">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
                        Our Pricing Plans
                    </h1>
                    <p className="mt-5 text-xl text-gray-500">
                        Choose the perfect plan to accelerate your career or hiring process.
                    </p>
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">For Job Seekers</h2>
                     <div className="max-w-lg mx-auto grid gap-8 lg:grid-cols-2 lg:max-w-none">
                        {JOB_SEEKER_PLANS.map(plan => (
                            <PlanCard key={plan.name} plan={plan} />
                        ))}
                    </div>
                </div>

                 <div className="mt-20">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">For Employers</h2>
                     <div className="max-w-lg mx-auto grid gap-8 lg:grid-cols-2 lg:max-w-none">
                        {EMPLOYER_PLANS.map(plan => (
                            <PlanCard key={plan.name} plan={plan} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;