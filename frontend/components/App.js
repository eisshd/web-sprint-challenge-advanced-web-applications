import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/login') }
  const redirectToArticles = () => { navigate('/articles') }

  const logout = () => {
    // ✨ implement
    const token = localStorage.getItem('token')
        axios.post('http://localhost:9000/api/login', {}, {
            headers: {
                authorization: token
            }
        })
    // If a token is in local storage it should be removed,
    .then (res => {
      localStorage.removeItem('token')
    // and a message saying "Goodbye!" should be set in its proper state. 
      setMessage('Goodbye!')
    // In any case, we should redirect the browser back to the login screen, using the helper above.
      redirectToLogin
  })
}

  const login = ({ username, password }) => {
    // ✨ implement
    const login = {username, password}
    // We should flush the message state,
    setMessage('')
    // turn on the spinner,
    setSpinnerOn(true)
    // and launch a request to the proper endpoint.
    axios.post(loginUrl, login)
    // On success, we should set the token to local storage in a 'token' key,
    .then(res => {
      localStorage.setItem('token', res.data.payload)    
    // put the server success message in its proper state,
      setMessage('')
    // and redirect to the Articles screen. 
      redirectToArticles
    // Don't forget to turn off the spinner!
      setSpinnerOn(false)
    })
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state,
    setMessage('')
    // turn on the spinner
    setSpinnerOn(true)
    // and launch an authenticated request to the proper endpoint.
    axios.get(articlesUrl)
    .then(res => {
    // On success, we should set the articles in their proper state and
    setArticles([])  
    // put the server success message in its proper state.
    setMessage('')
    })
    .catch(res => {
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    if(res.data.message === '401'){
      return redirectToLogin
    }})
    // Don't forget to turn off the spinner!
    setSpinnerOn(false)
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="/articles" element={
            <>
              <ArticleForm />
              <Articles />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
