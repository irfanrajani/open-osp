import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl">Open OSP</h1>
      </header>
      <main className="p-8">
        <Login />
      </main>
    </>
  )
}

export default App
