import katex from "katex";

export function Formula({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display,
    strict: "ignore",
  });
  if (display) {
    return (
      <div
        className="my-5 overflow-x-auto rounded-xl bg-paper px-4 py-4 text-ink"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <span className="text-ink" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Inline({ text }: { text: string }) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\\\([\s\S]+?\\\))/g);
  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("\\(") && token.endsWith("\\)")) {
      return <Formula key={index} tex={token.slice(2, -2)} />;
    }
    return <span key={index}>{token}</span>;
  });
}

export function Rich({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className="flex flex-col gap-3">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-pretty text-base leading-relaxed text-ink">
          <Inline text={paragraph} />
        </p>
      ))}
    </div>
  );
}
