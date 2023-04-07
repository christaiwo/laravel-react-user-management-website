import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
    }).catch(err => {
      // console.log(err);
      const response = err.response;

      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    })
  }
  return (
      <form className="animated fadeInDown" onSubmit={onSubmit}>
          <h1 className="title">
            Sign up for  account
          </h1>
          {errors && 
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already Registered? <Link to="/login" >Sign in</Link> 
          </p>
      </form>
  )
}