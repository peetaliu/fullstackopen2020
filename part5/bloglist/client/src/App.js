import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setErrorMessage('Logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const createBlog = async blogObj => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObj)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    } catch (exception) {
      setErrorMessage('Error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async blogObj => {
    try {
      await blogService.updateBlog(blogObj)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setErrorMessage(
        `added like to blog: ${blogObj.title}. Total likes now at: ${
          blogObj.likes + 1
        }`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error updating likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async blog => {
    console.log('blogId for del: ', blog.id)
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs)
        setErrorMessage(`Deleted blog: ${blog.title}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('error deleting blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            Logged in as {user.name}
            <button onClick={handleLogout}>Logout</button>
          </p>

          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => {
          let loggedUsername = null
          if (user) {
            loggedUsername = user.username
          }
          return (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              username={loggedUsername}
            />
          )
        })}
    </div>
  )
}

export default App
