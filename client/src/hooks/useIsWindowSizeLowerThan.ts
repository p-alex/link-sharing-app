import { useEffect, useState } from "react";

const useIsWindowSizeLowerThan = ({ size }: { size: number }) => {
  const [isLessThan, setIsLessThan] = useState<boolean>(false);

  function handleSetIsLessThan() {
    if (window.innerWidth < size) {
      setIsLessThan(true);
      return;
    }
    setIsLessThan(false);
  }

  useEffect(() => {
    handleSetIsLessThan();
    window.addEventListener("resize", handleSetIsLessThan);
    return () => {
      window.removeEventListener("resize", handleSetIsLessThan);
    };
  }, []);

  return isLessThan;
};

export default useIsWindowSizeLowerThan;
