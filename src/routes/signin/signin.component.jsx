import React from 'react'
import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

export default function SignIn() {

  const logGoogleUser = async ()=>{
    const { user } = await signInWithGooglePopup();
     const userDocRef = await createUserDocumentFromAuth(user);
  }
  return (
    <div>
      <h1>SIgnIn</h1>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
    </div>
  )
}
