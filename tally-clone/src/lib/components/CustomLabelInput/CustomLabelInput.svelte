<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { derived } from "svelte/store";
  import { fade } from "svelte/transition";
  import { KEY_EVENT } from "@/@types/commons";
  import { labels } from "@/lib/store/labels";
  import LabelPill from "@/lib/components/CustomLabelInput/LabelPill.svelte";

  export let value: Array<string>;

  let inputValue: string = "";
  let inputRef: HTMLInputElement;
  const dispatch = createEventDispatcher();

  $: filterLabels = derived(labels, ($labels) =>
    $labels.filter((v) => v.includes(inputValue))
  );

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEY_EVENT.ENTER:
        if (inputValue.trim() === "") {
          dispatch("input-submit");
        } else {
          handleAddLabel();
        }
        return;
      case KEY_EVENT.SPACE:
        handleAddLabel();
        return;
    }
  }

  function handleOptionKeyUp(label?: string) {
    return (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_EVENT.ENTER:
          handleAddLabel(label);
          focusInput();
          return;
        case KEY_EVENT.SPACE:
          handleAddLabel(label);
          focusInput();
          return;
      }
    };
  }

  function handleAddLabel(existingLabel?: string) {
    const newLabel = existingLabel ?? inputValue.trim();
    if (newLabel.length === 0) return;
    if (!value.includes(newLabel)) {
      value = [...value, newLabel];
      inputValue = "";
    } else {
      inputValue = "";
    }
  }

  function removeLabel(label: string) {
    value = value.filter((v) => v !== label);
  }

  function focusInput() {
    inputRef.focus();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex flex-wrap gap-2 w-full py-1.5 px-2.5 text-sm rounded-lg border-2 border-gray-50 bg-gray-50 text-gray-900  focus-within:border-blue-700 outline-none transition-colors  cursor-text"
  on:click={focusInput}
>
  {#each value as label (label)}
    <LabelPill {label} onClose={() => removeLabel(label)} />
  {/each}
  <input
    type="text"
    bind:value={inputValue}
    bind:this={inputRef}
    size="5"
    class="bg-inherit outline-none w-full flex-1 min-w-fit py-1"
    on:keyup={handleKeyUp}
  />
</div>
<div class="relative">
  {#if inputValue.trim().length > 0}
    <div
      class="absolute top-1 left-0 right-0 bg-gray-50 shadow-lg rounded-lg max-h-44 text-gray-900 text-sm overflow-y-auto"
      transition:fade
    >
      <div class="text-xs px-2.5 text-gray-400 mt-3">New label:</div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div
        tabindex="0"
        class="p-2.5 hover:bg-blue-100 cursor-pointer transition-colors"
        on:click={() => handleAddLabel()}
        on:keyup={handleOptionKeyUp()}
      >
        {inputValue}
      </div>
      <hr />
      <div class="text-xs px-2.5 text-gray-400 mt-3">Previously used:</div>
      {#each $filterLabels as label (label)}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div
          tabindex="0"
          class="flex p-2.5 hover:bg-blue-100 cursor-pointer transition-colors"
          on:click={() => handleAddLabel(label)}
          on:keyup={handleOptionKeyUp(label)}
        >
          {label}
        </div>
      {:else}
        <div class="text-xs text-center text-gray-400 p-2.5 my-3" in:fade>
          No matches
        </div>
      {/each}
    </div>
  {/if}
</div>
