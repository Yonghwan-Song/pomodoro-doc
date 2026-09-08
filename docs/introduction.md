---
sidebar_position: 1
slug: /
---

import DiagramPopout from "../src/components/DiagramPopout"

# Overview

<!--이거 어떤 회사 공고에서 자기가 만든건지 뭐 기여도같은거 명시하라고 해서 적었던 것임. -->

기획부터 프론트엔드와 백엔드 개발까지 직접 진행한 개인 프로젝트입니다.

## 소개

- [Pomodoro technique](https://ko.wikipedia.org/wiki/%ED%8F%AC%EB%AA%A8%EB%8F%84%EB%A1%9C_%EA%B8%B0%EB%B2%95)을 기반으로 하는 공부 & 작업 시간 측정 App입니다.
- 한 사이클의 작업 시간을 여러 개의 작업 세션들과 이어지는 짧은 휴식 그리고 마지막 긴 휴식으로 나누어 높은 집중력을 유지하는 데 도움을 줍니다.
  (작업 시간을 pomodoro 또는 pomo라고 부릅니다).
  - `One cycle == (pomo + short break) * number of pomos + long break`

- 작업 시간에 대한 통계를 제공하여 사용자의 생산성을 파악하는데 도움을 주고 다양한 Feedback기능을 통해 동기부여가 될 수 있도록 도와줍니다.

## 만들게 된 계기

- 원래 사용하던 앱이 있었는데, 일시 정지를 한 번 했을 때 얼마 동안 했는지 기록이 안 되었습니다.
- 그것을 계기로 제가 원하는 기능들을 추가하면서 배워보자는 생각으로 만들기 시작했습니다.

## 문제 해결 요약

<div className="card margin-bottom--md">
  <div className="card__header">
    <h3>Socket.IO로 시그널링 채널 설계하기</h3>
  </div>
  <div className="card__body">
    <p>
      브라우저끼리는 서로의 코덱과 네트워크 정보를 직접 주고받을 수 없어서, 그 교환을
      중계할 채널을 NestJS Gateway 위에 Socket.IO로 직접 구현했습니다. mediasoup은
      연결이 필요한 시점에 콜백을 호출해 줄 것을 요구하는데, 정작 그 답은 서버에 다녀와야
      나오고 콜백을 호출하지 않으면 아무 에러 없이 연결이 멈춰버립니다. 소켓 ack 응답을
      이 콜백에 이어 붙여 성공과 실패가 모두 라이브러리까지 전달되도록 했고, 재연결마다
      소켓 ID가 새로 발급되는 문제는 사용자 신원을 기준으로 세션을 승계하고 뒤늦게 도착한
      옛 소켓의 종료 이벤트는 무시하는 방식으로 처리했습니다.
    </p>
  </div>
  <div className="card__footer">
    <a href="https://pomodoro-doc.vercel.app/problem-solving#시그널링-채널-설계-socketio를-요청-응답-채널로-쓰기">
      자세히 보기 →
    </a>
  </div>
</div>

<div className="card margin-bottom--md">
  <div className="card__header">
    <h3>WebRTC 연결 끊김 대응하기</h3>
  </div>
  <div className="card__body">
    <p>
      화면 공유 기능은 시그널링에 TCP를, 미디어 전송에 UDP를 쓰는데, 두 프로토콜이 각각
      혹은 동시에 끊기는 경우가 있었습니다. Firebase UID로 재연결 시 기존 세션을 복구하고,
      ICE Restart로 미디어 연결까지 되살리도록 구현했습니다. 이 상황들을 재현해서 검증하기
      위해 로컬 환경에서 TCP/UDP 연결을 직접 끊어보는 테스트 방법도 따로 마련했습니다.
    </p>
  </div>
  <div className="card__footer">
    <a href="https://pomodoro-doc.vercel.app/problem-solving#webrtc-disconnection-handling">
      자세히 보기 →
    </a>
  </div>
</div>

<div className="card margin-bottom--md">
  <div className="card__header">
    <h3>세션 진행 중에도 다른 페이지를 자유롭게 이동하기</h3>
  </div>
  <div className="card__body">
    <p>
      타이머 UI를 그리는 컴포넌트는 다른 페이지로 이동하면 unmount되어 상태를 잃어버립니다.
      상태를 IndexedDB에 저장해두고 돌아올 때 복원하는 방식으로 풀었는데, 페이지 밖에서도
      세션을 이어서 카운트다운하려고 Service Worker를 썼습니다. 하지만 Service Worker는
      특정 이벤트에만 반응하고 곧바로 종료된다는 걸 뒤늦게 알게 되어, 카운트다운은 다시
      메인 스레드로 옮기고 Pub/Sub 패턴으로 페이지 간 상태를 동기화했습니다.
    </p>
  </div>
  <div className="card__footer">
    <a href="https://pomodoro-doc.vercel.app/problem-solving#한-세션이-진행-중일-때pomo-or-break-관계없이-다른-페이지들을-자유롭게-방문할-수-있도록-하는-것">
      자세히 보기 →
    </a>
  </div>
</div>

<div className="card margin-bottom--md">
  <div className="card__header">
    <h3>인터넷 연결이 끊겨도 핵심 기능은 계속 쓸 수 있게 하기</h3>
  </div>
  <div className="card__body">
    <p>
      학교 도서관에서 작업하다 보면 시험 기간마다 와이파이가 간헐적으로 끊겼는데, 그동안
      진행한 기록은 서버에 저장되지 않는 문제가 있었습니다. 요청을 임시로 보관해두었다가
      인터넷이 다시 연결되면 순서대로 다시 보내는 방식으로 풀었고, 같은 리소스를 여러 번
      수정한 요청은 하나로 합쳐서 보내도록 했습니다.
    </p>
  </div>
  <div className="card__footer">
    <a href="https://pomodoro-doc.vercel.app/problem-solving#인터넷-연결이-끊길-때에도-핵심-기능-사용할-수-있게-하기">
      자세히 보기 →
    </a>
  </div>
</div>

<div className="card margin-bottom--md">
  <div className="card__header">
    <h3>Horizontal Timeline 직접 만들기</h3>
  </div>
  <div className="card__body">
    <p>
      제 앱의 사용 방식에 맞는 타임라인 라이브러리를 찾기 어려워서 CSS 연습 삼아 직접
      구현했습니다. 화면 크기에 따라 반응형으로 만드는 과정에서 media query를 쓰는 방식이
      기존 이벤트 핸들러와 충돌해 작동하지 않는 문제를 겪었고, 대신 matchMedia 같은 Web
      API로 화면 크기 변화를 감지해서 픽셀 값을 다시 계산하는 방식으로 바꿨습니다.
    </p>
  </div>
  <div className="card__footer">
    <a href="https://pomodoro-doc.vercel.app/problem-solving#horizontal-timeline-만들기">
      자세히 보기 →
    </a>
  </div>
</div>

## 기능 요약

- [포모도로와 휴식으로 구성된 한 사이클에 대한 설정 및 각 세션의 측정](https://pomodoro-doc.vercel.app/features#settings)
- [타임라인을 통해 시각적 피드백 제공](https://pomodoro-doc.vercel.app/features#timeline)
- [일시 정지 및 정지한 시간 측정](https://pomodoro-doc.vercel.app/features#time-countdown-and-pause)
  - 한 세션에서 한 일시 정지들을 타임라인에 그려서 피드백 제공
- [자동 시작](https://pomodoro-doc.vercel.app/features#autostart)
- [Statistics 페이지에서 일간 및 주간 통계 제공](https://pomodoro-doc.vercel.app/features#statistics)
- [한 사이클을 얼마나 잘 이행했는지에 대한 feedback 제공](https://pomodoro-doc.vercel.app/features#cycle-adherence-rate)
- [세션을 구분하기 위한 카테고리 생성](https://pomodoro-doc.vercel.app/features#settings)
- [한 세션에서 여러 카테고리의 작업 가능](https://pomodoro-doc.vercel.app/features#categorized-sessions)
- [카테고리별 통계](https://pomodoro-doc.vercel.app/features#total-graph)
- [세션 진행 도중 `/timer`, `/statistics`, 그리고 `/settings` 페이지 간 자유롭게 이동 가능](https://pomodoro-doc.vercel.app/problem-solving#%ED%95%9C-%EC%84%B8%EC%85%98%EC%9D%B4-%EC%A7%84%ED%96%89-%EC%A4%91%EC%9D%BC-%EB%95%8Cpomo-or-break-%EA%B4%80%EA%B3%84%EC%97%86%EC%9D%B4-%EB%8B%A4%EB%A5%B8-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%93%A4%EC%9D%84-%EC%9E%90%EC%9C%A0%EB%A1%AD%EA%B2%8C-%EB%B0%A9%EB%AC%B8%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8F%84%EB%A1%9D-%ED%95%98%EB%8A%94-%EA%B2%83)
- [목표설정 및 달성에 관한 통계](https://pomodoro-doc.vercel.app/features#goal)
- [인터넷 연결이 불안정한 경우에도 주요 기능을 사용할 수 있도록 하기](https://pomodoro-doc.vercel.app/features#network-disconnection-handling)
- [Todoist Integration Option 제공](https://pomodoro-doc.vercel.app/features#todoist-integration)
- [화면 공유 스터디룸](https://pomodoro-doc.vercel.app/features#group-study)

## 기술 스택

### 프론트엔드

#### HTML, CSS, JavaScript and WEB APIs

- CSS
  - [Positioning](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning), [Coordinate systems](https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_view/Coordinate_systems)
    - [적용한 기능 (Timeline)](https://pomodoro-doc.vercel.app/features#%EC%8B%9C%EA%B0%81%EC%A0%81-%ED%94%BC%EB%93%9C%EB%B0%B1-19-17-16)
    - [구현 관련 어려웠던 점](https://pomodoro-doc.vercel.app/problem-solving#horizontal-timeline-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- WEB APIs
  - [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), [MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)
    - [기능 및 관련 영상](https://pomodoro-doc.vercel.app/features#%EB%B0%98%EC%9D%91%ED%98%95-%EB%94%94%EC%9E%90%EC%9D%B8-29-34)
    - [사용하게 된 계기 및 방식](https://pomodoro-doc.vercel.app/problem-solving#responsive%EA%B4%80%EB%A0%A8-css%EA%B0%80-%EC%9E%91%EB%8F%99%ED%95%98%EC%A7%80-%EC%95%8A%EC%95%84%EC%84%9C-web-api%EB%A5%BC-%EC%9D%B4%EC%9A%A9)

#### TypeScript

- [Generic Types](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types), [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
  - [description](https://pomodoro-doc.vercel.app/description#generic-types--conditional-types)
- [Index Signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)
  - [description](https://pomodoro-doc.vercel.app/description#index-signature)

<!-- #### SPA Related

- React
  - useMemo, useCallback, useContext, and etc
- React Router DOM - Nested Routing -->

#### SPA(Single Page Application) Related

- React
  - `useMemo`, `useCallback`, `useContext`, etc.
- React Router DOM
  - Nested Routing

#### HTTP Requests & Authentication

- Axios
  - [axios instance](https://axios-http.com/docs/instance), [interceptors](https://axios-http.com/docs/interceptors)
    - [example](https://github.com/Yonghwan-Song/pomodoro/tree/main/client/src/axios-and-error-handling)
- [Firebase Authentication](https://firebase.google.com/docs/auth/web/start)

#### Styling

- Styled Components, React Inline Style

#### Real-time Communication

- WebRTC (Media Transport via [mediasoup-client](https://www.npmjs.com/package/mediasoup-client))
- [Socket.io](https://www.npmjs.com/package/socket.io-client) (Signaling)

#### Etc

- [Recharts](https://recharts.org/)
  - [example](https://github.com/Yonghwan-Song/pomodoro/tree/main/client/src/Pages/Statistics/Graph-Related)
- [idb](https://www.npmjs.com/package/idb)
  - for a promise-based interface for interacting with Indexed DB
- date-fns
- JavaScript Design Patterns
  - Pub/Sub (Publisher-Subscriber Pattern)
    - [example](https://pomodoro-doc.vercel.app/problem-solving#%ED%95%B4%EA%B2%B0-%EB%B0%A9%EC%8B%9D-1)

### 백엔드 & 인프라

- **Framework**: NestJS
- **Database & ORM**: PostgreSQL, Drizzle
- **Real-time & Media**: WebRTC, [mediasoup](https://www.npmjs.com/package/mediasoup) (SFU Media Server), [socket.io](https://www.npmjs.com/package/socket.io) (Signaling)
- **Infrastructure & Hosting**:
  - GCP Compute Engine (Ubuntu virtual instance)
  - Vercel (Frontend React app)
- **Web Server & Process Management**: Nginx (Reverse Proxy), PM2

## 아키텍처 (Architecture)

이 프로젝트의 전체 시스템 아키텍처는 C4 모델을 사용하여 표현했습니다. C4 모델은 소프트웨어 시스템을 위성 사진을 보듯 가장 넓은 관점(C1)에서 시작하여, 점차 코드가 있는 상세 레벨(C4)까지 확대하며 설명하는 방식입니다.

### System Context Diagram (C1)

이 다이어그램은 우리 '뽀모도로 앱'이 외부 세계와 어떻게 상호작용하는지 보여주는 가장 높은 수준의 지도입니다.

<!-- (여기에 C1 다이어그램 삽입) -->

<DiagramPopout>

```mermaid
flowchart TD
    %% --- 노드 정의 ---
    User("fa:fa-user 사용자")

    subgraph " "
        App("<b>뽀모도로 생산성 앱</b><br>(Our System)")
    end

    subgraph "외부 시스템"
        direction LR
        Google("fa:fa-brands-google Google<br>(인증)")
        Firebase("fa:fa-brands-google Firebase<br>(토큰 검증)")
        Todoist("fa:fa-check-square Todoist<br>(업무 관리)")
    end

    %% --- 관계 정의 ---
    User -- "액션 수행 (클릭, 입력 등)" --> App
    App -- "UI 업데이트 및 피드백" --> User
    User -- "영상 스트림 (WebRTC/ICE via SFU)" --> App
    App -- "미디어 라우팅" --> User

    App -- "사용자 인증" --> Google
    App -- "토큰 검증" --> Firebase
    App -- "Task 데이터 동기화" --> Todoist

    %% --- 스타일 꾸미기 ---
    style User fill:#2a9d8f,stroke:#264653,color:#fff
    style App fill:#264653,stroke:#2a9d8f,color:#fff
    style Google fill:#e76f51,stroke:#f4a261,color:#fff
    style Firebase fill:#e76f51,stroke:#f4a261,color:#fff
    style Todoist fill:#e76f51,stroke:#f4a261,color:#fff
```

</DiagramPopout>

### Container Diagram (C2)

위 시스템을 확대한 다이어그램입니다. '뽀모도로 앱'이 어떤 기술적인 컨테이너들(웹 애플리케이션, API 서버, 데이터베이스 등)로 구성되어 있는지 보여줍니다.

<DiagramPopout>

```mermaid
flowchart TD
    User("fa:fa-user 사용자")

    subgraph "외부 시스템"
        Google("<b>Google</b><br>[Identity Provider]")
        Firebase("<b>Firebase Admin</b><br>[Token Verification]")
        Todoist("<b>Todoist API</b><br>[Task Management]")
    end

    subgraph "뽀모도로 관리 시스템"
        direction LR
        Frontend("<b>프론트엔드</b><br>[React SPA + mediasoup-client(full-ICE)]")
        Backend("<b>백엔드 API</b><br>[NestJS: REST + Signaling(Socket.IO) + Mediasoup SFU(ICE-lite)]")
        Database("<b>데이터베이스</b><br>[PostgreSQL + Drizzle ORM]")
    end

    User -- "사용" --> Frontend
    Frontend -- "API 요청<br>[HTTPS/REST]" --> Backend
    Frontend -- "시그널링<br>[Socket.IO]" --> Backend
    Frontend -- "미디어 업스트림 (내 영상)<br>[WebRTC/RTP]" --> Backend
    Backend -- "미디어 다운스트림 (다른 참가자 영상)<br>[WebRTC/RTP]" --> Frontend
    Frontend -- "OAuth 2.0 인증" --> Google
    Frontend -- "OAuth 동의 화면으로 리다이렉트" --> Todoist
    Backend -- "ID 토큰 검증" --> Firebase
    Backend -- "데이터 Read/Write" --> Database
    Backend -- "할 일 목록 동기화<br>[REST API]" --> Todoist

    style User fill:#2a9d8f,stroke:#264653,color:#fff
    style Frontend fill:#264653,stroke:#2a9d8f,color:#fff
    style Backend fill:#264653,stroke:#2a9d8f,color:#fff
    style Database fill:#264653,stroke:#2a9d8f,color:#fff
    style Google fill:#e76f51,stroke:#f4a261,color:#fff
    style Firebase fill:#e76f51,stroke:#f4a261,color:#fff
    style Todoist fill:#e76f51,stroke:#f4a261,color:#fff
```

</DiagramPopout>

<!-- ![architecture](./img/architecture.png) -->

<!-- ## Database Document Relationships

```mermaid
erDiagram
    USER {
        ObjectId _id "PK"
        string userEmail "UK"
        string firebaseUid "UK"
    }

    CYCLE_SETTING {
        ObjectId _id "PK"
        string userEmail "FK"
        string name
    }

    CATEGORY {
        ObjectId _id "PK"
        string userEmail "FK"
        string name
    }

    POMODORO {
        ObjectId _id "PK"
        string userEmail "FK"
        ObjectId category "FK"
        string taskId "Logical FK"
    }

    TODAY_RECORD {
        ObjectId _id "PK"
        string userEmail "FK"
        string kind
    }

    TODOIST_TASK_TRACKING {
        ObjectId _id "PK"
        string userEmail "FK"
        string taskId
    }

    %% --- 관계 정의 ---
    %% 한 명의 USER는 여러 데이터를 '소유'합니다. (논리적 관계: userEmail)
    USER ||..o{ CYCLE_SETTING : "owns"
    USER ||..o{ CATEGORY : "owns"
    USER ||..o{ POMODORO : "owns"
    USER ||..o{ TODAY_RECORD : "owns"
    USER ||..o{ TODOIST_TASK_TRACKING : "owns"

    %% 한 개의 CATEGORY는 여러 POMODORO에 '할당될' 수 있습니다. (물리적 관계: ref)
    CATEGORY ||--o{ POMODORO : "is assigned to"

    %% POMODORO와 TODOIST_TASK_TRACKING은 taskId로 연결됩니다. (기능적 관계)
    POMODORO }o..o{ TODOIST_TASK_TRACKING : "tracks"
``` -->

### Component Diagram (C3)

<DiagramPopout>

```mermaid
    flowchart TD
        %% 외부 서비스 및 클라이언트 정의
        Frontend["Frontend (React / mediasoup-client / socket.io-client)"]
        FirebaseAuth["Firebase Auth (External Auth Service)"]
        Postgres[("PostgreSQL (Drizzle ORM)")]

        %% 백엔드 API (서브그래프 중첩 제거)
        subgraph Backend ["Backend API (NestJS Container) - 그룹 스터디(실시간) 부분"]
            Gateway["SignalingGateway (signaling module)"]
            GroupService["GroupStudyManagementService (group-study-management module)"]
            MediasoupSvc["MediasoupService (mediasoup module)<br/>worker / router 소유"]
        end

        %% 같은 컨테이너 안의 REST 부분 (이 다이어그램의 상세 대상은 아님)
        Rest["REST API 모듈<br/>users · categories · cycle-setting<br/>pomodoros · today-records · todoist"]

        %% 인메모리 상태 세션 (별도 서브그래프로 분리)
        subgraph Memory ["In-Memory Session States"]
            RoomEntity["Room Entity (In-Memory Room State)"]
            PeerEntity["Peer Entity (In-Memory Peer State)"]
        end

        %% 연결선 정의 (가장 표준적인 -->|라벨| 문법 사용)
        %% [A] 클라이언트 요청 처리 흐름
        Frontend -->|1. 소켓 연결 요청 및 시그널링| Gateway
        Gateway -.->|2. handshake 단계에서 ID 토큰 검증| FirebaseAuth

        Gateway -->|3. Delegate Logic| GroupService
        Gateway -->|Query RTP Capabilities| MediasoupSvc

        GroupService -->|4. Delegate Transport Creation| MediasoupSvc

        %% [B] 서버 시작 시 한 번 일어나는 흐름 (위 번호와 별개)
        GroupService -->|"서버 시작 시 - DB에서 방 메타데이터 조회"| Postgres
        GroupService -->|"서버 시작 시 - 조회한 데이터로 Room 객체 생성"| RoomEntity

        GroupService -->|Manage State| RoomEntity
        GroupService -->|Manage State| PeerEntity
        RoomEntity -->|Map Active Peers| PeerEntity

        MediasoupSvc -->|"RTP 미디어 중계 - mediasoup worker와 브라우저 사이"| Frontend

        %% [C] REST 부분 (같은 컨테이너, 상세는 생략)
        Frontend -->|"REST 요청 (HTTPS)"| Rest
        Rest -->|"Drizzle ORM"| Postgres

        %% 스타일 정의 (가장 호환성 높은 속성만 사용)
        style Frontend fill:#264653,stroke:#2a9d8f,color:#fff
        style FirebaseAuth fill:#4c566a,stroke:#d08770,color:#fff
        style Gateway fill:#2a9d8f,stroke:#264653,color:#fff
        style GroupService fill:#2a9d8f,stroke:#264653,color:#fff
        style MediasoupSvc fill:#e76f51,stroke:#264653,color:#fff
        style RoomEntity fill:#e9c46a,stroke:#264653,color:#000
        style PeerEntity fill:#e9c46a,stroke:#264653,color:#000
        style Postgres fill:#4f772d,stroke:#31572c,color:#fff
        style Rest fill:#6c757d,stroke:#343a40,color:#fff
```

</DiagramPopout>

### 미디어 전송 구조 (SFU)

위 다이어그램들이 "무엇으로 구성되어 있는지"를 보여준다면, 이 그림은 런타임에 **미디어가 실제로 흐르는 모양**을 보여줍니다. 참가자가 3명인 방을 기준으로 그렸습니다.

<DiagramPopout>

```mermaid
flowchart LR
    subgraph Up["참가자 3명 · 송신 관점"]
        direction TB
        A1["Peer A<br/>sendTransport 1"]
        B1["Peer B<br/>sendTransport 1"]
        C1["Peer C<br/>sendTransport 1"]
    end

    subgraph SFU["mediasoup SFU (worker 1 / router 1 - 모든 방이 공유)"]
        direction TB
        P["Producer 3개<br/>참가자당 1개"]
        F["선택적 포워딩<br/>재인코딩 없음<br/>수신자 대역폭에 맞춰 레이어만 선택"]
        K["Consumer 6개<br/>3 x (3 - 1)"]
        P --> F --> K
    end

    subgraph Down["같은 참가자 3명 · 수신 관점"]
        direction TB
        A2["Peer A<br/>recvTransport 1<br/>B, C를 소비"]
        B2["Peer B<br/>recvTransport 1<br/>A, C를 소비"]
        C2["Peer C<br/>recvTransport 1<br/>A, B를 소비"]
    end

    A1 -- "업스트림 1개<br/>VP8 simulcast L0(1/4) · L1(1/2) · L2(원본)" --> P
    B1 -- "업스트림 1개" --> P
    C1 -- "업스트림 1개" --> P

    K -- "다운스트림 2개" --> A2
    K -- "다운스트림 2개" --> B2
    K -- "다운스트림 2개" --> C2

    style A1 fill:#264653,stroke:#2a9d8f,color:#fff
    style B1 fill:#264653,stroke:#2a9d8f,color:#fff
    style C1 fill:#264653,stroke:#2a9d8f,color:#fff
    style A2 fill:#264653,stroke:#2a9d8f,color:#fff
    style B2 fill:#264653,stroke:#2a9d8f,color:#fff
    style C2 fill:#264653,stroke:#2a9d8f,color:#fff
    style P fill:#2a9d8f,stroke:#264653,color:#fff
    style F fill:#e76f51,stroke:#264653,color:#fff
    style K fill:#e9c46a,stroke:#264653,color:#000
```

</DiagramPopout>

왼쪽과 오른쪽은 **같은 참가자 3명**이며, 한 사람이 동시에 송신자이자 수신자라는 점을 화살표가 겹치지 않게 나눠 그린 것입니다.

- **업스트림 3개, 다운스트림 6개**라는 비대칭이 SFU의 핵심입니다. P2P라면 각 참가자가 나머지 모두에게 직접 보내야 해서 1인당 N-1개를 업로드해야 하지만, SFU에서는 **한 번만 올리고 복제는 서버가** 합니다. 업로드 대역폭이 참가자 수에 비례해 늘어나지 않습니다.
- 대신 서버는 **재인코딩을 하지 않습니다.** 그래서 수신자별 화질 조절은 서버가 새로 만들어내는 것이 아니라, 송신자가 미리 올려둔 simulcast 레이어 중 하나를 고르는 방식으로 이뤄집니다. 요청한 화질과 실제 전달되는 화질이 어긋날 수 있는 이유이기도 합니다([관련 문제 해결](https://pomodoro-doc.vercel.app/problem-solving#webrtc-수신-화질-요청과-실제의-괴리-다루기)).
- 미디어는 UDP로, 시그널링(Socket.IO)은 TCP로 흐르며 서로 독립적으로 끊길 수 있습니다. 이 점을 다룬 내용은 [WebRTC Disconnection Handling](https://pomodoro-doc.vercel.app/problem-solving#webrtc-disconnection-handling)에 있습니다.
- 현재 화면 공유는 영상만 전송합니다(`getUserMedia({ video: true, audio: false })`). 또한 mediasoup worker와 router를 각각 하나만 두고 모든 방이 공유하므로, 방이 늘어나면 방별 router 분리가 필요합니다.

## Page Screenshots

- 아래는 각 페이지의 간단한 스크린샷입니다. 구체적인 기능 설명은 'Features' 사이드바 항목에서 다루겠습니다.

### `/timer`

![timer-one-cate](./img/timer-one-cate.png)

세션 진행 도중에 카테고리 바꾼 경우.
![timer-two-cate](./img/timer-two-cate.png)

타임라인  
![timeline](./img/timeline.png)

### `/statistics`

#### Total Graph and Category graph

두번째 그래프에 `Uncategorized`만 그려짐.  
![same-week-1](./img/same-w-1.png)

두번째 그래프에 `Documentation` 와 `Development`.  
![same-week-2](./img/same-w-2.png)

두번째 그래프에 `Uncategorized` 와 `Job Search and Application`.  
![same-week-3](./img/same-w-3.png)

#### Two graphs show different week data

첫번째 - `11.4 ~ 11.10`, 두번째 - `10.28 ~ 11.3`.  
![diff-week-data](./img/diff-w-1.png)

첫번째 - `10.28 ~ 11.3`, 두번째 - `11.4 ~ 11.10`.  
![diff-week-data-2](./img/diff-w-2.png)

#### Mouse hover over each graph

![hover-over-first](./img/hover-1.png)  
![hover-over-second](./img/hover-2.png)

#### Weekly Trend

![weeklyTrend](./img/weeklyTrend.png)

#### Goals

Daily goals
![daily-goals](./img/daily-goals.png)

Weekly goals
![weekly-goal](./img/weekly-goal-svg.svg)

### `/group-study`

로비  
![lobby](./img/group-study-lobby.png)

방  
![room](./img/group-study-room.png)

한 화면에  
![tile](./img/group-study-tile.png)

### `/settings`

![settings-wide-1](./img/settings/settings-wide-1.png)  
![settings-wide-2](./img/settings/settings-wide-2.png)  
![narrow-settings-1](./img/settings/settings-narrow-1.png)
![narrow-settings-2](./img/settings/settings-narrow-2.png)

<!-- Tech Stack: 요약본 (아직 다듬지 않음)
### 프론트엔드

- React (with TypeScript), React Router DOM, Axios, Zustand, Firebase Authentication
- React Inline Style, Styled Components
- testing-library
  - jest-dom
  - react
  - user-event
- ETC
  - Rechart, [idb](https://github.com/jakearchibald/idb), date-fns, [rollup](https://rollupjs.org) (for bundling the service worker script)
- Vercel

### 백엔드

- NestJS
- Firebase Admin
- MongoDB Atlas, Mongoose, @nest/mongoose
- [Render.com](https://render.com) -->
