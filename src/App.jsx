import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CenteredLayout from "./layouts/CenteredLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import MyAccountPage from "./views/MyAccount";
import CreateAccountPage from "./views/CreateAccount";
import GroceryList from "./views/GroceryList";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/my-account" element={<MyAccountPage />} />
        </Route>

        <Route element={<CenteredLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Route>
      </Routes>
    </div>
  );
}
