import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "renderer/components/ui/card";
import {Concept} from "shared/types";
import {ScrollArea} from "renderer/components/ui/scroll-area";
import {Button} from "renderer/components/ui/button";
import {Link} from "react-router-dom";

const Bookmarks = (props: { concepts: Concept[] }) => {
  const {concepts} = props;
  return (
    <Card className={"col-span-7"}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Bookmarks</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Your saved bookmarks will appear
          here.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className={" h-[400px]"}>
          <div className={"flex flex-col gap-4"}>
            {concepts.length > 0 ? (
              concepts.map((concept, index) => (
                <div key={index}
                     className={"flex flex-row justify-end gap-4 items-center p-4 pl-8 bg-gray-100 rounded-lg"}>
                  <h3 className={"text-md font-semibold mr-auto"}>{concept.name}</h3>
                  <p className={"text-sm text-muted-foreground ml-2"}>{concept.difficulty}</p>
                  <Link to={`/concepts#${concept.id}`}>
                    <Button>View Concept</Button>
                  </Link>
                </div>
              ))
            ) : (
              <p className={"text-muted-foreground"}>No bookmarks available. Start bookmarking concepts!</p>
            )}
          </div>

        </ScrollArea>
      </CardContent>
    </Card>
  )
}
export default Bookmarks
