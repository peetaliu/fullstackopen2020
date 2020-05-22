import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import NoteForm from '../../../../../courseMaterial/noteApp/client/src/components/NoteForm'

describe('<Blog />', () => {
  let blog
  beforeEach(() => {
    blog = {
      user: {
        username: 'test username',
        name: 'tester',
      },
      likes: 0,
      author: 'test author',
      title: 'test title',
      url: 'test url',
    }
  })

  test('renders blogs title and author, but does not render url or likes by default', () => {
    const component = render(<Blog blog={blog} />)
    const shown = component.container.querySelector('.expanded')
    expect(shown).toHaveStyle('display: none')
  })

  test('url and number of likes are shown on button click', () => {
    const component = render(<Blog blog={blog} />)
    const button = component.getByText('view')
    fireEvent.click(button)

    const shown = component.container.querySelector('.expanded')
    expect(shown).not.toHaveStyle('display: none')
    expect(shown).toHaveTextContent('test url')
  })

  test('clicking button twice will fire event handler twice', () => {
    const updateBlog = jest.fn()
    const component = render(<Blog blog={blog} updateBlog={updateBlog} />)
    const button = component.getByText('like')
    fireEvent.click(button)
    expect(updateBlog.mock.calls).toHaveLength(1)
    fireEvent.click(button)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})

test('adding new blog calls event handler received as props, with correct details', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('.blogForm')

  fireEvent.change(author, {
    target: { value: 'test submit author' },
  })
  fireEvent.change(title, {
    target: { value: 'test submit title' },
  })
  fireEvent.change(url, {
    target: { value: 'test submit url' },
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength[1]
  expect(createBlog.mock.calls[0][0].author).toBe('test submit author')
  expect(createBlog.mock.calls[0][0].title).toBe('test submit title')
  expect(createBlog.mock.calls[0][0].url).toBe('test submit url')
})
