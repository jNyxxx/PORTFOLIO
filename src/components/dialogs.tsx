"use client";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { usePortfolio, usePhotoViewer } from "./portfolio-provider";
import { media, projects } from "@/content/portfolio";
import { wrapIndex } from "@/lib/motion";
import { previewSource, useAdjacentPhotoPreload } from "@/lib/photos";
import { ProjectEngineeringDetails } from "./project-engineering-details";
import { IconButton } from "./ui/controls";
import type { ProjectTab } from "@/lib/types";
function useNativeDialog(
  open: boolean,
  onClose: () => void,
  lockScroll = false,
) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    const old = document.body.style.overflow;
    if (open && lockScroll) document.body.style.overflow = "hidden";
    return () => {
      if (open && lockScroll) document.body.style.overflow = old;
    };
  }, [open, lockScroll]);
  function backdrop(event: MouseEvent<HTMLDialogElement>) {
    const dialog = event.currentTarget;
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        onClose();
    }
  }
  return { ref, onClick: backdrop, onClose };
}
export function ProjectDialog() {
  const { caseSelection, closeCase, setCaseTab } = usePortfolio();
  const modal = useNativeDialog(!!caseSelection, closeCase, true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const previousProject = useRef<string | null>(null);
  useEffect(() => {
    if (caseSelection && previousProject.current !== caseSelection.project) {
      setPhotoIndex(0);
      previousProject.current = caseSelection.project;
    }
    if (!caseSelection) previousProject.current = null;
  }, [caseSelection]);
  const project = caseSelection ? projects[caseSelection.project] : null,
    photos = caseSelection ? media[caseSelection.project].photos : [],
    tab = caseSelection?.tab ?? "overview";
  const index = photos.length ? wrapIndex(photoIndex, photos.length) : 0,
    photo = photos[index];
  useAdjacentPhotoPreload(photos, index, !!caseSelection && tab === "photos");
  function tabKeys(e: KeyboardEvent<HTMLButtonElement>) {
    const tabs: ProjectTab[] = photos.length
      ? ["overview", "photos"]
      : ["overview"];
    let i = tabs.indexOf(tab);
    if (e.key === "ArrowRight") i = wrapIndex(i + 1, tabs.length);
    else if (e.key === "ArrowLeft") i = wrapIndex(i - 1, tabs.length);
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = tabs.length - 1;
    else return;
    e.preventDefault();
    setCaseTab(tabs[i]);
    document.getElementById("tab-" + tabs[i])?.focus();
  }
  return (
    <dialog id="case-dialog" aria-labelledby="case-title" {...modal}>
      <button
        className="close-dialog"
        aria-label="Close case study"
        onClick={closeCase}
      >
        ✕
      </button>
      <span className="eyebrow" id="case-category">
        {project?.category}
      </span>
      <h2 id="case-title">{project?.title}</h2>
      <p id="case-intro">{project?.intro}</p>
      <div className="case-tabs" role="tablist" aria-label="Project details">
        <button
          id="tab-overview"
          role="tab"
          aria-selected={tab === "overview"}
          aria-controls="case-panel"
          data-tab="overview"
          tabIndex={tab === "overview" ? 0 : -1}
          onClick={() => setCaseTab("overview")}
          onKeyDown={tabKeys}
        >
          Overview
        </button>
        <button
          id="tab-photos"
          role="tab"
          aria-selected={tab === "photos"}
          aria-controls="case-panel"
          data-tab="photos"
          tabIndex={tab === "photos" ? 0 : -1}
          hidden={!!project && !photos.length}
          onClick={() => setCaseTab("photos")}
          onKeyDown={tabKeys}
        >
          Screenshots{" "}
          <span>
            {photos.length ? String(photos.length).padStart(2, "0") : "SOON"}
          </span>
        </button>
      </div>
      <a
        id="case-repository"
        className="case-repository"
        href={project?.repository}
        target="_blank"
        rel="noopener noreferrer"
        hidden={!project?.repository}
      >
        View repository ↗
      </a>
      <div
        id="case-panel"
        role="tabpanel"
        aria-labelledby={"tab-" + tab}
        tabIndex={0}
      >
        <div id="case-media">
          {tab === "photos" &&
            project &&
            (photo ? (
              <>
                <a
                  className="gallery-full-image"
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={"Open " + photo.caption + " at full resolution"}
                >
                  <img
                    className="real-media"
                    src={previewSource(photo.src)}
                    alt={photo.alt}
                    decoding="async"
                    loading="eager"
                  />
                </a>
                <div className="gallery-nav">
                  <IconButton
                    className="gallery-prev"
                    label="Previous screenshot"
                    icon="chevron-left"
                    aria-keyshortcuts="ArrowLeft"
                    disabled={photos.length < 2}
                    onClick={() =>
                      setPhotoIndex(wrapIndex(index - 1, photos.length))
                    }
                  />
                  <p aria-live="polite">
                    {index + 1} / {photos.length} — {photo.caption}
                  </p>
                  <IconButton
                    className="gallery-next"
                    label="Next screenshot"
                    icon="chevron-right"
                    aria-keyshortcuts="ArrowRight"
                    disabled={photos.length < 2}
                    onClick={() =>
                      setPhotoIndex(wrapIndex(index + 1, photos.length))
                    }
                  />
                </div>
                <div
                  className="gallery-thumbnails"
                  role="group"
                  aria-label="Choose a screenshot"
                >
                  {photos.map((item, i) => (
                    <button
                      key={item.src}
                      className="gallery-thumbnail"
                      data-photo={i}
                      aria-label={item.caption}
                      aria-pressed={index === i}
                      onClick={() => setPhotoIndex(i)}
                    >
                      <img src={item.thumb || item.src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
                <a
                  className="media-full-link"
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open full-resolution image ↗
                </a>
              </>
            ) : (
              <>
                <div className="media-empty">
                  <span className="media-frame-label">
                    {project.title.toUpperCase()} / SYSTEM GALLERY
                  </span>
                  <span className="empty-symbol">▧</span>
                  <h4>The details, coming soon.</h4>
                  <p>Screenshots of the real system will live here.</p>
                </div>
                <p className="media-format">
                  Project photos have not been added yet.
                </p>
              </>
            ))}
        </div>
        <div id="case-body" hidden={tab !== "overview"}>
          {project?.sections.map(([title, copy]) => (
            <Section key={title} title={title} copy={copy} />
          ))}
          {caseSelection && (
            <ProjectEngineeringDetails project={caseSelection.project} />
          )}
        </div>
      </div>
      <button className="dialog-done" onClick={closeCase}>
        Back to selected work ↗
      </button>
    </dialog>
  );
}
function Section({ title, copy }: { title: string; copy: string }) {
  return (
    <>
      <h4>{title}</h4>
      <p>{copy}</p>
    </>
  );
}
export function PhotoDialog() {
  const { photoSelection, closePhoto, setPhotoIndex } = usePhotoViewer();
  const modal = useNativeDialog(!!photoSelection, closePhoto);
  const [error, setError] = useState<{ src: string; message: string } | null>(
    null,
  );
  const photos = photoSelection ? media[photoSelection.project].photos : [],
    index = photos.length
      ? wrapIndex(photoSelection?.index ?? 0, photos.length)
      : 0,
    photo = photos[index];
  useAdjacentPhotoPreload(photos, index, !!photoSelection);
  function move(delta: number) {
    if (photos.length) setPhotoIndex(wrapIndex(index + delta, photos.length));
  }
  return (
    <dialog
      id="photo-preview"
      aria-labelledby="preview-caption"
      {...modal}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1);
        }
      }}
    >
      <button
        id="preview-close"
        aria-label="Close image preview"
        onClick={closePhoto}
      >
        ✕
      </button>
      <img
        id="preview-image"
        src={photo ? previewSource(photo.src) : undefined}
        alt={photo?.alt ?? ""}
        decoding="async"
        fetchPriority="high"
        onError={() =>
          setError({
            src: photo?.src ?? "",
            message:
              "This image could not load. Try the original image link below.",
          })
        }
      />
      <div className="preview-navigation">
        <IconButton
          id="preview-prev"
          label="Previous image"
          icon="chevron-left"
          aria-keyshortcuts="ArrowLeft"
          disabled={photos.length < 2}
          onClick={() => move(-1)}
        />
        <p id="preview-caption" aria-live="polite">
          {photo ? `${index + 1} / ${photos.length} — ${photo.caption}` : ""}
        </p>
        <IconButton
          id="preview-next"
          label="Next image"
          icon="chevron-right"
          aria-keyshortcuts="ArrowRight"
          disabled={photos.length < 2}
          onClick={() => move(1)}
        />
      </div>
      <a
        id="preview-original"
        href={photo?.src}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open original image ↗
      </a>
      <p id="preview-status" role="status">
        {error && error.src === photo?.src ? error.message : ""}
      </p>
    </dialog>
  );
}
