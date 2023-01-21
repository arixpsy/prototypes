<script lang="ts">
  import { DateTime } from "luxon";
  import { scale } from "svelte/transition";
  import type { ICounter, IRecord } from "@/utils/types";

  export let counter: ICounter;

  let latestRecord: IRecord = {
    counterId: "test1",
    incrementValue: 1,
    latestValue: 1,
    createdAt: 1673370178,
  };

  $: currentCount = latestRecord.latestValue;
  $: counterTypeLabel = (() => {
    switch (counter.resetType) {
      case "Day":
        return "Today";
      default:
        return `This ${counter.resetType}`;
    }
  })();
  $: LastRecordLabel = DateTime.fromSeconds(
    latestRecord.createdAt
  ).toRelativeCalendar();
</script>

<div
  class={`aspect-square flex flex-col justify-center items-center rounded-lg p-2 ${counter.color}`}
  transition:scale
>
  <p class="text-md text-gray-100 text-center truncate w-full">
    {counter.title}
  </p>
  <p class="text-xs text-center w-full">{counterTypeLabel}</p>
  <p class="text-3xl text-center font-bold my-3 w-full">
    {currentCount}
    {#if counter.target}
      /{counter.target}
    {/if}
  </p>
  <p class="text-xs text-center w-full">{LastRecordLabel}</p>
</div>
