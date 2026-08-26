import React, { useMemo, useState } from 'react';
import { MOCK_SCHOLARSHIPS } from '../../constants';
import { Scholarship } from '../../types';

const ScholarshipCard: React.FC<{ item: Scholarship }> = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transform hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
            <div className="mb-4">
                 <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{item.fieldOfStudy}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-600 font-medium">Provided by <span className="text-gray-800">{item.provider}</span></p>
            
            <div className="mt-4 flex justify-between items-baseline bg-gray-50 p-4 rounded-lg">
                <div>
                    <p className="text-sm font-semibold text-gray-500">Amount</p>
                    <p className="text-2xl font-extrabold text-indigo-600">{item.amount}</p>
                </div>
                 <div>
                    <p className="text-sm font-semibold text-gray-500 text-right">Deadline</p>
                    <p className="text-md font-bold text-red-600">{item.deadline}</p>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
             <button className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
                Apply Now
            </button>
        </div>
    </div>
);


const ScholarshipsGrantsPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [field, setField] = useState('All Fields of Study');
    const scholarships = useMemo(() => MOCK_SCHOLARSHIPS.filter(item => {
        const matchesSearch = `${item.title} ${item.provider}`.toLowerCase().includes(search.toLowerCase());
        return matchesSearch && (field === 'All Fields of Study' || item.fieldOfStudy === field);
    }), [search, field]);

    return (
        <div className="bg-gray-50 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Scholarships & Grants</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Find funding opportunities to support your education and career goals.
                    </p>
                </div>

                <div className="mt-12 bg-white rounded-lg shadow p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <input value={search} onChange={event => setSearch(event.target.value)} type="text" placeholder="Search by title or provider..." className="w-full md:flex-1 p-2 border border-gray-300 rounded-md" />
                     <select value={field} onChange={event => setField(event.target.value)} className="w-full md:w-auto p-2 border border-gray-300 rounded-md">
                        <option>All Fields of Study</option>
                        <option>Technology</option>
                        <option>Design</option>
                        <option>AI/ML</option>
                        <option>Business</option>
                    </select>
                    <button className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Search</button>
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {scholarships.map(item => (
                        <ScholarshipCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScholarshipsGrantsPage;
