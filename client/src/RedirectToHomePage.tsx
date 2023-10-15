import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToHomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/links");
  }, [navigate]);
  return null;
};

export default RedirectToHomePage;
