<script lang="ts">
  import { navigateTo, type Route } from "svelte-router-spa";
  import { fade } from "svelte/transition";
  import { counters } from "@/lib/store/counters";
  import { records } from "@/lib/store/records";
  import { DateTime } from "luxon";
  import { derived } from "svelte/store";
  import type { IRecord } from "@/@types/records";
  import {
    Icon,
    CounterBarChart,
    CounterForceChart,
    HistoryRecord,
  } from "@/lib/components";
  import { flip } from "svelte/animate";

  export let currentRoute: Route;
  let size = 14;
  let selectedDate = DateTime.now()
    .set({ millisecond: -1, second: 0, minute: 0, hour: 0 })
    .plus({ days: 1 })
    .toSeconds();

  $: counter = $counters.find((c) => c.id === currentRoute.queryParams.id);
  const chartData = derived(records, ($records) => {
    let final: Array<{
      index: number;
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

    for (let i = size - 1; i >= 0; i--) {
      final = [
        {
          index: i,
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
  $: selectedData = $chartData[size - 1].data;
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
    <p class="text-center text-xs text-gray-400">Today</p>
    <p class="pt-6 text-center text-4xl">
      {$chartData
        .find((d) => d.end === selectedDate)
        ?.data.reduce((p, c) => p + c.incrementValue, 0)
        .toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}
    </p>

    <CounterBarChart data={$chartData} color={counter?.color} />

    <div class="mx-auto flex w-full max-w-lg flex-col">
      <p class="px-3 pt-6 text-center text-lg text-gray-400">Records</p>

      <CounterForceChart data={selectedData} />

      <div class="mx-auto mb-24 flex w-full max-w-lg flex-col py-3">
        {#each selectedData as record, index (record.id)}
          <div animate:flip={{ duration: 400 }} out:fade>
            <HistoryRecord {record} {index} />
          </div>
        {/each}
      </div>
    </div>

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
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
