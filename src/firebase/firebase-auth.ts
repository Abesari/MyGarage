import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email: string, password: string, role: string = 'user') => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Create the user document in Firestore
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    role,
    createdAt: new Date().toISOString()
  });

  return userCredential;
};

export const logoutUser = () => signOut(auth);