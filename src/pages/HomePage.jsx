import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  const [petInfo, setPetInfo] = useState({
    breed: '',
    age: ''
  })

  const handleStart = () => {
    if (!petInfo.breed || !petInfo.age) {
      alert('품종과 나이를 선택해주세요!')
      return
    }
    
    // 비교 페이지로 이동
    navigate('/compare', { state: petInfo })
  }

  return (
    <div className="homepage">
      {/* 헤더 */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🐾</span>
            <span className="logo-text">PetCare+</span>
          </div>
          <div className="header-subtitle">미래에셋금융서비스</div>
        </div>
      </header>

      {/* Hero 섹션 */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              슬개골 수술<br/>
              <span className="highlight">250만원 → 50만원</span>
            </h1>
            <p className="hero-subtitle">
              AI가 5개 보험사 3분 자동 비교<br/>
              최저가 1초 발견!
            </p>

            {/* 빠른 시작 */}
            <div className="quick-start">
              <h3 className="quick-start-title">🚀 지금 바로 비교하기</h3>
              
              <div className="form-group">
                <label>품종</label>
                <select 
                  value={petInfo.breed}
                  onChange={(e) => setPetInfo({...petInfo, breed: e.target.value})}
                  className="form-select"
                >
                  <option value="">선택하세요</option>
                  <option value="말티즈">말티즈</option>
                  <option value="푸들">푸들</option>
                  <option value="포메라니안">포메라니안</option>
                  <option value="시츄">시츄</option>
                  <option value="요크셔테리어">요크셔테리어</option>
                  <option value="치와와">치와와</option>
                  <option value="비숑프리제">비숑프리제</option>
                  <option value="웰시코기">웰시코기</option>
                  <option value="골든리트리버">골든리트리버</option>
                  <option value="진돗개">진돗개</option>
                  <option value="믹스견">믹스견</option>
                </select>
              </div>

              <div className="form-group">
                <label>나이</label>
                <select 
                  value={petInfo.age}
                  onChange={(e) => setPetInfo({...petInfo, age: e.target.value})}
                  className="form-select"
                >
                  <option value="">선택하세요</option>
                  <option value="0">0세 (1세 미만)</option>
                  <option value="1">1세</option>
                  <option value="2">2세</option>
                  <option value="3">3세</option>
                  <option value="4">4세</option>
                  <option value="5">5세</option>
                  <option value="6">6세</option>
                  <option value="7">7세</option>
                  <option value="8">8세 이상</option>
                </select>
              </div>

              <button onClick={handleStart} className="btn btn-primary btn-large">
                🤖 AI 자동 비교 시작
              </button>
            </div>

            {/* 특징 */}
            <div className="features">
              <div className="feature">
                <div className="feature-icon">🤖</div>
                <div className="feature-text">AI 자동</div>
              </div>
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">3분 완료</div>
              </div>
              <div className="feature">
                <div className="feature-icon">💰</div>
                <div className="feature-text">최저가</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 보험사 */}
      <section className="insurance-companies">
        <div className="container">
          <h2 className="section-title">제휴 보험사 (5개)</h2>
          <div className="companies-grid">
            <div className="company-badge">메리츠화재</div>
            <div className="company-badge">삼성화재</div>
            <div className="company-badge">DB손보</div>
            <div className="company-badge">KB손보</div>
            <div className="company-badge">현대해상</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>미래에셋금융서비스㈜</p>
          <p className="footer-small">준법감시인 심의필 2026-0001</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
