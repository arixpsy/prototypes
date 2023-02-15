<script lang="ts">
  import { navigateTo, type Route } from "svelte-router-spa";
  import { fade } from "svelte/transition";
  import { counters } from "@/lib/store/counters";
  import { records } from "@/lib/store/records";
  import * as d3 from "d3";
  import { DateTime } from "luxon";
  import { derived } from "svelte/store";
  import type { IRecord } from "@/@types/records";
    import { Icon } from "@/lib/components";

  export let currentRoute: Route;
  let size = 7;
  // let selectionType = 'day'
  let selectedDate = DateTime.now()
      .set({ millisecond: -1, second: 0, minute: 0, hour: 0 })
      .plus({ days: 1 }).toSeconds()

  $: counter = $counters.find((c) => c.id === currentRoute.queryParams.id);
  const chartData = derived(records, ($records) => {
    let final: Array<{
      start: number;
      end: number;
      data: Array<IRecord>;
    }> = [];
    let endRange = DateTime.now()
      .set({ millisecond: -1, second: 0, minute: 0, hour: 0 })
      .plus({ days: 1 });
    let startRange = DateTime.now().set({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
    });

    for (let i = 0; i < size; i++) {
      final = [
        {
          start: startRange.toSeconds(),
          end: endRange.toSeconds(),
          data: $records.filter(
            (r) =>
              r.counterId === currentRoute.queryParams.id &&
              r.createdAt < endRange.toSeconds() &&
              r.createdAt > startRange.toSeconds()
          ),
        },
        ...final,
      ];

      startRange = startRange.minus({ day: 1 });
      endRange = endRange.minus({ day: 1 });
    }
    return final;
  });

  $: xTicks = $chartData.map((d) => d.end);
  $: yTicks = $chartData.map((d) =>
    d.data.reduce((p, r) => p + r.incrementValue, 0)
  );

  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  let width: number;
  let height: number;

  $: xScale = d3
    .scaleLinear()
    .domain([0, xTicks.length])
    .range([padding.left, width - padding.right]);

  $: yScale = d3
    .scaleLinear()
    .domain([0, Math.max.apply(null, yTicks)])
    .range([height - padding.bottom, padding.top]);

  $: innerWidth = width - (padding.left + padding.right);
</script>

<main class="min-h-screen bg-white">
  <div class="container mx-auto min-h-screen pt-9">
    <h1
      class="sticky top-0 z-30 bg-white py-3  text-center text-4xl"
      class:shadow-lg={scrollY > 36}
      in:fade
    >
      {counter?.title}
    </h1>
    <p class="text-center text-xs">This week</p>
    <p class="pt-6 text-center text-4xl">{$chartData.find(d => d.end === selectedDate)?.data.reduce((p, c) => p + c.incrementValue, 0)}</p>
    <div class="chart px-6">
      <div bind:clientWidth={width} bind:clientHeight={height}>
        <svg>
          <g class="axis y-axis">
            {#each yTicks as tick}
              <g
                class="tick tick-{tick}"
                transform="translate(0, {yScale(tick)})"
              >
                <line x2="100%" />
                <text y="-4">{tick}</text>
              </g>
            {/each}
          </g>

          <g class="axis x-axis">
            {#each $chartData as point, i}
              <g class="tick" transform="translate({xScale(i)},{height})">
                <text x={5} y="0"
                  >{DateTime.fromSeconds(point.end).toFormat("d")}</text
                >
              </g>
            {/each}
          </g>

          <g class="bars">
            {#each $chartData as point, i}
              {@const sum = point.data.reduce(
                (p, r) => p + r.incrementValue,
                0
              )}
              <rect
                x={xScale(i)}
                y={yScale(sum)}
                width={10}
                height={yScale(0) - yScale(sum)}
              />
            {/each}
          </g>
        </svg>
      </div>
    </div>
    <p class="pt-6 text-center">Total records: {$chartData.find(d => d.end === selectedDate)?.data.length}</p>

    <!-- NAVIGATION TO HOME-->
    <div class="fixed bottom-6 right-6 z-30 space-y-6">
      <button
        on:click={() => navigateTo("")}
        aria-label="navigate home"
        class="flex aspect-square w-14 items-center justify-center rounded-full bg-gray-400 text-white shadow-lg transition-colors hover:bg-gray-500"
      >
        <Icon.Home class="h-8 w-8" />
      </button>
    </div>
  </div>
</main>

<style>
  svg {
    position: relative;
    width: 100%;
    height: 300px;
  }

  .tick {
    font-family: Helvetica, Arial;
    font-size: 0.725em;
    font-weight: 200;
  }

  .tick line {
    stroke: #e2e2e2;
    stroke-dasharray: 2;
  }

  .tick text {
    fill: #ccc;
    text-anchor: start;
  }

  .tick.tick-0 line {
    stroke-dasharray: 0;
  }

  .x-axis .tick text {
    text-anchor: middle;
  }

  .bars rect {
    fill: #a11;
    stroke: none;
    opacity: 0.65;
  }
</style>
