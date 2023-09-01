import React, { useState } from 'react'
import PT from 'prop-types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const navigate = useNavigate()
  // ✨ where are my props? Destructure them here
  props = {values}

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value.trim() })
    console.log(values)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    axios.post('http://localhost:9000/api/login' , values)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      navigate(`/articles`)
    })
  }

  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    if(values.username.trim().length >= 3 && values.password.trim().length >=8){
      return false
    } else return true
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
