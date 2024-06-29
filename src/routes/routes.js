import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import Error from "../pages/shared/Error";
import MenuPage from "../pages/MenuPage";
import OffersPage from "../pages/OffersPage";
import BookNowPage from "../pages/BookNowPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Menu from "../pages/dashboard/Menu";
import AddMenu from "../pages/dashboard/AddMenu";
import Category from "../pages/dashboard/Category";
import AddCategory from "../pages/dashboard/AddCategory";
import UpdateCategory from "../pages/dashboard/UpdateCategory";
import UpdateMenu from "../pages/dashboard/UpdateMenu";
import AllReservation from "../pages/dashboard/AllReservation";
import UpcomingReservation from "../pages/dashboard/UpcomingReservation";
import Cart from "../pages/Cart";
import Success from "../pages/payment/Success";
import Cancel from "../pages/payment/Cancel";
import Fail from "../pages/payment/Fail";
import ProfileLayout from "../layouts/ProfileLayout";
import History from "../pages/profile/History";
import ChangePassword from "../pages/profile/ChangePassword";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error message="Error" />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "offers",
        element: <OffersPage />,
      },
      {
        path: "book-now",
        element: <BookNowPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment/success",
        element: <Success />,
      },
      {
        path: "payment/cancel",
        element: <Cancel />,
      },
      {
        path: "payment/fail",
        element: <Fail />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="menu" />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "menu/:id",
        element: <UpdateMenu />,
      },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "categories/:id",
        element: <UpdateCategory />,
      },
      {
        path: "all-reservation",
        element: <AllReservation />,
      },
      {
        path: "upcoming-reservation",
        element: <UpcomingReservation />,
      },
    ],
  },
  {
    path: "profile",
    element: <ProfileLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="history" />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);
