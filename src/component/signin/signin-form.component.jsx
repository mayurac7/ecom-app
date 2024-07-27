import React, { useState } from 'react'
import { createUserDocumentFromAuth, signInWithGooglePopup, signinAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './signin-form.style.scss'
import Button from '../button/button.component';

const defaultFormField = {
    email: "",
    password: "",
}

export default function SignInForm() {

    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signinAuthUserWithEmailAndPassword(email, password);
            setFormFields(defaultFormField)
        } catch (error) {
            console.log(error);
            if (error.code === "auth/invalid-credential") {
                alert("Incorrect email or password");
            }
        }
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}
