import { createClient } from '@supabase/supabase-js'

// Supabase 설정
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// 계약 저장
export const saveContract = async (contractData) => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .insert([
        {
          pet_breed: contractData.petInfo.breed,
          pet_age: contractData.petInfo.age,
          pet_name: contractData.formData.petName,
          owner_name: contractData.formData.ownerName,
          owner_phone: contractData.formData.phone,
          insurance_company: contractData.insurance.name,
          insurance_product: contractData.insurance.product,
          monthly_price: contractData.insurance.price,
          consultant_code: 'LEE_HJ_001', // 이희전 대표님 코드
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Contract save error:', error)
    return { success: false, error: error.message }
  }
}

// 챗봇 대화 저장
export const saveChatConversation = async (sessionId, userMessage, aiResponse) => {
  try {
    const { data, error } = await supabase
      .from('chatbot_conversations')
      .insert([
        {
          session_id: sessionId,
          user_message: userMessage,
          ai_response: aiResponse,
          timestamp: new Date().toISOString()
        }
      ])

    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Chat save error:', error)
    return { success: false }
  }
}

// 통계 조회
export const getStatistics = async () => {
  try {
    // 총 계약 수
    const { count: totalContracts } = await supabase
      .from('contracts')
      .select('*', { count: 'exact', head: true })

    // 오늘 계약 수
    const today = new Date().toISOString().split('T')[0]
    const { count: todayContracts } = await supabase
      .from('contracts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00`)

    // 보험사별 통계
    const { data: insuranceStats } = await supabase
      .from('contracts')
      .select('insurance_company')

    return {
      totalContracts: totalContracts || 0,
      todayContracts: todayContracts || 0,
      insuranceStats: insuranceStats || []
    }
  } catch (error) {
    console.error('Statistics error:', error)
    return null
  }
}

export default supabase
