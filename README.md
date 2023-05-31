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
2. ```.env```파일을 루트 위치에 생성한 후, OPENAI_API_KEY=[나의 OPENAI_API_KEY] 를 추가합니다.
    ex. OPENAI_API_KEY=sk_123213123890812812903812901298121290123

3. ```npm run dev``` 커맨드로 개발용 api서버와 프론트서버를 동시 실행합니다.
4. url은 아마 ```http://127.0.0.1:5173/``` 일 것 입니다.
5. 호출되는 api의 url은 ```http://localhost:5000``` 입니다

- 프로덕션 환경
1. ```npm i``` 커맨드로 필요 라이브러리를 설치합니다.
2. 로컬에서 빌드된 환경을 보고자 할 땐, ```npm run start```를 통해 확인할 수 있습니다.
3. url은 아마 ```http://127.0.0.1:4173/``` 일 것 입니다.
4. 호출되는 api의 url은 ```http://3.36.234.174/chat``` 입니다

