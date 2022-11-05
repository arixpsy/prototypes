<script lang="ts">
  import { onMount } from "svelte";

  let video: HTMLVideoElement;
  let canvas: HTMLCanvasElement;
  let permissions = {
    isLoading: true,
    media: undefined,
  };

  const drawVideoToCanvas = () => {
    const ctx = canvas.getContext('2d')

    ctx.drawImage(video, 0 , 0)
    setTimeout(drawVideoToCanvas, 0)
  }

  onMount(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920, height: 1080
        },
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

  $: if (permissions.media) {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        video.srcObject = stream
        drawVideoToCanvas()
      });
  }
</script>

<main class="min-h-screen bg-gray-100 text-neutral-800">
  <div class="container mx-auto">
    {#if permissions.isLoading}
      <div class="bg-gray-300 aspect-video flex justify-center items-center">
        <p class="text-lg">Loading</p>
      </div>
    {:else if typeof permissions.media === "undefined"}
      <div class="bg-gray-300 aspect-video flex justify-center items-center">
        <p class="text-lg">Unable to retrieve camera permissions</p>
      </div>
    {:else}
      <div>
        <h1 class='text-lg'>Raw video from camera device:</h1>
        <video bind:this={video} autoplay muted/>
        <canvas bind:this={canvas} />
      </div>
    {/if}
  </div>
</main>

<style>
</style>
