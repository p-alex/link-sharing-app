import useAuthContext from "../authContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../apiRequests";

const Homepage = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();

  const handleLogout = async () => {
    try {
      await axiosPrivate.post<IDefaultResponse<null>>("/auth/logout");
      setAuthState({ id: "", email: "", accessToken: "" });
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Hello {authState.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Homepage;
