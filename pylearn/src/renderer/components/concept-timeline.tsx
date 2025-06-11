import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "renderer/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from './ui/chart';
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";


const chartConfig = {
  noOfConcepts: {
    label: "Number of Concepts",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig


const ConceptTimeline = (props: { timeline: { date: string, noOfConcepts: number }[] }) => {
  const {timeline} = props;
  const data = timeline.map(item => ({
    date: item.date,
    noOfConcepts: item.noOfConcepts + 1
  }));
  return (
    <Card className={"col-span-8"}>
      <CardHeader>
        <CardTitle>Your Learning Journey</CardTitle>
        <CardDescription>last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
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
  )
}
export default ConceptTimeline
