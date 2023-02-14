<script lang="ts">
  import type { Route } from "svelte-router-spa";
  import { fade } from "svelte/transition";
  import { counters } from "@/lib/store/counters";

  export let currentRoute: Route;

  $: counter = $counters.find((c) => c.id === currentRoute.queryParams.id);
</script>

<main class="min-h-screen bg-white">
  <div class="container mx-auto min-h-screen pt-9">
    <h1
      class="sticky top-0 z-30 bg-white py-3  text-center text-4xl"
      class:shadow-lg={scrollY > 36}
      in:fade
    >
      {counter?.title}
    </h1>
    <p class="text-center text-xs">This week</p>
    <p class="pt-6 text-center text-4xl">154</p>
  </div>
</main>
