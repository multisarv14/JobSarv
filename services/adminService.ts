import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export interface AdminUser {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
}

export interface AdminJob {
    id: string;
    title: string;
    company: string;
    location: string;
    employerId: string;
}

export const getAdminUsers = async (): Promise<AdminUser[]> => {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map(item => ({ id: item.id, ...(item.data() as Omit<AdminUser, 'id'>) }));
};

export const getAdminJobs = async (): Promise<AdminJob[]> => {
    const snapshot = await getDocs(query(collection(db, 'jobs'), orderBy('createdAt', 'desc')));
    return snapshot.docs.map(item => ({ id: item.id, ...(item.data() as Omit<AdminJob, 'id'>) }));
};

export const updateUserStatus = (userId: string, status: string) => updateDoc(doc(db, 'users', userId), { status });
export const deleteAdminJob = (jobId: string) => deleteDoc(doc(db, 'jobs', jobId));
