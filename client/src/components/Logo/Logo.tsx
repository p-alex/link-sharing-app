import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  const [isSmallLogo, setIsSmallLogo] = useState(false);

  const handleWindowSize = () => {
    if (window.innerWidth <= 800) {
      setIsSmallLogo(true);
    } else {
      setIsSmallLogo(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 800) {
      setIsSmallLogo(true);
    }
    window.addEventListener("resize", handleWindowSize);
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);
  return (
    <Link to="/links">
      {isSmallLogo ? (
        <img src="/images/logo-devlinks-small.svg" width={32} height={32} alt="" />
      ) : (
        <img src="/images/logo-devlinks-large.svg" width={146} height={32} alt="" />
      )}
    </Link>
  );
};

export default Logo;
