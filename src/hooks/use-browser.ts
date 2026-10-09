"use client";
import { useEffect, useState } from "react";
import { email } from "@/content/portfolio";
export function useClock() {
  const [clock, setClock] = useState("");
  const [year, setYear] = useState("2026");
  useEffect(() => {
    const update = () => {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Manila",
        }).format(new Date()),
      );
      setYear(String(new Date().getFullYear()));
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return { clock, year };
}
export function useCopyEmail() {
  const [copied, setCopied] = useState(false),
    [status, setStatus] = useState("");
  async function copy() {
    let success = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        success = true;
      }
    } catch {
      // Fall back to the classic selection API if clipboard permission is blocked.
    }
    if (!success) {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try {
        success = document.execCommand("copy");
      } catch {
        // Leave the address visible for manual copy on restrictive browsers.
      } finally {
        field.remove();
      }
    }
    if (success) {
      setCopied(true);
      setStatus("Email address copied.");
    } else {
      setCopied(false);
      setStatus(
        "Clipboard access is blocked. Select the email address to copy it.",
      );
    }
  }
  return { copy, copied, status };
}
export function useReveal() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.06 },
    );
    const nodes = document.querySelectorAll(
      ".section-heading,.toolkit-layout,.project,.capability-grid,.approach-intro,.steps,.portrait-frame,.about-copy,.contact-title",
    );
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((node) =>
        node.classList.remove("reveal-ready", "is-visible"),
      );
    };
  }, []);
}
