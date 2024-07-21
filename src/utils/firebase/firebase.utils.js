import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup,  } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBdK6KHKXAeYhXky_FjRhFztEY-Me2pWqs",
  authDomain: "ecom-app-dc8e4.firebaseapp.com",
  projectId: "ecom-app-dc8e4",
  storageBucket: "ecom-app-dc8e4.appspot.com",
  messagingSenderId: "223882604764",
  appId: "1:223882604764:web:4df4c91f3af07a3b49c419"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
}

export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db, 'user', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("Error Creating the user", error.message);
        }
    }
    return userDocRef;
}
