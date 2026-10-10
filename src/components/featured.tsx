"use client";
import { usePortfolio } from "./portfolio-provider";
import { FeaturedMediaCard } from "./featured-media-card";
import { ProjectCover } from "./project-cover";
import { Icon } from "./ui/icon";
export function Featured() {
  const { openCase, openPhoto } = usePortfolio();
  return (
    <section
      id="featured"
      className="featured-section featured-section--refined"
    >
      <div className="featured-intro featured-intro--refined">
        <span className="section-pill">01 / FEATURED SYSTEM</span>
        <div className="featured-intro__layout">
          <h2>
            DataAutomated.
            <br />
            <em>Intelligence made clearer.</em>
          </h2>
          <p>
            Meet DataAutomated: an intelligence platform built to connect
            scattered feedback, evidence and the systems behind it. Explore the
            interface, then the architecture underneath.
          </p>
        </div>
        <div className="featured-intro__meta">
          <span>PRODUCT DESIGN / FULL-STACK ENGINEERING</span>
          <span>
            DATAAUTOMATED <Icon name="arrow-up-right" size={14} />
          </span>
        </div>
      </div>
      <article className="project featured-project" data-project="data">
        <ProjectCover
          project="data"
          photoIndex={0}
          onOpen={() => openPhoto("data", 0)}
        />
        <div className="featured-showcase-label">
          <span>01 / PLATFORM EXPERIENCE</span>
          <span>Preview the original landing page and product workspace</span>
        </div>
        <div className="featured-duo">
          <FeaturedMediaCard
            index={4}
            src="/assets/dataautomated/dashboard.png"
            alt="DataAutomated application dashboard"
            eyebrow="02 / INSIDE THE PLATFORM"
            title="The application interface"
            onOpen={(photoIndex) => openPhoto("data", photoIndex)}
          />
          <FeaturedMediaCard
            index={2}
            src="/assets/dataautomated/landing-intelligence.png"
            alt="DataAutomated customer intelligence landing-page presentation"
            eyebrow="03 / CONNECTING THE SIGNALS"
            title="The customer intelligence layer"
            onOpen={(photoIndex) => openPhoto("data", photoIndex)}
          />
        </div>
        <div className={"project-media-links"}>
          <button
            data-media={"data:overview"}
            onClick={() => openCase("data", "overview")}
          >
            {"The project "}
            <span>{"↗"}</span>
          </button>
          <button
            data-media={"data:photos"}
            onClick={() => openCase("data", "photos")}
          >
            {"All screenshots "}
            <span className={"media-count"}>{"13"}</span>
          </button>
        </div>
        <details className={"feature-gallery"}>
          <summary>
            {"Explore every screen "}
            <span>{"13 IMAGES +"}</span>
          </summary>
          <div className={"screenshot-gallery-heading"}>
            <span className={"eyebrow"}>{"LANDING PAGE & APPLICATION"}</span>
            <span>{"Click any image for full resolution"}</span>
          </div>
          <div
            className={"project-contact-sheet full-contact-sheet"}
            aria-label={"DataAutomated screenshot gallery"}
          >
            <a
              href={"/assets/dataautomated/landing-hero.png"}
              data-photo-preview={"0"}
              aria-label={"Preview Landing page · Signal. Beyond feedback."}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 0);
              }}
            >
              <img
                src={"/assets/dataautomated/landing-hero.png"}
                alt={
                  "DataAutomated landing page · signal. beyond feedback., captured from the original product recording at 1920 by 1080."
                }
                loading={"lazy"}
              />
              <span>
                {"01 / Landing page · Signal. Beyond feedback. "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/landing-evidence.png"}
              data-photo-preview={"1"}
              aria-label={"Preview Landing page · Connected evidence"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 1);
              }}
            >
              <img
                src={"/assets/dataautomated/landing-evidence.png"}
                alt={
                  "DataAutomated landing page · connected evidence, captured from the original product recording at 1920 by 1080."
                }
                loading={"lazy"}
              />
              <span>
                {"02 / Landing page · Connected evidence "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/landing-intelligence.png"}
              data-photo-preview={"2"}
              aria-label={"Preview Landing page · Customer intelligence"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 2);
              }}
            >
              <img
                src={"/assets/dataautomated/landing-intelligence.png"}
                alt={
                  "DataAutomated landing page · customer intelligence, captured from the original product recording at 1920 by 1080."
                }
                loading={"lazy"}
              />
              <span>
                {"03 / Landing page · Customer intelligence "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/landing-services.png"}
              data-photo-preview={"3"}
              aria-label={"Preview Landing page · Intelligence services"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 3);
              }}
            >
              <img
                src={"/assets/dataautomated/landing-services.png"}
                alt={
                  "DataAutomated landing page · intelligence services, captured from the original product recording at 1920 by 1080."
                }
                loading={"lazy"}
              />
              <span>
                {"04 / Landing page · Intelligence services "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/dashboard.png"}
              data-photo-preview={"4"}
              aria-label={"Preview Dashboard"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 4);
              }}
            >
              <img
                src={"/assets/dataautomated/dashboard.png"}
                alt={
                  "DataAutomated dashboard with prompts to connect customer evidence, competitive monitoring, and behavioral analytics."
                }
                loading={"lazy"}
              />
              <span>
                {"05 / Dashboard "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/voice-of-customer.png"}
              data-photo-preview={"5"}
              aria-label={"Preview Voice of Customer"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 5);
              }}
            >
              <img
                src={"/assets/dataautomated/voice-of-customer.png"}
                alt={
                  "Voice of Customer workspace showing the customer evidence connection screen."
                }
                loading={"lazy"}
              />
              <span>
                {"06 / Voice of Customer "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/competitive-signals.png"}
              data-photo-preview={"6"}
              aria-label={"Preview Competitive Signals"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 6);
              }}
            >
              <img
                src={"/assets/dataautomated/competitive-signals.png"}
                alt={
                  "Competitive Signals workspace for configuring competitor sources."
                }
                loading={"lazy"}
              />
              <span>
                {"07 / Competitive Signals "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/journey-intelligence.png"}
              data-photo-preview={"7"}
              aria-label={"Preview Journey Intelligence"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 7);
              }}
            >
              <img
                src={"/assets/dataautomated/journey-intelligence.png"}
                alt={
                  "Journey Intelligence workspace for connecting behavioral event sources."
                }
                loading={"lazy"}
              />
              <span>
                {"08 / Journey Intelligence "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/reports.png"}
              data-photo-preview={"8"}
              aria-label={"Preview Reports"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 8);
              }}
            >
              <img
                src={"/assets/dataautomated/reports.png"}
                alt={
                  "Reports workspace with delivery preferences, report history, and report templates."
                }
                loading={"lazy"}
              />
              <span>
                {"09 / Reports "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/value-identified.png"}
              data-photo-preview={"9"}
              aria-label={"Preview Value Identified"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 9);
              }}
            >
              <img
                src={"/assets/dataautomated/value-identified.png"}
                alt={
                  "Value Identified workspace with value tracking, ledger activity, and daily snapshot panels."
                }
                loading={"lazy"}
              />
              <span>
                {"10 / Value Identified "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/settings-sources.png"}
              data-photo-preview={"10"}
              aria-label={"Preview Settings & Sources"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 10);
              }}
            >
              <img
                src={"/assets/dataautomated/settings-sources.png"}
                alt={
                  "Settings and Sources screen showing source connections and configuration tabs."
                }
                loading={"lazy"}
              />
              <span>
                {"11 / Settings & Sources "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/setup-guide.png"}
              data-photo-preview={"11"}
              aria-label={"Preview Setup Guide"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 11);
              }}
            >
              <img
                src={"/assets/dataautomated/setup-guide.png"}
                alt={
                  "DataAutomated setup guide introducing source connection, signal processing, and insight queries."
                }
                loading={"lazy"}
              />
              <span>
                {"12 / Setup Guide "}
                <b>{"↗"}</b>
              </span>
            </a>
            <a
              href={"/assets/dataautomated/sign-in.png"}
              data-photo-preview={"12"}
              aria-label={"Preview Sign In"}
              onClick={(event) => {
                event.preventDefault();
                openPhoto("data", 12);
              }}
            >
              <img
                src={"/assets/dataautomated/sign-in.png"}
                alt={
                  "DataAutomated sign-in page with email and password fields and product messaging."
                }
                loading={"lazy"}
              />
              <span>
                {"13 / Sign In "}
                <b>{"↗"}</b>
              </span>
            </a>
          </div>
        </details>
      </article>
    </section>
  );
}
