import { useCallback, useSyncExternalStore } from "react";

/**
 * Deteta viewport mobile via matchMedia com useSyncExternalStore:
 * lê o valor correto antes do primeiro paint no cliente (sem flash de
 * layout desktop) e mantém-se consistente com a hidratação (SSR → false).
 */
export function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint - 1}px)`;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
