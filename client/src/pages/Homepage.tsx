import { useNavigate } from "react-router-dom";
import useAuthContext from "../authContext/useAuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../apiRequests";

const HomePage = () => {
  const navigate = useNavigate();
  const { authState, dispatchAuth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();

  const handleLogout = async () => {
    try {
      await axiosPrivate.post<IDefaultResponse<null>>("/auth/logout");
      dispatchAuth({ type: "LOGOUT", payload: null });
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

export default HomePage;
