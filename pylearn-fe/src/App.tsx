import './App.css'
import {Route, Routes} from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar.tsx";
import React from "react";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {

  return (
      <div>
          <Routes>
              <Route path={"/login"} element={<LoginPage/>}/>
              <Route path={"/home"} element={<HomePage/>}/>
              <Route path={"/dashboard"} element={<NavigationBar/>}/>
          </Routes>
      </div>
  )
}

export default App
