import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layouts/admin";
import DashboardPage from "./pages/admin/dashboard";
import HomePage from "./pages/public/home";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import SkillsPage from "./pages/admin/skills";
import UsersPage from "./pages/admin/users";
import ExperiencesPage from "./pages/admin/experiences";
import EducationPage from "./pages/admin/education";
import PortfoliosPage from "./pages/admin/portfolios";
import { useSelector } from "react-redux";
import { authName } from "./redux/slice/auth";
import FrontLayout from "./components/layouts/front/layout";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state[authName]);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            path="/"
            element={
              isAuthenticated && user?.role === "admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="education" element={<EducationPage />} />
            <Route path="portfolios" element={<PortfoliosPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
