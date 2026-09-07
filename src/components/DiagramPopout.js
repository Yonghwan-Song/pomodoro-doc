import { useRef } from "react";

// mermaid로 렌더된 SVG를 그대로 새 탭에서 열어 원본 크기로 볼 수 있게 하는 wrapper.
// ERD처럼 미리 만들어 둔 이미지 파일을 링크하는 대신, 화면에 이미 그려진 SVG를
// 직렬화해서 Blob URL로 열기 때문에 다이어그램 원본(mermaid 코드)만 관리하면 된다.
export default function DiagramPopout(props) {
  const { children, hint = "다이어그램을 클릭하면 새 탭에서 크게 볼 수 있습니다." } = props;
  const containerRef = useRef(null);

  const openInNewTab = () => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;

    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // 화면에서는 폭에 맞춰 축소되어 있으므로, 새 탭에서는 그 제한을 풀어준다.
    if (clone.getAttribute("viewBox")) {
      clone.style.maxWidth = "none";
      clone.setAttribute("width", "100%");
      clone.removeAttribute("height");
    }

    // SVG 문서는 배경이 투명해서, dark mode의 밝은 글자색이 흰 배경 위에 그려지면 보이지 않는다.
    // body의 background-color는 투명으로 잡히는 경우가 있어 테마 변수를 먼저 본다.
    // light theme에서는 이 변수가 `#0000`(투명)이라 브라우저 기본 배경에 맡기면 되지만,
    // 값의 표기 방식이 여러 가지라 실제로 칠해지는 색으로 한 번 변환한 뒤 판단한다.
    const themeBackground = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--ifm-background-color")
      .trim();
    const probe = document.createElement("div");
    probe.style.backgroundColor = themeBackground;
    document.body.appendChild(probe);
    const resolved = window.getComputedStyle(probe).backgroundColor;
    probe.remove();
    const isTransparent =
      !resolved || resolved === "transparent" || /,\s*0\)$/.test(resolved);
    clone.style.background = isTransparent ? "#ffffff" : resolved;

    const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    // 새 탭이 blob을 읽기 전에 해제하면 빈 화면이 되므로 잠시 뒤에 정리한다.
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInNewTab();
    }
  };

  return (
    <figure className="diagram-popout">
      <div
        ref={containerRef}
        className="diagram-popout__canvas"
        role="button"
        tabIndex={0}
        title={hint}
        onClick={openInNewTab}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
      <figcaption className="diagram-popout__hint">{hint}</figcaption>
    </figure>
  );
}
