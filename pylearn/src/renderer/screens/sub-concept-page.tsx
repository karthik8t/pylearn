import React from 'react'
import {useLocation} from "react-router-dom";
import {Concept, SubConcept} from "shared/types";
import ScrollContainer from "renderer/components/common/scroll-container";
import HeroBreadcrumb from "renderer/components/common/hero-breadcrumb";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "renderer/components/ui/hover-card";
import HtmlScript from "renderer/components/common/html-script";


const SubConceptPage = () => {
  const location = useLocation();
  const state = location.state as { concept: Concept, sub_concept: SubConcept }
  const {concept, sub_concept} = state;

  const paths = [
    {link: "/dashboard", name: "Dashboard"},
    {link: "/concepts", name: "Concepts"},
    {link: "/concept", name: concept.name, state: concept}
  ]

  return (
    <ScrollContainer>
      <HeroBreadcrumb path={paths} page={sub_concept.name}/>
      <div className={"flex flex-col gap-8 my-4"}>
        <div>
          <h1 className={"heroHeading"}>{sub_concept.name}</h1>
          <HoverCard>
            <HoverCardTrigger className={""}>
              <p className={"font-bold my-2"}>Description</p>
              {concept.description && <p
                className={"heroDescription"}>{sub_concept.description.split("\n").map(line => <>{line}<br/></>)}</p>}
            </HoverCardTrigger>
            <HoverCardContent className={"w-[400px]"}>
              {concept.short_description && <p className={"heroShortDescription"}>{sub_concept.short_description}</p>}
            </HoverCardContent>
          </HoverCard>
        </div>
        <div id="concept-script">
          {sub_concept.value.map((line, idx) => (
            <HtmlScript type={line.type} value={line.value}/>
          ))}
        </div>
      </div>
    </ScrollContainer>
  )
}
export default SubConceptPage
