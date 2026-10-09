"use client";
import { media } from "@/content/portfolio";
export function About() {
  return (
    <section id={"about"} className={"about section"}>
      <div className={"portrait-frame"}>
        <div className={"portrait-mat"} id={"portrait-container"}>
          <span className={"portrait-coordinate"}>{"JUNEX, ILLUSTRATED."}</span>
          <span className={"portrait-corner corner-a"}></span>
          <span className={"portrait-corner corner-b"}></span>
          <img
            src={media.portrait.src}
            alt={media.portrait.alt}
            loading="lazy"
          />
        </div>
        <div className={"portrait-caption"}>
          <span>
            {"JUNEX GLENN BARAN"}
            <small>{"A.K.A. NYX"}</small>
          </span>
          <span className={"handwritten"}>{"Always building."}</span>
        </div>
      </div>
      <div className={"about-copy"}>
        <span className={"eyebrow"}>{"THE PERSON BEHIND THE WORK"}</span>
        <h2>
          {"A quiet mind."}
          <br />
          {"An instinct to "}
          <em>{"build."}</em>
        </h2>
        <p>
          {
            "I’m Junex Glenn Baran, a software engineer and systems builder based in Cebu, Philippines. I’m drawn to the work underneath the surface: the architecture, the connections, and the small decisions that make a system feel simple."
          }
        </p>
        <p>
          {
            "I work across full-stack software, AI workflows, and automation. My approach is focused and practical: understand it, structure it, build it, and keep making it better."
          }
        </p>
        <div className={"personal-notes"}>
          <span>{"Based in Cebu, Philippines"}</span>
          <span>{"Focused. Curious. Builder-first."}</span>
        </div>
      </div>
    </section>
  );
}
