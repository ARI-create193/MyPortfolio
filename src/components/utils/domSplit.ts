type SplitMode = "chars" | "words";

const ORIGINAL_HTML_ATTR = "data-dom-split-original";

function wrapText(
  node: Text,
  mode: SplitMode,
  wrapperClass: string
): HTMLElement[] {
  const text = node.nodeValue ?? "";
  const parts =
    mode === "chars"
      ? [...text]
      : text.split(/(\s+)/).filter((p) => p.length > 0);

  const frag = document.createDocumentFragment();
  const spans: HTMLElement[] = [];

  parts.forEach((part) => {
    if (mode === "words" && /^\s+$/.test(part)) {
      frag.appendChild(document.createTextNode(part));
      return;
    }

    const span = document.createElement("span");
    span.className = wrapperClass;
    span.textContent = part;
    frag.appendChild(span);
    spans.push(span);
  });

  node.parentNode?.replaceChild(frag, node);
  return spans;
}

function splitElement(el: Element, mode: SplitMode, wrapperClass: string) {
  // If we've already split this element, avoid nesting spans.
  if ((el as HTMLElement).hasAttribute(ORIGINAL_HTML_ATTR)) return [];

  // Store original HTML so we can revert on resize.
  (el as HTMLElement).setAttribute(ORIGINAL_HTML_ATTR, (el as HTMLElement).innerHTML);

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    const n = walker.currentNode as Text;
    if ((n.nodeValue ?? "").trim().length === 0) continue;
    textNodes.push(n);
  }

  const pieces: HTMLElement[] = [];
  textNodes.forEach((t) => pieces.push(...wrapText(t, mode, wrapperClass)));
  return pieces;
}

function revertElements(elements: Element[]) {
  elements.forEach((el) => {
    const html = (el as HTMLElement).getAttribute(ORIGINAL_HTML_ATTR);
    if (html == null) return;
    (el as HTMLElement).innerHTML = html;
    (el as HTMLElement).removeAttribute(ORIGINAL_HTML_ATTR);
  });
}

export function splitChars(
  target: string | Element | Element[],
  wrapperClass = "split-char"
) {
  const elements =
    typeof target === "string"
      ? Array.from(document.querySelectorAll(target))
      : Array.isArray(target)
        ? target
        : [target];

  const chars: HTMLElement[] = [];
  elements.forEach((el) => chars.push(...splitElement(el, "chars", wrapperClass)));
  return {
    chars,
    revert() {
      revertElements(elements);
    },
  };
}

export function splitWords(
  target: string | Element | Element[],
  wrapperClass = "split-word"
) {
  const elements =
    typeof target === "string"
      ? Array.from(document.querySelectorAll(target))
      : Array.isArray(target)
        ? target
        : [target];

  const words: HTMLElement[] = [];
  elements.forEach((el) => words.push(...splitElement(el, "words", wrapperClass)));
  return {
    words,
    revert() {
      revertElements(elements);
    },
  };
}

