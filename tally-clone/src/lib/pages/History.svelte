<script lang="ts">
  import { Icon } from "@/lib/components";
  import { navigateTo } from "svelte-router-spa";
  import { fade } from "svelte/transition";
  import { records } from "@/lib/store/records";
</script>

<main class="min-h-screen bg-white">
  <div class="container mx-auto min-h-screen pt-9">
    <h1
      class="sticky top-0 z-10 bg-white py-3  text-center text-4xl"
      class:shadow-lg={scrollY > 36}
      in:fade
    >
      History
    </h1>

    <div class="mx-auto grid max-w-lg grid-cols-[auto_1fr] gap-x-8 gap-y-3 p-3 mb-24">
      {#each $records as record (record.id)}
        <h2 class="col-span-2 text-lg text-gray-400">TODAY</h2>
        <p class="text-sm font-bold">8:23 AM</p>
        <div class="space-y-3">
          <div
            class="w-max rounded-md bg-red-200 px-2 py-0.5 text-sm text-white"
          >
            + 25 Spendings
          </div>
          <div class="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
            possimus illum exercitationem expedita!
          </div>
          <div class="text-sm">
            <span>LOL</span>
            <span>COOL</span>
          </div>
        </div>
      {/each}
    </div>

    <!-- NAVIGATION TO HOME-->
    <div class="fixed bottom-6 right-6 space-y-6">
      <button
        on:click={() => navigateTo("")}
        aria-label="navigate home"
        class="flex aspect-square w-14 items-center justify-center rounded-full  bg-gray-400 text-white shadow-lg transition-colors hover:bg-gray-500"
      >
        <Icon.Home class="h-8 w-8" />
      </button>
    </div>
  </div>
</main>
