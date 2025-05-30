import React from 'react'
import {Link, useLocation} from "react-router-dom";
import {ConceptSchema} from "shared/types";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "renderer/components/ui/hover-card";
import {Button} from "renderer/components/ui/button";
import {Input} from "renderer/components/ui/input";
import ScrollContainer from "renderer/components/common/scroll-container";
import HeroBreadcrumb from "renderer/components/common/hero-breadcrumb";
import Tags from "renderer/components/common/tags";


const paths = [
  {link: "/dashboard", name: "Dashboard"},
  {link: "/concepts", name: "Concepts"},
]

const Concept = () => {
  const location = useLocation();
  const concept: ConceptSchema = location.state as ConceptSchema;

  return (
    <ScrollContainer width={"900px"}>
      <HeroBreadcrumb path={paths} page={concept.name}/>
      <div className={"flex flex-col gap-8 my-4"}>
        <div>
          <h1 className={"heroHeading"}>{concept.name}</h1>
          <HoverCard>
            <HoverCardTrigger>
              <p className={"font-bold my-2"}>Description</p>
              {concept.description && <p className={"heroDescription"}>{concept.description}</p>}
            </HoverCardTrigger>
            <HoverCardContent className={"w-[400px]"}>
              {concept.shortDescription && <p className={"heroShortDescription"}>{concept.shortDescription}</p>}
            </HoverCardContent>
          </HoverCard>
          <div>
            <p className={"font-bold my-2"}>Tags</p>
            <Tags tags={concept.tags}/>
          </div>
        </div>
        <div>
          <h2 className={"heroSubHeading"}>Sub-concepts</h2>
          <div className={"grid grid-cols-4 gap-4"}>
            {concept.sub_concepts.map((sub_concept) => (
              <div key={sub_concept.name} className={"flex flex-col"}>
                <Link to={`/sub-concept`} state={{concept: concept, sub_concept: sub_concept}}>
                  <div className={"h-[175px] bg-center bg-cover bg-no-repeat rounded-3xl"}
                       style={{"backgroundImage": `url(app://src/resources/assets/concepts/${"default" ?? sub_concept.tags[0]}.png)`}}>
                  </div>
                  <h3 className={"font-bold my-2"}>{sub_concept.name}</h3>
                  <p>{sub_concept.shortDescription}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className={"mnemonicContainer"}>
          <h2 className={"heroSubHeading"}>AI Mnemonic</h2>
          <div className={"flex flex-row gap-4 flex-wrap"}>
            {concept.tags.map(tag => (
              <Button key={tag} variant={"secondary"}>
                {tag}
              </Button>
            ))}
          </div>
          <div className={"flex flex-row gap-4 m-1 my-4"}>
            <Input className={"w-[300px] rounded-[10px] "}></Input>
            <Button variant={"outline"} className={""}>Add</Button>
          </div>
          <Button variant={"default"} className={""}>Generate Mnemonic and Image</Button>
        </div>
      </div>
    </ScrollContainer>
  )
}
export default Concept
