import { useCallback, useEffect } from "react";

function useHideWhenClickOutside({
  containerId,
  hideFunc,
}: {
  containerId: string;
  hideFunc: () => void;
}) {
  const handleCloseWhenClickOutside = useCallback(
    (container: HTMLElement) => (event: MouseEvent) => {
      if (!container) return;
      if (!container.contains(event.target as HTMLElement)) hideFunc();
    },
    [hideFunc],
  );

  useEffect(() => {
    const container = document.getElementById(containerId) as HTMLElement;
    document.addEventListener("click", handleCloseWhenClickOutside(container));
    return () => {
      document.removeEventListener("click", handleCloseWhenClickOutside(container));
    };
  }, [containerId, handleCloseWhenClickOutside]);

  return null;
}

export default useHideWhenClickOutside;
