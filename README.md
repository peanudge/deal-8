# 8팀 우아한 마켓 프로젝트
  - 우아한 테크캠프 4기의 우아마켓 프로젝트를 진행한 <strong>손지호</strong>, <strong>지승보</strong> 입니다.
<img width="342" alt="스크린샷 2021-07-23 오전 11 44 01" src="https://user-images.githubusercontent.com/47034129/126731902-0a93febf-889b-48fe-995e-4a6797f13608.png">

- 우아한 테크캠프 4기의 2주차 프로젝트인 우아마켓입니다
  - ~~당근마켓~~을 모티브로 우아마켓을 구현하였습니다.
  - <a href="https://www.figma.com/proto/p8xNIB3Od4x3ylaIaOLtjl/%EC%9A%B0%EC%95%84%EB%A7%88%EC%BC%93?page-id=617%3A1286&node-id=617%3A1298&viewport=203%2C397%2C0.25&scaling=contain">기획서</a>
  - <a href="http://ec2-15-164-244-182.ap-northeast-2.compute.amazonaws.com">배포링크</a>

# 프로젝트 구조
  frontend에서 구현한 내용을 webpack을 이용하여 bundle로 만든 뒤 backend의 public에서 호스팅 합니다.
  위의 frontend, backend에서 각각의 내용을 확인 할 수 있습니다.

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

# 개발 순서
  1. frontend/public에서 퍼블리싱 진행
  2. frontend/src 에서 SPA 프레임워크 구현 및 퍼블리싱한 페이지 적용
  3. 프론트엔드에서 mock API 구현
  4. 백엔드에서 InMemmoryStore를 이용해 디비 구현전 간단하게 디비기능 구현
  5. 프론트엔드에서 백엔드로 REST 요청
  6. 백엔드 디비구현 및 InMemmoryStore를 MySQLStore로 변경
  7. 리팩토링 및 배포







