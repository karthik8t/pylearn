import React from 'react'
import {useLocation} from "react-router-dom";
import {ConceptSchema, SubConceptSchema} from "shared/types";
import ScrollContainer from "renderer/components/common/scroll-container";
import HeroBreadcrumb from "renderer/components/common/hero-breadcrumb";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "renderer/components/ui/hover-card";
import Tags from "renderer/components/common/tags";



const SubConcept = () => {
  const location = useLocation();
  const state = location.state as {concept: ConceptSchema, sub_concept: SubConceptSchema}
  const {concept, sub_concept} = state;

  const paths = [
    {link: "/dashboard", name: "Dashboard"},
    {link: "/concepts", name: "Concepts"},
    {link: "/concept", name: concept.name, state: concept}
  ]

  return (
    <ScrollContainer width={"900px"}>
      <HeroBreadcrumb path={paths} page={sub_concept.name}/>
      <div className={"flex flex-col gap-8 my-4"}>
      <div>
        <h1 className={"heroHeading"}>{sub_concept.name}</h1>
        <HoverCard>
          <HoverCardTrigger className={""}>
            <p className={"font-bold my-2"}>Description</p>
            {concept.description && <p className={"heroDescription"}>{sub_concept.description}</p>}
          </HoverCardTrigger>
          <HoverCardContent className={"w-[400px]"}>
            {concept.shortDescription && <p className={"heroShortDescription"}>{sub_concept.shortDescription}</p>}
          </HoverCardContent>
        </HoverCard>
        <div>
          <p className={"font-bold my-2"}>Tags</p>
          <Tags tags={concept.tags}/>
        </div>
      </div>
      <div>
        <h2 className={"heroSubHeading"}>Syntax Structure</h2>
        <div className={"w-[500px] h-[250px] border text-center"}>
          {sub_concept.shortDescription}
        </div>
      </div>
      <div>
        <h2 className="heroSubHeading">Usage Examples</h2>
        <div className={"grid grid-cols-2 gap-4"}>
          {
            sub_concept.examples.map((example) => (
              <div>{example.split("\n").map((line, idx) => <p key={idx}>{line}</p>)}</div>
            ))
          }
        </div>
      </div>
      </div>
    </ScrollContainer>
  )
}
export default SubConcept
