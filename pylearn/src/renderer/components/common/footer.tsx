import React from 'react'
import copyRight from "resources/public/copyright.svg";

const Footer = () => {
    return (
        <div className={"h-12 w-[400px] flex flex-col items-center justify-between"}>
            <div className={"flex items-center justify-center gap-4"}>
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
                <span>Contact Us</span>
            </div>
            <p className={"flex items-center justify-center"}>
                <img src={copyRight} width={12} height={12} className={"aspect-square mr-2"} alt={"copyright"}/>
                <span>2025 PyLearn.AI. All rights reserved</span>
            </p>
        </div>
    );
}
export default Footer
