import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const getUserData = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserRole = async (uid: string, role: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { role });
};