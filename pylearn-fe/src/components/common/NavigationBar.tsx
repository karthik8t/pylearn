import React from 'react'
import pythonLogo from '../../assets/python-logo.svg'
import avatarLogo from '../../assets/avatar-logo.svg'
import {Link, useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";


const NavigationBar = () => {
    const page = useLocation().pathname;

    return (
        <div className={"w-full h-[65px] flex items-center justify-between p-4 px-10 border-b-1"}>
            <div className={"flex items-center justify-start gap-4"}>
                <img src={pythonLogo} height={16} width={16} alt="Python logo" /> <span>pyLearn</span>
            </div>
            <div className={"flex items-center gap-4"}>
                <span><Link to={"/home"}>Home</Link></span>
                <span><Link to={"/dashboard"}>Dashboard</Link></span>
                <span><Link to={"/concepts"}>Concepts</Link></span>
                {page === "/signup" ? (
                    <Link to={"/login"} >
                        <Button variant={"secondary"}>Login</Button>
                    </Link>
                ) : page === "/login" ? (
                    <Link to={"/signup"}>
                        <Button variant={"secondary"}>Sign up</Button>
                    </Link>
                ) : (
                    <Link to={"/profile"}>
                        <div className={"p-2 rounded-full bg-gray-200"}>
                            <img src={avatarLogo} height={24} width={24} className={"aspect-square"} alt="Avatar logo"/>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}
export default NavigationBar
