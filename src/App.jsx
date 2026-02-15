import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ComparePage from './pages/ComparePage'
import SignupPage from './pages/SignupPage'
import AIChatbot from './components/AIChatbot'
import './App.css'

function App() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  // PWA 설치 프롬프트
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }
    
    window.addEventListener('beforeinstallprompt', handler)
    
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('✅ PWA installed')
    }
    
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  return (
    <Router>
      <div className="app">
        {/* PWA 설치 배너 */}
        {showInstallPrompt && (
          <div className="install-banner">
            <div className="install-content">
              <span>📱 홈 화면에 추가하고 더 편하게 이용하세요!</span>
              <button onClick={handleInstall} className="btn-install">
                설치하기
              </button>
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>

        {/* AI 챗봇 (모든 페이지에 표시) */}
        <AIChatbot />
      </div>
    </Router>
  )
}

export default App
