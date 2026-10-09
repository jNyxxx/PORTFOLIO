"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type {
  ProjectId,
  ProjectTab,
  CaseSelection,
  PhotoSelection,
} from "@/lib/types";

/**
 * Split state by responsibility. Photo navigation must not invalidate Hero,
 * Featured and Work: those consumers only need stable open actions.
 */
interface PortfolioContextValue {
  caseSelection: CaseSelection | null;
  openCase: (project: ProjectId, tab?: ProjectTab) => void;
  closeCase: () => void;
  setCaseTab: (tab: ProjectTab) => void;
  openPhoto: (project: ProjectId, index: number) => void;
}
interface PhotoContextValue {
  photoSelection: PhotoSelection | null;
  closePhoto: () => void;
  setPhotoIndex: (index: number) => void;
}
const PortfolioContext = createContext<PortfolioContextValue | null>(null);
const PhotoContext = createContext<PhotoContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [caseSelection, setCaseSelection] = useState<CaseSelection | null>(
    null,
  );
  const [photoSelection, setPhotoSelection] = useState<PhotoSelection | null>(
    null,
  );

  const openCase = useCallback(
    (project: ProjectId, tab: ProjectTab = "overview") =>
      setCaseSelection({ project, tab }),
    [],
  );
  const closeCase = useCallback(() => setCaseSelection(null), []);
  const setCaseTab = useCallback(
    (tab: ProjectTab) =>
      setCaseSelection((current) => (current ? { ...current, tab } : null)),
    [],
  );
  const openPhoto = useCallback(
    (project: ProjectId, index: number) =>
      setPhotoSelection({ project, index }),
    [],
  );
  const closePhoto = useCallback(() => setPhotoSelection(null), []);
  const setPhotoIndex = useCallback(
    (index: number) =>
      setPhotoSelection((current) => (current ? { ...current, index } : null)),
    [],
  );

  const portfolio = useMemo(
    () => ({ caseSelection, openCase, closeCase, setCaseTab, openPhoto }),
    [caseSelection, openCase, closeCase, setCaseTab, openPhoto],
  );
  const photo = useMemo(
    () => ({ photoSelection, closePhoto, setPhotoIndex }),
    [photoSelection, closePhoto, setPhotoIndex],
  );

  return (
    <PortfolioContext value={portfolio}>
      <PhotoContext value={photo}>{children}</PhotoContext>
    </PortfolioContext>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("PortfolioProvider is required");
  return context;
}

export function usePhotoViewer() {
  const context = useContext(PhotoContext);
  if (!context) throw new Error("PortfolioProvider is required");
  return context;
}
