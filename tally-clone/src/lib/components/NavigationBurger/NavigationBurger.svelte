<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { Icon } from "@/lib/components";

  export let isOpen: boolean = false;
  
  const dispatch = createEventDispatcher();
  const navItems = [
    {
      icon: Icon.Plus,
      onClick: () => {
        isOpen = false;
        dispatch("new-counter")
      },
    },
    {
      icon: Icon.Pencil,
      onClick: () => dispatch("edit-mode"),
    },
    {
      icon: Icon.Calendar,
      onClick: () => dispatch("view-history"),
    },
  ];
</script>

<div class="fixed bottom-6 right-6 space-y-6">
  {#if isOpen}
    {#each navItems as item, index (index)}
      <button
        in:fly={{ x: 100, delay: (navItems.length - index) * 100 }}
        out:fly={{ x: 100, delay: index * 100 }}
        on:click={item.onClick}
        class="aspect-square w-14 rounded-full flex justify-center items-center bg-gray-400 text-white shadow-lg"
        >
        <svelte:component this={item.icon} class="h-8 w-8" />
      </button>
    {/each}
  {/if}

  <button
    on:click={() => (isOpen = !isOpen)}
    class="aspect-square w-14 rounded-full flex justify-center items-center bg-gray-400 text-white shadow-lg"
  >
    {#if isOpen}
      <div in:fade>
        <Icon.Cross class="h-8 w-8" />
      </div>
    {:else}
      <div in:fade>
        <Icon.Burger class="h-8 w-8" />
      </div>
    {/if}
  </button>
</div>
