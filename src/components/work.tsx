"use client";
import { usePortfolio } from "./portfolio-provider";
export function Work() {
  const { openCase, openPhoto } = usePortfolio();
  return (
    <section id={"work"} className={"work section"}>
      <div className={"section-heading centered"}>
        <span className={"section-symbol"} aria-hidden={"true"}>
          {"⊞"}
        </span>
        <span className={"eyebrow"}>{"SELECTED PROJECTS / 08"}</span>
        <h2>
          {"A little of what I "}
          <em>{"build."}</em>
        </h2>
        <p>
          {"Different problems. The same instinct to build thoughtfully."}
          <br />
          {"Explore the interfaces, systems, and decisions behind the work."}
        </p>
      </div>
      <div className={"project-pair expanded-projects"}>
        <article className={"project image-project"} data-project={"support"}>
          <button
            className={"project-visual supplied-project-visual"}
            data-cover={"support"}
            aria-label={"Explore CustomerSupportAgent"}
            onClick={() => openCase("support")}
          >
            <img
              src={"/assets/support/00-portfolio-cover.png"}
              alt={"CustomerSupportAgent interface overview"}
              loading={"lazy"}
            />
            <span className={"round-arrow"}>{"↗"}</span>
          </button>
          <div className={"project-media-links"}>
            <button
              data-media={"support:overview"}
              onClick={() => openCase("support", "overview")}
            >
              {"Explore project "}
              <span>{"↗"}</span>
            </button>
            <button
              data-media={"support:photos"}
              onClick={() => openCase("support", "photos")}
            >
              {"Gallery "}
              <span className={"media-count"}>{"09"}</span>
            </button>
          </div>
          <div className={"project-info"}>
            <div>
              <span className={"eyebrow"}>{"02 / CONNECTED SUPPORT"}</span>
              <h3>
                <button
                  data-open={"support"}
                  onClick={() => openCase("support")}
                >
                  {"CustomerSupportAgent "}
                  <span>{"↗"}</span>
                </button>
              </h3>
              <p>
                {
                  "A unified workspace for conversations, voice, knowledge, and the people behind support."
                }
              </p>
              <div className={"project-stack-tags"}>
                <span>{"Python"}</span>
                <span>{"Next.js"}</span>
                <span>{"PostgreSQL"}</span>
              </div>
            </div>
          </div>
          <div
            className={"project-filmstrip"}
            aria-label={"support image previews"}
          >
            <a
              href={"/assets/support/00-portfolio-cover.png"}
              data-photo-project={"support"}
              data-photo-preview={"0"}
              aria-label={"Preview Portfolio cover"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("support", 0);
              }}
            >
              <img
                src={"/assets/support/00-portfolio-cover.png"}
                alt={"CustomerSupportAgent interface: portfolio cover"}
                loading={"lazy"}
              />
              <span>{"Portfolio cover ↗"}</span>
            </a>
            <a
              href={"/assets/support/01-operations-overview.png"}
              data-photo-project={"support"}
              data-photo-preview={"1"}
              aria-label={"Preview Operations overview"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("support", 1);
              }}
            >
              <img
                src={"/assets/support/01-operations-overview.png"}
                alt={"CustomerSupportAgent interface: operations overview"}
                loading={"lazy"}
              />
              <span>{"Operations overview ↗"}</span>
            </a>
            <a
              href={"/assets/support/02-conversation-workspace.png"}
              data-photo-project={"support"}
              data-photo-preview={"2"}
              aria-label={"Preview Conversation workspace"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("support", 2);
              }}
            >
              <img
                src={"/assets/support/02-conversation-workspace.png"}
                alt={"CustomerSupportAgent interface: conversation workspace"}
                loading={"lazy"}
              />
              <span>{"Conversation workspace ↗"}</span>
            </a>
          </div>
        </article>
        <article className={"project image-project"} data-project={"sentinel"}>
          <button
            className={"project-visual supplied-project-visual"}
            data-cover={"sentinel"}
            aria-label={"Explore SentinelAI"}
            onClick={() => openCase("sentinel")}
          >
            <img
              src={"/assets/sentinel/02.png"}
              alt={"SentinelAI interface overview"}
              loading={"lazy"}
            />
            <span className={"round-arrow"}>{"↗"}</span>
          </button>
          <div className={"project-media-links"}>
            <button
              data-media={"sentinel:overview"}
              onClick={() => openCase("sentinel", "overview")}
            >
              {"Explore project "}
              <span>{"↗"}</span>
            </button>
            <button
              data-media={"sentinel:photos"}
              onClick={() => openCase("sentinel", "photos")}
            >
              {"Gallery "}
              <span className={"media-count"}>{"07"}</span>
            </button>
          </div>
          <div className={"project-info"}>
            <div>
              <span className={"eyebrow"}>{"03 / LOCAL VISION AI"}</span>
              <h3>
                <button
                  data-open={"sentinel"}
                  onClick={() => openCase("sentinel")}
                >
                  {"SentinelAI "}
                  <span>{"↗"}</span>
                </button>
              </h3>
              <p>
                {
                  "From video frames to incident evidence. A local AI pipeline for security monitoring and risk review."
                }
              </p>
              <div className={"project-stack-tags"}>
                <span>{"Java"}</span>
                <span>{"Spring Boot"}</span>
                <span>{"React"}</span>
                <span>{"Redis"}</span>
              </div>
            </div>
          </div>
          <div
            className={"project-filmstrip"}
            aria-label={"sentinel image previews"}
          >
            <a
              href={"/assets/sentinel/02.png"}
              data-photo-project={"sentinel"}
              data-photo-preview={"0"}
              aria-label={"Preview Dashboard & risk trends"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("sentinel", 0);
              }}
            >
              <img
                src={"/assets/sentinel/02.png"}
                alt={"SentinelAI: dashboard & risk trends"}
                loading={"lazy"}
              />
              <span>{"Dashboard & risk trends ↗"}</span>
            </a>
            <a
              href={"/assets/sentinel/07.png"}
              data-photo-project={"sentinel"}
              data-photo-preview={"1"}
              aria-label={"Preview Incident reports"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("sentinel", 1);
              }}
            >
              <img
                src={"/assets/sentinel/07.png"}
                alt={"SentinelAI: incident reports"}
                loading={"lazy"}
              />
              <span>{"Incident reports ↗"}</span>
            </a>
            <a
              href={"/assets/sentinel/01.png"}
              data-photo-project={"sentinel"}
              data-photo-preview={"2"}
              aria-label={"Preview Recent detected incidents"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("sentinel", 2);
              }}
            >
              <img
                src={"/assets/sentinel/01.png"}
                alt={"SentinelAI: recent detected incidents"}
                loading={"lazy"}
              />
              <span>{"Recent detected incidents ↗"}</span>
            </a>
          </div>
        </article>
        <article className={"project"} data-project={"outreach"}>
          <button
            className={"project-visual outreach-visual"}
            aria-label={"Explore Automated Structure case study"}
            onClick={() => openCase("outreach")}
          >
            <div className={"visual-top"}>
              <span>{"AUTOMATED STRUCTURE"}</span>
              <span>{"04"}</span>
            </div>
            <div className={"workflow-art"}>
              <div className={"workflow-node"}>
                {"01 "}
                <strong>{"Research"}</strong>
                <span>{"↗"}</span>
              </div>
              <div className={"connector"}></div>
              <div className={"workflow-node"}>
                {"02 "}
                <strong>{"Compose"}</strong>
                <span>{"↗"}</span>
              </div>
              <div className={"connector"}></div>
              <div className={"workflow-node orange-node"}>
                {"03 "}
                <strong>{"Human review"}</strong>
                <span>{"✓"}</span>
              </div>
            </div>
            <span className={"concept-label"}>{"WORKFLOW STUDY"}</span>
            <span className={"round-arrow"}>{"↗"}</span>
          </button>
          <div className={"project-media-links"}>
            <button
              data-media={"outreach:overview"}
              onClick={() => openCase("outreach", "overview")}
            >
              {"Explore project "}
              <span>{"↗"}</span>
            </button>
            <button
              data-media={"outreach:photos"}
              onClick={() => openCase("outreach", "photos")}
            >
              {"Screenshots "}
              <span className={"soon-label"}>{"SOON"}</span>
            </button>
          </div>
          <div className={"project-info"}>
            <div>
              <span className={"eyebrow"}>{"04 / ORCHESTRATED OUTREACH"}</span>
              <h3>
                <button
                  data-open={"outreach"}
                  onClick={() => openCase("outreach")}
                >
                  {"Automated Structure "}
                  <span>{"↗"}</span>
                </button>
              </h3>
              <p>{"Grounded research. Intentional automation."}</p>
            </div>
          </div>
        </article>
        <aside className={"work-note"}>
          <span className={"eyebrow"}>{"THE THREAD THROUGH THE WORK"}</span>
          <h3>
            {"Complex underneath."}
            <br />
            <em>{"Clear on the surface."}</em>
          </h3>
          <p>
            {
              "From customer intelligence to local vision AI, I’m interested in how the parts connect: useful interfaces, deliberate architecture, and automation with a purpose."
            }
          </p>
          <a href={"#approach"}>
            {"How I work "}
            <span>{"↓"}</span>
          </a>
        </aside>
      </div>
      <div className={"repository-collection"}>
        <div className={"repository-heading"}>
          <span className={"eyebrow"}>{"MORE FROM MY WORKSPACE"}</span>
          <p>{"Foundations, systems, and work in progress."}</p>
        </div>
        <div className={"repository-grid"}>
          <article className={"repository-project detailed-repository"}>
            <div className={"repository-card-top"}>
              <span className={"repository-number"}>{"05"}</span>
              <span className={"project-stage"}>{"Foundation build"}</span>
            </div>
            <div className={"repository-identity"}>
              <small>{"EVIDENCE & POLICY SYSTEMS"}</small>
              <h3>
                <button
                  data-open={"insurance"}
                  onClick={() => openCase("insurance")}
                >
                  {"InsuranceLeadBot "}
                  <span>{"↗"}</span>
                </button>
              </h3>
            </div>
            <p className={"repository-description"}>
              {
                "An evidence and policy foundation for insurance workflows, with verifiable records and controlled configuration."
              }
            </p>
            <div className={"project-stack-tags"}>
              <span>{"Python"}</span>
              <span>{"FastAPI"}</span>
              <span>{"PostgreSQL"}</span>
            </div>
            <div className={"repository-actions"}>
              <button
                data-open={"insurance"}
                onClick={() => openCase("insurance")}
              >
                {"Project notes "}
                <span>{"↗"}</span>
              </button>
              <a
                href={"https://github.com/JGB-Code/InsuranceLeadBot"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {"Repository "}
                <span>{"↗"}</span>
              </a>
            </div>
          </article>
          <article className={"repository-project detailed-repository"}>
            <div className={"repository-card-top"}>
              <span className={"repository-number"}>{"06"}</span>
              <span className={"project-stage"}>{"Foundation build"}</span>
            </div>
            <div className={"repository-identity"}>
              <small>{"SUPPLY ASSURANCE"}</small>
              <h3>
                <button
                  data-open={"sourcing"}
                  onClick={() => openCase("sourcing")}
                >
                  {"FocusedSourcing "}
                  <span>{"↗"}</span>
                </button>
              </h3>
            </div>
            <p className={"repository-description"}>
              {
                "A traceable evidence foundation for supply assurance, designed around tenant isolation and independently verifiable records."
              }
            </p>
            <div className={"project-stack-tags"}>
              <span>{"FastAPI"}</span>
              <span>{"Next.js"}</span>
              <span>{"PostgreSQL"}</span>
            </div>
            <div className={"repository-actions"}>
              <button
                data-open={"sourcing"}
                onClick={() => openCase("sourcing")}
              >
                {"Project notes "}
                <span>{"↗"}</span>
              </button>
              <a
                href={"https://github.com/JGB-Code/FocusedSourcing"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {"Repository "}
                <span>{"↗"}</span>
              </a>
            </div>
          </article>
          <article className={"repository-project detailed-repository"}>
            <div className={"repository-card-top"}>
              <span className={"repository-number"}>{"07"}</span>
              <span className={"project-stage"}>{"In development"}</span>
            </div>
            <div className={"repository-identity"}>
              <small>{"PRIVACY & GUIDED PREPARATION"}</small>
              <h3>
                <button
                  data-open={"divorce"}
                  onClick={() => openCase("divorce")}
                >
                  {"DivorceSecretary "}
                  <span>{"↗"}</span>
                </button>
              </h3>
            </div>
            <p className={"repository-description"}>
              {
                "Calm, privacy-focused preparation tools, with clear boundaries between educational guidance and legal advice."
              }
            </p>
            <div className={"project-stack-tags"}>
              <span>{"Next.js"}</span>
              <span>{"Python"}</span>
              <span>{"PostgreSQL"}</span>
            </div>
            <div className={"repository-actions"}>
              <button data-open={"divorce"} onClick={() => openCase("divorce")}>
                {"Project notes "}
                <span>{"↗"}</span>
              </button>
              <a
                href={"https://github.com/JGB-Code/DivorceSecretary"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {"Repository "}
                <span>{"↗"}</span>
              </a>
            </div>
          </article>
          <article className={"repository-project detailed-repository"}>
            <div className={"repository-card-top"}>
              <span className={"repository-number"}>{"08"}</span>
              <span className={"project-stage"}>{"Early stage"}</span>
            </div>
            <div className={"repository-identity"}>
              <small>{"PROJECT WORKSPACE"}</small>
              <h3>
                <button data-open={"aitest"} onClick={() => openCase("aitest")}>
                  {"AITestRun "}
                  <span>{"↗"}</span>
                </button>
              </h3>
            </div>
            <p className={"repository-description"}>
              {
                "An initialized project workspace. Application scope and implementation are still to come."
              }
            </p>
            <div className={"project-stack-tags"}></div>
            <div className={"repository-actions"}>
              <button data-open={"aitest"} onClick={() => openCase("aitest")}>
                {"Project notes "}
                <span>{"↗"}</span>
              </button>
              <a
                href={"https://github.com/JGB-Code/AITestRun"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {"Repository "}
                <span>{"↗"}</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
