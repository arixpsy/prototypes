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
  import { longpress } from "@/lib/actions/longpress";
  import { navigateTo } from "svelte-router-spa";

  export let counter: ICounter;
  export let isSortMode: boolean = false;

  $: currentCount = getCurrentCount(counter, $counterRecords);
  $: counterTypeLabel = getCounterTypeLabel(counter);

  const dispatch = createEventDispatcher<{
    "custom-increment": CustomIncrementEvent;
  }>();
  const counterRecords = derived(records, ($records) =>
    $records.filter((record) => record.counterId === counter.id)
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
      createdAt: DateTime.now().toSeconds(),
      labels: [],
      description: "",
    };

    $records = [newRecord, ...$records];
  };

  const handleDeleteCounter = function () {
    $counters = [...$counters.filter((c) => c.id !== counter.id)];
    $records = [...$records.filter((r) => r.counterId !== counter.id)];
  };
</script>

<div
  class="relative flex aspect-square select-none flex-col items-center justify-center overflow-x-hidden rounded-lg p-2"
  class:cursor-pointer={!isSortMode}
  class:cursor-grab={isSortMode}
  style="background-color: {counter.color}"
  tabIndex={isSortMode ? -1 : 0}
  on:click={isSortMode ? undefined : handleClickCounter}
  on:keyup={isSortMode ? undefined : handleKeyPress}
  use:longpress={{ enabled: !isSortMode }}
  on:longpress={() => navigateTo(`counter?id=${counter.id}`)}
>
  <!-- Delete Button -->
  {#if isSortMode}
    <div class="absolute -top-2 -right-2" in:scale>
      <button
        class="flex aspect-square h-8 items-center justify-center rounded-full border-2 border-white bg-red-400 text-white transition-transform hover:scale-125"
        on:click={handleDeleteCounter}
      >
        <Icon.Minus class="h-6 w-6" />
      </button>
    </div>
  {/if}

  <!-- Counter Labels -->
  <p class="text-md w-full truncate text-center text-gray-100">
    {counter.title}
  </p>
  <p class="w-full text-center text-xs">{counterTypeLabel}</p>
  {#key currentCount}
    <p class="my-3 w-full text-center text-3xl font-bold" in:scale|local>
      {#if counter.target}
        {currentCount.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}/{counter.target}
      {:else}
        {currentCount.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}
      {/if}
    </p>
  {/key}
</div>

<style>
  div {
    -webkit-tap-highlight-color: transparent;
  }
</style>
