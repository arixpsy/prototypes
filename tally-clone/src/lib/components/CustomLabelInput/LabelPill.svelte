<script lang="ts">
  export let label: string = "";
  export let onClose: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex gap-1 pl-3 pr-1 py-1 rounded-full items-center bg-gray-300">
  <span>{label}</span>
  <span
    class="inline-block cursor-pointer p-1 rounded-full transition-colors hover:bg-gray-100"
    on:click={onClose}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-3 h-3"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </span>
</div>
