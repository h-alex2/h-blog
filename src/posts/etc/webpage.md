---
title: 웹 페이지 로드시 일어나는 일들
tag: TCPIP, 브라우저
date: 2023-07-11 03:28:34
description: 브라우저에 URL을 입력했을 때 어떤 일이 일어날까?
---

# 웹 페이지 로드 단계

웹 페이지 로드 단계는 웹 서버를 통해 데이터를 받는 부분과 데이터를 받은 이후 데이터를 이용해 화면을 그리는 부분 이렇게 크게 2가지로 나눌 수 있다.

웹 페이지는 하나의 웹 서버에서 동작한다. 웹 서버는 특수 고성능 컴퓨터로, 애플리케이션 및 데이터베이스를 호스팅하는 것 외에도 콘텐츠(웹 페이지, 이미지, 비디오)를 저장하고 사용자에게 제공한다. 서버도 DNS 쿼리에 응답하고 인터넷을 계속 실행하기 위해 다른 중요한 작업을 수행한다.

## 1. DNS 쿼리

브라우저에 도메인 주소를 입력하는 것 부터 페이지 로드 단계가 시작된다. 도메인은 IP 주소를 사람이 알아보기 쉽게 문자로 바꾼 것으로 웹 페이지에 접속하기 위해서는 도메인을 IP주소로 변환해야 서버의 실제 주소를 찾을 수 있다. 이 작업은 Domain Names System인 DNS 프로토콜을 통해 할 수 있다. IP를 찾기 위해 DNS 네임 서버에 "질의"를 한다. DNS 네임 서버가 도메인에 해당하는 IP를 반환하면 DNS 질의 과정은 끝난다. 반환된 IP는 나중에 또 쓸 수 있도록 로컬 DNS 캐시에 저장해둔다.

## 2. TCP 핸드쉐이크

서버에 요청을 보내기 전 먼저 서버에 내 컴퓨터의 존재를 알려주는 과정이 필요한데, 여기서 TCP(전송 계층)가 사용된다. TCP의 가장 중요한 키워드는 "안정성" 그리고 "신뢰성"이다. 이를 보장하기 위해 **3-way 핸드쉐이크** 라는 기법으로 데이터가 확실히 도착하도록 준비한다.

![tcp](https://media.geeksforgeeks.org/wp-content/uploads/handshake-1.png)

전송 계층의 프로토콜 데이터 유닛을 segment라고 한다. 요청이 주는 쪽을 송신자(Sender) 그리고 요청을 받는 쪽을 수신자(Receiver)라고 부른다고 할 때, 위 이미지를 보면 송신자와 수신자간에 세 개의 세그먼트가 교환된다는 것을 알 수 있다.

![tcp](https://media.geeksforgeeks.org/wp-content/uploads/TCP-connection-1.png)

- 1단계(SYN): 클라이언트는 서버와의 연결을 위해 서버에게 클라이언트가 통신을 시작할 가능성이 있고 어떤 시퀀스 번호로 세그먼트를 시작할지 알려주는 SYN(Synchronize Sequence Number)이 포함된 세그먼트를 보낸다.
- 2단계(SYN + ACK): 서버는 SYN-ACK 신호 비트가 설정된 상태로 클라이언트 요청에 응답한다. ACK는 수신한 세그먼트의 응답을 의미하며, SYN은 세그먼트를 시작할 가능성이 있는 시퀀스 번호를 의미. 서버가 받은 세그먼트를 그대로 보냄으로써 응답할 수도 있지만 성공된 상태를 의미하기 위해 1단계에서 받은 SYN에서 1을 더한 값을 ACK로 보내 성공의 의미를 담는다.
- 3단계(ACK): 마지막 부분에서 클라이언트는 서버의 응답을 승인하고 실제 데이터 전송을 시작할 수 있는 안정적인 연결을 시작한다.

## 3. TLS 핸드쉐이크

HTTPS는 HTTP 프로토콜 상위에서 TLS 암호화를 구현한 것이다. HTTPS를 사용하는 웹 사이트는 TLS 암호화를 사용한다.
TLS 핸드쉐이크는 사용자가 HTTPS를 통해 웹 사이트를 탐색하고 브라우저가 처음 해당 웹 사이트의 원본 서버를 쿼리하기 시작할 때마다 발생한다.
TLS 핸드쉐이크는 TCP 연결이 TCP 핸드쉐이크를 통해 열린 후에 발생한다.

클라이언트는 서버의 인증서를 받아 서버의 무결성을 확인하고, 신뢰할 수 있는 서버라면, 암호화 통신에 사용할 대칭키를 서버의 공개키로 암호화 하여 전달한다.

## 4. HTTP 요청 - 응답

HTTP는 Hyper Text Transfer Protocol의 약자로써, 텍스트 기반의 통신 규약으로 인터넷에서 데이터를 주고받을 수 있는 프로토콜을 말한다. 여기서 Hyper Text란 웹 페이지를 구성하는 HTML을 말함. 송신자가 요청을 보내면 수신자가 응답하는 통신 구조를 가지고 있고, 이 하나의 사이클을 트랜잭션이라고 한다. HTTP는 응답 후에는 더 이상 HTTP 연결을 유지하지 않기 때문에 **비연결성** 프로토콜이라고도 한다.

웹 페이지를 만들기 위해 이제 웹 서버에 HTML 파일을 HTTP 프로토콜로 요청한다. 웹 서버가 HTML 파일을 응답해 주면, 네트워크 통신 과정이 끝나게 된다.

## 5. DOM 생성하기

HTML 파일은 텍스트 형식으로 이 파일을 브라우저가 이해할 수 있는 방식으로 바꿔야 한다. 이런 과정을 파싱이라고 한다. HTML을 분석해 Document Object Model 즉 DOM이라고 불리는 트리를 만든다. DOM은 브라우저가 웹 페이지를 표현하는 뼈대이자 API이다. DOM을 다 만들었다면 브라우저는 DOMContentLoaded라는 브라우저 이벤트를 발생시킨다.

## 6. CSSOM 생성하기

보통 CSS는 HTML을 파싱하다 link 태그를 만나게 되면 요청하게 된다. DOM과 마찬가지로 브라우저가 이해할 수 있는 형식으로 변환이 필요하다. CSS를 파싱하며 CSSOM(CSS Object Model) 트리를 만든다. CSSOM 생성은 별개의 스레드에서 이뤄져서 DOM 생성 과정을 방해하지 않는다.

## 7. JavaScript 실행하기

JavaScript는 script 태그를 만나면 요청하게 된다. JavaScript는 CSS와 다르게 코드를 해석하고 실행 완료가 될 때까지 DOM 생성을 block 시킨다. 실행 중에 `document.write()`와 같은 함수로 DOM을 바꿀 수 있기 때문이다. 이 경우 `async` 또는 `defer`속성을 통해 웹 페이지 로딩 완료 후에 실행되도록 지연시킬 수 있다.

## 8. 렌더 트리로 합치기

DOM과 CSSOM을 만들었다면 브라우저에게 최종적으로 어떤 요소를 어떻게 그릴지 알려주어야 한다. Render Tree는 브라우저가 최종적으로 그릴 요소들을 알려준다. DOM의 `script`태그, CSS의 `display: none;` 속성은 보이지 않는다. 브라우저가 최종적으로 그려야 할 요소와 스타일만을 계산한다.
이제 이 렌더 트리를 이용해 페이지를 그리면 웹 페이지 로드가 완료된다.

## 렌더링 파이프라인

브라우저가 렌더 트리를 그리는 과정은 Layout - Paint - Composite 순으로 진행된다. 이것을 렌더링 파이프라인이라고도 한다.

## 9. 크기, 위치 계산하기 - 처음엔 Layout이지만 두 번째부터는 비싼 Reflow

Layout은 웹 페이지를 기준으로 각 요소의 위치와 크기를 결정하는 작업이다.
이 과정은 처음 일어날 땐 Layout이라고 하지만 JavaScript 등에 의해 재계산이 일어날 경우에는 Reflow라고 한다. 렌더링 파이프라인 첫 과정이기 때문에 Reflow가 발생하면 뒤 과정또한 다시 발생한다. 즉 비용이 크다.

## 10. 시각적 부분을 그리기 - Paint (Repaint)

텍스트, 색상, 테두리, 그림자 등 요소의 모든 시각적 부분을 화면에 그리는 작업이다. 브라우저는 Paint 작업을 매우 빠르게 진행한다고 한다.

## 11. 레이어 합치기

레이어가 2개 이상 생성될 때(z-index, 3D 속성 등..) 각 레이어를 하나로 합치는 과정을 Composite라고 한다. 이 과정은 요소들을 정확한 순서로 화면에 그리는 작업이다. 이 과정이 끝나면 웹 페이지 로드가 완료된다.

## 출처

- [웹 페이지 로딩 과정 이해하기](https://blog.imqa.io/webpage_loading_process/)
- [TLS 핸드셰이크란 무엇일까요?](https://www.cloudflare.com/ko-kr/learning/ssl/what-happens-in-a-tls-handshake/)