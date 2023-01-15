<script lang="ts">
  export let value: string;
  export let ref: HTMLInputElement;
  $: ({ ...InputProps } = $$props);

  const inputTextClasses = "text-sm";

  const inputContainerClasses =
    "block w-full p-2.5 rounded-lg border-2 outline-none transition-colors";

  const inputColorClasses = `bg-gray-50 text-gray-900 border-gray-50 focus:border-gray-200 `;

  const inputClasses = `${inputTextClasses} ${inputContainerClasses} ${inputColorClasses}`;
</script>

<input
  type="text"
  bind:value
  bind:this={ref}
  {...InputProps}
  class={inputClasses}
/>
