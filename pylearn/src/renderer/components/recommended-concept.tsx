import React, {Fragment} from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "renderer/components/ui/card";
import {Concept} from "shared/types";
import {Button} from "renderer/components/ui/button";

const RecommendedConcept = (props: { concept: Concept | undefined }) => {
  const {concept} = props;
  return (
    <Card className={"col-span-4 flex flex-col"}>
      <CardHeader>
        <CardTitle>Recommended Concept</CardTitle>
        <CardDescription>concept recommended for you to explore.</CardDescription>
      </CardHeader>
      <CardContent className={"flex-1"}>

        <div className={"h-full flex flex-col gap-2 bg-gray-100 p-4 rounded-lg"}>
          {
            concept ? (
              <Fragment>
                <p className={"text-muted-foreground"}>{concept?.name}</p>
                <p className={"text-sm text-muted-foreground"}>{concept?.short_description}</p>
              </Fragment>
            ) : (
              <Fragment>
                <p className={"text-muted-foreground"}>No concept recommended at the moment.</p>
                <p className={"text-sm text-muted-foreground"}>Please check back later for recommendations.</p>
              </Fragment>
            )
          }
        </div>
      </CardContent>
      <CardFooter className={"mt-auto"}>
        <Button className={"btn btn-primary w-full"} onClick={() => console.log("Explore Concept")}>
          Explore Concept
        </Button>
      </CardFooter>
    </Card>
  )
}
export default RecommendedConcept

