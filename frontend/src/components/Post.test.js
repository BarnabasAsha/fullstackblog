import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Post from './Post'

const post = {
  title: 'Fundamental of React',
  author: 'Jason Langloff',
  url: 'fundamentals.com',
  likes: 2
}

test('renders content', () => {

  const component = render(
    <Post {...post} />
  )

  component.debug()

  expect(component.container).toHaveTextContent('Fundamental of React')
})

test('clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Post {...post} updateLike={mockHandler} />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})