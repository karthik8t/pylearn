import {Route} from 'react-router-dom'

import {Router} from 'lib/electron-router-dom'
import Home from "renderer/screens/home";
import Login from "renderer/screens/login";
import Signup from "renderer/screens/signup";
import Navigation from "renderer/components/common/navigation";
import Dashboard from "renderer/screens/dashboard";
import Concepts from "renderer/screens/concepts";
import Concept from "renderer/screens/Concept";

export function AppRoutes() {
  return <Router
    main={
      <Route path={"/"} element={<Navigation/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/concepts" element={<Concepts/>}/>
        <Route path="/concept" element={<Concept/>}/>
      </Route>
    }
  />
}
