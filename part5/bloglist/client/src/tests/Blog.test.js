import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  test('renders blogs title and author, but does not render url or likes by default', () => {
    const blog = {
      user: {
        username: 'test username',
        name: 'tester',
      },
      likes: 0,
      author: 'test author',
      title: 'test title',
      url: 'test url',
    }

    const component = render(<Blog blog={blog} />)

    const shown = component.container.querySelector('.expanded')
    expect(shown).toHaveStyle('Display: none')
  })
})
