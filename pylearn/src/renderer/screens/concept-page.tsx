import React from 'react'
import {Link, useLocation} from "react-router-dom";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "renderer/components/ui/hover-card";
import ScrollContainer from "renderer/components/common/scroll-container";
import HeroBreadcrumb from "renderer/components/common/hero-breadcrumb";
import Tags from "renderer/components/common/tags";
import {Concept} from "shared/types";
import HtmlScript from "renderer/components/common/html-script";


const paths = [
  {link: "/dashboard", name: "Dashboard", state: {}},
  {link: "/concepts", name: "Concepts", state: {}},
]

const ConceptPage = () => {
  const location = useLocation();
  const concept: Concept = location.state as Concept;

  return (
    <ScrollContainer>
      <HeroBreadcrumb path={paths} page={concept.name}/>
      <div className={"flex flex-col gap-8 my-4"}>
        <div id={"concept-desc"}>
          <h1 className={"heroHeading"}>{concept.name}</h1>
          <HoverCard>
            <HoverCardTrigger>
              <p className={"font-bold my-2"}>Description</p>
              {concept.description && <p className={"heroDescription"}>{concept.description.split("\n").map(line => <>{line}<br /></>)}</p>}
            </HoverCardTrigger>
            <HoverCardContent className={"w-[400px]"}>
              {concept.short_description && <p className={"heroShortDescription"}>{concept.short_description}</p>}
            </HoverCardContent>
          </HoverCard>
          {
            concept.tags ?? <div id={"concept-tags"}>
              <p className={"font-bold my-2"}>Tags</p>
              <Tags tags={concept.tags ?? []}/>
            </div>
          }
        </div>
        <div id="concept-script">
          {concept.value.map((line, idx) => (
            <HtmlScript type={line.type} value={line.value}/>
          ))}
        </div>
        {
          concept.sub_concepts.length != 0 && <div id={"concept-sub-concept"}>
            <h2 className={"heroSubHeading"}>Sub-concepts</h2>
            <div className={"grid grid-cols-4 gap-4"}>
              {concept.sub_concepts.map((sub_concept) => (
                <div key={sub_concept.name} className={"flex flex-col"}>
                  <Link to={`/sub-concept`} state={{concept: concept, sub_concept: sub_concept}}>
                    <div className={"h-[175px] bg-center bg-cover bg-no-repeat rounded-3xl"}
                         style={{"backgroundImage": `url(app://src/resources/assets/concepts/${"default" ?? sub_concept.name}.png)`}}>
                    </div>
                    <h3 className={"font-bold my-2"}>{sub_concept.name}</h3>
                    <p>{sub_concept.short_description}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </ScrollContainer>
  )
}
export default ConceptPage
