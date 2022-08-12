// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg68j9zzgKI2FegWLwdCdoDMhvmjaKVXM",
  authDomain: "crwn-clothing-db-57eee.firebaseapp.com",
  projectId: "crwn-clothing-db-57eee",
  storageBucket: "crwn-clothing-db-57eee.appspot.com",
  messagingSenderId: "988688193125",
  appId: "1:988688193125:web:9efb80b0f883681513188c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

/* Setting the google provider to the google provider object and setting the custom parameters to
select account. */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
}

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

/**
 * This function returns a promise that resolves to the result of calling the signInWithPopup function
 * with the auth and googleProvider objects as arguments.
 * @returns A promise.
 */
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};


/**
 * It takes a collection key and an array of objects to add to the collection, and then it creates a
 * batch write and adds each object to the batch
 * @param {string} collectionKey - string - The name of the collection you want to add the documents
 * to.
 * @param {T[]} objectsToAdd - T[]
 */

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};



/**
 * It creates a user document in the database if it doesn't exist.
 * @param {User} userAuth - User - this is the user object that is returned from the
 * firebase.auth().onAuthStateChanged() method.
 * @param additionalInformation - This is an object that contains any additional information you want
 * to add to the user document.
 * @returns A promise that resolves to a QueryDocumentSnapshot<UserData>
 */
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error createing user", error);
    }
  }

  return userSnapShot as QueryDocumentSnapshot<UserData>;
};



export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data() as Category);
};

/**
 * It returns a promise that resolves to the current user or null
 * @returns A promise that resolves to a user object or null.
 */
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
