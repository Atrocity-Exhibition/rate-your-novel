import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import Browse from '@/pages/Browse'
import NovelDetail from '@/pages/NovelDetail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import UserProfile from '@/pages/UserProfile'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Auth pages — no navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main app — with navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="/novel/:id" element={<NovelDetail />} />
                  <Route path="/user/:id" element={<UserProfile />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
