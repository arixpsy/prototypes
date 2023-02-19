<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { navigateTo } from "svelte-router-spa";
  import {
    CounterTile,
    AddCounterModal,
    CustomIncrementModal,
    NavigationBurger,
  } from "@/lib/components";
  import { counters } from "@/lib/store/counters";
  import { KEY_EVENT } from "@/@types/commons";
  import type { CustomIncrementEvent } from "@/@types/records";
  import { onMount } from "svelte";
  import colors from "tailwindcss/colors";
  import type { DefaultColors } from "tailwindcss/types/generated/colors";

  // TODO: edit counter, individual counter state

  let scrollY: number;
  let isSortMode: boolean = false;
  let isMenuOpen: boolean = false;
  let isAddModalOpen = false;
  let isCustomIncrementModalOpen = false;
  let customIncrementEvent: CustomIncrementEvent | undefined = undefined;

  function handleGlobalKeyUp(e: KeyboardEvent) {
    if (isAddModalOpen) {
      if (e.keyCode === KEY_EVENT.ESC) {
        toggleAddModalOpen();
        return;
      }
      return;
    }
    if (isCustomIncrementModalOpen) {
      if (e.keyCode === KEY_EVENT.ESC) {
        toggleCustomIncrementModalOpen();
        return;
      }
      return;
    }
    if (isSortMode) {
      if (e.keyCode === KEY_EVENT.ESC) {
        isSortMode = false;
        return;
      }
      return;
    }
    if (isMenuOpen) {
      if (e.keyCode === KEY_EVENT.ESC) {
        isMenuOpen = false;
        return;
      }
      return;
    }
    switch (e.keyCode) {
      case KEY_EVENT.N_KEY:
        toggleAddModalOpen();
        return;
      case KEY_EVENT.E_KEY:
        isSortMode = true;
        return;
      case KEY_EVENT.H_KEY:
        navigateTo("history");
        return;
    }
  }

  function toggleAddModalOpen() {
    isAddModalOpen = !isAddModalOpen;
  }

  function toggleCustomIncrementModalOpen() {
    isCustomIncrementModalOpen = !isCustomIncrementModalOpen;
    if (!isCustomIncrementModalOpen) {
      customIncrementEvent = undefined;
    }
  }

  function handleCustomIncrement(e: CustomEvent<CustomIncrementEvent>) {
    customIncrementEvent = e.detail;
    isCustomIncrementModalOpen = true;
  }

  function handleDndConsider(e: CustomEvent) {
    $counters = e.detail.items;
  }
  function handleDndFinalize(e: CustomEvent) {
    $counters = e.detail.items;
  }

  // TODO: remove after migration
  function handleMigrateData() {
    const finalData = [];
    for (const counter of $counters) {
      const twColor: Array<string> = counter.color.split("-");
      if (twColor.length === 3) {
        finalData.push({
          ...counter,
          color: colors[twColor[1]][twColor[2] as string],
        });
      } else {
        finalData.push(counter);
      }
    }
    $counters = finalData
  }

  onMount(() => {
    handleMigrateData();
  });
</script>

<svelte:window on:keyup={handleGlobalKeyUp} bind:scrollY />

<main class="min-h-screen bg-white">
  <div class="container mx-auto min-h-screen pt-9">
    <!-- HEADER -->
    <h1
      class="sticky top-0 z-10 bg-white py-3  text-center text-4xl"
      class:shadow-lg={scrollY > 36}
    >
      {#if isSortMode}
        <p in:fade>Sort Mode</p>
      {:else}
        <p in:fade>WAICH</p>
      {/if}
    </h1>

    <!-- COUNTER TILES -->
    <div
      use:dndzone={{
        items: $counters,
        flipDurationMs: 400,
        dragDisabled: !isSortMode,
        dropTargetStyle: {},
        centreDraggedOnCursor: true,
        zoneTabIndex: -1,
      }}
      on:consider={handleDndConsider}
      on:finalize={handleDndFinalize}
      class="grid auto-rows-min grid-cols-2 gap-3 p-3 outline-none sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
      style="height: calc(100% - 100px);"
    >
      {#each $counters as counter (counter.id)}
        <div animate:flip={{ duration: 400 }} in:scale>
          <CounterTile
            {counter}
            {isSortMode}
            on:custom-increment={handleCustomIncrement}
          />
        </div>
      {/each}
    </div>
  </div>

  <!-- NAVIGATION MENU -->
  <NavigationBurger
    bind:isMenuOpen
    bind:isSortMode
    on:new-counter={toggleAddModalOpen}
  />

  <!-- MODALS -->
  <AddCounterModal
    isVisible={isAddModalOpen}
    on:modal-submit={toggleAddModalOpen}
    on:modal-close={toggleAddModalOpen}
    on:modal-cancel={toggleAddModalOpen}
  />

  <CustomIncrementModal
    {customIncrementEvent}
    isVisible={isCustomIncrementModalOpen}
    on:modal-submit={toggleCustomIncrementModalOpen}
    on:modal-close={toggleCustomIncrementModalOpen}
    on:modal-cancel={toggleCustomIncrementModalOpen}
  />

  <!-- FULL SCREENS -->
</main>
