"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/icons";

interface CodeBlockProps {
  /** Lines to show. A leading "$ " is rendered as a dim prompt. */
  lines: string[];
  className?: string;
}

export function CodeBlock({ lines, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyText = lines
    .map((l) => (l.startsWith("$ ") ? l.slice(2) : l))
    .join("\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable -- silently ignore */
    }
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-brand-muted/15 bg-brand-deep/70 ${className}`}
    >
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-brand-muted/20 bg-brand-surface px-2 py-1 text-xs text-brand-muted opacity-0 transition-opacity hover:text-brand-text-bright focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-brand-accent/50 group-hover:opacity-100"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <>
            <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
            Copied
          </>
        ) : (
          <>
            <CopyIcon className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>
          {lines.map((line, i) => {
            const isCmd = line.startsWith("$ ");
            return (
              <div key={i} className="whitespace-pre">
                {isCmd ? (
                  <>
                    <span className="select-none text-brand-accent">$ </span>
                    <span className="text-brand-text">{line.slice(2)}</span>
                  </>
                ) : (
                  <span className="text-brand-muted">{line}</span>
                )}
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
