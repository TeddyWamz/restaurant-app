"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  text: string;
  label: string; // read by screen readers, e.g. "order reference code"
  className?: string;
  children?: ReactNode; // button text while idle
};

export default function CopyButton({
  text,
  label,
  className = "",
  children = "Copy",
}: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        className={className}
      >
        {status === "copied"
          ? "Copied ✓"
          : status === "failed"
            ? "Couldn’t copy"
            : children}
      </button>
      <span role="status" className="sr-only">
        {status === "copied" ? `${label} copied` : ""}
      </span>
    </>
  );
}