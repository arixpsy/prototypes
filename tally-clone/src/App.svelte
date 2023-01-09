<script lang="ts">
  import Modal from "./lib/Modal/Modal.svelte";

  let isAddModalOpen = false;
  const getTrack = [
    {
      id: 1,
      title: "",
      createdAt: "",
      resetType: "",
      target: "",
      groupId: "",
      color: "",
      incrementValue: undefined,
      latestRecord: {
        incrementValue: 0,
        latestValue: 10,
        createdAt: "",
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
      <div
        class="aspect-square bg-yellow-400 flex flex-col justify-center items-center rounded-lg p-3"
      >
        <p class="text-md text-white text-center truncate w-full">Commits</p>
        <p class="text-xs text-center w-full">This Month</p>
        <p class="text-4xl text-center font-bold my-2 w-full">4</p>
        <p class="text-xs text-center w-full">3 days ago</p>
      </div>

      <div
        class="aspect-square bg-lime-500 flex flex-col justify-center items-center rounded-lg p-3"
      >
        <p class="text-md text-white text-center truncate w-full">Commits</p>
        <p class="text-xs text-center w-full">This Month</p>
        <p class="text-4xl text-center font-bold my-2 w-full">4</p>
        <p class="text-xs text-center w-full">3 days ago</p>
      </div>

      <div
        class="aspect-square bg-blue-400 flex flex-col justify-center items-center rounded-lg p-3"
      >
        <p class="text-md text-white text-center truncate w-full">Commits</p>
        <p class="text-xs text-center w-full">This Month</p>
        <p class="text-4xl text-center font-bold my-2 w-full">4</p>
        <p class="text-xs text-center w-full">3 days ago</p>
      </div>

      <div
        class="aspect-square bg-slate-400 flex flex-col justify-center items-center rounded-lg p-3"
      >
        <p class="text-md text-white text-center truncate w-full">Commits</p>
        <p class="text-xs text-center w-full">This Month</p>
        <p class="text-4xl text-center font-bold my-2 w-full">4</p>
        <p class="text-xs text-center w-full">3 days ago</p>
      </div>

      <div
        class="aspect-square flex flex-col justify-center items-center rounded-lg border-dashed border-gray-500 border-8 text-gray-500"
        on:click={() => (isAddModalOpen = true)}
        on:keyup={() => {}}
      >
        <svg
          class="h-20"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
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
