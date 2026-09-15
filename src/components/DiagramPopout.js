import { useRef, useState } from "react";

// Rendered Mermaid SVGs and image assets share an isolated print preview.
export default function DiagramPopout(props) {
  const {
    children,
    hint = "다이어그램을 클릭하면 새 탭에서 확대하거나 인쇄할 수 있습니다.",
  } = props;
  const containerRef = useRef(null);
  const [error, setError] = useState("");

  const openInNewTab = () => {
    const svg = containerRef.current?.querySelector("svg, img");
    if (!svg) {
      setError("다이어그램 로딩 후 다시 시도해 주세요.");
      return;
    }
    const preview = window.open("about:blank", "_blank");
    if (!preview) {
      setError("새 탭이 차단되었습니다. 팝업을 허용한 뒤 다시 시도해 주세요.");
      return;
    }
    preview.opener = null;
    setError("");

    const clone = svg.cloneNode(true);
    if (svg.tagName.toLowerCase() === "svg") {
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    } else {
      clone.src = svg.currentSrc || svg.src;
      clone.removeAttribute("srcset");
      clone.removeAttribute("loading");
    }

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

    const doc = preview.document;
    doc.documentElement.lang = "ko";
    doc.title = "다이어그램 인쇄";
    const style = doc.createElement("style");
    style.textContent = `
      body { margin: 0; background: #fff; font-family: sans-serif; }
      header { padding: 16px; background: #f4f4f4; color: #222; }
      button { padding: 10px 16px; cursor: pointer; font: inherit; }
      p { margin: 12px 0 0; }
      main { padding: 16px; }
      main > svg, main > img { display: block; width: 100%; height: auto; }
      @page { size: A4 landscape; margin: 10mm; }
      @media print {
        header { display: none; }
        main { padding: 0; height: 185mm; break-inside: avoid; }
        main > svg, main > img {
          width: 100% !important; height: 100% !important;
          max-width: 100% !important; max-height: 100%; object-fit: contain;
          print-color-adjust: exact; -webkit-print-color-adjust: exact;
        }
      }
    `;
    doc.head.appendChild(style);
    const header = doc.createElement("header");
    const button = doc.createElement("button");
    button.textContent = "인쇄 / PDF 저장";
    button.disabled = true;
    button.addEventListener("click", () => preview.print());
    const help = doc.createElement("p");
    help.textContent =
      "A4 가로 인쇄에 맞춰져 있습니다. 큰 다이어그램은 A3 용지나 배율 설정을 이용하세요.";
    header.append(button, help);
    const main = doc.createElement("main");
    clone.setAttribute("preserveAspectRatio", "xMidYMid meet");
    main.appendChild(doc.importNode(clone, true));
    doc.body.append(header, main);
    const ready = async () => {
      try {
        await Promise.all(
          Array.from(main.querySelectorAll("img"), (img) => img.decode()),
        );
        await doc.fonts.ready;
        if (!preview.closed) button.disabled = false;
      } catch {
        help.textContent =
          "이미지를 불러오지 못했습니다. 이 탭을 닫고 다시 시도해 주세요.";
      }
    };
    ready();
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
      <figcaption className="diagram-popout__hint">
        {hint}
        {error && <span role="alert">{error}</span>}
      </figcaption>
    </figure>
  );
}
