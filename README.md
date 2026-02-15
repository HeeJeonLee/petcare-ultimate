# 🐾 PetCare+ Ultimate PWA

**미래에셋금융서비스 펫보험 비교 플랫폼**

수인AI브릿지 · 이희전 대표님 전용
사업자번호: 119-13-49535

---

## 📦 **프로젝트 소개**

5개 보험사 (메리츠·삼성·DB·KB·현대) 자동 비교 + AI 상담사 챗봇

### **핵심 기능**
- ✅ AI 자동 보험 비교
- ✅ 품종별 맞춤 추천
- ✅ 비대면 자동 가입
- ✅ AI 챗봇 24/7 상담
- ✅ PWA (앱처럼 설치)
- ✅ 오프라인 지원

---

## 🚀 **1. 시작하기 (로컬 개발)**

### **필요한 것**
- Node.js 18 이상
- Git
- 코드 에디터 (VS Code 추천)

### **설치**
```bash
# 1. 프로젝트 폴더로 이동
cd petcare-ultimate-pwa

# 2. 패키지 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 실제 값 입력

# 4. 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:5173 열기

---

## 🔧 **2. 환경 변수 설정**

`.env` 파일 생성 후 아래 내용 입력:

```env
# Supabase (필수)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Claude API (선택)
VITE_CLAUDE_API_KEY=your-api-key-here

# 대표님 정보
VITE_CONSULTANT_CODE=LEE_HJ_001
```

### **Supabase 설정 방법**

1. https://supabase.com 접속
2. GitHub 로그인
3. New Project 클릭
4. 프로젝트 이름: `petcare-ultimate`
5. 비밀번호 설정
6. 지역: South Korea (Seoul)
7. Create project

**API 키 복사:**
- Settings → API → URL 복사
- anon public 키 복사
- .env 파일에 붙여넣기

---

## 📊 **3. 데이터베이스 설정**

Supabase 대시보드에서 SQL Editor 열기

### **테이블 생성 SQL**

```sql
-- 계약 테이블
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pet_breed VARCHAR(50) NOT NULL,
  pet_age INTEGER NOT NULL,
  pet_name VARCHAR(100) NOT NULL,
  owner_name VARCHAR(100) NOT NULL,
  owner_phone VARCHAR(20) NOT NULL,
  insurance_company VARCHAR(50) NOT NULL,
  insurance_product VARCHAR(100) NOT NULL,
  monthly_price INTEGER NOT NULL,
  consultant_code VARCHAR(50) DEFAULT 'LEE_HJ_001',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 챗봇 대화 테이블
CREATE TABLE chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(100) NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_contracts_created ON contracts(created_at DESC);
CREATE INDEX idx_contracts_consultant ON contracts(consultant_code);
CREATE INDEX idx_chat_session ON chatbot_conversations(session_id);
```

**실행:** Run 버튼 클릭

---

## 🌐 **4. Vercel 배포**

### **GitHub 연동**

1. GitHub에 저장소 생성
```bash
# Git 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 연결 (본인 저장소 주소)
git remote add origin https://github.com/YOUR_USERNAME/petcare-ultimate.git
git push -u origin main
```

### **Vercel 배포**

1. https://vercel.com 접속
2. GitHub 로그인
3. Import Project
4. petcare-ultimate 선택
5. Environment Variables 추가:
   - `VITE_SUPABASE_URL`: Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Supabase Key
6. Deploy 클릭

**완료!** 3분 후 https://petcare-ultimate.vercel.app 에서 확인

---

## 📱 **5. PWA 설치 테스트**

1. 배포된 사이트 접속
2. Chrome 모바일로 열기
3. "홈 화면에 추가" 배너 표시
4. 설치 클릭
5. 앱처럼 사용!

---

## 🏪 **6. Play Store 제출 (TWA)**

### **Android Studio 설정**

1. Android Studio 다운로드: https://developer.android.com/studio
2. 설치 및 실행
3. New Project → Empty Activity
4. Name: `PetCarePlus`
5. Package: `com.suinai.petcare`

### **TWA 설정**

`build.gradle (Module: app)` 수정:

```gradle
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
```

`AndroidManifest.xml` 수정:

```xml
<activity
    android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
    android:exported="true">
    
    <meta-data
        android:name="android.support.customtabs.trusted.DEFAULT_URL"
        android:value="https://petcare-ultimate.vercel.app" />
    
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

### **APK 빌드**

1. Build → Generate Signed Bundle / APK
2. APK 선택
3. Create new 클릭
4. Key store path: 임의 경로
5. 비밀번호 설정
6. Next → Release 선택
7. Finish

**APK 위치:** `app/release/app-release.apk`

### **Play Store 제출**

1. https://play.google.com/console 접속
2. Create app
3. 앱 이름: `PetCare+ 펫케어플러스`
4. 카테고리: Finance
5. APK 업로드
6. 스크린샷 5개 (모바일 캡처)
7. 앱 설명 작성
8. 제출!

**심사 기간:** 1-3일

---

## 📊 **7. 대시보드 (통계 확인)**

Supabase 대시보드에서:

1. Table Editor → contracts
2. 모든 계약 확인
3. Filters로 검색

### **간단한 통계 쿼리**

```sql
-- 오늘 계약 수
SELECT COUNT(*) 
FROM contracts 
WHERE DATE(created_at) = CURRENT_DATE;

-- 보험사별 계약 수
SELECT insurance_company, COUNT(*) as count
FROM contracts
GROUP BY insurance_company
ORDER BY count DESC;

-- 월별 수수료
SELECT 
  DATE_TRUNC('month', created_at) as month,
  SUM(monthly_price) as total
FROM contracts
GROUP BY month
ORDER BY month DESC;
```

---

## 🔐 **8. 보안 설정**

### **Supabase RLS (Row Level Security)**

```sql
-- 모든 사용자가 계약 생성 가능
CREATE POLICY "Anyone can insert" 
ON contracts FOR INSERT 
WITH CHECK (true);

-- 본인 계약만 조회 (consultant_code 기준)
CREATE POLICY "View own contracts" 
ON contracts FOR SELECT 
USING (consultant_code = auth.jwt() ->> 'consultant_code');
```

---

## 🎯 **9. 커스터마이징**

### **색상 변경**

`src/index.css` 에서:

```css
:root {
  --primary: #667eea;  /* 메인 색상 */
  --primary-dark: #764ba2;
}
```

### **보험사 데이터 수정**

`src/pages/ComparePage.jsx` 에서:

```javascript
const INSURANCE_DATA = {
  '메리츠화재': {
    name: '메리츠화재',
    product: '펫퍼민트',
    // 수정...
  }
}
```

---

## 📞 **10. 문제 해결**

### **빌드 에러**

```bash
# 캐시 삭제
rm -rf node_modules
rm package-lock.json

# 재설치
npm install
```

### **환경 변수 인식 안됨**

```bash
# 개발 서버 재시작
npm run dev
```

### **Vercel 배포 실패**

1. Settings → Environment Variables 확인
2. 모든 변수 `VITE_` 로 시작하는지 확인
3. Redeploy

---

## 💰 **11. 비용**

- ✅ Vercel: 무료
- ✅ Supabase: 무료 (50,000명까지)
- ✅ GitHub: 무료
- ✅ PWA: 무료
- ✅ Play Store: $25 (1회, 이미 지불 완료!)

**월 유지비: ₩0**

---

## 📈 **12. 성장 로드맵**

### **Phase 1: 런칭** (지금)
- ✅ 웹 배포
- ✅ PWA 설치
- ✅ Play Store 제출

### **Phase 2: 최적화** (1주 후)
- 🔄 A/B 테스트
- 🔄 전환율 분석
- 🔄 AI 챗봇 고도화

### **Phase 3: 확장** (1개월 후)
- 🔄 자동 마케팅
- 🔄 SEO 최적화
- 🔄 제휴사 확대

---

## 🆘 **지원**

이희전 대표님 전용 플랫폼
수인AI브릿지

**문의:** 
- GitHub Issues
- 또는 Claude와 대화

---

**만든이:** CTO Claude 💙
**날짜:** 2026-02-15
**버전:** 1.0.0

🚀 **일요일까지 완성! 화이팅!**
