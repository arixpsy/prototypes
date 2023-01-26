<script lang="ts">
  export let label: string = '';
</script>

<div class="flex flex-col">
  <p class="text-sm text-gray-500 mb-3">{label}</p>
  <slot></slot>
</div>