"use client";
import { useState } from "react";
export function Workflow() {
  const [active, setActive] = useState<number | null>(0);
  const [lastStep, setLastStep] = useState(0);
  return (
    <section id={"approach"} className={"approach section"}>
      <div className={"approach-intro"}>
        <span className={"eyebrow"}>{"FROM IDEA TO SYSTEM"}</span>
        <h2>
          {"Thought through."}
          <br />
          <em>{"All the way through."}</em>
        </h2>
        <p>
          {"Good software starts before the code."}
          <br />
          {"I connect the problem, the architecture,"}
          <br />
          {"and the details that make it work."}
        </p>
      </div>
      <div className={"steps"}>
        <div className={"workflow-label"}>
          <span>{"THE BUILD LOOP"}</span>
          <span id={"workflow-counter"}>{`0${lastStep + 1} / 04`}</span>
        </div>
        <div className={"workflow-track"} aria-hidden={"true"}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={i <= lastStep ? "active" : ""} />
          ))}
        </div>
        <details
          open={active === 0}
          onToggle={(event) => {
            if (event.currentTarget.open) {
              setActive(0);
              setLastStep(0);
            } else setActive((current) => (current === 0 ? null : current));
          }}
        >
          <summary>
            <span>{"01"}</span>
            {" Understand the real problem "}
            <b>{"+"}</b>
          </summary>
          <p>
            {
              "Start with the people, the workflow, and what needs to change. Make the constraints clear before choosing the tools."
            }
          </p>
        </details>
        <details
          open={active === 1}
          onToggle={(event) => {
            if (event.currentTarget.open) {
              setActive(1);
              setLastStep(1);
            } else setActive((current) => (current === 1 ? null : current));
          }}
        >
          <summary>
            <span>{"02"}</span>
            {" Design the system "}
            <b>{"+"}</b>
          </summary>
          <p>
            {
              "Define the data, boundaries, and connections. Give each part a clear responsibility, and make the whole understandable."
            }
          </p>
        </details>
        <details
          open={active === 2}
          onToggle={(event) => {
            if (event.currentTarget.open) {
              setActive(2);
              setLastStep(2);
            } else setActive((current) => (current === 2 ? null : current));
          }}
        >
          <summary>
            <span>{"03"}</span>
            {" Build with intention "}
            <b>{"+"}</b>
          </summary>
          <p>
            {
              "Connect interfaces, APIs, and automation around the actual workflow. Account for permissions, failures, and the person using it."
            }
          </p>
        </details>
        <details
          open={active === 3}
          onToggle={(event) => {
            if (event.currentTarget.open) {
              setActive(3);
              setLastStep(3);
            } else setActive((current) => (current === 3 ? null : current));
          }}
        >
          <summary>
            <span>{"04"}</span>
            {" Verify. Refine. Repeat. "}
            <b>{"+"}</b>
          </summary>
          <p>
            {
              "Test the behavior, inspect the experience, and document the decisions. Treat verification as part of building."
            }
          </p>
        </details>
      </div>
    </section>
  );
}
