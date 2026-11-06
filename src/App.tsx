import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

function HomePage() {
  return (
    <main>
      <h1>CheckmaîtréX</h1>
      <p>Official Chess Platform</p>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
