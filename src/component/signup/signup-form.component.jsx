import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './signup-form.style.scss'
import Button from '../button/button.component';

const defaultFormField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export default function SignUpForm() {

    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert("Password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            setFormFields(defaultFormField);
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                alert("You already have an account. Please Login");
            }
            console.log("Error", error);
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}
