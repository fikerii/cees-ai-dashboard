import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Ecommerce from "./pages/Dashboard/ECommerce";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import UserProfiles from "./pages/UserProfiles";
import Chat from "./pages/Chat/Chat";
import TanstackTables from "./pages/Tables/TanstackTables";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route
              index
              path="/"
              element={<Ecommerce />}
            />
            {/* Others Page */}
            <Route
              path="/profile"
              element={<UserProfiles />}
            />
            <Route
              path="/blank"
              element={<Blank />}
            />
            <Route
              path="/chat"
              element={<Chat />}
            />

            {/* Tables */}
            <Route
              path="/basic-tables"
              element={<BasicTables />}
            />
            <Route
              path="/tanstack-tables"
              element={<TanstackTables />}
            />
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route
              path="/signin"
              element={<SignIn />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
          </Route>

          {/* Fallback Route */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Router>
    </>
  );
}
