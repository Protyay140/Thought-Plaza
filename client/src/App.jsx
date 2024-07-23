import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/home'  
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Dashboard from './pages/dashboard'
import About from './pages/Posts'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import TopScrolling from './components/TopScrolling'
import Contact from './pages/Contact'
import Post from './pages/Posts'
import Search from './pages/Search'
import PageFooter from './components/PageFooter'

const App = () => {
  return (
    <BrowserRouter>
      <TopScrolling />
      <Header />
      <ToastContainer 
        pauseOnFocusLoss={false}
        autoClose={2000}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path='/contact' element={<Contact />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/post/:postId' element={<PostPage />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <PageFooter />
    </BrowserRouter>
  )
}

export default App