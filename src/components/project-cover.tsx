"use client";

import type { ProjectId } from "@/lib/types";
import { Icon } from "./ui/icon";

type CoverId = Extract<ProjectId, "data" | "support" | "sentinel" | "outreach">;
type CoverProps = {
  project: CoverId;
  onOpen: () => void;
  photoIndex?: number;
};
const covers = {
  data: {
    eyebrow: "01 / CUSTOMER INTELLIGENCE",
    lead: "Signal.",
    emphasis: "Beyond feedback.",
    description:
      "From scattered customer signals to a clearer picture of what matters.",
    stack: "Next.js  /  FastAPI  /  PostgreSQL",
    footer: "INSIGHT, WITH CONTEXT",
    screenshot: "/assets/dataautomated/landing-hero.png",
    secondary: "/assets/dataautomated/dashboard.webp",
    alt: "DataAutomated product landing page and application dashboard preview",
    altSecondary: "DataAutomated application workspace",
  },
  support: {
    eyebrow: "02 / CONNECTED SUPPORT",
    lead: "Support has",
    emphasis: "a control room.",
    description:
      "A considered workspace for conversations, knowledge, and support operations.",
    stack: "NEXT.JS  /  PYTHON  /  POSTGRESQL",
    footer: "SUPPORT, CONNECTED",
    screenshot: "/assets/support/01-operations-overview.png",
    secondary: "/assets/support/02-conversation-workspace.png",
    alt: "CustomerSupportAgent operations overview interface",
    altSecondary: "CustomerSupportAgent conversation workspace",
  },
  sentinel: {
    eyebrow: "03 / LOCAL AI & SECURITY",
    lead: "Observe.",
    emphasis: "Understand.",
    description:
      "Reviewable intelligence from images, frames, and local vision analysis.",
    stack: "JAVA 21  /  REACT  /  LOCAL AI",
    footer: "VISION, WITH CONTEXT",
    screenshot: "/assets/sentinel/02.png",
    secondary: "/assets/sentinel/07.png",
    alt: "SentinelAI dashboard showing risk trends and active alerts",
    altSecondary: "SentinelAI incident reports interface",
  },
  outreach: {
    eyebrow: "04 / ORCHESTRATED OUTREACH",
    lead: "Research.",
    emphasis: "Reason. Reach out.",
    description:
      "An intentional workflow from grounded research to human approval.",
    stack: "FASTAPI  /  LANGGRAPH  /  POSTGRESQL",
    footer: "HUMAN JUDGMENT. CONNECTED AUTOMATION.",
    screenshot: null,
    secondary: null,
    alt: "",
    altSecondary: "",
  },
} as const;

export function ProjectCover({ project, onOpen, photoIndex }: CoverProps) {
  const detail = covers[project];
  return (
    <button
      type="button"
      className={`project-visual project-cover project-cover--${project}`}
      data-cover={project}
      data-photo-preview={
        photoIndex === undefined ? undefined : String(photoIndex)
      }
      aria-label={`Explore ${project === "data" ? "DataAutomated" : project === "support" ? "CustomerSupportAgent" : project === "sentinel" ? "SentinelAI" : "Automated Structure"}`}
      onClick={onOpen}
    >
      <div className="project-cover__top" aria-hidden="true">
        <span className="project-cover__monogram">
          {project.slice(0, 1).toUpperCase()}.
        </span>
        <span>NYX / SELECTED SYSTEMS</span>
        <span className="project-cover__top-dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="project-cover__body">
        <div className="project-cover__copy">
          <span className="project-cover__eyebrow">{detail.eyebrow}</span>
          <strong className="project-cover__lead">
            {detail.lead}
            <br />
            <em>{detail.emphasis}</em>
          </strong>
          <span className="project-cover__description">
            {detail.description}
          </span>
          <span className="project-cover__stack">{detail.stack}</span>
        </div>
        <div className="project-cover__display" aria-hidden="true">
          {detail.screenshot ? (
            <>
              <div className="project-cover__window">
                <span className="project-cover__window-bar">
                  <i />
                  <i />
                  <i />
                  <b>PROJECT / WORKSPACE</b>
                </span>
                <img
                  src={detail.screenshot}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-cover__secondary">
                <img
                  src={detail.secondary!}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </>
          ) : (
            <div
              className="project-cover__workflow"
              aria-label="Conceptual outreach workflow illustration"
            >
              <span className="project-cover__concept-tag">
                WORKFLOW STUDY / CONCEPT
              </span>
              <span>
                <b>01</b>
                <strong>Research</strong>
                <small>Source-aware context</small>
              </span>
              <span>
                <b>02</b>
                <strong>Compose</strong>
                <small>Grounded AI draft</small>
              </span>
              <span>
                <b>03</b>
                <strong>Human approval</strong>
                <small>Review before send</small>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="project-cover__bottom">
        <span>{detail.footer}</span>
        <span>
          DISCOVER CASE STUDY <Icon name="arrow-up-right" size={16} />
        </span>
      </div>
    </button>
  );
}

const conceptual = {
  insurance: ["EVIDENCE LEDGER", "POLICY CONTROL", "VERIFICATION"],
  sourcing: ["SUPPLIER EVIDENCE", "TENANT ISOLATION", "CHECKPOINTS"],
  divorce: ["GUIDED ROADMAP", "PRIVACY BOUNDARY", "BROWSER TESTING"],
  aitest: ["SCOPE", "ARCHITECTURE", "IMPLEMENTATION"],
} as const;

export function ProjectConceptPreview({
  project,
}: {
  project: keyof typeof conceptual;
}) {
  return (
    <div
      className={`project-concept project-concept--${project}`}
      aria-label="Architecture illustration, not a product screenshot"
    >
      <div className="project-concept__head">
        <span>{project.toUpperCase()} / ARCHITECTURE</span>
        <Icon name="layers" size={16} />
      </div>
      <div className="project-concept__lines">
        {conceptual[project].map((item, i) => (
          <span key={item}>
            <small>0{i + 1}</small>
            <b>{item}</b>
            <i />
          </span>
        ))}
      </div>
      <span className="project-concept__foot">
        CONCEPTUAL SYSTEM MAP · NOT A PRODUCT SCREEN
      </span>
    </div>
  );
}
