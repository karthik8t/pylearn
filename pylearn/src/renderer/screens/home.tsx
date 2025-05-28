import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navigation from "renderer/components/common/navigation";
import HeroContainer from "renderer/components/common/hero-container";
import Footer from "renderer/components/common/footer";

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

const Home = () => {
    return (
        <div className={"h-full flex flex-col justify-start"}>
            {/*<Navigation/>*/}
            <HeroContainer>
                <HomeHero/>
            </HeroContainer>
            <div className={"mt-auto mx-auto pb-4"}>
                <Footer/>
            </div>
        </div>
    )
}
export default Home
