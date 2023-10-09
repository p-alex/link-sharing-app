import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";
import ProtectedRoute from "./ProtectedRoute";
import RefreshTokenRoute from "./RefreshTokenRoute";
import RedirectIfSignedIn from "./RedirectIfSignedIn";
import VerifyEmail from "./pages/VerifyEmailPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RedirectIfSignedIn />}>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
        </Route>
        <Route element={<RefreshTokenRoute />}>
          <Route element={<RedirectIfSignedIn />}>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
