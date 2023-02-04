<script lang="ts">
  import type { IRecord } from "@/@types/records";
  import { records } from "@/lib/store/records";
  import { counters } from "@/lib/store/counters";
  import { DateTime } from "luxon";

  export let record: IRecord;
  export let prevIndex: number;

  $: prevRecordDate = DateTime.fromSeconds($records[prevIndex]?.createdAt || 0);
  $: recordDate = DateTime.fromSeconds(record.createdAt);
  $: counter = $counters.find((c) => c.id === record.counterId);
  $: isSameDayAsPrevRecord =
    prevRecordDate.startOf("day").toSeconds() ===
    recordDate.startOf("day").toSeconds();
</script>

{#if !isSameDayAsPrevRecord}
  <h2 class="col-span-2 mt-6 text-lg text-gray-400 first:mt-0">
    {recordDate.toFormat("ccc, d LLL y")}
  </h2>
{/if}

<p class="text-sm font-bold">{recordDate.toFormat("h:mm a")}</p>
<div class="space-y-3">
  <div class="w-max rounded-md {counter?.color} px-2 py-0.5 text-sm text-white">
    +{record.incrementValue}
    {counter?.title}
  </div>
  {#if record.description}
    <div class="text-sm">
      {record.description}
    </div>
  {/if}

  {#if record.labels.length}
    <div class="flex flex-wrap gap-1 text-sm">
      {#each record.labels as label (label)}
        <span class="rounded-full bg-gray-300 py-1 px-3">{label}</span>
      {/each}
    </div>
  {/if}
</div>
