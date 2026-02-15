import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './ComparePage.css'

// 5개 보험사 데이터
const INSURANCE_DATA = {
  '메리츠화재': {
    name: '메리츠화재',
    product: '펫퍼민트',
    features: ['시장 1위', '슬개골 특화', '최대 20세', '자동갱신'],
    badge: '인기'
  },
  '삼성화재': {
    name: '삼성화재',
    product: '위풍댕댕',
    features: ['브랜드 신뢰', '장례 서비스', '넓은 보장', '빠른 지급'],
    badge: '추천'
  },
  'DB손보': {
    name: 'DB손해보험',
    product: '아이러브펫',
    features: ['배상책임 1억', '장례 제휴', '의료비 70%', '24시간 상담'],
    badge: null
  },
  'KB손보': {
    name: 'KB손해보험',
    product: '금쪽같은 펫',
    features: ['보장 90%', '자부담 0원', '높은 한도', '빠른 심사'],
    badge: '최저가'
  },
  '현대해상': {
    name: '현대해상',
    product: '굿앤굿',
    features: ['생애주기 맞춤', '피부병 특화', '구강 보장', '예방접종'],
    badge: null
  }
}

function ComparePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const petInfo = location.state || { breed: '말티즈', age: '3' }
  
  const [loading, setLoading] = useState(true)
  const [insurances, setInsurances] = useState([])
  const [selectedInsurance, setSelectedInsurance] = useState(null)

  useEffect(() => {
    // AI 비교 시뮬레이션
    setTimeout(() => {
      const prices = calculatePrices(petInfo.breed, petInfo.age)
      const result = Object.keys(INSURANCE_DATA).map((key, index) => ({
        ...INSURANCE_DATA[key],
        price: prices[index]
      }))
      
      // 가격순 정렬
      result.sort((a, b) => a.price - b.price)
      
      setInsurances(result)
      setLoading(false)
    }, 2000)
  }, [])

  const calculatePrices = (breed, age) => {
    const basePrices = [27000, 32000, 30000, 25000, 28000]
    
    const breedWeight = {
      '말티즈': 1.0,
      '푸들': 1.1,
      '포메라니안': 0.95,
      '시츄': 1.05,
      '웰시코기': 1.3,
      '골든리트리버': 1.5,
      '진돗개': 1.2,
      '믹스견': 0.9
    }
    
    const ageWeight = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6]
    
    const bw = breedWeight[breed] || 1.0
    const aw = ageWeight[parseInt(age)] || 1.0
    
    return basePrices.map(p => Math.floor(p * bw * aw / 100) * 100)
  }

  const handleSelect = (insurance) => {
    setSelectedInsurance(insurance)
  }

  const handleSignup = () => {
    if (!selectedInsurance) {
      alert('보험을 선택해주세요!')
      return
    }
    
    navigate('/signup', { 
      state: { 
        petInfo, 
        insurance: selectedInsurance 
      } 
    })
  }

  if (loading) {
    return (
      <div className="compare-page loading-state">
        <div className="loading-content">
          <div className="loading-spinner-large"></div>
          <h2>AI가 5개 보험사 분석 중...</h2>
          <p>{petInfo.breed} {petInfo.age}세 맞춤 비교</p>
        </div>
      </div>
    )
  }

  return (
    <div className="compare-page">
      <header className="compare-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← 돌아가기
        </button>
        <h1>{petInfo.breed} {petInfo.age}세 맞춤 추천</h1>
      </header>

      <div className="compare-content">
        <div className="compare-info">
          <h2>🤖 AI 분석 완료!</h2>
          <p>총 5개 보험사 비교 완료. 최저가부터 확인하세요!</p>
        </div>

        <div className="insurance-grid">
          {insurances.map((insurance, index) => (
            <div 
              key={index}
              className={`insurance-card ${selectedInsurance?.name === insurance.name ? 'selected' : ''}`}
              onClick={() => handleSelect(insurance)}
            >
              {insurance.badge && (
                <div className={`badge badge-${insurance.badge === '최저가' ? 'best' : insurance.badge === '인기' ? 'popular' : 'recommend'}`}>
                  {insurance.badge}
                </div>
              )}
              
              <div className="insurance-header">
                <h3 className="company-name">{insurance.name}</h3>
                <p className="product-name">{insurance.product}</p>
              </div>

              <div className="price-section">
                <div className="price">월 {insurance.price.toLocaleString()}원</div>
                <div className="price-label">70% 보장</div>
              </div>

              <ul className="features-list">
                {insurance.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul>

              {selectedInsurance?.name === insurance.name && (
                <div className="selected-badge">✓ 선택됨</div>
              )}
            </div>
          ))}
        </div>

        <div className="action-section">
          <button 
            onClick={handleSignup}
            className="btn btn-primary btn-large"
            disabled={!selectedInsurance}
          >
            {selectedInsurance ? '선택한 보험 가입하기 →' : '보험을 선택해주세요'}
          </button>
        </div>
      </div>

      <footer className="compare-footer">
        <p>수인AI브릿지 · 미래에셋금융서비스</p>
        <p className="small">사업자번호: 119-13-49535</p>
      </footer>
    </div>
  )
}

export default ComparePage
