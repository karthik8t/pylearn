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

  useEffect(() => {
    const invokeConceptsChannel = async () => {
      const concepts: ConceptSchema[] = await window.App.getConcepts()
      return concepts
    }
    invokeConceptsChannel()
      .then(concepts => setConcepts(concepts))
  }, []);

  return (
    <div className={"h-screen"}>
      <ScrollArea className={"h-full w-full max-w-[700px] p-4 mx-auto"}>
        <div className={"flex flex-col gap-4"}>
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
                <Card key={concept.id} className={"flex flex-row"}>
                  <CardContent>
                    <h1>{concept.name}</h1>
                    <p>{concept.description}</p>
                  </CardContent>
                  <CardFooter className={"ml-auto"}>
                    <img src={`app://src/resources/assets/${concept.image}`} alt={concept.name} />
                  </CardFooter>
                </Card>
              )
            })
          }
        </div>
      </ScrollArea>
    </div>
  )
}
export default Concepts
