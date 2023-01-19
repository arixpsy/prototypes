<script lang="ts">
  import {
    CounterTile,
    NewCounterTile,
    AddCounterModal,
  } from "@/lib/components";
  import { counters } from "@/lib/store/counters";

  let isAddModalOpen = false;

  function toggleAddModalOpen() {
    isAddModalOpen = !isAddModalOpen;
  }
</script>

<main class="min-h-screen bg-white">
  <div class="container mx-auto h-screen pt-12">
    <h1 class="text-4xl text-center mb-3">WAICH</h1>
    <div
      class="grid grid-cols-2 gap-6 p-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
    >
      {#each $counters as counter (counter.id)}
        <CounterTile {counter} />
      {/each}

      <NewCounterTile
        on:click={() => (isAddModalOpen = true)}
        on:keyup={() => {}}
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
