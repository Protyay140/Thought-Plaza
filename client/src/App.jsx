import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/home'  
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Dashboard from './pages/dashboard'
import Project from './pages/project'
import About from './pages/about'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path='/project' element={<Project />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App