import React, {useEffect} from 'react'
import ScrollContainer from "renderer/components/common/scroll-container"
import ConceptMasteryChart from "renderer/components/concept-mastery-chart";
import ConceptTimeline from "renderer/components/concept-timeline";
import RecommendedConcept from "renderer/components/recommended-concept";
import {Concept} from "shared/types";
import Bookmarks from "renderer/components/bookmarks";


const Dashboard = () => {
  const [dashboardData, setDashboardData] = React.useState<{
    'conceptsOverTime': { date: string, noOfConcepts: number }[],
    'conceptsMastery': { beginner: number, intermediate: number, advanced: number },
    'recommendedConcept': Concept | undefined,
    'bookmarkedConcepts': Concept[]
  } | undefined>(undefined);

  useEffect(() => {
    const getDashboardData = async () => {
      const data = await window.App.getDashboardData();
      console.log(data)
      return data;
    }
    getDashboardData().then(d => setDashboardData(d))
  }, []);
  return (
    <ScrollContainer>
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Welcome to your dashboard! Here you can find an overview of your data.
        </p>
      </div>
      <div className={"grid grid-cols-12 gap-4"}>
        <ConceptTimeline timeline={dashboardData?.conceptsOverTime ?? []}/>
        <RecommendedConcept concept={dashboardData?.recommendedConcept}/>
        <ConceptMasteryChart
          beginner={dashboardData?.conceptsMastery?.beginner ?? 0}
          intermediate={dashboardData?.conceptsMastery?.intermediate ?? 0}
          advanced={dashboardData?.conceptsMastery?.advanced ?? 0}
        />
        <Bookmarks concepts={dashboardData?.bookmarkedConcepts ?? []}/>
      </div>

    </ScrollContainer>
  )
}
export default Dashboard
