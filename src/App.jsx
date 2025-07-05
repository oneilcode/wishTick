import { useState } from 'react'
import { MainLayout } from './components/MainLayout/MainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainLayout />
    </>
  )
}

export default App
