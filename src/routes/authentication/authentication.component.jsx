import React from 'react'
import './authentication.style.scss'
import SignUpForm from '../../component/signup/signup-form.component';
import SignInForm from '../../component/signin/signin-form.component';

export default function Authentication() {

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}
