import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import Loading from "./Loading";

type LoadingContextProps = {
  show: () => void;
  hide: () => void;
  set: (v: boolean) => void;
};

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  // Đảm bảo chỉ một instance, không bị “race condition”
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const set = useCallback((v: boolean) => setVisible(v), []);

  return (
    <LoadingContext.Provider value={{ show, hide, set }}>
      {children}
      {visible && (
        <div className="fixed inset-0 bg-black/10 z-[1000] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within a LoadingProvider");
  return ctx;
}
