"use client";
import { useCopyEmail } from "@/hooks/use-browser";
import { Icon } from "./ui/icon";
import { SocialTile } from "./ui/controls";
import { Button } from "./ui/button";

export function Contact() {
  const { copy, copied, status } = useCopyEmail();
  return (
    <section id="contact" className="contact section">
      <div className="contact-meta">
        <span className="eyebrow">WHAT’S NEXT</span>
        <span>GOOD SYSTEMS START WITH A CONVERSATION.</span>
      </div>
      <a className="contact-title" href="mailto:nyx.sdlc@gmail.com">
        Let’s build something
        <br />
        <em>worth using.</em>
        <span>↗</span>
      </a>
      <div className="contact-bottom">
        <div>
          <p>
            Have a system in mind?
            <br />
            Let’s figure out what it could become.
          </p>
          <Button
            variant="outline"
            className="email-address ui-copy-address"
            type="button"
            onClick={copy}
            aria-label={
              copied
                ? "Email address copied; copy again"
                : "Copy email address to clipboard"
            }
            data-copied={copied}
          >
            <span>nyx.sdlc@gmail.com</span>
            <Icon name={copied ? "check" : "copy"} size={18} />
          </Button>
        </div>
      </div>
      <div className="social-links" aria-label="Contact and social profiles">
        <SocialTile
          index="01"
          name="Facebook"
          detail="@nexyeu"
          icon="facebook"
          href="https://www.facebook.com/nexyeu"
        />
        <SocialTile
          index="02"
          name="Instagram"
          detail="@_jnyxx_"
          icon="instagram"
          href="https://www.instagram.com/_jnyxx_/"
        />
        <SocialTile
          index="03"
          name="Email"
          detail={copied ? "Address copied" : "nyx.sdlc@gmail.com"}
          icon="mail"
          onClick={copy}
        />
        <SocialTile
          index="04"
          name="LinkedIn"
          detail="Professional profile"
          icon="linkedin"
          href="https://www.linkedin.com/in/junex-glenn-baran-7446b4385/"
        />
        <SocialTile
          index="05"
          name="GitHub"
          detail="@jNyxxx"
          icon="github"
          href="https://github.com/jNyxxx"
        />
      </div>
      <p className="copy-status" aria-live="polite" id="copy-status">
        {status}
      </p>
    </section>
  );
}
