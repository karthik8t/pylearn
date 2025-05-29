import React, {type ReactNode} from 'react'

const HeroContainer = ({children} : {children: ReactNode}) => {
    return (
        <div className={"h-full max-h-[715px] flex flex-col items-center justify-center"}>
            {children}
        </div>
    )
}
export default HeroContainer
