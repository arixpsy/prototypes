<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { Icon } from "@/lib/components";

  export let isMenuOpen: boolean = false;
  export let isEditMode: boolean = false;

  const navButtonRefs: Array<HTMLButtonElement> = [];
  const dispatch = createEventDispatcher();
  const navItems = [
    {
      icon: Icon.Plus,
      onClick: () => {
        isMenuOpen = false;
        dispatch("new-counter");
      },
      label: "add new counter",
    },
    {
      icon: Icon.Pencil,
      onClick: () => {
        isMenuOpen = false;
        isEditMode = true;
      },
      label: "edit counters",
    },
    {
      icon: Icon.Calendar,
      onClick: () => {
        isMenuOpen = false;
        dispatch("view-history");
      },
      label: "view history",
    },
  ];

  $: if (isMenuOpen) {
    focusFirstItem();
  }

  async function focusFirstItem() {
    await tick();
    navButtonRefs[0].focus();
  }
</script>

<div class="fixed bottom-6 right-6 space-y-6">
  <!-- Navigation Menu Items -->
  {#if isMenuOpen}
    {#each navItems as item, index (index)}
      <button
        in:fly={{ x: 100, delay: (navItems.length - index) * 100 }}
        out:fly={{ x: 100, delay: index * 100 }}
        on:click={item.onClick}
        bind:this={navButtonRefs[index]}
        class="nav-button bg-gray-400 hover:bg-gray-500"
        aria-label={item.label}
      >
        <svelte:component this={item.icon} class="h-8 w-8" />
      </button>
    {/each}
  {/if}

  <!-- Navigation Menu Button -->
  {#if isEditMode}
    <button
      on:click={() => (isEditMode = false)}
      aria-label="exit edit mode"
      class="nav-button bg-red-400 hover:bg-red-500"
    >
      <Icon.Cross class="h-8 w-8" />
    </button>
  {:else}
    <button
      on:click={() => (isMenuOpen = !isMenuOpen)}
      aria-label="navigation menu"
      class="nav-button"
      class:bg-gray-400={!isMenuOpen}
      class:hover:bg-gray-500={!isMenuOpen}
      class:bg-red-400={isMenuOpen}
      class:hover:bg-red-500={isMenuOpen}
    >
      {#if isMenuOpen}
        <div in:fade>
          <Icon.Cross class="h-8 w-8" />
        </div>
      {:else}
        <div in:fade>
          <Icon.Burger class="h-8 w-8" />
        </div>
      {/if}
    </button>
  {/if}
</div>

<style>
  button {
    -webkit-tap-highlight-color: transparent;
  }

  .nav-button {
    @apply w-14;
    @apply aspect-square;
    @apply rounded-full;
    @apply flex;
    @apply justify-center;
    @apply items-center;
    @apply text-white;
    @apply shadow-lg;
    @apply transition-colors;
  }
</style>
