import {Route} from 'react-router-dom'

import {Router} from 'lib/electron-router-dom'
import Home from "renderer/screens/home";
import Login from "renderer/screens/login";
import Signup from "renderer/screens/signup";

export function AppRoutes() {
  return <Router
    main={
      <Route path={"/"}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Route>
    }
  />
}
