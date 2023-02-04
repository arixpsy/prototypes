<script lang="ts">
  import type { IRecord } from "@/@types/records";
  import { records } from "@/lib/store/records";
  import { counters } from "@/lib/store/counters";
  import { DateTime } from "luxon";
  import { fade, fly } from "svelte/transition";

  export let record: IRecord;
  export let index: number;

  $: prevRecordDate = DateTime.fromSeconds($records[index - 1]?.createdAt || 0);
  $: recordDate = DateTime.fromSeconds(record.createdAt);
  $: counter = $counters.find((c) => c.id === record.counterId);
  $: isSameDayAsPrevRecord =
    prevRecordDate.startOf("day").toSeconds() ===
    recordDate.startOf("day").toSeconds();
</script>

{#if !isSameDayAsPrevRecord}
  <h2 class="col-span-2 mt-6 text-lg text-gray-400 first:mt-0" transition:fade>
    {recordDate.toFormat("ccc, d LLL y")}
  </h2>
{/if}

<p class="whitespace-nowrap text-sm font-bold" transition:fade>
  {recordDate.toFormat("h:mm a")}
</p>
<div class="space-y-3" in:fly={{ x: 200, delay: index * 50 }} out:fade>
  <div
    class="w-max whitespace-nowrap rounded-md {counter?.color} px-2 py-0.5 text-sm text-white"
  >
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
        <span class="rounded-full border-2 border-gray-300 text-gray-400 py-0.5 px-3">{label}</span>
      {/each}
    </div>
  {/if}
</div>
