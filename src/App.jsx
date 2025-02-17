import React from 'react'
import Header from './components/Header'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import { format } from 'date-fns';
import NewPost from './components/NewPost'
import PostPage from './components/PostPage'
import About from './components/About'
import Missing from './components/Missing'
import Nav from './components/Nav'
import Footer from './components/Footer'
import EditPost from './components/EditPost';
import { useState, useEffect } from 'react'
import api from './api/posts';
import useWindow from './hooks/useWindow';

const App = () => {
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const {width}=useWindow();
  const [posts, setPosts] = useState(
    [
    ]
  )
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  })
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`,updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  return (
    <div className='App'>
      <Header title="postaBlog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post" element={<NewPost handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody} />} />
        <Route path="/edit/:id" element={<EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />}/>
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App