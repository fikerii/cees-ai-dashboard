import { Route, Routes } from "react-router";
import AppLayout from "../layout/AppLayout";
import SignIn from "../pages/AuthPages/SignIn";
import Blank from "../pages/Blank";
import Ecommerce from "../pages/Dashboard/ECommerce";
import NotFound from "../pages/OtherPage/NotFound";
import BasicTables from "../pages/Tables/BasicTables";
import UserProfiles from "../pages/UserProfiles";
import Chat from "../pages/Chat/Chat";
import TanstackTables from "../pages/Tables/TanstackTables";
import Library from "../pages/Library";
import TableProducts from "../pages/Tables/TableProducts";
import { ProtectedLogin } from "./ProtectedLogin";
import { ProtectedRoutes } from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<ProtectedRoutes element={<AppLayout />} />}>
          {/* <Route element={<AppLayout />}> */}
          <Route
            index
            path="/dashboard"
            element={<Ecommerce />}
          />
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
          <Route
            path="/basic-tables"
            element={<BasicTables />}
          />
          <Route
            path="/tanstack-tables"
            element={<TanstackTables />}
          />
          <Route
            path="/table-products"
            element={<TableProducts />}
          />
          <Route
            path="/library"
            element={<Library />}
          />
        </Route>

        {/* Auth Layout */}
        <Route element={<ProtectedLogin />}>
          {/* <Route element={<AuthLayout />}> */}
          <Route
            path="/login"
            element={<SignIn />}
          />
          {/* <Route
            path="/signup"
            element={<SignUp />}
          /> */}
        </Route>

        {/* Fallback Route */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}
