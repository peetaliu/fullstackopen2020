import React from 'react'

const BlogForm = props => (
  <>
    <h1>Create New Blog</h1>
    <form onSubmit={props.addBlog}>
      <div>
        Title:
        <input
          type="text"
          value={props.title}
          name="Title"
          onChange={({ target }) => props.setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={props.author}
          name="Author"
          onChange={({ target }) => props.setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={props.url}
          name="Url"
          onChange={({ target }) => props.setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </>
)

export default BlogForm
