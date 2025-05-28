import React from 'react'
import pythonLogo from 'resources/public/python-logo.svg'
import avatarLogo from 'resources/public/avatar-logo.svg'
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {Button} from "renderer/components/ui/button";


const Navigation = () => {
    const page = useLocation().pathname;

    return (
      <main>
        <nav className={"w-full h-[65px] flex items-center justify-between p-4 px-10 border-b-1"}>
            <div className={"flex items-center justify-start gap-4"}>
                <img src={pythonLogo} height={16} width={16} alt="Python logo" /> <span>pyLearn</span>
            </div>
            <div className={"flex items-center gap-4"}>
                <span><NavLink to={"/home"}>Home</NavLink></span>
                <span><NavLink to={"/dashboard"}>Dashboard</NavLink></span>
                <span><NavLink to={"/concepts"}>Concepts</NavLink></span>
                {page === "/signup" ? (
                    <NavLink to={"/login"} >
                        <Button variant={"secondary"}>Login</Button>
                    </NavLink>
                ) : page === "/login" ? (
                    <NavLink to={"/signup"}>
                        <Button variant={"secondary"}>Sign up</Button>
                    </NavLink>
                ) : (
                    <NavLink to={"/profile"}>
                        <div className={"p-2 rounded-full bg-gray-200"}>
                            <img src={avatarLogo} height={24} width={24} className={"aspect-square"} alt="Avatar logo"/>
                        </div>
                    </NavLink>
                )}
            </div>
        </nav>
        <section>
          <Outlet />
        </section>
      </main>
    )
}
export default Navigation
