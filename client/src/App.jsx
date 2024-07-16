import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/home'  
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Dashboard from './pages/dashboard'
import Project from './pages/project'
import About from './pages/about'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path='/project' element={<Project />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/post/:postId' element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App