import './App.css';

import { Outlet } from 'react-router-dom'
import HeaderComponent from './components/Header';

function App() {
  return (
    <>
      <HeaderComponent />
      <main>
        
        <Outlet />
      </main>
    </>
  )
}

export default App
