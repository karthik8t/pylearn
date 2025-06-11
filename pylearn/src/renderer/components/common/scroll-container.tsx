import React, {ReactNode} from 'react'
import {ScrollArea, ScrollBar} from "renderer/components/ui/scroll-area";

const ScrollContainer = ({children} : {children: ReactNode}) => {
  return (
    <div className={"h-full max-h-full w-full py-4 mx-auto"}>
      <ScrollArea className={`h-full max-h-full`}>
        <div className={`w-full max-w-[900px] mx-auto pb-8`}>
          {children}
        </div>
        <ScrollBar orientation={"vertical"}/>
      </ScrollArea>
    </div>
  )
}
export default ScrollContainer
