<script lang="ts">
  import { Icon } from "@/lib/components";
  import Cross from "@/lib/components/Icons/Cross.svelte";

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
    <Icon.Cross class="w-3 h-3" />
  </span>
</div>
