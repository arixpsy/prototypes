<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { KEY_EVENT } from "@/utils/types";

  export let value: string;
  export let ref: HTMLInputElement;

  const inputTextClasses = "text-sm";

  const inputContainerClasses =
    "block w-full p-2.5 rounded-lg border-2 outline-none transition-colors";

  const inputColorClasses = `bg-gray-50 text-gray-900 border-gray-50 focus:border-blue-700 `;

  const inputClasses = `${inputTextClasses} ${inputContainerClasses} ${inputColorClasses}`;

  const dispatch = createEventDispatcher();

  function handleKeyUp(e: KeyboardEvent) {
    switch(e.keyCode) {
      case KEY_EVENT.ENTER:
        dispatch("input-submit");
        return; 
    }
  }
</script>

<input
  type="text"
  bind:value
  bind:this={ref}
  class={inputClasses}
  on:keyup={handleKeyUp}
/>
