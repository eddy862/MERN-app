import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import { CategoryProvider } from './contexts/CategoryContext'
import FixedItems from './pages/FixedItems'
import Budgets from './pages/Budgets'

type Props = {}

const App = (props: Props) => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard' element={
          <CategoryProvider>
            <Dashboard/>
          </CategoryProvider>
        }/>
        <Route path='/transactions' element={
          <CategoryProvider>
            <Transactions/>
          </CategoryProvider>
        }/>
        <Route path='/fixed-items' element={
          <CategoryProvider>
            <FixedItems/>
          </CategoryProvider>
        }/>
        <Route path='/budgets' element={
          <CategoryProvider>
            <Budgets/>
          </CategoryProvider>
        }/>
      </Routes>
    </Router>
  )
}

export default App