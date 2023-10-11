import './App.css'
import React from 'react'
import NavPage from './components/NavPage'
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <div className='row'>
      <div className='leftside'>
        <Sidebar />
      </div>
      <div className='rightside'> 
        <NavPage />
      </div>
    </div>
  )
}

export default App
