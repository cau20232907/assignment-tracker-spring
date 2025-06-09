# Assignment Tracker

과제를 효율적으로 관리할 수 있는 웹 애플리케이션입니다.

## 기능

- 과제 생성, 조회, 완료 표시, 삭제
- 마감일 설정 및 관리
- 반응형 웹 디자인
- 실시간 상태 업데이트

## 기술 스택

### Frontend
- React 18 + TypeScript
- Vite
- Axios
- Jest + React Testing Library

### Backend
- **Spring Boot**: Java + Spring Data JPA + JUnit

### CI/CD
- GitHub Actions
- Vercel (Frontend)
- Render (Backend)

## 🌐 Live Demo

- **Frontend**: [https://assignment-tracker-spring.vercel.app](https://assignment-tracker-spring.vercel.app)
- **Backend API**: [https://assignment-tracker-spring.onrender.com](https://assignment-tracker-spring.onrender.com)*

### 자동 배포 프로세스
1. **코드 푸시** → GitHub Repository
2. **GitHub Actions** → 자동 테스트 및 빌드
3. **Vercel** → 프론트엔드 자동 배포
4. **Render** → 백엔드 자동 배포

## 로컬 개발 환경 설정

### 사전 요구사항
- Node.js 16+
- JDK 17+

### 빠른 시작 (권장)

#### Windows (PowerShell)
```powershell
.\start.ps1
```

#### Linux/Mac
```bash
chmod +x start.sh
./start.sh
```

### 수동 실행

### 백엔드 실행 (Spring Boot)
```bash
cd backend-spring
./mvnw spring-boot:run
```

### 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```
cd backend-spring
./mvnw spring-boot:run
```

## 테스트 실행

### 프론트엔드 테스트
```bash
cd frontend
npm test
```

### Spring Boot 테스트
```bash
cd backend-spring
./mvnw test
```

## 배포

### Vercel (프론트엔드)
1. Vercel 계정 생성
2. GitHub 리포지토리 연결
3. 자동 배포 설정

### Render (백엔드)
1. Render 계정 생성
2. GitHub 리포지토리 연결
3. 웹 서비스 생성
4. 환경변수 설정

## API 엔드포인트

- `GET /assignments/` - 모든 과제 조회
- `POST /assignments/` - 새 과제 생성
- `PATCH /assignments/{id}/complete` - 과제 완료 처리
- `DELETE /assignments/{id}` - 과제 삭제

## 개발 환경 설정 단계별 가이드

### 1. 리포지토리 클론 및 구조 생성
```bash
git clone <repository-url>
cd assignment-tracker
```

#### 2. 백엔드 실행 (Spring Boot)
```bash
cd backend-spring
./mvnw spring-boot:run
```

### 3. 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```

### 4. 테스트 실행
```bash
# Spring Boot 테스트
cd backend-spring && ./mvnw test

# Frontend 테스트
cd frontend && npm test
```

## 커리큘럼

1. **백엔드 API 구현 & 테스트**
   - Spring Boot로 REST API 개발
   - CRUD API 엔드포인트 구현
   - 자동화된 테스트 작성

2. **프론트엔드 컴포넌트 구현 & 테스트**
   - React 컴포넌트 개발
   - API 연동
   - 단위 테스트 작성

3. **CI/CD 파이프라인 구축**
   - GitHub Actions 설정
   - 자동 테스트 및 배포

4. **배포 & 모니터링**
   - Vercel/Render 배포
   - 로그 조회 및 모니터링

## License

MIT License
