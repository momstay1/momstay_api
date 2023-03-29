# 소소하자 API 서버

## Development environment

```bash
Node.js >= 12.x (16.13.2)
NPM >= 6.x (8.1.2)
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 배포 방법

develop 브랜치에서 개발 완료 <br>
master 브랜치로 이동후 develop 브랜치와 merge 후 npm run build 실행하여 build 결과 파일 git push <br>
<br>
[develop] git checkout master<br>
[master] git merge develop<br>
[master] npm run build<br>
[master] git add .<br>
[master] git commit -m "npm run build"<br>
[master] git push origin master<br>

서버접속<br>
su momstay_api<br>
pm2 reload momstay-api<br>
<br>

서버최초실행<br>
pm2 start npm --name "momstay_api" -- run start<br>
<br><br><br>
