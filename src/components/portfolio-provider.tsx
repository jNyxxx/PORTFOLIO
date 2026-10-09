"use client";
import {
  createContext,
  useContext,
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
interface PortfolioContextValue {
  caseSelection: CaseSelection | null;
  photoSelection: PhotoSelection | null;
  openCase: (project: ProjectId, tab?: ProjectTab) => void;
  closeCase: () => void;
  setCaseTab: (tab: ProjectTab) => void;
  openPhoto: (project: ProjectId, index: number) => void;
  closePhoto: () => void;
  setPhotoIndex: (index: number) => void;
}
const PortfolioContext = createContext<PortfolioContextValue | null>(null);
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
  return (
    <PortfolioContext
      value={{
        caseSelection,
        photoSelection,
        openCase,
        closeCase,
        setCaseTab,
        openPhoto,
        closePhoto,
        setPhotoIndex,
      }}
    >
      {children}
    </PortfolioContext>
  );
}
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("PortfolioProvider is required");
  return context;
}
