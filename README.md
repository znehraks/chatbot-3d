# GoodGangLabs 사전과제

## Implemented

- [x] GLB 포맷 아바타 이용
- [x] ChatGPT API
- [x] STT, TTS API
- [x] api server EC2로 배포

## How To Use This

#### 1. 실행법
- 개발 환경
1. ```npm i``` 커맨드로 필요 라이브러리를 설치합니다.
2. ```npm run dev``` 커맨드로 개발용 api서버와 프론트서버 동시 실행합니다.
3. url은 아마 ```http://127.0.0.1:5173/``` 일 것 입니다.

- 프로덕션 환경
1. 로컬에서 빌드된 환경을 보고자 할 땐, ```npm run preview```를 통해 확인할 수 있습니다.
2. url은 아마 ```http://127.0.0.1:4173/``` 일 것 입니다.

#### 2. 기타
1. 실제 빌드를 위해선, ```npm run build``` 명령어를 통해, 빌드 할 수 있습니다.
