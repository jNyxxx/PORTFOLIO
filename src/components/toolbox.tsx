"use client";
import { useState } from "react";
import {
  TechnologyGrid,
  TechnologyRail,
  filterCount,
  stackStatus,
} from "./technology";
import { FilterOption } from "./ui/controls";
import type { TechnologyFilter } from "@/lib/types";

const filters: { id: TechnologyFilter; label: string }[] = [
  { id: "all", label: "All tools" },
  { id: "language", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & data" },
  { id: "ai", label: "AI & automation" },
  { id: "delivery", label: "Delivery" },
];

export function Toolbox() {
  const [filter, setFilter] = useState<TechnologyFilter>("all");
  return (
    <section id="stack" className="section toolkit">
      <div className="section-heading">
        <div>
          <span className="eyebrow">TOOLS I REACH FOR</span>
          <h2>
            Inside my <em>toolbox.</em>
          </h2>
        </div>
        <p>
          A considered stack, chosen for the job.
          <br />
          From the interface to the infrastructure.
        </p>
      </div>
      <div className="stack-motion-header">
        <span className="eyebrow">A CONNECTED TOOLKIT, IN MOTION</span>
      </div>
      <div className="stack-motion-window" aria-hidden="true">
        <div className="stack-rail" id="stack-rail-one">
          <TechnologyRail half={0} />
        </div>
        <div className="stack-rail reverse" id="stack-rail-two">
          <TechnologyRail half={1} />
        </div>
      </div>
      <div className="toolkit-layout">
        <div className="toolkit-sidebar">
          <p>
            Different layers.
            <br />
            One connected system.
          </p>
          <div
            className="stack-filters"
            role="group"
            aria-label="Filter technologies"
          >
            {filters.map(({ id, label }) => (
              <FilterOption
                key={id}
                data-filter={id}
                label={label}
                count={filterCount(id)}
                selected={filter === id}
                onClick={() => setFilter(id)}
              />
            ))}
          </div>
          <span className="stack-footnote">
            PRACTICAL TOOLS.
            <br />
            THOUGHTFUL CONNECTIONS.
          </span>
        </div>
        <div>
          <div id="stack-grid" className="stack-grid">
            <TechnologyGrid filter={filter} />
          </div>
          <p className="stack-status" id="stack-status" aria-live="polite">
            {stackStatus(filter)}
          </p>
        </div>
      </div>
    </section>
  );
}
