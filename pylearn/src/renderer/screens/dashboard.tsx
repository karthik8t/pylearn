import React, {useEffect} from 'react'
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"
import ScrollContainer from "renderer/components/common/scroll-container"

import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "renderer/components/ui/chart"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "renderer/components/ui/card";


const chartData = [
  {date: "January", noOfConcepts: 186},
  {date: "February", noOfConcepts: 305},
  {date: "March", noOfConcepts: 237},
  {date: "April", noOfConcepts: 73},
  {date: "May", noOfConcepts: 209},
  {date: "June", noOfConcepts: 214},
  {date: "June", noOfConcepts: 214},
]

const chartConfig = {
  noOfConcepts: {
    label: "Number of Concepts",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const Dashboard = () => {
  const [dashboardData, setDashboardData] = React.useState<{
    'conceptsOverTime': { date: string, noOfConcepts: number }[],
    'conceptsMastery': { difficulty: string, completionPercentage: number }[]
  } | undefined>(undefined);

  useEffect(() => {
    const getDashboardData = async () => {
      const data = await window.App.getDashboardData();
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
      <div>
        <Card className={"w-5/7"}>
          <CardHeader>
            <CardTitle>Your Learning Journey</CardTitle>
            <CardDescription>last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={dashboardData?.conceptsOverTime}>
                <CartesianGrid vertical={false}/>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel/>}
                />
                <Bar dataKey="noOfConcepts" fill="var(--color-noOfConcepts)" radius={8}/>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Concept Mastery Breakdown</CardTitle>
            <CardDescription>{dashboardData?.conceptsMastery.map(entry => entry.difficulty + ": " + entry.completionPercentage + "%").join(", ")}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </ScrollContainer>
  )
}
export default Dashboard
