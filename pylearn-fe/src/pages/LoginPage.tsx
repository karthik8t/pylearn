import React from 'react'
import NavigationBar from "../components/common/NavigationBar.tsx";

const LoginPage = () => {
    return (
        <div className={"h-screen"}>
            <NavigationBar login={true}/>
            <div className={"h-full max-h-8/12"}>
                <div className={"h-full w-full max-w-4/5 mx-auto"}>
                    Login Page
                </div>
            </div>
        </div>
    )
}
export default LoginPage
