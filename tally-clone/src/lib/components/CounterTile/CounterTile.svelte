<script lang="ts">
  import { DateTime } from "luxon";
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
  class={`aspect-square flex flex-col justify-center items-center rounded-lg p-3 ${counter.color}`}
>
  <p class="text-md text-white text-center truncate w-full">{counter.title}</p>
  <p class="text-xs text-center w-full">{counterTypeLabel}</p>
  <p class="text-4xl text-center font-bold my-2 w-full">{currentCount}</p>
  <p class="text-xs text-center w-full">{LastRecordLabel}</p>
</div>
