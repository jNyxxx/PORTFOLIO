"use client";
import { useCopyEmail } from "@/hooks/use-browser";
export function Contact() {
  const { copy, copied, status } = useCopyEmail();
  return (
    <section id={"contact"} className={"contact section"}>
      <div className={"contact-meta"}>
        <span className={"eyebrow"}>{"WHAT’S NEXT"}</span>
        <span>{"GOOD SYSTEMS START WITH A CONVERSATION."}</span>
      </div>
      <a className={"contact-title"} href={"mailto:nyx.sdlc@gmail.com"}>
        {"Let’s build something"}
        <br />
        <em>{"worth using."}</em>
        <span>{"↗"}</span>
      </a>
      <div className={"contact-bottom"}>
        <div>
          <p>
            {"Have a system in mind?"}
            <br />
            {"Let’s figure out what it could become."}
          </p>
          <a className={"email-address"} href={"mailto:nyx.sdlc@gmail.com"}>
            {"nyx.sdlc@gmail.com "}
            <span>{"↗"}</span>
          </a>
        </div>
        <button
          className={"copy-email"}
          type={"button"}
          aria-label={"Copy email address"}
          onClick={copy}
        >
          {copied ? (
            <>
              Copied <span>✓</span>
            </>
          ) : (
            <>
              Copy email <span>⧉</span>
            </>
          )}
        </button>
      </div>
      <div
        className={"social-links"}
        aria-label={"Contact and social profiles"}
      >
        <a
          href={"https://www.facebook.com/nexyeu"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <span className={"social-index"}>{"01"}</span>
          <span>
            {"Facebook"}
            <small>{"@nexyeu"}</small>
          </span>
          <b>{"↗"}</b>
        </a>
        <a
          href={"https://www.instagram.com/_jnyxx_/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <span className={"social-index"}>{"02"}</span>
          <span>
            {"Instagram"}
            <small>{"@_jnyxx_"}</small>
          </span>
          <b>{"↗"}</b>
        </a>
        <a href={"mailto:nyx.sdlc@gmail.com"}>
          <span className={"social-index"}>{"03"}</span>
          <span>
            {"Email"}
            <small>{"Let’s talk"}</small>
          </span>
          <b>{"↗"}</b>
        </a>
        <a
          href={"https://github.com/jNyxxx"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <span className={"social-index"}>{"04"}</span>
          <span>
            {"GitHub"}
            <small>{"@jNyxxx"}</small>
          </span>
          <b>{"↗"}</b>
        </a>
      </div>
      <p className={"copy-status"} aria-live={"polite"} id={"copy-status"}>
        {status}
      </p>
    </section>
  );
}
