import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../apiRequests";
import Layout from "../layout";
import useAuth from "../hooks/useAuth";

const LinksPage = () => {
  const navigate = useNavigate();
  const { authState, dispatchAuth } = useAuth();
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
    <Layout>
      <div>
        <h1>Hello {authState.email}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Layout>
  );
};

export default LinksPage;
