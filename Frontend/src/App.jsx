import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import PrivateRoute from "./Components/PrivateRoute";
import SignUp from "./Pages/SignUp";
import NewsignIn from "./Pages/NewsignIn";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/new" element={<NewsignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
