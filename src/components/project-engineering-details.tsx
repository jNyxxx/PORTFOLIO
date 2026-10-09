import { engineering } from "@/content/project-engineering";
import type { ProjectId } from "@/lib/types";
import { Icon } from "./ui/icon";

export function ProjectEngineeringDetails({ project }: { project: ProjectId }) {
  const detail = engineering[project];
  return (
    <div className="case-engineering">
      <div className="case-engineering-summary">
        <span className="case-status">
          <span aria-hidden="true" />
          {detail.status}
        </span>
        <h3>Under the hood</h3>
        <p>{detail.outcome}</p>
      </div>

      <section
        className="case-engineering-section"
        aria-labelledby="engineering-stack"
      >
        <div className="case-engineering-heading">
          <span>01 / SYSTEM COMPONENTS</span>
          <h3 id="engineering-stack">Tech stack and responsibilities</h3>
          <p>What each layer is responsible for, not simply a list of names.</p>
        </div>
        <div className="case-stack-grid">
          {detail.stack.map((part) => (
            <article className="case-stack-layer" key={part.label}>
              <span className="case-stack-kind">{part.label}</span>
              <h4>{part.technologies}</h4>
              <p>{part.purpose}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="case-engineering-section"
        aria-labelledby="engineering-flow"
      >
        <div className="case-engineering-heading">
          <span>02 / DATA AND EXECUTION</span>
          <h3 id="engineering-flow">How the system fits together</h3>
          <p>The flow from incoming data or requests to useful output.</p>
        </div>
        <ol className="case-flow">
          {detail.pipeline.map((step, i) => (
            <li key={step.label}>
              <span className="case-flow-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <strong>{step.label}</strong>
                <p>{step.description}</p>
              </div>
              {i < detail.pipeline.length - 1 && (
                <Icon name="chevron-right" size={16} />
              )}
            </li>
          ))}
        </ol>
      </section>

      <section
        className="case-engineering-section"
        aria-labelledby="engineering-decisions"
      >
        <div className="case-engineering-heading">
          <span>03 / ENGINEERING DECISIONS</span>
          <h3 id="engineering-decisions">Design choices and trade-offs</h3>
        </div>
        <div className="case-decisions">
          {detail.decisions.map((item) => (
            <article key={item.title}>
              <Icon name="check" size={16} />
              <div>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="case-evidence-note">
        <span>04 / VERIFIED SCOPE</span>
        <strong>What this project does — and does not — demonstrate</strong>
        <p>{detail.boundary}</p>
      </div>
    </div>
  );
}
