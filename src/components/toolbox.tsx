"use client";
import { useState } from "react";
import {
  TechnologyGrid,
  TechnologyRail,
  filterCount,
  stackStatus,
} from "./technology";
import type { TechnologyFilter } from "@/lib/types";
export function Toolbox() {
  const [filter, setFilter] = useState<TechnologyFilter>("all");
  const [paused, setPaused] = useState(false);
  return (
    <section
      id={"stack"}
      className={paused ? "section toolkit stack-paused" : "section toolkit"}
    >
      <div className={"section-heading"}>
        <div>
          <span className={"eyebrow"}>{"TOOLS I REACH FOR"}</span>
          <h2>
            {"Inside my "}
            <em>{"toolbox."}</em>
          </h2>
        </div>
        <p>
          {"A considered stack, chosen for the job."}
          <br />
          {"From the interface to the infrastructure."}
        </p>
      </div>
      <div className={"stack-motion-header"}>
        <span className={"eyebrow"}>{"A CONNECTED TOOLKIT, IN MOTION"}</span>
        <button
          id={"stack-motion-toggle"}
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          {paused ? "Resume motion ▷" : "Pause motion Ⅱ"}
        </button>
      </div>
      <div className={"stack-motion-window"} aria-hidden={"true"}>
        <div className={"stack-rail"} id={"stack-rail-one"}>
          <TechnologyRail half={0} />
        </div>
        <div className={"stack-rail reverse"} id={"stack-rail-two"}>
          <TechnologyRail half={1} />
        </div>
      </div>
      <div className={"toolkit-layout"}>
        <div className={"toolkit-sidebar"}>
          <p>
            {"Different layers."}
            <br />
            {"One connected system."}
          </p>
          <div
            className={"stack-filters"}
            role={"group"}
            aria-label={"Filter technologies"}
          >
            <button
              data-filter={"all"}
              className={filter === "all" ? "active" : ""}
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              {"All tools "}
              <span>{filterCount("all")}</span>
            </button>
            <button
              data-filter={"language"}
              className={filter === "language" ? "active" : ""}
              aria-pressed={filter === "language"}
              onClick={() => setFilter("language")}
            >
              {"Languages "}
              <span>{filterCount("language")}</span>
            </button>
            <button
              data-filter={"frontend"}
              className={filter === "frontend" ? "active" : ""}
              aria-pressed={filter === "frontend"}
              onClick={() => setFilter("frontend")}
            >
              {"Frontend "}
              <span>{filterCount("frontend")}</span>
            </button>
            <button
              data-filter={"backend"}
              className={filter === "backend" ? "active" : ""}
              aria-pressed={filter === "backend"}
              onClick={() => setFilter("backend")}
            >
              {"Backend & data "}
              <span>{filterCount("backend")}</span>
            </button>
            <button
              data-filter={"ai"}
              className={filter === "ai" ? "active" : ""}
              aria-pressed={filter === "ai"}
              onClick={() => setFilter("ai")}
            >
              {"AI & automation "}
              <span>{filterCount("ai")}</span>
            </button>
            <button
              data-filter={"delivery"}
              className={filter === "delivery" ? "active" : ""}
              aria-pressed={filter === "delivery"}
              onClick={() => setFilter("delivery")}
            >
              {"Delivery "}
              <span>{filterCount("delivery")}</span>
            </button>
          </div>
          <span className={"stack-footnote"}>
            {"PRACTICAL TOOLS."}
            <br />
            {"THOUGHTFUL CONNECTIONS."}
          </span>
        </div>
        <div>
          <div id={"stack-grid"} className={"stack-grid"}>
            <TechnologyGrid filter={filter} />
          </div>
          <p
            className={"stack-status"}
            id={"stack-status"}
            aria-live={"polite"}
          >
            {stackStatus(filter)}
          </p>
        </div>
      </div>
    </section>
  );
}
