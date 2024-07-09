import { useContext } from 'react'
import './App.css'
import { UserContext } from './context/UserProvider'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth'
import Home from './components/Home'
import Profile from './components/Profile'
import Navbar from './components/Navbar'

function App() {

  const { token } = useContext(UserContext)

  return (
    <div className='app'>
      { token && <Navbar />}
      <Routes>
        <Route path='/' element={token ? <Navigate to='/home' /> : <Auth />} />
        <Route path='/home' element={!token ? <Navigate to='/' /> : <Home />} />
        <Route path='/profile' element={!token ? <Navigate to='/' /> : <Profile />} />
      </Routes>
    </div>
  )
}

export default App
