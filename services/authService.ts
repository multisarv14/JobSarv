import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    type User as FirebaseUser,
} from 'firebase/auth';
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from '../types';

const userDocument = (uid: string) => doc(db, 'users', uid);

const toAppUser = (firebaseUser: FirebaseUser, profile?: Partial<User>): User => ({
    fullName: profile?.fullName || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Jobsarv User',
    email: firebaseUser.email || profile?.email || '',
    role: profile?.role === 'admin' ? 'admin' : profile?.role === 'employer' ? 'employer' : 'seeker',
    plan: profile?.plan || (profile?.role === 'employer' ? 'Free Employer' : 'Free Seeker'),
});

export const signUp = async (fullName: string, email: string, password: string, role: User['role']) => {
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(credential.user, { displayName: fullName.trim() });

    const profile: User = {
        fullName: fullName.trim(),
        email: credential.user.email || email.trim(),
        role,
        plan: role === 'employer' ? 'Free Employer' : 'Free Seeker',
    };

    await setDoc(userDocument(credential.user.uid), {
        ...profile,
        uid: credential.user.uid,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return profile;
};

export const signIn = async (email: string, password: string, role: User['role'] = 'seeker') => {
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const snapshot = await getDoc(userDocument(credential.user.uid));

    if (!snapshot.exists()) {
        const profile: User = {
            fullName: credential.user.displayName || credential.user.email?.split('@')[0] || 'Jobsarv User',
            email: credential.user.email || email.trim(),
            role,
            plan: role === 'employer' ? 'Free Employer' : 'Free Seeker',
        };

        await setDoc(userDocument(credential.user.uid), {
            ...profile,
            uid: credential.user.uid,
            status: 'active',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return profile;
    }

    const profile = snapshot.data() as Partial<User> & { status?: string };
    if (profile.status === 'suspended' || profile.status === 'deleted') {
        await signOut(auth);
        throw new Error('This account is currently unavailable.');
    }

    return toAppUser(credential.user, profile);
};

export const logout = () => signOut(auth);

export const getCurrentUserProfile = async (firebaseUser: FirebaseUser) => {
    const snapshot = await getDoc(userDocument(firebaseUser.uid));
    return snapshot.exists() ? toAppUser(firebaseUser, snapshot.data() as Partial<User>) : null;
};
