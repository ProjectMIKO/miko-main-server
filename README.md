# <img src="https://github.com/user-attachments/assets/35925543-ea0b-4807-b4d8-2af0381be45e" alt="MIKO_LOGO_Square" width="25" height="25"> MIKO
회의록 작성에 도움을 주는 다양한 서비스들이 있지만, 실시간으로 음성을 텍스트로 변환(STT)하고 키워드를 추출하여 회의 중간에 합류한 사람도 맥락을 쉽게 파악할 수 있도록 돕는 서비스는 없습니다. 
MIKO는 이러한 필요를 충족시키기 위해 개발된 서비스로, 실시간 STT 변환 및 키워드 추출 기능을 통해 회의 참여자들이 보다 효율적으로 회의를 진행할 수 있도록 도와줍니다.

## 목차
1. [📄 프로젝트 정보](#-프로젝트-정보)
2. [📝 서비스 소개](#-서비스-소개)
3. [🔧 서비스 구조도](#-서비스-구조도)
4. [📊 프로젝트 포스터](#-프로젝트-포스터)
5. [📦 설치 방법](#-설치-방법)
6. [🚀 앱 실행 방법](#-앱-실행-방법)

## 📄 프로젝트 정보

### 1. 제작기간
2024.06.12 ~ 진행 중 

### 2. 참여 인원
| Name   | Position     |
|--------|--------------|
| 정재혁 | Back         |
| 남청우 | Back, Front  |

### 3. 역할 분담
- **정재혁**: stt, 키워드 추출 로직, socket.io로 room 관리
- **남청우**: openvidu api, 회의록 api, 음성기록 타임스탬프 기록, 서버 안정화

## 📚 기술 스택
- **Backend**: TypeScript, Nest.js  
- **Database**: MongoDB
- **Infrastructure/DevOps**: AWS EC2, CloudWatch
- **Extension**: OpenVidu  

## 📝 서비스 소개

### 1. 실시간 STT 제공
회의 중 실시간으로 음성을 텍스트로 변환하여 참가자들에게 제공

<img src="https://github.com/user-attachments/assets/05e2ca6b-64c9-4637-a59e-e619246f3015" alt="STT 기능" width="400" height="400">

### 2. 5문장마다 자동 키워드 추출 (네트워크 그래프로 시각화)
회의 내용에서 중요한 키워드를 추출하고 이를 네트워크 그래프로 시각화

<img src="https://github.com/user-attachments/assets/d2f5d54e-70ad-4f65-8c80-04593930a351" alt="키워드 추출" width="700">

### 3. 키워드 간 연결 및 연결 해제
키워드 간의 관계를 시각적으로 표현하고, 필요에 따라 연결을 해제

### 4. 비회원 참여 지원
비회원도 링크를 통해 회의에 쉽게 참여할 수 있도록 지원

<img src="https://github.com/user-attachments/assets/6fda4187-aad4-4678-ae85-86fbac4ff7ae" alt="비회원 링크 공유" width="700">

### 5. 결과 페이지에서 회의록 및 음성 기록 제공
회의 종료 후 결과 페이지에서 자동 생성된 회의록과 음성 기록을 제공

<img src="https://github.com/user-attachments/assets/edde0c41-7513-4e3e-a1ae-f966a3fd3f12" alt="결과 페이지" width="700">

### 6. 결과 페이지 유지
회의 종료 후에도 구글 OAuth를 통해 회의 정보를 지속적으로 제공

<img src="https://github.com/user-attachments/assets/c46cd5fa-bcc2-454f-910e-f143d2356749" alt="게시글" width="700">

## 🔧 서비스 구조도
![MIKO 아키텍쳐](https://github.com/user-attachments/assets/69982cc2-7a11-4191-930d-014a75b54deb)

## 📊 프로젝트 포스터
![MIKO (59 4 x 84 1 cm)](https://github.com/user-attachments/assets/29a39bc7-43d4-4161-8ad3-2e981c25f4f9)

## 📦 설치 방법

```bash
$ npm install
```

## 🚀 앱 실행 방법

```bash
# development
$ npm run start

# watch mode
$ npm run start:local

# production mode
$ npm run start:dev_prod
```
