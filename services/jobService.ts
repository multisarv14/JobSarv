import {
    addDoc,
    collection,
    getDocs,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Job } from '../types';

const jobsCollection = collection(db, 'jobs');

const toJob = (id: string, data: Record<string, unknown>): Job => ({
    id: typeof data.id === 'number' ? data.id : Number(id),
    title: String(data.title || ''),
    company: String(data.company || ''),
    logo: String(data.logo || `https://picsum.photos/seed/${id}/100`),
    location: String(data.location || ''),
    type: data.type as Job['type'],
    workModel: data.workModel as Job['workModel'],
    salary: String(data.salary || ''),
    minSalary: Number(data.minSalary || 0),
    maxSalary: Number(data.maxSalary || 0),
    experienceLevel: data.experienceLevel as Job['experienceLevel'],
    description: String(data.description || ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    recommended: data.recommended === true,
    region: data.region as Job['region'],
});

export const getJobs = async (): Promise<Job[]> => {
    const snapshot = await getDocs(jobsCollection);
    return snapshot.docs
        .map(document => toJob(document.id, document.data()))
        .sort((first, second) => second.id - first.id);
};

export const createJob = async (job: Omit<Job, 'id'>, employerId: string) => {
    const id = Date.now();
    await addDoc(jobsCollection, {
        ...job,
        id,
        employerId,
        createdAt: serverTimestamp(),
    });
    return id;
};