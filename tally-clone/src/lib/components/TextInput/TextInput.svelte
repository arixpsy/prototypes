<script lang="ts">
  export let value: string;
  export let ref: HTMLInputElement | undefined = undefined;
  export let hasError: boolean = false;

  const inputTextClasses = "text-sm";
  const inputContainerClasses =
    "block w-full p-2.5 rounded-lg border-2 outline-none transition-colors";
  const inputColorClasses =
    "bg-gray-50 text-gray-900 border-gray-50 focus:border-blue-700";
  const inputClasses = `${inputTextClasses} ${inputContainerClasses} ${inputColorClasses}`;
</script>

<input
  type="text"
  bind:value
  bind:this={ref}
  class={inputClasses}
  class:has-error={hasError}
/>

<style>
  .has-error {
    @apply border-red-400;
  }
</style>
