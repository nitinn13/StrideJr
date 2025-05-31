// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StrideJrLanding from './pages/StrideJrLanding'
import Login from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<StrideJrLanding />} />
      <Route path="/login" element={<Login/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App