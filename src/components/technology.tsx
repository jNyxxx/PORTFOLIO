import { technologies } from "@/content/portfolio";
import type { TechnologyFilter } from "@/lib/types";
export function filteredTechnologies(filter: TechnologyFilter) {
  return technologies.filter((t) => filter === "all" || t.category === filter);
}
export function filterCount(filter: TechnologyFilter) {
  return String(filteredTechnologies(filter).length).padStart(2, "0");
}
export function stackStatus(filter: TechnologyFilter) {
  return `${filteredTechnologies(filter).length} tools ${filter === "all" ? "across the full stack" : "in this discipline"}`;
}
export function TechnologyGrid({ filter }: { filter: TechnologyFilter }) {
  return filteredTechnologies(filter).map((tech) => (
    <article className="tech-cell" key={tech.name}>
      <span className={"tech-mark " + (tech.color || "")} aria-hidden="true">
        {tech.mark}
      </span>
      <h3>{tech.name}</h3>
      <p>{tech.label}</p>
    </article>
  ));
}
export function TechnologyRail({ half }: { half: 0 | 1 }) {
  const midpoint = Math.ceil(technologies.length / 2),
    items =
      half === 0
        ? technologies.slice(0, midpoint)
        : technologies.slice(midpoint);
  return [0, 1].map((repeat) => (
    <div className="stack-rail-group" key={repeat}>
      {items.map((tech) => (
        <div className="moving-tech" key={tech.name}>
          <span className={"tech-mark " + (tech.color || "")}>{tech.mark}</span>
          <span className="moving-tech-name">{tech.name}</span>
        </div>
      ))}
    </div>
  ));
}
