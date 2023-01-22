<script lang="ts">
  import { DateTime, type DateTimeUnit, type ToRelativeUnit } from "luxon";
  import { nanoid } from "nanoid";
  import { scale } from "svelte/transition";
  import { records } from "@/lib/store/records";
  import { KEY_EVENT, type ICounter, type IRecord } from "@/utils/types";
  import { derived } from "svelte/store";
  import {
    getCounterTypeLabel,
    getCurrentCount,
  } from "@/lib/components/CounterTile/utils";

  export let counter: ICounter;

  $: currentCount = getCurrentCount(counter, $latestRecord);
  $: counterTypeLabel = getCounterTypeLabel(counter);

  const latestRecord = derived(records, ($records) =>
    $records.find((record) => record.counterId == counter.id)
  );

  function handleKeyPress(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEY_EVENT.SPACE:
        handleClickCounter();
        return;
    }
  }

  function handleClickCounter() {
    if (counter.incrementValue === 0) {
      alert("open Modal");
      return;
    }
    handleCounterIncrement(counter.incrementValue);
  }

  const handleCounterIncrement = function (incrementValue: number) {
    const newRecord: IRecord = {
      id: nanoid(),
      counterId: counter.id,
      incrementValue,
      latestValue: currentCount + incrementValue,
      createdAt: DateTime.now().toSeconds(),
    };

    $records = [newRecord, ...$records];
  };
</script>

<div
  tabIndex="0"
  class={`aspect-square flex flex-col justify-center items-center rounded-lg p-2 ${counter.color} select-none cursor-pointer`}
  transition:scale
  on:click={handleClickCounter}
  on:contextmenu|preventDefault={handleClickCounter}
  on:keyup={handleKeyPress}
>
  <p class="text-md text-gray-100 text-center truncate w-full">
    {counter.title}
  </p>
  <p class="text-xs text-center w-full">{counterTypeLabel}</p>
  {#key currentCount}
    <p class="text-3xl text-center font-bold my-3 w-full" in:scale>
      {#if counter.target}
        {currentCount}/{counter.target}
      {:else}
        {currentCount}
      {/if}
    </p>
  {/key}
</div>

<style>
  div {
    -webkit-tap-highlight-color: transparent;
  }
</style>
