<script lang="ts">
  export let value: number;
  export let ref: HTMLInputElement | undefined = undefined;
  export { forwardClasses as class };

  $: ({ ...InputProps } = $$props);

  let forwardClasses: string;
  const inputTextClasses = "text-sm";

  const inputContainerClasses =
    "block w-full p-2.5 rounded-lg border-2 outline-none transition-colors";

  const inputColorClasses = `bg-gray-50 text-gray-900 border-gray-50 focus:border-blue-700 `;

  const inputClasses = `${inputTextClasses} ${inputContainerClasses} ${inputColorClasses} ${forwardClasses}`;
</script>

<input
  type="number"
  bind:value
  bind:this={ref}
  {...InputProps}
  class={inputClasses}
/>
