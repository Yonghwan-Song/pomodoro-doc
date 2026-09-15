# Pomodoro Project Documentation

Pomodoro 기법을 기반으로 집중·휴식 시간을 관리하고, 통계·피드백·협업 기능을 제공하는 웹 애플리케이션의 프로젝트 문서입니다.

- [라이브 앱](https://pomodoro-git-main-yhs-projects-00a441cb.vercel.app)
- [애플리케이션 소스 코드](https://github.com/Yonghwan-Song/pomodoro)
- [문서 사이트](https://pomodoro-doc.vercel.app)

## 먼저 읽을 문서

프로젝트를 빠르게 이해하려면 아래 순서로 읽어 주세요. 이 세 문서는 프로젝트의 목적, 사용자 기능, 그리고 핵심 문제 해결 과정을 각각 설명하는 주요 문서입니다.

1. [프로젝트 개요](docs/introduction.md) — 프로젝트 배경, 기술 스택, 주요 기능 요약, 시스템 아키텍처(C4), 화면 예시
2. [기능](docs/features.mdx) — 타이머·타임라인·통계·목표·오프라인 처리·Todoist 연동·그룹 스터디·설정 등 사용자 기능과 데모
3. [문제 해결](docs/problem-solving.mdx) — 설계 제약을 분석하고 해결책을 구현·검증한 과정

## 프로젝트 한눈에 보기

이 앱은 포모도로 세션과 휴식을 측정하고, 집중 기록을 시각화·통계화합니다. 로그인하지 않은 사용자도 사용할 수 있도록 상태의 영속성을 고려했으며, 네트워크 단절 상황과 실시간 그룹 스터디의 연결 복구도 다룹니다.

주요 기능은 다음과 같습니다.

- 타이머: 일시 정지 시간 기록, 자동 시작, 세션 시간 조절, 카테고리별 기록, 브라우저 재방문 후 세션 이어가기
- 피드백과 통계: 수평 타임라인, 반응형 UI, 사이클 이행률, 일간·주간·카테고리별 통계와 목표
- 안정성 및 연동: 오프라인 요청 보관·재전송, Todoist 연동, Google 인증
- 협업: WebRTC/mediasoup 기반 그룹 스터디와 불안정한 네트워크에서의 재연결 처리

## 핵심 문제 해결 사례

[문제 해결 문서](docs/problem-solving.mdx)는 채용 관점에서 특히 참고할 수 있는 기술적 의사결정과 검증 과정을 담고 있습니다.

- 페이지를 이동하거나 앱을 다시 열어도 진행 중인 타이머 상태를 정확히 복원하고, 통계에 반영하는 방법
- 인터넷이 끊겨도 사용자 작업을 잃지 않도록 요청을 저장하고 연결 복구 후 재전송하는 방법
- 라이브러리 없이 수평 타임라인을 구현하고 화면 크기 변화에 대응한 방법
- WebRTC의 TCP 시그널링과 UDP 미디어 연결이 각각 또는 동시에 끊기는 경우를 구분해 복구한 방법

각 사례에는 문제 상황, 해결 방식, 시행착오 및 시퀀스 다이어그램 또는 테스트 방법이 포함됩니다. 관련 설계에 대한 비판적 검토와 개선점은 [Questions](docs/questions.mdx)에서 확인할 수 있습니다.

## 전체 문서 구조

| 문서 | 다루는 내용 | 읽는 경우 |
| --- | --- | --- |
| [introduction.md](docs/introduction.md) | 프로젝트 개요, 기술 스택, 기능 요약, C4 아키텍처, 화면 | 프로젝트의 전체 맥락을 먼저 파악할 때 |
| [features.mdx](docs/features.mdx) | 사용자 기능, 구현 설명, 데모 영상 | 제품이 실제로 무엇을 할 수 있는지 볼 때 |
| [problem-solving.mdx](docs/problem-solving.mdx) | 핵심 문제, 해결 과정, 제약과 검증 | 기술적 문제 해결 역량을 검토할 때 |
| [architectue-and-design.mdx](docs/architectue-and-design.mdx) | MongoDB 데이터 모델과 ERD | 데이터 구조를 확인할 때 |
| [overview-of-pomodoro-session-data-flow.mdx](docs/overview-of-pomodoro-session-data-flow.mdx) | MongoDB부터 통계 UI까지의 데이터 흐름 | 데이터가 서버와 클라이언트에서 어떻게 변환되는지 볼 때 |
| [description.mdx](docs/description.mdx) | TypeScript Generic, Conditional Type, Index Signature 활용 | 타입 설계의 세부 구현을 볼 때 |
| [questions.mdx](docs/questions.mdx) | 핵심 설계에 대한 비판적 질문, 한계, 개선점 | 의사결정의 근거와 회고를 더 살필 때 |
| [miscellaneous.mdx](docs/miscellaneous.mdx) | IndexedDB, Service Worker, 이벤트 루프 관련 보충 학습 | 문제 해결의 브라우저 동작 원리를 보충할 때 |
| [javascript.mdx](docs/javascript.mdx) | JavaScript 런타임과 실행 메커니즘 학습 노트 | 기반 JavaScript 개념을 참고할 때 |
| [links.mdx](docs/links.mdx) | 라이브 앱과 두 저장소 링크 | 외부 리소스로 이동할 때 |

## 문서 간 관계

`introduction.md`가 프로젝트의 출발점입니다. 기능의 사용자 관점 설명은 `features.mdx`에서, 해당 기능을 안정적으로 만들기 위해 마주한 기술 과제와 해결 과정은 `problem-solving.mdx`에서 이어집니다. 필요에 따라 데이터 모델·흐름 문서와 질문·보충 문서를 참조하면 됩니다.

## 포트폴리오 PDF

`npm run build`는 `includeDocs`에 지정한 소개 → 데이터베이스 → 문제 해결
세 문서를 코드와 함께 PDF로 생성합니다. 웹사이트의 사이드바는 바꾸지 않습니다.
첫 페이지의 **포트폴리오 PDF 열기 / 인쇄** 버튼은
`/pdfs/pomodoro-portfolio.pdf`를 새 탭으로 엽니다. 생성에 성공한 전체 PDF는
`static/pdfs/`에도 저장하므로 `npm start`와 `npm run serve` 양쪽에서 열립니다.
개발 서버에서는 마지막으로 빌드한 PDF를 제공합니다. 문서 수정 사항을 PDF에
반영하려면 다시 빌드하세요. 새로 받은 저장소에서는 최초 PDF 빌드가 필요합니다.

빌드 환경에는 Java (`java`가 PATH에 있어야 함), Chromium/Chrome 및 한글
폰트가 필요합니다. 기존 Chrome을 사용하는 경우
`PUPPETEER_EXECUTABLE_PATH=/path/to/chrome npm run build`로 실행할 수 있습니다.
Java가 없는 배포 환경에도 PDF를 생성하려면 해당 빌드 환경에 Java를 준비해야 합니다.
PDF 생성을 건너뛰는 임시 웹 빌드는 `BUILD_PDF=0 npm run build`입니다.
이 경우 PDF는 갱신되지 않으며, `static/pdfs/`에 기존 PDF가 있으면 그 파일을 제공합니다.

Papersaurus는 npm 설치를 지원하는 `@axinom/docusaurus-plugin-papersaurus@1.0.1`로
고정했습니다. 설치 후 `scripts/patch-papersaurus.cjs`가 한글 목차 누락과 목차
페이지 번호 오류를 보정합니다. 목차의 페이지 번호는 표지를 제외한 본문 기준입니다.
1.1.1은 npm 설치를 거부하는 preinstall 스크립트가 있습니다.
`plugins/portfolio-pdf/index.cjs`는 임시 빌드 복사본에서 문서를 브라우저로
렌더링한 뒤 Papersaurus에 전달합니다. 이를 통해 Mermaid, 접힌 코드와 지연
로딩 이미지를 포함하고, 동영상은 원본 URL로 표시합니다. 웹 문서의 상태는
변경하지 않습니다. PDF 전용 스타일은 `static/pdf-assets/print.css`에 있습니다.

포함 문서와 순서는 `docusaurus.config.ts`의 `includeDocs`에서 관리합니다.
현재 값은 `["introduction", "database", "problem-solving"]`입니다.
