import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children })=>{

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListner(async (user)=>{
            if(user){
                await createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)
        });
        return unsubscribe;
    }, [])

    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}