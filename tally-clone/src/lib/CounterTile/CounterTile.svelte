<script lang="ts">
  import { DateTime } from "luxon";
  import type { ICounter } from "./types";

  export let counter: ICounter;

  $: currentCount = counter.latestRecord.latestValue;
  $: counterTypeLabel = (() => {
    switch (counter.resetType) {
      case "day":
        return "Today";
      default:
        return `This ${counter.resetType}`;
    }
  })();
  $: LastRecordLabel = DateTime.fromSeconds(counter.latestRecord.createdAt).toRelativeCalendar()
</script>

<div
  class={`aspect-square flex flex-col justify-center items-center rounded-lg p-3 ${counter.color}`}
>
  <p class="text-md text-white text-center truncate w-full">{counter.title}</p>
  <p class="text-xs text-center w-full">{counterTypeLabel}</p>
  <p class="text-4xl text-center font-bold my-2 w-full">{currentCount}</p>
  <p class="text-xs text-center w-full">{LastRecordLabel}</p>
</div>
