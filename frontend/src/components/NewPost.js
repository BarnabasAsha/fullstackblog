import React, { useState } from 'react'

const initialValues = {
  title: '',
  author: '',
  url: ''
}

const NewPost = ({ createPost }) => {
  const [visibility, setVisibility] = useState(false)
  const [post, setPost] = useState(initialValues)

  const addPost = async (e) => {
    e.preventDefault()
    createPost(post)
    setVisibility(false)
    setPost(initialValues)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setPost({
      ...post,
      [name]: value
    })
  }

  return (
    <div>
      {
        visibility ?
          <form onSubmit={addPost}>
            <input type="text" placeholder="Enter Title" id="post-title" aria-label="Title" name="title" onChange={handleChange} required />
            <input type="text" placeholder="Enter Author" id="post-author" aria-label="Author" name="author" onChange={handleChange} required />
            <input type="text" placeholder="Enter Url" id="post-url" aria-label="Url" name="url" onChange={handleChange} required />
            <button id="add-post" type="submit">Add Post</button>
          </form>
          : <button id="show-addpost" onClick={() => setVisibility(true)}>Add Post</button>
      }
    </div>
  )
}

export default NewPost