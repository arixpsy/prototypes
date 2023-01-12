<script lang="ts">
  import { CounterTile, Modal, NewCounterTile } from "@/lib/components";
  import { counters } from "./lib/store/counters";

  let isAddModalOpen = false;
</script>

<main class="min-h-screen bg-neutral-800">
  <div class="container mx-auto h-screen pt-12">
    <h1 class="text-4xl text-center text-white mb-3">WAICH</h1>
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

  <Modal
    isVisible={isAddModalOpen}
    onCancel={() => (isAddModalOpen = false)}
    onConfirm={() => (isAddModalOpen = false)}
  >
    <p class="text-lg font-bold text-white">New Counter</p>
  </Modal>
</main>
