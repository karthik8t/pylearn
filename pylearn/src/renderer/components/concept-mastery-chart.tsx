import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from './ui/card'
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "renderer/components/ui/chart";
import {Label, PolarRadiusAxis, RadialBar, RadialBarChart} from "recharts";


const chartConfig = {
  beginner: {
    label: "Beginner",
    color: "var(--chart-3)",
  },
  intermediate: {
    label: "Intermediate",
    color: "var(--chart-4)",
  },
  advanced: {
    label: "Advanced",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


const ConceptMasteryChart = (props: { beginner: number, intermediate: number, advanced: number }) => {
  const {beginner, intermediate, advanced} = props;
  const chartData = [{beginner: beginner, intermediate: intermediate, advanced: advanced}];

  return (
    <Card className="flex flex-col col-span-5">
      <CardHeader className="items-center pb-0">
        <CardTitle>Concept Mastery Breakdown</CardTitle>
        <CardDescription>This chart shows your progress for each difficulty type, helping you track mastery across
          concepts.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel/>}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({viewBox}) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {beginner + intermediate + advanced}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          concepts mastered
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="beginner"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-beginner)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="intermediate"
              fill="var(--color-intermediate)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="advanced"
              fill="var(--color-advanced)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <span className="w-3 h-3 rounded-full" style={{background: "var(--chart-3)"}}/> Beginner: {beginner}
          <span className="w-3 h-3 rounded-full" style={{background: "var(--chart-4)"}}/> Intermediate: {intermediate}
          <span className="w-3 h-3 rounded-full" style={{background: "var(--chart-5)"}}/> Advanced: {advanced}
        </div>
        <div className="text-muted-foreground leading-none">
          Total concepts mastered: {beginner + intermediate + advanced}
        </div>
      </CardFooter>
    </Card>
  )
}
export default ConceptMasteryChart
