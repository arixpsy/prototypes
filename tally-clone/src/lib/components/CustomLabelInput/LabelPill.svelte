<script lang="ts">
  import { Icon } from "@/lib/components";

  export let label: string = "";
  export let onClose: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex items-center gap-1 rounded-full bg-gray-300 py-1 pl-3 pr-1">
  <span>{label}</span>
  <span
    class="inline-block cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100"
    on:click={onClose}
  >
    <Icon.Cross class="h-3 w-3" />
  </span>
</div>
