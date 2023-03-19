import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./GlobalStyles";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import SignIn from "../Sign/SignIn";
import SignUp from "../Sign/SignUp";

function App() {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <ToastContainer />

      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route
          path="/"
          element={
            <>
              <Header setShowUsers={setShowUsers} />
              <Outlet />
            </>
          }
        >
          <Route path="" element={<Main showUsers={showUsers} />} />
          <Route
            path="messages/:username"
            element={<Main showUsers={showUsers} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
