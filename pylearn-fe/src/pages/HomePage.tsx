import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavigationBar from "../components/common/NavigationBar.tsx";
import FooterCommon from "@/components/common/FooterCommon.tsx";

function HomeHero() {
    const navigate = useNavigate();
    const heroTitle = "Master Python the smart way - with AI";
    const heroMessage = "Learn Python concepts with visual memory hooks, track your progress in real-time, and embark on an interactive learning journey.";
    return <div
        className={`h-full w-full max-w-[1200px] mx-auto bg-home-image bg-center rounded-3xl p-10 flex flex-col items-center justify-center`}>
        <div>
            <h1 className={"text-6xl font-bold text-secondary"}>
                {heroTitle}
            </h1>
            <p className={"text-lg text-secondary"}>
                {heroMessage}
            </p>
        </div>
        <div className={"mt-10"}>
            <button className={"bg-primary text-primary-foreground rounded-md px-4 py-2"}
            onClick={() => {navigate("/login")}}>
                Get Started
            </button>
        </div>
    </div>;
}

const HomePage = () => {
    return (
        <div className={"h-screen flex flex-col justify-start"}>
            <NavigationBar login={false}/>
            <div className={"h-full max-h-[715px] my-8"}>
                <HomeHero/>
            </div>
            <div className={"mt-auto mx-auto pb-4"}>
                <FooterCommon/>
            </div>
        </div>
    )
}
export default HomePage
