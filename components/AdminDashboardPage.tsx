import React, { useEffect, useState } from 'react';
import { AdminJob, AdminUser, deleteAdminJob, getAdminJobs, getAdminUsers, updateUserStatus } from '../services/adminService';
import { User } from '../types';

const AdminDashboardPage: React.FC<{ user: User }> = ({ user }) => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [jobs, setJobs] = useState<AdminJob[]>([]);
    const [error, setError] = useState('');

    const loadData = async () => {
        try {
            const [loadedUsers, loadedJobs] = await Promise.all([getAdminUsers(), getAdminJobs()]);
            setUsers(loadedUsers);
            setJobs(loadedJobs);
        } catch (loadError) {
            console.error('Failed to load admin data:', loadError);
            setError('Management data could not be loaded. Check your admin permissions.');
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleStatus = async (target: AdminUser) => {
        const nextStatus = target.status === 'suspended' ? 'active' : 'suspended';
        await updateUserStatus(target.id, nextStatus);
        setUsers(current => current.map(item => item.id === target.id ? { ...item, status: nextStatus } : item));
    };

    const handleDeleteJob = async (job: AdminJob) => {
        if (!window.confirm(`Delete ${job.title} at ${job.company}?`)) return;
        await deleteAdminJob(job.id);
        setJobs(current => current.filter(item => item.id !== job.id));
    };

    return (
        <div className="min-h-[calc(100vh-72px)] bg-slate-100 p-4 sm:p-6 lg:p-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Jobsarv operations</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Admin control center</h1><p className="mt-2 text-slate-500">Manage members and job listings from one secure workspace.</p></div>
                    <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">Signed in as {user.email}</span>
                </div>
                {error && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}
                <div className="mb-6 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total users</p><p className="mt-1 text-3xl font-bold text-slate-900">{users.length}</p></div><div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Published jobs</p><p className="mt-1 text-3xl font-bold text-slate-900">{jobs.length}</p></div><div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Active members</p><p className="mt-1 text-3xl font-bold text-orange-600">{users.filter(item => item.status === 'active').length}</p></div></div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="rounded-xl bg-white p-5 shadow-sm"><h2 className="mb-4 text-xl font-bold text-slate-900">Members</h2><div className="space-y-3">{users.map(item => <div key={item.id} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3"><div className="min-w-0"><p className="truncate font-semibold text-slate-800">{item.fullName || item.email}</p><p className="truncate text-sm text-slate-500">{item.email} · {item.role}</p></div>{item.role !== 'admin' && <button onClick={() => handleStatus(item)} className="shrink-0 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700">{item.status === 'suspended' ? 'Activate' : 'Suspend'}</button>}</div>)}</div></section>
                    <section className="rounded-xl bg-white p-5 shadow-sm"><h2 className="mb-4 text-xl font-bold text-slate-900">Job listings</h2><div className="space-y-3">{jobs.map(item => <div key={item.id} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3"><div className="min-w-0"><p className="truncate font-semibold text-slate-800">{item.title}</p><p className="truncate text-sm text-slate-500">{item.company} · {item.location}</p></div><button onClick={() => handleDeleteJob(item)} className="shrink-0 rounded-md border border-red-100 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">Delete</button></div>)}</div></section>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
