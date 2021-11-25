import React, { useState, useEffect } from 'react'
import { getAll, createPost } from '../services/postservice'
import NewPost from './NewPost'
import Post from './Post'

const PostList = () => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const data = await getAll()
      setPosts(data)
    }catch(e) {
      console.log(e.message)
    }
  }

  const addPost = async (post) => {
    try {
      const data = await createPost(post)
      setPosts(post => post.concat(data))
    }catch(e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
      <NewPost createPost={addPost} />
      <ul>
        {
          posts.length ? (
            posts.map(post => <Post key={post.id} id={post.id} title={post.title} url={post.url} author={post.author} likes={post.likes} /> )
          ) : <li>No posts</li>
        }
      </ul>
    </div>
  )
}

export default PostList