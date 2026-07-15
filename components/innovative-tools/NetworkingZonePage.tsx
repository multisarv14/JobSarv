import React from 'react';
import { MOCK_NETWORKING_PROFILES } from '../../constants';
import { NetworkingProfile } from '../../types';

const ProfileCard: React.FC<{ profile: NetworkingProfile }> = ({ profile }) => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center transform hover:-translate-y-1 transition-transform duration-300">
        <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg" />
        <h3 className="mt-4 text-xl font-bold text-gray-800">{profile.name}</h3>
        <p className="text-indigo-600 font-semibold">{profile.title}</p>
        <p className="text-gray-500 text-sm">{profile.company}</p>
        <p className="text-gray-400 text-xs mt-1">{profile.location}</p>
        <button className="mt-4 w-full py-2 px-4 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition-colors">
            Connect
        </button>
    </div>
);

const NetworkingZonePage: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Networking Zone</h1>
                    <p className="mt-4 text-lg text-gray-600">Expand your professional network and connect with industry leaders.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <input type="text" placeholder="Search by name, title, or company..." className="w-full md:flex-1 p-2 border border-gray-300 rounded-md" />
                    <select className="w-full md:w-auto p-2 border border-gray-300 rounded-md">
                        <option>All Industries</option>
                        <option>Technology</option>
                        <option>Marketing</option>
                        <option>Design</option>
                        <option>AI/ML</option>
                    </select>
                    <button className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Search</button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {MOCK_NETWORKING_PROFILES.map(profile => (
                        <ProfileCard key={profile.id} profile={profile} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NetworkingZonePage;
