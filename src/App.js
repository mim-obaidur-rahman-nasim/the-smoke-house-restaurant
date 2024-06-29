import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
