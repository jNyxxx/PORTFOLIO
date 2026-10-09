"use client";
import { useState } from "react";
import { media } from "@/content/portfolio";
import { Icon } from "./ui/icon";
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header
      className={menuOpen ? "reference-header nav-open" : "reference-header"}
    >
      <a
        className={"personal-brand"}
        href={"#home"}
        onClick={() => setMenuOpen(false)}
      >
        <span className={"brand-avatar"} data-portrait-small="">
          <img src={media.portrait.src} alt="" loading="lazy" />
        </span>
        <span>
          {"Junex"}
          <span className={"brand-surname"}>{" Baran"}</span>
        </span>
      </a>
      <nav aria-label={"Main navigation"}>
        <a href={"#home"} onClick={() => setMenuOpen(false)}>
          {"Home"}
        </a>
        <a href={"#featured"} onClick={() => setMenuOpen(false)}>
          {"Featured"}
        </a>
        <a href={"#work"} onClick={() => setMenuOpen(false)}>
          {"Projects"}
        </a>
        <a href={"#stack"} onClick={() => setMenuOpen(false)}>
          {"Toolbox"}
        </a>
        <a href={"#about"} onClick={() => setMenuOpen(false)}>
          {"About"}
        </a>
        <a href={"#contact"} onClick={() => setMenuOpen(false)}>
          {"Contact "}
          <Icon name="arrow-up-right" size={15} />
        </a>
      </nav>
      <button
        className={"mobile-menu-toggle"}
        id={"menu-toggle"}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
      >
        <Icon name={menuOpen ? "close" : "menu"} size={21} />
      </button>
    </header>
  );
}
