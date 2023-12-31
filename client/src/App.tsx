import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage/SignUpPage";
import SignIn from "./pages/SignInPage/SignInPage";
import ProtectedRoute from "./ProtectedRoute";
import RefreshTokenRoute from "./RefreshTokenRoute";
import RedirectIfSignedIn from "./RedirectIfSignedIn";
import VerifyEmail from "./pages/VerifyEmailPage/VerifyEmailPage";
import LinksPage from "./pages/LinksPage/LinksPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import RedirectToHomePage from "./RedirectToHomePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RedirectIfSignedIn />}>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/forget-password" element={<ForgetPasswordPage />}></Route>
          <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        </Route>
        <Route element={<RefreshTokenRoute />}>
          <Route element={<RedirectIfSignedIn />}>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
          </Route>
          <Route path="/" element={<RedirectToHomePage />}></Route>
          <Route
            path="/links"
            element={
              <ProtectedRoute>
                <LinksPage />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route path="*" element={"Page does not exist"}></Route>
      </Routes>
    </>
  );
}

export default App;
