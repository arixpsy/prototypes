<script lang="ts">
  import CounterTile from "./lib/components/CounterTile/CounterTile.svelte";
  import Modal from "./lib/components/Modal/Modal.svelte";
  import NewCounterTile from "./lib/components/NewCounterTile/NewCounterTile.svelte";

  let isAddModalOpen = false;
  const getCounters = [
    {
      id: 1,
      title: "Commits",
      createdAt: 1673370178,
      resetType: "month",
      target: null,
      groupId: null,
      color: "bg-slate-400",
      incrementValue: undefined,
      latestRecord: {
        incrementValue: 1,
        latestValue: 1,
        createdAt: 1673370178,
      },
    },
    {
      id: 2,
      title: "Commits",
      createdAt: 1673370178,
      resetType: "month",
      target: null,
      groupId: null,
      color: "bg-lime-400",
      incrementValue: undefined,
      latestRecord: {
        incrementValue: 1,
        latestValue: 1,
        createdAt: 1673370178,
      },
    },
    {
      id: 3,
      title: "Commits",
      createdAt: 1673370178,
      resetType: "month",
      target: null,
      groupId: null,
      color: "bg-blue-400",
      incrementValue: undefined,
      latestRecord: {
        incrementValue: 1,
        latestValue: 1,
        createdAt: 1673370178,
      },
    },
    {
      id: 4,
      title: "Commits",
      createdAt: 1673370178,
      resetType: "month",
      target: null,
      groupId: null,
      color: "bg-yellow-400",
      incrementValue: undefined,
      latestRecord: {
        incrementValue: 1,
        latestValue: 1,
        createdAt: 1673370178,
      },
    },
  ];
</script>

<main class="min-h-screen bg-neutral-800">
  <div class="container mx-auto h-screen pt-12">
    <h1 class="text-4xl text-center text-white mb-3">WAICH</h1>
    <div
      class="grid grid-cols-2 gap-6 p-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
    >
      {#each getCounters as counter (counter.id)}
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
