import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import FooterPage from "../components/Footer/FooterPage";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <FooterPage />
    </>
  );
};

export default MainLayout;
