import React, {useEffect, useState} from 'react'
import {ConceptSchema} from "shared/types";
import {ScrollArea} from "renderer/components/ui/scroll-area";
import {Button} from "renderer/components/ui/button";
import {Card, CardContent, CardFooter} from "renderer/components/ui/card";

type ConceptType = 'Beginner' | 'Intermediate' | 'Advanced' | 'All' | 'Unlearned' | 'Bookmarks'
const conceptTypes: ConceptType[] = ['Beginner', 'Intermediate', 'Advanced', 'All', 'Unlearned', 'Bookmarks']

const Concepts = () => {
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
    <div className={"h-full"}>
      <ScrollArea className={"h-full w-full max-w-[900px] mx-auto"}>
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
                <div>
                  <Card key={concept.id}
                        className={"flex flex-row h-[250px] border-1 border-gray-200 rounded-3xl shadow-none"}>
                    <CardContent>
                      <h1 className={"font-bold"}>{concept.name}</h1>
                      <p className={"text-gray-500 mb-6"}>{concept.description}</p>
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
                           style={{"backgroundImage": `url(app://src/resources/assets/${concept.image})`}}>
                      </div>
                    </CardFooter>
                  </Card>
                  <div>
                    {
                      expandedConcept && expandedConcept.id === concept.id && (<p>hello</p>)
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </ScrollArea>
    </div>
  )
}
export default Concepts
