<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import {
    CounterTile,
    AddCounterModal,
    CustomIncrementModal,
    NavigationBurger,
  } from "@/lib/components";
  import { counters } from "@/lib/store/counters";
  import { KEY_EVENT } from "@/@types/commons";
  import type { CustomIncrementEvent } from "@/@types/records";

  // TODO: history page, edit counter, individual counter state, drag sort counter

  let scrollY: number;
  let isEditMode: boolean = false;
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
    if (isEditMode) {
      if (e.keyCode === KEY_EVENT.ESC) {
        isEditMode = false;
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
        isEditMode = true;
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
</script>

<svelte:window on:keyup={handleGlobalKeyUp} bind:scrollY />

<main class="min-h-screen bg-white">
  <div class="container mx-auto h-screen pt-9">
    <!-- HEADER -->
    <h1
      class="text-4xl text-center py-3 bg-white sticky top-0 z-10"
      class:shadow-lg={scrollY > 36}
    >
      {#if isEditMode}
        <p in:fade>Edit Mode</p>
      {:else}
        <p in:fade>WAICH</p>
      {/if}
    </h1>

    <!-- COUNTER TILES -->
    <div
      use:dndzone={{ items: $counters, flipDurationMs: 500 }}
      on:consider={handleDndConsider}
      on:finalize={handleDndFinalize}
      class="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
    >
      {#each $counters as counter (counter.id)}
        <div animate:flip={{ duration: 500 }}>
          <CounterTile
            {counter}
            {isEditMode}
            on:custom-increment={handleCustomIncrement}
          />
        </div>
      {/each}
    </div>
  </div>

  <!-- NAVIGATION MENU -->
  <NavigationBurger
    bind:isMenuOpen
    bind:isEditMode
    on:new-counter={toggleAddModalOpen}
    on:view-history={() => {}}
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
</main>
