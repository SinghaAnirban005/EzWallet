import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='flex flex-col h-screen w-[100%]'>
      <Navbar />
        <Outlet />
    </div>
  )
}

export default App
