import React, {useEffect, useState} from 'react'
import {Concept, Progress, SubConcept} from "shared/types";
import {ScrollArea, ScrollBar} from "renderer/components/ui/scroll-area";
import {Button} from "renderer/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "renderer/components/ui/card";
import {ArrowUpAZ} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import ScrollContainer from "renderer/components/common/scroll-container";
import HeroBreadcrumb from "renderer/components/common/hero-breadcrumb";

type ConceptType = 'Beginner' | 'Intermediate' | 'Advanced'
const conceptTypes: ConceptType[] = ['Beginner', 'Intermediate', 'Advanced']

const Concepts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [concepts, setConcepts] = useState<Concept[]>([])
  const [conceptType, setConceptType] = useState<ConceptType | undefined>(undefined)
  const [expandedConcept, setExpandedConcept] = useState<Concept | undefined>(undefined)
  const [progress, setProgress] = useState<Progress[]>([])
  const [progressMap, setProgressMap] = useState<Map<string, Progress>>(new Map())

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (!hash) return;

    const scrollToElement = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({behavior: "smooth"});
      }
    };

    setTimeout(scrollToElement, 500); // Initial attempt after 1 second
  }, [location]);

  useEffect(() => {
    const invokeConceptInitChannel = async () => {
      const concepts: Concept[] = await window.App.initData()
      return concepts
    }
    const getUserProgress = async () => {
      const userProgress: Progress[] = await window.App.getUserProgress()
      return userProgress
    }
    invokeConceptInitChannel()
      .then(concepts => {
        setConcepts(concepts)
      })
      .catch(err => {
        console.log(err)
      })
    getUserProgress().then(progress => {
      setProgress(progress)
      const progressMap = new Map<string, Progress>()
      progress.forEach(p => {
        progressMap.set(p.conceptId, p)
      })
      setProgressMap(progressMap)
    })
  }, []);

  useEffect(() => {
    window.App.updateUserProgress(progressMap.values().toArray())
  }, [progressMap]);

  const markAsRead = (concept: Concept) => {
    const existingProgress = progress.find(p => p.conceptId === concept.id);
    if (existingProgress) {
      existingProgress.read = true;
      existingProgress.read_on = new Date();
      setProgress(prevState => prevState.map(p => p.conceptId === concept.id ? existingProgress : p));
      setProgressMap(prevState => new Map(prevState).set(concept.id, existingProgress));
    } else {
      const newProgress: Progress = {
        conceptId: concept.id,
        read: true,
        read_on: new Date(),
        bookmarked: false,
      };
      setProgress(prevState => [...prevState, newProgress]);
      setProgressMap(prevState => new Map(prevState).set(concept.id, newProgress));
    }
  }

  const markAsUnread = (concept: Concept) => {
    const existingProgress = progress.find(p => p.conceptId === concept.id);
    if (existingProgress) {
      existingProgress.read = false;
      existingProgress.read_on = undefined;
      setProgress(prevState => prevState.map(p => p.conceptId === concept.id ? existingProgress : p));
      setProgressMap(prevState => new Map(prevState).set(concept.id, existingProgress));
    }
  }

  const bookmarkConcept = (concept: Concept) => {
    const existingProgress = progress.find(p => p.conceptId === concept.id);
    if (existingProgress) {
      existingProgress.bookmarked = !existingProgress.bookmarked;
      setProgress(prevState => prevState.map(p => p.conceptId === concept.id ? existingProgress : p));
      setProgressMap(prevState => new Map(prevState).set(concept.id, existingProgress));
    } else {
      const newProgress: Progress = {
        conceptId: concept.id,
        read: false,
        read_on: undefined,
        bookmarked: true,
      };
      setProgress(prevState => [...prevState, newProgress]);
      setProgressMap(prevState => new Map(prevState).set(concept.id, newProgress));
    }
  }

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
                <div key={concept.id} id={concept.id}>
                  <Card key={concept.id}
                        onDoubleClick={() => navigate("/concept", {state: concept})}
                        className={"flex flex-row h-[250px] border-1 border-gray-200 rounded-3xl shadow-none"}>
                    <CardContent className={"flex flex-col gap-4"}>
                      <div>
                        <h1 className={"font-bold"}>{concept.name}</h1>
                        <p className={"text-gray-500 line-clamp-3"}>{concept.short_description}</p>
                      </div>
                      <div className={"mt-auto flex flex-col gap-4"}>
                        <Button
                          variant={"outline"}
                          disabled={concept.sub_concepts.length === 0}
                          onClick={() => setExpandedConcept(prevState => prevState?.id === concept.id ? undefined : concept)}>
                          {expandedConcept?.id === concept.id ? "Collapse" : "Expand"}
                        </Button>
                        <div className={"flex gap-4"}>
                          {
                            progressMap.has(concept.id) && progressMap.get(concept.id)?.read ? (
                              <Button variant={"default"} className={"hover:bg-destructive hover:text-white"}
                                      onClick={() => markAsUnread(concept)}>Mark as Unread</Button>
                            ) : (
                              <Button variant={"default"} onClick={() => markAsRead(concept)}>Mark as Read</Button>
                            )
                          }
                          <Button variant={"ghost"}
                                  onClick={() => bookmarkConcept(concept)}>{progressMap.has(concept.id) && progressMap.get(concept.id)?.bookmarked ? "Remove Bookmark" : "Bookmark"}</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className={"ml-auto"}>
                      <div className={`w-[300px] h-full bg-center bg-cover bg-no-repeat rounded-3xl`}
                           style={{"backgroundImage": `url(app://src/resources/public/concepts/${concept.name.replaceAll(' ', '_') ?? 'default'}.png)`}}>
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
