export type ProjectId =
  | "data"
  | "outreach"
  | "support"
  | "sentinel"
  | "insurance"
  | "sourcing"
  | "divorce"
  | "aitest";
export type ProjectTab = "overview" | "photos";
export interface Photo {
  src: string;
  thumb?: string;
  caption: string;
  alt: string;
}
export interface ProjectMedia {
  video: null;
  photos: Photo[];
}
export type PortfolioMedia = Record<ProjectId, ProjectMedia> & {
  portrait: { src: string; alt: string };
};
export interface Project {
  category: string;
  title: string;
  intro: string;
  repository?: string;
  sections: [string, string][];
}
export type TechnologyCategory =
  | "language"
  | "frontend"
  | "backend"
  | "ai"
  | "delivery";
export type TechnologyFilter = "all" | TechnologyCategory;
export interface Technology {
  name: string;
  mark: string;
  category: TechnologyCategory;
  label: string;
  color?: string;
}
export interface CaseSelection {
  project: ProjectId;
  tab: ProjectTab;
}
export interface PhotoSelection {
  project: ProjectId;
  index: number;
}
