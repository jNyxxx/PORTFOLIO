"use client";

export function Skills() {
  return (
    <section id={"skills"} className={"section capabilities"}>
      <div className={"section-heading"}>
        <div>
          <span className={"eyebrow"}>{"WHAT I BRING"}</span>
          <h2>
            {"Across the stack."}
            <br />
            {"Into the "}
            <em>{"details."}</em>
          </h2>
        </div>
        <p>
          {"Architecture, implementation, and the care"}
          <br />
          {"it takes to connect them."}
        </p>
      </div>
      <div className={"capability-grid"}>
        <article>
          <span className={"cap-symbol"} aria-hidden={"true"}>
            {"⌘"}
          </span>
          <span className={"eyebrow"}>{"01 / SOFTWARE"}</span>
          <h3>{"Full-stack engineering"}</h3>
          <p>
            {
              "Clear interfaces, well-defined APIs, and data models built around how a product actually works."
            }
          </p>
          <div>{"Next.js · FastAPI · PostgreSQL"}</div>
        </article>
        <article>
          <span className={"cap-symbol"} aria-hidden={"true"}>
            {"⌁"}
          </span>
          <span className={"eyebrow"}>{"02 / CONNECTIONS"}</span>
          <h3>{"AI & automation"}</h3>
          <p>
            {
              "Grounded AI workflows, API integrations, and human review where judgment matters."
            }
          </p>
          <div>{"LangGraph · RAG · n8n"}</div>
        </article>
        <article>
          <span className={"cap-symbol"} aria-hidden={"true"}>
            {"⊞"}
          </span>
          <span className={"eyebrow"}>{"03 / FOUNDATIONS"}</span>
          <h3>{"Systems thinking"}</h3>
          <p>
            {
              "Tenant isolation, service boundaries, failure handling, and verification that supports the whole system."
            }
          </p>
          <div>{"Architecture · Testing · CI/CD"}</div>
        </article>
      </div>
    </section>
  );
}
