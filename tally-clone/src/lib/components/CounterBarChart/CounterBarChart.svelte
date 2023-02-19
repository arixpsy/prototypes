<script lang="ts">
  import type { IRecord } from "@/@types/records";
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { DateTime } from "luxon";
  import { COUNTER_COLOR } from "@/@types/counters";
  import colors from "tailwindcss/colors";

  export let color: string = COUNTER_COLOR[0];
  export let data: Array<{
    index: number;
    start: number;
    end: number;
    data: Array<IRecord>;
  }>;
  let numOfRecords = data.length;
  let chartLayerElement: SVGSVGElement;
  let fixedAxisLayerElement: SVGSVGElement;

  const CHART_HEIGHT = 300;
  const CHART_WIDTH = numOfRecords * 60;
  const PADDING = {
    TOP: 25,
    BOTTOM: 25,
    LEFT: 40,
    RIGHT: 20,
  };
  const X_OFFSET_AXIS = 22;
  const X_OFFSET_BAR = 12;
  const BAR_WIDTH = 20;

  onMount(() => {
    let maxY = d3.max(
      data.flatMap((i) => i.data.reduce((p, c) => p + c.incrementValue, 0))
    );
    const xScale = d3
      .scaleLinear()
      .domain([0, numOfRecords - 1])
      .range([0, CHART_WIDTH - PADDING.LEFT - PADDING.RIGHT]);
    const yScale = d3
      .scaleLinear()
      .domain([0, maxY || 0])
      .range([CHART_HEIGHT - PADDING.BOTTOM - PADDING.TOP, 0]);

    const chartLayer = d3
      .select(chartLayerElement)
      .attr("height", CHART_HEIGHT)
      .attr("width", CHART_WIDTH)
      .style("margin-left", PADDING.LEFT)
      .style("margin-right", PADDING.RIGHT);

    const fixedAxisLayer = d3
      .select(fixedAxisLayerElement)
      .attr("height", CHART_HEIGHT)
      .attr("width", "100%")
      .style("position", "absolute")
      .style("inset", 0)
      .style("pointer-events", "none");

    // Bars
    chartLayer
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("width", BAR_WIDTH)
      .attr("height", 0)
      .attr("x", (v) => xScale(v.index))
      .attr("y", yScale(0))
      .attr("rx", 5)
      .attr("fill", color)
      .attr("transform", `translate(${X_OFFSET_BAR}, ${PADDING.TOP})`)
      .transition()
      .duration(750)
      .attr("y", (v) =>
        yScale(v.data.reduce((p, c) => p + c.incrementValue, 0))
      )
      .attr(
        "height",
        (v) =>
          CHART_HEIGHT -
          PADDING.TOP -
          PADDING.BOTTOM -
          yScale(v.data.reduce((p, c) => p + c.incrementValue, 0))
      );

    // X Axis
    chartLayer
      .append("g")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(numOfRecords)
          .tickFormat((v, i) =>
            i !== numOfRecords - 1
              ? DateTime.fromSeconds(data[v.valueOf()].end).toFormat("d LLL")
              : "Today"
          )
      )
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").remove())
      .call((g) => g.selectAll("text").attr("color", colors.gray[400]))
      .attr(
        "transform",
        `translate(${X_OFFSET_AXIS}, ${CHART_HEIGHT - PADDING.TOP})`
      );

    // Y Axis
    fixedAxisLayer
      .append("g")
      .call(d3.axisLeft(yScale).ticks(6))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").remove())
      .call((g) =>
        g
          .selectAll("text")
          .attr("text-anchor", "start")
          .attr("transform", "translate(0, -5)")
          .attr("color", colors.gray[400])
          .attr("font-size", "0.725em")
      )
      .attr("transform", `translate(${PADDING.LEFT}, ${PADDING.TOP})`);
  });
</script>

<div id="bar-chart" class="relative m-auto max-w-lg overflow-x-auto" dir="rtl">
  <svg bind:this={fixedAxisLayerElement} />
  <div
    class="hide-scrollbar overflow-x-auto"
    style="margin-left: {PADDING.LEFT}px"
  >
    <svg bind:this={chartLayerElement} />
  </div>
</div>

<style>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
