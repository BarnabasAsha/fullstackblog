import React from 'react'
import { updatePost, deletePost } from '../services/postservice'

const Post = ({ id, title, author, url, likes }) => {
  // const [like, setLike] = useState(null)

  const handleLike = async () => {
    try {
      await updatePost(id, { likes: Number(likes) + 1 })
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleDelete = async () => {
    console.log(id)
    const response = confirm(`Are you sure you want to delete ${title} by ${author}`)
    if(response){
      try {
        await deletePost(id)
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  return (
    <li>
      <a href={url}>
        <h3>{title}</h3>
      </a>
      <p>{author}</p>
      <p>{likes} likes</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default Post