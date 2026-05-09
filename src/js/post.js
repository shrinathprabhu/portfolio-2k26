// Copy-to-clipboard for code blocks
document.querySelectorAll(".blog-post__body pre").forEach((pre) => {
  const btn = document.createElement("button");
  btn.className = "code-copy";
  btn.setAttribute("aria-label", "Copy code");
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  pre.style.position = "relative";
  pre.appendChild(btn);
  btn.addEventListener("click", () => {
    const code = pre.querySelector("code");
    navigator.clipboard.writeText(code.textContent).then(() => {
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
      btn.classList.add("copied");
      setTimeout(() => {
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        btn.classList.remove("copied");
      }, 1500);
    });
  });
});

// Mermaid diagram rendering
const mermaidBlocks = document.querySelectorAll('pre > code.language-mermaid');
if (mermaidBlocks.length > 0) {
  import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs').then(({ default: mermaid }) => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#2a2a3e',
        primaryTextColor: '#d4d4d4',
        primaryBorderColor: '#3a3a4e',
        lineColor: '#6b8aff',
        secondaryColor: '#1e1e2e',
        tertiaryColor: '#16161e',
        actorBorder: '#3a3a4e',
        actorBkg: '#1e1e2e',
        actorTextColor: '#d4d4d4',
        signalColor: '#d4d4d4',
        signalTextColor: '#d4d4d4',
        textColor: '#d4d4d4',
        tertiaryTextColor: '#d4d4d4',
        nodeBkg: '#2a2a3e',
        nodeBorder: '#3a3a4e',
        nodeTextColor: '#d4d4d4',
        clusterBkg: '#16161e',
        clusterBorder: '#3a3a4e',
        edgeLabelBackground: '#1e1e2e',
      },
      themeCSS: `
        .nodeLabel, .nodeLabel p { color: #d4d4d4 !important; fill: #d4d4d4 !important; }
        .cluster-label text { fill: #d4d4d4 !important; }
        .cluster-label span { color: #d4d4d4 !important; }
        .edgeLabel, .edgeLabel p { color: #d4d4d4cc !important; background-color: #2f2f47 !important; }
      `,
      sequence: {
        actorMargin: 60,
        messageMargin: 30,
      },
    });

    for (const codeEl of mermaidBlocks) {
      const pre = codeEl.parentElement;
      const container = document.createElement('div');
      container.className = 'mermaid';
      // Strip any HTML tags Prism may have added and decode entities
      const source = codeEl.textContent;
      container.textContent = source;
      pre.replaceWith(container);
    }

    mermaid.run({ querySelector: '.mermaid' });
  });
}
