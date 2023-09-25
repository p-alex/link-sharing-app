import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const RefreshTokenRoute = () => {
  const [isLoading, setIsLoading] = useState(false);
  const refresh = useRefreshToken();

  const effectRan = useRef<boolean>(false);

  useEffect(() => {
    if (!effectRan.current) {
      (async () => {
        try {
          setIsLoading(true);
          await refresh();
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
      effectRan.current = true;
    }
  }, []);

  return isLoading ? null : <Outlet />;
};

export default RefreshTokenRoute;
