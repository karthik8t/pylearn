import React, {useEffect, useState} from 'react'
import {Concept, SubConcept} from "shared/types";
import {ScrollArea, ScrollBar} from "renderer/components/ui/scroll-area";
import {Button} from "renderer/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "renderer/components/ui/card";
import {ArrowUpAZ} from "lucide-react";
import {useNavigate} from "react-router-dom";
import ScrollContainer from "renderer/components/common/scroll-container";
import HeroBreadcrumb from "renderer/components/common/hero-breadcrumb";

type ConceptType = 'Beginner' | 'Intermediate' | 'Advanced'
const conceptTypes: ConceptType[] = ['Beginner', 'Intermediate', 'Advanced']

const Concepts = () => {
  const navigate = useNavigate();
  const [concepts, setConcepts] = useState<Concept[]>([])
  const [conceptType, setConceptType] = useState<ConceptType | undefined>(undefined)
  const [expandedConcept, setExpandedConcept] = useState<Concept | undefined>(undefined)

  useEffect(() => {
    const invokeConceptInitChannel = async () => {
      const concepts: Concept[] = await window.App.initData()
      return concepts
    }
    invokeConceptInitChannel()
      .then(concepts => {
        setConcepts(concepts)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <ScrollContainer>
      <HeroBreadcrumb path={[{link: "/dashboard", name: "Dashboard", state: {}}]} page={"Concepts"}/>
      <div className={"flex flex-col gap-8 my-4"}>
        <h1 className={"text-3xl font-bold"}>Explore Python Concepts</h1>
        <div className={"flex gap-4"}>
          {
            conceptTypes.map(type => {
              return (
                <Button
                  key={type}
                  variant={type === conceptType ? "default" : "secondary"}
                  className={`rounded-3xl`}
                  onClick={() => setConceptType(prevState => prevState === type ? undefined : type)}
                >
                  {type}
                </Button>
              )
            })
          }
        </div>
        {
          concepts
            .filter(c => conceptType != undefined ? c.difficulty.toLowerCase() === conceptType.toLowerCase() : true)
            .map(concept => {
            return (
              <div id={"concept-container"}>
                <Card key={concept.id}
                      onDoubleClick={() => navigate("/concept", {state: concept})}
                      className={"flex flex-row h-[250px] border-1 border-gray-200 rounded-3xl shadow-none"}>
                  <CardContent>
                    <h1 className={"font-bold"}>{concept.name}</h1>
                    <p className={"text-gray-500 mb-6"}>{concept.short_description}</p>
                    {
                      (expandedConcept && expandedConcept.id === concept.id) ? (
                        <Button variant={"outline"} onClick={() => setExpandedConcept(undefined)}>Collapse</Button>
                      ) : (
                        <Button variant={"outline"} onClick={() => setExpandedConcept(concept)} disabled={concept.sub_concepts.length == 0}>Expand</Button>
                      )
                    }
                  </CardContent>
                  <CardFooter className={"ml-auto"}>
                    <div className={`w-[300px] h-full bg-center bg-cover bg-no-repeat rounded-3xl`}
                         style={{"backgroundImage": `url(app://src/resources/assets/concepts/${'default.png' ?? concept.name})`}}>
                    </div>
                  </CardFooter>
                </Card>
                <div>
                  {
                    expandedConcept && expandedConcept.id === concept.id && (
                      <ScrollArea className="w-[900px]">
                        <div className="flex w-max space-x-4 py-4">
                          {concept.sub_concepts.map((sub_concept: SubConcept) => (
                            <Card key={sub_concept.name} className={"w-[350px] h-[155px] gap-0"}>
                              <CardHeader><ArrowUpAZ/></CardHeader>
                              <CardContent className={"overflow-ellipsis overflow-hidden"}>
                                <h1 className={"font-bold"}>{sub_concept.name}</h1>
                                <p className={"text-gray-500 overflow-ellipsis"}>{sub_concept.short_description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal"/>
                      </ScrollArea>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </ScrollContainer>
  )
}
export default Concepts
