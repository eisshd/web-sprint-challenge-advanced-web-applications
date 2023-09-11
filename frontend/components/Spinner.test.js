// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import Spinner from "./Spinner";
import React from 'react'
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { setupServer, getHandlers } from '../../backend/mock-server'
import { st } from '../../backend/helpers'
import App from './App'

jest.setTimeout(750) // default 5000 too long for Codegrade
const waitForOptions = { timeout: 150 }
const queryOptions = { exact: false }

const renderApp = ui => {
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}
let server
beforeAll(() => {
  server = setupServer(...getHandlers())
  server.listen()
})
afterAll(() => {
  server.close()
})
beforeEach(() => {
  renderApp(<BrowserRouter><App /></BrowserRouter>)
})
afterEach(() => {
  server.resetHandlers(...getHandlers())
})

const token = () => window.localStorage.getItem('token')
const logoutBtn = () => screen.queryByText('Logout from app')
// login screen
const usernameInput = () => screen.queryByPlaceholderText('Enter username')
const passwordInput = () => screen.queryByPlaceholderText('Enter password')
const loginBtn = () => screen.queryByText('Submit credentials')
// articles screen
const articlesLink = () => screen.queryByRole('link', { name: 'Articles' })
const titleInput = () => screen.queryByPlaceholderText('Enter title')
const textInput = () => screen.queryByPlaceholderText('Enter text')
const topicSelect = () => screen.queryByRole('combobox')
const submitArticleBtn = () => screen.queryByText('Submit')
// spinner
const spinner = () => screen.queryByText('Please wait...')

const loginFlow = async () => {
  fireEvent.change(usernameInput(), { target: { value: 'Foo' } })
  fireEvent.change(passwordInput(), { target: { value: '12345678' } })
  fireEvent.click(loginBtn())
  await screen.findByText(st.closuresTitle, queryOptions, waitForOptions)
  await screen.findByText('Here are your articles, Foo!', queryOptions, waitForOptions)
}

describe('Spinner Test', () => {
  test('Spinner turns on and off when logging in', () => {
    fireEvent.change(usernameInput(), { target: { value: 'Foo' } })
    fireEvent.change(passwordInput(), { target: { value: '12345678' } })
    fireEvent.click(loginBtn())
  })
})