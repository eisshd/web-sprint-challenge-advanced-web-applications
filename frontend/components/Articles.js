import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosWithAuth from '../axios'

export default function Articles(props) {
  // ✨ where are my props? Destructure them here
  const {getArticles, deleteArticle, articles, setCurrentArticleId, currentArticleId, currentArticle, setCurrentArticle} = props
  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
 
  useEffect(() => {
    // ✨ grab the articles here, on first render only
    getArticles()
  }, [])

  const onClickEdit = (id) => {
    setCurrentArticleId(id)
    const current = articles.filter(article => article.article_id === id)
    console.log(current[0])
    setCurrentArticle(current[0])
  //   axiosWithAuth().put(`/articles/${id}`, currentArticle)
  //   .then(res => {
  //    setCurrentArticle(res.data)
  //    console.log(res.data)
  //  })
  //   .catch(err => console.log(err))
  
  }

  const onClickDelete = (id) => {
        deleteArticle(id)
  }

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {
        !articles.length
          ? 'No articles yet'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button disabled={false} onClick={e => onClickEdit(art.article_id)}>Edit</button>
                  <button disabled={false} onClick={e => onClickDelete(art.article_id)}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
