"use client";
import { usePortfolio } from "./portfolio-provider";
import { carouselEntries, roles } from "@/content/portfolio";
import { useOrbit } from "@/hooks/use-orbit";
import { useClock } from "@/hooks/use-browser";
export function Hero() {
  const { openCase } = usePortfolio();
  const {
    index,
    paused,
    regionRef,
    stageRef,
    setCardRef,
    select,
    togglePause,
    onCardClick,
  } = useOrbit(openCase);
  const { clock } = useClock();
  return (
    <section
      id={"home"}
      className={"reference-hero"}
      aria-labelledby={"hero-title"}
    >
      <div className={"intro-copy"}>
        <div className={"hello-line"}>
          <span className={"hello-rule"}></span>
          {" HI, I’M JUNEX "}
          <span className={"hello-monogram"} aria-hidden={"true"}>
            <img
              src={"/assets/junex-avatar.png"}
              alt={""}
              width={"80"}
              height={"80"}
            />
          </span>
        </div>
        <p className={"intro-prefix"}>{"A curious mind."}</p>
        <h1 id={"hero-title"}>
          <span id={"rotating-role"}>{roles[index % roles.length]}</span>
        </h1>
        <p className={"intro-description"}>
          {
            "I connect ideas, code, and automation to build thoughtful software. From the first sketch to the details underneath, I like making complex things feel simple."
          }
        </p>
        <div className={"intro-actions"}>
          <a href={"#featured"} className={"button-primary"}>
            {"See my work "}
            <span>{"↗"}</span>
          </a>
          <a href={"#contact"} className={"button-secondary"}>
            {"Let’s talk "}
            <span>{"↗"}</span>
          </a>
        </div>
        <div className={"intro-location"}>
          <span className={"location-dot"}></span>
          {" CEBU, PHILIPPINES "}
          <span id={"clock"}>{clock}</span>
        </div>
      </div>
      <div
        className={"hero-showcase"}
        aria-label={"Interactive project carousel"}
        ref={regionRef}
      >
        <div className={"carousel-orbit"} aria-hidden={"true"}>
          <span>{"NYX / SELECTED WORK"}</span>
        </div>
        <div className={"carousel-stage"} id={"carousel-stage"} ref={stageRef}>
          <button
            className={"showcase-card"}
            data-carousel-index={"0"}
            ref={(node) => {
              setCardRef(0, node);
            }}
            onClick={() => onCardClick(0)}
            aria-current={index === 0}
            aria-label={
              (index === 0 ? "Explore " : "Rotate to ") +
              carouselEntries[0].name
            }
          >
            <span className={"window-title"}>
              <span className={"window-brand"}>{"d."}</span>
              {" DataAutomated "}
              <span className={"window-controls"}>{"− ◻ ×"}</span>
            </span>
            <span className={"showcase-screen"}>
              <img
                src={"/assets/dataautomated/landing-hero.png"}
                width={"1920"}
                height={"1080"}
                alt={"DataAutomated landing page"}
              />
              <span className={"showcase-screen-footer"}>
                {"CUSTOMER INTELLIGENCE"}
                <span>{"CONNECTED BY DESIGN ↗"}</span>
              </span>
            </span>
          </button>
          <button
            className={"showcase-card"}
            data-carousel-index={"1"}
            ref={(node) => {
              setCardRef(1, node);
            }}
            onClick={() => onCardClick(1)}
            aria-current={index === 1}
            aria-label={
              (index === 1 ? "Explore " : "Rotate to ") +
              carouselEntries[1].name
            }
          >
            <span className={"window-title"}>
              <span className={"window-brand"}>{"a."}</span>
              {" Automated Structure "}
              <span className={"window-controls"}>{"− ◻ ×"}</span>
            </span>
            <span className={"showcase-screen outreach-screen"}>
              <span className={"screen-eyebrow"}>
                {"WORKFLOW / ARCHITECTURE STUDY"}
              </span>
              <strong>
                {"Research."}
                <br />
                {"Reason."}
                <br />
                <em>{"Reach out."}</em>
              </strong>
              <span className={"mini-flow"}>
                <span>{"Discover"}</span>
                <i>{"↓"}</i>
                <span>{"Compose"}</span>
                <i>{"↓"}</i>
                <span>{"Human review ✓"}</span>
              </span>
              <span className={"screen-bottom"}>
                {"HUMAN JUDGMENT. CONNECTED AUTOMATION."}
              </span>
            </span>
          </button>
          <button
            className={"showcase-card"}
            data-carousel-index={"2"}
            ref={(node) => {
              setCardRef(2, node);
            }}
            onClick={() => onCardClick(2)}
            aria-current={index === 2}
            aria-label={
              (index === 2 ? "Explore " : "Rotate to ") +
              carouselEntries[2].name
            }
          >
            <span className={"window-title"}>
              <span className={"window-brand"}>{"c."}</span>
              {" Customer Support Agent "}
              <span className={"window-controls"}>{"− ◻ ×"}</span>
            </span>
            <span className={"showcase-screen image-showcase support-showcase"}>
              <img
                src={"/assets/support/00-portfolio-cover.png"}
                width={"3200"}
                height={"1840"}
                alt={"CustomerSupportAgent portfolio interface cover"}
              />
              <span className={"showcase-screen-footer"}>
                {"SUPPORT, CONNECTED"}
                <span>{"EXPLORE THE INTERFACE ↗"}</span>
              </span>
            </span>
          </button>
          <button
            className={"showcase-card"}
            data-carousel-index={"3"}
            ref={(node) => {
              setCardRef(3, node);
            }}
            onClick={() => onCardClick(3)}
            aria-current={index === 3}
            aria-label={
              (index === 3 ? "Explore " : "Rotate to ") +
              carouselEntries[3].name
            }
          >
            <span className={"window-title"}>
              <span className={"window-brand"}>{"s."}</span>
              {" SentinelAI "}
              <span className={"window-controls"}>{"− ◻ ×"}</span>
            </span>
            <span
              className={"showcase-screen image-showcase sentinel-showcase"}
            >
              <span className={"screen-eyebrow"}>
                {"LOCAL AI / SECURITY MONITORING"}
              </span>
              <strong>
                {"Observe."}
                <br />
                {"Understand."}
                <br />
                <em>{"Respond."}</em>
              </strong>
              <img
                src={"/assets/sentinel/02.png"}
                width={"1691"}
                height={"760"}
                alt={"SentinelAI risk trend dashboard"}
              />
              <span className={"showcase-screen-footer"}>
                {"VISION, WITH CONTEXT"}
                <span>{"EXPLORE THE SYSTEM ↗"}</span>
              </span>
            </span>
          </button>
        </div>
        <button
          className={"carousel-arrow previous"}
          id={"carousel-prev"}
          aria-label={"Previous project"}
          onClick={() => select(index - 1)}
        >
          {"‹"}
        </button>
        <button
          className={"carousel-arrow next"}
          id={"carousel-next"}
          aria-label={"Next project"}
          onClick={() => select(index + 1)}
        >
          {"›"}
        </button>
        <div className={"carousel-caption"}>
          <div>
            <p id={"carousel-name"}>{carouselEntries[index].name}</p>
            <span id={"carousel-category"}>
              {carouselEntries[index].category}
            </span>
          </div>
          <button
            id={"carousel-pause"}
            onClick={togglePause}
            aria-pressed={paused}
            aria-label={
              paused ? "Resume carousel motion" : "Pause carousel motion"
            }
          >
            {paused ? "▷" : "Ⅱ"}
          </button>
        </div>
        <p className={"orbit-hint"}>
          {"DRAG TO EXPLORE "}
          <span>{"·"}</span>
          {" SELECT TO DISCOVER"}
        </p>
        <div
          className={"carousel-dots"}
          role={"group"}
          aria-label={"Choose project"}
        >
          <button
            data-carousel-go={"0"}
            aria-label={"DataAutomated"}
            onClick={() => select(0)}
            aria-pressed={index === 0}
          ></button>
          <button
            data-carousel-go={"1"}
            aria-label={"Automated Structure"}
            onClick={() => select(1)}
            aria-pressed={index === 1}
          ></button>
          <button
            data-carousel-go={"2"}
            aria-label={"Customer Support Agent"}
            onClick={() => select(2)}
            aria-pressed={index === 2}
          ></button>
          <button
            data-carousel-go={"3"}
            aria-label={"SentinelAI"}
            onClick={() => select(3)}
            aria-pressed={index === 3}
          ></button>
        </div>
      </div>
      <div className={"hero-baseline"}>
        <span>{"BUILDER FIRST. ALWAYS LEARNING."}</span>
        <a href={"#featured"}>
          {"A few things I’ve been building "}
          <span>{"↓"}</span>
        </a>
      </div>
    </section>
  );
}
