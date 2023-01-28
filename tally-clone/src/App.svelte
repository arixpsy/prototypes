<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import {
    CounterTile,
    AddCounterModal,
    CustomIncrementModal,
    NavigationBurger,
  } from "@/lib/components";
  import { counters } from "@/lib/store/counters";
  import { KEY_EVENT } from "@/@types/commons";
  import type { CustomIncrementEvent } from "@/@types/records";

  let scrollY: number;
  let isEditMode: boolean = false;
  let isMenuOpen: boolean = false;
  let isAddModalOpen = false;
  let isCustomIncrementModalOpen = false;
  let customIncrementEvent: CustomIncrementEvent | undefined = undefined;

  function handleGlobalKeyUp(e: KeyboardEvent) {
    // TODO: rewrite global key up logic
    if (isAddModalOpen) return;
    if (isCustomIncrementModalOpen) return;
    switch (e.keyCode) {
      case KEY_EVENT.N_KEY:
        toggleAddModalOpen();
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
      class="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
    >
      {#each $counters as counter (counter.id)}
        <div animate:flip={{ duration: 500 }} in:scale out:scale>
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
