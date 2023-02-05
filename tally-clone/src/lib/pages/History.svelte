<script lang="ts">
  import { Icon } from "@/lib/components";
  import { navigateTo } from "svelte-router-spa";
  import { fade } from "svelte/transition";
  import { records } from "@/lib/store/records";
  import { HistoryRecord } from "@/lib/components";
  import { flip } from "svelte/animate";
</script>

<main class="min-h-screen bg-white">
  <div class="container mx-auto min-h-screen pt-9">
    <h1
      class="sticky top-0 z-30 bg-white py-3  text-center text-4xl"
      class:shadow-lg={scrollY > 36}
      in:fade
    >
      History
    </h1>

    <div
      class="mx-auto mb-24 flex w-full max-w-lg flex-col overflow-x-hidden py-3"
    >
      {#each $records as record, index (record.id)}
        <div animate:flip={{ duration: 400 }} out:fade>
          <HistoryRecord {record} {index} />
        </div>
      {/each}
    </div>

    <!-- NAVIGATION TO HOME-->
    <div class="fixed bottom-6 right-6 z-30 space-y-6">
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
