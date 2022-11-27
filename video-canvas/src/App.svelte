<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./lib/components/Loader.svelte";
  import StreamDashboard from "./lib/components/StreamDashboard.svelte";

  let video: HTMLVideoElement;
  let permissions = {
    isLoading: true,
    stream: undefined,
  };

  onMount(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        permissions.stream = stream;
        permissions.isLoading = false;
      })
      .catch((e) => {
        console.log(e);
        permissions.isLoading = false;
      });
  });
</script>

<main class="min-h-screen bg-gray-100 text-neutral-800">
  <div class="container mx-auto">
    {#if permissions.isLoading}
      <div class="h-screen flex justify-center items-center">
        <Loader />
      </div>
    {:else if typeof permissions.stream === "undefined"}
      <div class="h-screen flex justify-center items-center">
        <p class="text-lg">Unable to retrieve camera permissions</p>
      </div>
    {:else}
      <StreamDashboard />
    {/if}
  </div>
</main>
