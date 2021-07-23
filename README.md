# 스크린샷

<img width="342" alt="스크린샷 2021-07-23 오전 11 44 01" src="https://user-images.githubusercontent.com/47034129/126731902-0a93febf-889b-48fe-995e-4a6797f13608.png"> <img width="329" alt="스크린샷 2021-07-23 오전 11 44 06" src="https://user-images.githubusercontent.com/47034129/126731911-dcc0d4c7-1535-4d24-bbc3-32676e1c9f53.png"> <img width="336" alt="스크린샷 2021-07-23 오전 11 44 12" src="https://user-images.githubusercontent.com/47034129/126731915-0d65bf9c-0a41-4a7d-805a-c67ab165ab67.png"> <img width="358" alt="스크린샷 2021-07-23 오전 11 44 18" src="https://user-images.githubusercontent.com/47034129/126731921-2926049e-86ff-4923-b34d-e918d6f35a95.png"> <img width="352" alt="스크린샷 2021-07-23 오전 11 44 28" src="https://user-images.githubusercontent.com/47034129/126731936-188dde5f-27ca-4ac2-8207-e9a027983b27.png"> <img width="334" alt="스크린샷 2021-07-23 오전 11 44 35" src="https://user-images.githubusercontent.com/47034129/126731948-14a3fe1d-d662-491f-8788-41f8f1713d54.png">

# 배포 방법
```bash
  # nodejs, npm, pm2, mysql 등이 설치되어있다는 가정
  cd ./frontend/
  npm install
  cd ../backend/
  npm install
  cd ..
  chmod +x deploy.sh
  ./deploy.sh
```

# 개발 방식

## 프론트엔드
  - MVC 패턴의 SPA 프레임 워크 구현
    - Controller에서 비즈니스 로직 구현
    - View에서는 오직 화면만 구성
  - MockAPI 를 먼저 구현하여 백엔드에 대한 의존성 없이 API에서 받아올 데이터를 Controller에서 받아올 수 있음
  - Webpack 을이용하여 프론트엔드의 bundle 생성

## 백엔드
  - Express 를 이용해 간단하게 백엔드 API서버 구현
  - 파일업로드를 위해 multer 모듈을 이용
  - socket.io를 사용해 실시간 채팅구현
  - mysql2 (mysql)을 이용해서 데이터베이스 CRUD 구현
  - 개발단계에서 docker를 이용해 쉽게 DB환경 구현
  - express-session으로 사용자 관리

