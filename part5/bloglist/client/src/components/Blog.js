import React, { useState } from 'react'

const Blog = props => {
  const blog = props.blog
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const checkOwnership = () => {
    return props.username === blog.user.username ? true : false
  }
  const showIfOwned = { display: checkOwnership() ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }
  const addLike = () => {
    props.updateBlog(blog)
  }
  const deleteBlog = () => {
    props.deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisible}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisible}>close</button>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={deleteBlog} style={showIfOwned}>
          delete
        </button>
      </div>
    </div>
  )
}

export default Blog
