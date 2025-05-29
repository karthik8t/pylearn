import React, {useEffect, useState} from 'react'
import {ConceptSchema} from "shared/types";
import {ScrollArea, ScrollBar} from "renderer/components/ui/scroll-area";
import {Button} from "renderer/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "renderer/components/ui/card";
import {ArrowUpAZ} from "lucide-react";
import {useNavigate} from "react-router-dom";

type ConceptType = 'Beginner' | 'Intermediate' | 'Advanced' | 'All' | 'Unlearned' | 'Bookmarks'
const conceptTypes: ConceptType[] = ['Beginner', 'Intermediate', 'Advanced', 'All', 'Unlearned', 'Bookmarks']

const Concepts = () => {
  const navigate = useNavigate();
  const [concepts, setConcepts] = useState<ConceptSchema[]>([])
  const [conceptType, setConceptType] = useState<ConceptType>('All')
  const [expandedConcept, setExpandedConcept] = useState<ConceptSchema | undefined>(undefined)

  useEffect(() => {
    const invokeConceptsChannel = async () => {
      const concepts: ConceptSchema[] = await window.App.getConcepts()
      return concepts
    }
    invokeConceptsChannel()
      .then(concepts => setConcepts(concepts))
  }, []);

  return (
    <div className={"h-full max-h-full p-4"}>
      <ScrollArea className={"h-full max-h-full w-full max-w-[900px] mx-auto"}>
        <div className={"flex flex-col gap-8"}>
          <h1 className={"text-3xl font-bold"}>Explore Python Concepts</h1>
          <div className={"flex gap-4"}>
            {
              conceptTypes.map(type => {
                return (
                  <Button
                    key={type}
                    variant={type === conceptType ? "default" : "secondary"}
                    className={`rounded-3xl`}
                    onClick={() => setConceptType(type)}
                  >
                    {type}
                  </Button>
                )
              })
            }
          </div>
          {
            concepts.map(concept => {
              return (
                <div id={"concept-container"}>
                  <Card key={concept.id}
                        onDoubleClick={() => navigate("/concept")}
                        className={"flex flex-row h-[250px] border-1 border-gray-200 rounded-3xl shadow-none"}>
                    <CardContent>
                      <h1 className={"font-bold"}>{concept.name}</h1>
                      <p className={"text-gray-500 mb-6"}>{concept.shortDescription}</p>
                      {
                        (expandedConcept && expandedConcept.id === concept.id) ? (
                          <Button onClick={() => setExpandedConcept(undefined)}>Collapse</Button>
                        ) : (
                          <Button onClick={() => setExpandedConcept(concept)}>Expand</Button>
                        )
                      }
                    </CardContent>
                    <CardFooter className={"ml-auto"}>
                      <div className={`w-[300px] h-full bg-center bg-cover bg-no-repeat rounded-3xl`}
                           style={{"backgroundImage": `url(app://src/resources/assets/concepts/${'default.png' ?? concept.tags[0]})`}}>
                      </div>
                    </CardFooter>
                  </Card>
                  <div>
                    {
                      expandedConcept && expandedConcept.id === concept.id && (
                        <ScrollArea className="w-[900px]">
                          <div className="flex w-max space-x-4 py-4">
                            {concept.sub_concepts.map((sub_concept) => (
                              <Card key={sub_concept.name} className={"w-[350px] h-[155px] gap-0"}>
                                <CardHeader><ArrowUpAZ /></CardHeader>
                                <CardContent className={"overflow-ellipsis overflow-hidden"}>
                                  <h1 className={"font-bold"}>{sub_concept.name}</h1>
                                  <p className={"text-gray-500 overflow-ellipsis"}>{sub_concept.shortDescription}</p>
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
        <ScrollBar orientation={"vertical"}/>
      </ScrollArea>
    </div>
  )
}
export default Concepts
