import { useState, useRef, useEffect } from 'react'
import './AIChatbot.css'

// 키워드 기반 로컬 AI (무료)
const LOCAL_AI_RESPONSES = {
  '슬개골': `슬개골 탈구는 소형견 최다 질병이에요! 🦴

<strong>메리츠 펫퍼민트</strong> 강력 추천!

✅ 업계 최초 슬개골 보장
✅ 수술비 70% 보장
✅ 연간 최대 300만원
✅ 월 27,000원~

슬개골 수술 250만원 → 75만원!`,
  
  '비교': `5개 보험사 비교해드릴게요! 😊

💰 <strong>가격순:</strong>
1. KB 금쪽같은 펫 (월 25,000원~)
2. 메리츠 펫퍼민트 (월 27,000원~)
3. 현대해상 굿앤굿 (월 28,000원~)
4. DB 아이러브펫 (월 30,000원~)
5. 삼성화재 위풍댕댕 (월 32,000원~)

우리 아이 품종 알려주시면
딱 맞는 보험 추천해드릴게요! 🐶`,

  '가입': `가입은 3분이면 완료! ✨

<strong>3분 완료:</strong>
1. 품종/나이 입력
2. 보험 선택
3. 본인 인증
4. 완료!

지금 바로 시작하시겠어요? 🚀`,

  '가격': `품종과 나이에 따라 달라요! 💸

<strong>말티즈 3세 기준:</strong>
- KB: 월 25,000원
- 메리츠: 월 27,000원
- 현대해상: 월 28,000원
- DB: 월 30,000원
- 삼성: 월 32,000원

우리 아이 정보 알려주시면
정확한 가격 알려드릴게요! 😊`,

  '대형견': `대형견은 배상책임이 중요! 🐕

<strong>DB 아이러브펫 추천!</strong>

✅ 배상책임 최대 1억원
✅ 타인 상해 보장
✅ 법률 비용 지원
✅ 월 30,000원~

공원 산책 걱정 없어요! 💪`
}

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `안녕하세요! AI 펫보험 상담사입니다 😊

우리 아이에게 딱 맞는 보험을 찾아드릴게요!

<strong>메리츠·삼성·DB·KB·현대</strong> 5개 보험사 비교 가능합니다.`
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // 사용자 메시지 추가
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // AI 응답 (로컬 키워드 매칭)
    setTimeout(() => {
      const aiResponse = getLocalAIResponse(input)
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
      setIsTyping(false)
    }, 1000)
  }

  const getLocalAIResponse = (userInput) => {
    const input = userInput.toLowerCase()

    // 키워드 매칭
    for (const [keyword, response] of Object.entries(LOCAL_AI_RESPONSES)) {
      if (input.includes(keyword)) {
        return response
      }
    }

    // 기본 응답
    return `궁금하신 점이 있으시군요! 😊

이런 걸 도와드릴 수 있어요:

💰 5개 보험사 비교
🦴 슬개골 특화 보험
💸 가격 안내
🐶 품종별 추천
✅ 가입 안내

무엇이 궁금하신가요?`
  }

  const handleQuickReply = (text) => {
    setInput(text)
    setTimeout(() => handleSend(), 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <>
      {/* 챗봇 버튼 */}
      {!isOpen && (
        <button className="chatbot-button" onClick={() => setIsOpen(true)}>
          🤖
          <span className="badge-dot">!</span>
        </button>
      )}

      {/* 챗봇 창 */}
      {isOpen && (
        <div className="chatbot-widget">
          {/* 헤더 */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-header-text">
                <h3>AI 펫보험 상담사</h3>
                <p>24/7 즉시 상담 · 수인AI브릿지</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.role === 'ai' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div 
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            ))}
            
            {isTyping && (
              <div className="message ai">
                <div className="message-avatar">🤖</div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 답변 */}
          <div className="quick-replies">
            <button onClick={() => handleQuickReply('보험 비교하고 싶어요')}>
              💰 보험 비교
            </button>
            <button onClick={() => handleQuickReply('슬개골 보장 알려주세요')}>
              🦴 슬개골
            </button>
            <button onClick={() => handleQuickReply('가격이 궁금해요')}>
              💸 가격
            </button>
            <button onClick={() => handleQuickReply('가입하고 싶어요')}>
              ✅ 가입
            </button>
          </div>

          {/* 입력 */}
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="궁금한 점을 물어보세요..."
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatbot
