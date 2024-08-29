import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import { CategoryProvider } from './contexts/CategoryContext'

type Props = {}

const App = (props: Props) => {
  return (
    <Router>
      <CategoryProvider>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/transactions' element={<Transactions/>}/>
        </Routes>
      </CategoryProvider>
    </Router>
  )
}

export default App
