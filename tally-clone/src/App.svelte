<script lang="ts">
  import {
    CounterTile,
    AddCounterModal,
    CustomIncrementModal,
    NavigationBurger,
  } from "@/lib/components";
  import { counters } from "@/lib/store/counters";
  import { KEY_EVENT, } from "@/@types/commons";
  import type { CustomIncrementEvent } from "@/@types/records";

  let scrollY: number;
  let isMenuOpen: boolean = false;
  let isAddModalOpen = false;
  let isCustomIncrementModalOpen = false;
  let customIncrementEvent: CustomIncrementEvent | undefined = undefined;

  function handleGlobalKeyUp(e: KeyboardEvent) {
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
    <h1
      class="text-4xl text-center py-3 bg-white sticky top-0 z-10"
      class:shadow-lg={scrollY > 36}
    >
      WAICH
    </h1>
    <div
      class="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
    >
      {#each $counters as counter (counter.id)}
        <CounterTile {counter} on:custom-increment={handleCustomIncrement} />
      {/each}
    </div>
  </div>

  <NavigationBurger isOpen={isMenuOpen} on:new-counter={toggleAddModalOpen} />

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
