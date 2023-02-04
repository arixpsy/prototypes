<script lang="ts">
  import { Icon } from "@/lib/components";
  import { navigateTo } from "svelte-router-spa";
  import { fade } from "svelte/transition";
  import { records } from "@/lib/store/records";
  import { HistoryRecord } from "@/lib/components";
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

    <div
      class="mx-auto mb-24 grid max-w-lg grid-cols-[auto_1fr] gap-x-3 gap-y-6 p-3"
    >
      {#each $records as record, index (record.id)}
        <HistoryRecord {record} prevIndex={index - 1} />
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
