<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: string = "";
  export let group: string = "";

  $: ({ ...InputProps } = $$props);
  $: inputState = value === group ? "selected" : "default";
  $: inputClassesCombined = Object.values(
    inputClasses[inputState || "default"]
  ).join(" ");

  const dispatch = createEventDispatcher<{
    "radio-submit": string;
    "radio-select": string;
  }>();

  const inputClasses = {
    default: {
      text: "text-sm",
      container:
        "px-3 py-1.5 rounded-full outline-none transition-colors cursor-pointer",
      color: "bg-gray-50 text-gray-400 focus:bg-gray-200 hover:bg-gray-200",
    },
    selected: {
      text: "text-sm fold-bold",
      container:
        "px-3 py-1.5 rounded-full outline-none transition-colors cursor-pointer onSelected",
      color: "bg-gray-300 text-gray-700",
    },
  };

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 13:
        dispatch("radio-submit", value);
        return;
      case 32:
        dispatch("radio-select", value);
        return;
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<label tabindex="0" class={inputClassesCombined} on:keyup={handleKeyUp}>
  <input type="radio" bind:group {value} {...InputProps} class="hidden" />
  {value}</label
>

<style>
  .onSelected {
    animation: scale 300ms ease-out;
  }

  label {
    -webkit-tap-highlight-color: transparent;
  }
</style>
