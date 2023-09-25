import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import RefreshTokenRoute from "./pages/RefreshTokenRoute";
import RedirectIfSignedIn from "./RedirectIfSignedIn";

function App() {
  return (
    <Routes>
      <Route element={<RefreshTokenRoute />}>
        <Route element={<RedirectIfSignedIn />}>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
        </Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
