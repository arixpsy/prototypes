<script lang="ts">
  import { onMount } from "svelte";

  let permissions = {
    isLoading: true,
    media: undefined,
  };

  onMount(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        permissions = {
          isLoading: false,
          media: stream,
        };
      })
      .catch(() => {
        permissions.isLoading = false;
      });
  });
</script>

<main class="min-h-screen bg-gray-100 text-neutral-800">
  <div class="container mx-auto">
    {#if permissions.isLoading}
      <div>Camera Loading</div>
    {:else if typeof permissions.media === "undefined"}
      <div>No Camera permissions</div>
    {:else}
      <div>Camera Component</div>
    {/if}
  </div>
</main>

<style></style>
