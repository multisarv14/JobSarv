import React, { useState } from 'react';
import { Project } from '../../types';

interface PortfolioBuilderPageProps {}

const PortfolioBuilderPage: React.FC<PortfolioBuilderPageProps> = () => {
    const [projects, setProjects] = useState<Project[]>([
        { id: 'proj1', name: 'E-commerce Platform', description: 'A full-stack e-commerce site built with React and Node.js.', link: 'https://example.com/project1' }
    ]);
    const [newProject, setNewProject] = useState({ name: '', description: '', link: '' });

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.name || !newProject.description) return;
        setProjects([...projects, { ...newProject, id: `proj${Date.now()}` }]);
        setNewProject({ name: '', description: '', link: '' });
    };

    const handleDeleteProject = (id: string) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    return (
        <div className="bg-gray-50 min-h-screen animate-fade-in">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Portfolio Builder</h1>
                    <p className="mt-4 text-lg text-gray-600">Showcase your best work to impress employers.</p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Project</h2>
                    <form onSubmit={handleAddProject} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Project Name</label>
                            <input 
                                type="text" 
                                value={newProject.name}
                                onChange={e => setNewProject({...newProject, name: e.target.value})}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                                required
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Project Description</label>
                            <textarea 
                                value={newProject.description}
                                onChange={e => setNewProject({...newProject, description: e.target.value})}
                                rows={3}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Project Link (Optional)</label>
                            <input 
                                type="url"
                                value={newProject.link}
                                onChange={e => setNewProject({...newProject, link: e.target.value})}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="text-right">
                            {/* FIX: The original file was truncated here. Completed the component structure and added the default export. */}
                            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                                Add Project
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h2>
                    {projects.length > 0 ? (
                        <div className="space-y-6">
                            {projects.map(project => (
                                <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
                                        <p className="text-gray-600 mt-1">{project.description}</p>
                                        {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">View Project</a>}
                                    </div>
                                    <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full flex-shrink-0 ml-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-100 rounded-lg">
                             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">No projects yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Add your first project using the form above.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PortfolioBuilderPage;
