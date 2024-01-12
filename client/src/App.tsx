import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import ProtectedRoute from "./ProtectedRoute";
import RefreshTokenRoute from "./RefreshTokenRoute";
import VerifyEmail from "./pages/VerifyEmailPage/VerifyEmailPage";
import LinksPage from "./pages/LinksPage/LinksPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import RedirectToHomePage from "./RedirectToHomePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
        <Route path="/forget-password" element={<ForgetPasswordPage />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route element={<RefreshTokenRoute />}>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="/" element={<RedirectToHomePage />}></Route>
          <Route
            path="/links"
            element={
              <ProtectedRoute>
                <LinksPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings/:tab"
            element={
              <ProtectedRoute>
                <SettingsPage />
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
