---
sidebar_position: 1
slug: /
---

# Overview

<!--이거 어떤 회사 공고에서 자기가 만든건지 뭐 기여도같은거 명시하라고 해서 적었던 것임. -->
<!-- 기획부터 프론트엔드와 백엔드 개발까지 직접 진행한 개인 프로젝트입니다. -->

## 소개

- [Pomodoro technique](https://ko.wikipedia.org/wiki/%ED%8F%AC%EB%AA%A8%EB%8F%84%EB%A1%9C_%EA%B8%B0%EB%B2%95)을 기반으로 하는 공부 & 작업 시간 측정 App입니다.
- 한 사이클의 작업 시간을 여러 개의 작업 세션들과 이어지는 짧은 휴식 그리고 마지막 긴 휴식으로 나누어 높은 집중력을 유지하는 데 도움을 줍니다.
  (작업 시간을 pomodoro 또는 pomo라고 부릅니다).

  - `One cycle == (pomo + short break) * number of pomos + long break`

- 작업 시간에 대한 통계를 제공하여 사용자의 생산성을 파악하는데 도움을 주고 다양한 Feedback기능을 통해 동기부여가 될 수 있도록 도와줍니다.

## 만들게 된 계기

- 원래 사용하던 앱이 있었는데, 일시 정지를 한 번 했을 때 얼마 동안 했는지 기록이 안 되었습니다.
- 그것을 계기로 제가 원하는 기능들을 추가하면서 배워보자는 생각으로 만들기 시작했습니다.

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

#### Etc

- [Recharts](https://recharts.org/)
  - [example](https://github.com/Yonghwan-Song/pomodoro/tree/main/client/src/Pages/Statistics/Graph-Related)
- [idb](https://www.npmjs.com/package/idb)
  - for a promise-based interface for interacting with Indexed DB
- date-fns
- JavaScript Design Patterns
  - Pub/Sub (Publisher-Subscriber Pattern)
    - [example](https://pomodoro-doc.vercel.app/problem-solving#%ED%95%B4%EA%B2%B0-%EB%B0%A9%EC%8B%9D-1)

### 백엔드

- NestJS, Express
- [Firebase Admin](https://www.npmjs.com/package/firebase-admin)
- MongoDB Atlas, Mongoose, @nest/mongoose

### 호스팅

- Vercel - React app
- [Render.com](https://render.com) - API server

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

## 아키텍처 (Architecture)

이 프로젝트의 전체 시스템 아키텍처는 C4 모델을 사용하여 표현했습니다. C4 모델은 소프트웨어 시스템을 위성 사진을 보듯 가장 넓은 관점(C1)에서 시작하여, 점차 코드가 있는 상세 레벨(C4)까지 확대하며 설명하는 방식입니다.

### System Context Diagram (C1)

이 다이어그램은 우리 '뽀모도로 앱'이 외부 세계와 어떻게 상호작용하는지 보여주는 가장 높은 수준의 지도입니다.

<!-- (여기에 C1 다이어그램 삽입) -->

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

    %% --- 관계 정의 (양방향 관계 수정) ---
    User -- "액션 수행 (클릭, 입력 등)" --> App
    App -- "UI 업데이트 및 피드백" --> User

    App -- "1단계: 로그인 요청" --> Google
    Google -- "2단계: ID 토큰 전달" --> App

    App -- "3단계: 토큰 검증 요청" --> Firebase
    Firebase -- "4단계: 검증 결과 응답" --> App


    App -- "Task 데이터 요청" --> Todoist
    Todoist -- "Task 데이터 응답" --> App

    %% --- 스타일 꾸미기 ---
    style User fill:#2a9d8f,stroke:#264653,color:#fff
    style App fill:#264653,stroke:#2a9d8f,color:#fff
    style Google fill:#e76f51,stroke:#f4a261,color:#fff
    style Firebase fill:#e76f51,stroke:#f4a261,color:#fff
    style Todoist fill:#e76f51,stroke:#f4a261,color:#fff
```

### Container Diagram (C2)

위 시스템을 확대한 다이어그램입니다. '뽀모도로 앱'이 어떤 기술적인 컨테이너들(웹 애플리케이션, API 서버, 데이터베이스 등)로 구성되어 있는지 보여줍니다.

```mermaid
flowchart TD
    %% --- 노드 정의 ---
    User("fa:fa-user 사용자")

    %% subgraph " "
        %% --- 외부 시스템 그룹 (수직 정렬로 수정) ---
        %% subgraph "외부 시스템 (External Systems)" 괄호 부분 text 짤림.
        subgraph "외부 시스템"

            Google("<b>Google</b><br>[Identity Provider]")
            Firebase("<b>Firebase Admin</b><br>[Token Verification]")
            Todoist("<b>Todoist API</b><br>[Task Management]")
        end
    %% end

    %% subgraph " "
        %% --- 우리 시스템 그룹 ---
        %% subgraph "뽀모도로 관리 시스템 (Our System)" 괄호 부분 text 짤림.
        subgraph "뽀모도로 관리 시스템"

            direction LR
            Frontend("<b>프론트엔드</b><br>[React SPA in Browser]")
            Backend("<b>백엔드 API</b><br>[NestJS on Server]")
            Database("<b>데이터베이스</b><br>[MongoDB Atlas]")
        end
    %% end

    %% --- 관계 정의 ---
    User -- "사용" --> Frontend
    Frontend -- "API 요청<br>[HTTPS/REST]" --> Backend
    Frontend -- "OAuth 2.0 인증" --> Google
    Backend -- "ID 토큰 검증" --> Firebase
    Backend -- "데이터 Read/Write" --> Database
    Backend -- "할 일 목록 동기화<br>[REST API]" --> Todoist

    %% --- 스타일 ---
    style User fill:#2a9d8f,stroke:#264653,color:#fff
    style Frontend fill:#264653,stroke:#2a9d8f,color:#fff
    style Backend fill:#264653,stroke:#2a9d8f,color:#fff
    style Database fill:#264653,stroke:#2a9d8f,color:#fff
    style Google fill:#e76f51,stroke:#f4a261,color:#fff
    style Firebase fill:#e76f51,stroke:#f4a261,color:#fff
    style Todoist fill:#e76f51,stroke:#f4a261,color:#fff
```

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

### `/settings`

![settings-wide-1](./img/settings/settings-wide-1.png)  
![settings-wide-2](./img/settings/settings-wide-2.png)  
![narrow-settings-1](./img/settings/settings-narrow-1.png)
![narrow-settings-2](./img/settings/settings-narrow-2.png)

<!-- Tech Stack Summarized version that is shitty.
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
