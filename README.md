# Socket Connection Observer

## Idea

- 서버 측 setInterval를 사용한 소켓 연결 감시자
- 클라이언트의 최초 소켓 연결 후 서버에서 5초 간격으로 ping을 날림
- 클라이언트는 서버로부터 ping 이벤트를 수신받은 후, 다음 ping 이벤트를 수신받기 전(5초)까지 서버에게 ping 이벤트를 발송하지 않으면 셔버에서 연결 끊음

## Clone

```
$ git clone https://github.com/choewy/socket-connection-observer.git
$ cd socket-connection-observer
```

## Server

```
$ cd server
$ npm i
$ npm run start:dev
```

## Client

```
$ cd clinet
$ npm i
$ npm run start
```
