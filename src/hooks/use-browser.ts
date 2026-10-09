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
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setStatus("Email address copied.");
    } catch {
      setStatus("You can select and copy the email address above.");
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
