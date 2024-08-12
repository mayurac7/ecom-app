import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querrySnapshot = await getDocs(q);
    const categoryMap = querrySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc
    }, [])
    return categoryMap;
}  

const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) {return}
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={})=>{
    const userDocRef = doc(db, 'user', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
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
            console.log("Error Creating the user", error.message);
        }
    }
    return userDocRef;
}

export const signinAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password) {return}
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async ()=>{
    await signOut(auth);
}

export const onAuthStateChangedListner = (callback)=>{
    onAuthStateChanged(auth, callback);
}