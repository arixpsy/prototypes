<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { derived } from "svelte/store";
  import { scale } from "svelte/transition";
  import { DateTime, type DateTimeUnit, type ToRelativeUnit } from "luxon";
  import { nanoid } from "nanoid";
  import { records } from "@/lib/store/records";
  import { KEY_EVENT } from "@/@types/commons";
  import type { ICounter } from "@/@types/counters";
  import type { CustomIncrementEvent, IRecord } from "@/@types/records";
  import {
    getCounterTypeLabel,
    getCurrentCount,
  } from "@/lib/components/CounterTile/utils";
  import { Icon } from "@/lib/components";
  import { counters } from "@/lib/store/counters";

  export let counter: ICounter;
  export let isEditMode: boolean = false;

  $: currentCount = getCurrentCount(counter, $latestRecord);
  $: counterTypeLabel = getCounterTypeLabel(counter);

  const dispatch = createEventDispatcher<{
    "custom-increment": CustomIncrementEvent;
  }>();
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
      dispatch("custom-increment", {
        counterId: counter.id,
        counterTitle: counter.title,
        counterColor: counter.color,
        latestValue: currentCount,
      });
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
      labels: [],
      description: "",
    };

    $records = [newRecord, ...$records];
  };

  const handleDeleteCounter = function () {
    $counters = [...$counters.filter((c) => c.id !== counter.id)];
    $records = [...$records.filter((r) => r.counterId !== counter.id)]
  };
</script>

<div
  class="relative aspect-square flex flex-col justify-center items-center rounded-lg p-2 {counter.color} select-none"
  class:cursor-pointer={!isEditMode}
  class:cursor-grab={isEditMode}
  tabIndex={isEditMode ? -1 : 0}
  on:click={isEditMode ? undefined : handleClickCounter}
  on:keyup={isEditMode ? undefined : handleKeyPress}
>
  <!-- Delete Button -->
  {#if isEditMode}
    <div class="absolute -top-2 -right-2" transition:scale>
      <button
        class="aspect-square h-8 rounded-full bg-red-400 hover:scale-125 transition-transform text-white flex justify-center items-center border-2 border-white"
        on:click={handleDeleteCounter}
      >
        <Icon.Minus class="h-6 w-6" />
      </button>
    </div>
  {/if}

  <!-- Counter Labels -->
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
