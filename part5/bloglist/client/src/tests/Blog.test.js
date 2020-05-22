import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let blog
  let component
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
    component = render(<Blog blog={blog} />)
  })

  test('renders blogs title and author, but does not render url or likes by default', () => {
    const shown = component.container.querySelector('.expanded')
    expect(shown).toHaveStyle('display: none')
  })

  test('url and number of likes are shown on button click', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const shown = component.container.querySelector('.expanded')
    expect(shown).not.toHaveStyle('display: none')
    expect(shown).toHaveTextContent('test url')
  })
})
