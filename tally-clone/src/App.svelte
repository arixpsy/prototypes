<script lang="ts">
  import {
    CounterTile,
    NewCounterTile,
    AddCounterModal,
  } from "@/lib/components";
  import { counters } from "@/lib/store/counters";
  import { KEY_EVENT } from "@/utils/types";

  let isAddModalOpen = false;
  let scrollY: number;

  function handleGlobalKeyPress(e: KeyboardEvent) {
    if (isAddModalOpen) return;
    switch (e.keyCode) {
      case KEY_EVENT.N_KEY:
        toggleAddModalOpen();
        return;
    }
  }

  function handleNewCounterTileKeyPress(e: KeyboardEvent) {
    if (isAddModalOpen) return;
    switch (e.keyCode) {
      case KEY_EVENT.ENTER:
        toggleAddModalOpen();
        return;
      case KEY_EVENT.SPACE:
        toggleAddModalOpen();
        return;
    }
  }

  function toggleAddModalOpen() {
    isAddModalOpen = !isAddModalOpen;
  }
</script>

<svelte:window on:keyup={handleGlobalKeyPress} bind:scrollY />

<main class="min-h-screen bg-white">
  <div class="container mx-auto h-screen pt-9">
    <h1
      class="text-4xl text-center py-3 bg-white sticky top-0 z-10"
      class:shadow-lg={scrollY > 36}
    >
      WAICH
    </h1>
    <div
      class="grid grid-cols-2 gap-3 p-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
    >
      {#each $counters as counter (counter.id)}
        <CounterTile {counter} />
      {/each}
      <NewCounterTile
        on:click={toggleAddModalOpen}
        on:keyup={handleNewCounterTileKeyPress}
      />
    </div>
  </div>

  <AddCounterModal
    isVisible={isAddModalOpen}
    on:modal-submit={toggleAddModalOpen}
    on:modal-close={toggleAddModalOpen}
    on:modal-cancel={toggleAddModalOpen}
  />
</main>
