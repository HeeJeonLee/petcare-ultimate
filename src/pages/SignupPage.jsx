import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SignupPage.css'

function SignupPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { petInfo, insurance } = location.state || {}
  
  const [step, setStep] = useState(1) // 1: 정보입력, 2: 인증, 3: 완료
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    petName: '',
    ssn: '',
    agree1: false,
    agree2: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleStep1 = () => {
    if (!formData.ownerName || !formData.phone || !formData.petName) {
      alert('모든 정보를 입력해주세요!')
      return
    }
    setStep(2)
  }

  const handleStep2 = () => {
    if (!formData.ssn) {
      alert('주민등록번호를 입력해주세요!')
      return
    }
    if (!formData.agree1 || !formData.agree2) {
      alert('필수 약관에 동의해주세요!')
      return
    }
    
    // 가입 처리 (실제로는 API 호출)
    setStep(3)
    
    // Supabase 저장 등 처리
    saveContract()
  }

  const saveContract = async () => {
    // 실제로는 Supabase에 저장
    console.log('Contract saved:', {
      petInfo,
      insurance,
      formData,
      timestamp: new Date()
    })
  }

  if (!insurance) {
    return (
      <div className="signup-page">
        <div className="error-state">
          <h2>⚠️ 잘못된 접근입니다</h2>
          <p>보험을 선택한 후 진행해주세요.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            처음부터 시작하기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="signup-page">
      {/* 진행 단계 */}
      <div className="progress-bar">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">정보입력</div>
        </div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">본인인증</div>
        </div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">완료</div>
        </div>
      </div>

      <div className="signup-content">
        {/* Step 1: 정보 입력 */}
        {step === 1 && (
          <div className="step-content">
            <h2>📝 기본 정보 입력</h2>
            <p className="step-subtitle">가입할 보험 정보를 확인해주세요</p>

            <div className="selected-insurance">
              <div className="insurance-info">
                <h3>{insurance.name}</h3>
                <p>{insurance.product}</p>
              </div>
              <div className="insurance-price">
                월 {insurance.price.toLocaleString()}원
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>보호자 이름 *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="홍길동"
                />
              </div>

              <div className="form-group">
                <label>연락처 *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                />
              </div>

              <div className="form-group">
                <label>반려동물 이름 *</label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  placeholder="뽀삐"
                />
              </div>

              <button onClick={handleStep1} className="btn btn-primary btn-large">
                다음 단계 →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: 본인 인증 */}
        {step === 2 && (
          <div className="step-content">
            <h2>✅ 본인 인증</h2>
            <p className="step-subtitle">안전한 가입을 위해 본인 인증이 필요합니다</p>

            <div className="form-section">
              <div className="form-group">
                <label>주민등록번호 앞자리 *</label>
                <input
                  type="text"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleChange}
                  placeholder="예: 900101"
                  maxLength="6"
                />
              </div>

              <div className="agreements">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agree1"
                    checked={formData.agree1}
                    onChange={handleChange}
                  />
                  <span>개인정보 수집·이용 동의 (필수)</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agree2"
                    checked={formData.agree2}
                    onChange={handleChange}
                  />
                  <span>보험 약관 동의 (필수)</span>
                </label>
              </div>

              <button onClick={handleStep2} className="btn btn-primary btn-large">
                휴대폰 인증 후 가입 완료
              </button>
              
              <button onClick={() => setStep(1)} className="btn btn-secondary btn-large">
                이전 단계
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 완료 */}
        {step === 3 && (
          <div className="step-content success-content">
            <div className="success-icon">🎉</div>
            <h2>가입이 완료되었습니다!</h2>
            <p className="success-message">
              보험증권은 등록하신 연락처로<br/>
              3영업일 내 발송됩니다.
            </p>

            <div className="contract-summary">
              <div className="summary-row">
                <span>보험사</span>
                <strong>{insurance.name}</strong>
              </div>
              <div className="summary-row">
                <span>상품</span>
                <strong>{insurance.product}</strong>
              </div>
              <div className="summary-row">
                <span>월 보험료</span>
                <strong className="price-highlight">
                  {insurance.price.toLocaleString()}원
                </strong>
              </div>
              <div className="summary-row">
                <span>가입자</span>
                <strong>{formData.ownerName}</strong>
              </div>
              <div className="summary-row">
                <span>반려동물</span>
                <strong>{formData.petName} ({petInfo.breed} {petInfo.age}세)</strong>
              </div>
            </div>

            <button onClick={() => navigate('/')} className="btn btn-primary btn-large">
              처음으로 돌아가기
            </button>
          </div>
        )}
      </div>

      <footer className="signup-footer">
        <p>수인AI브릿지 · 미래에셋금융서비스</p>
        <p className="small">사업자번호: 119-13-49535</p>
      </footer>
    </div>
  )
}

export default SignupPage
