<script lang="ts">
  import { onMount } from "svelte";

  let video: HTMLVideoElement;
  let permissions = {
    isLoading: true,
    media: undefined,
  };
  let cameraSettings: MediaTrackSettings;

  let canvas: HTMLCanvasElement;
  let canvasHeight: number;
  let canvasWidth: number;
  let canvasResolution = "16/9";
  let canvasFramerate = 30;
  let fpsInterval, startTime, then, now, elapsed, results;
  let frameCount = 0;
  let isDrawing = false;

  const startDrawingVideoToCanvas = (fps: number) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    if (!isDrawing) {
      drawVideoToCanvas();
    }
    isDrawing = true;
  };

  const handleCanvasFramerateChange = () => {
    fpsInterval = 1000 / canvasFramerate;
    then = Date.now();
    startTime = then;
    frameCount = 0;
    results = "";
  };

  const toggleCanvasResolution = () => {
    if (canvasResolution === '16/9') {
      canvasResolution = '9/16'
    } else {
      canvasResolution = '16/9'
    }
  }

  const drawVideoToCanvas = () => {
    requestAnimationFrame(drawVideoToCanvas);

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      if (canvas) {
        const ctx = canvas.getContext("2d");
        const { height, width } = canvas;
        // TODO: Draw image in center of canvas cover full width
        ctx.drawImage(video, 0, 0, width, height);
      }

      const sinceStart = now - startTime;
      const currentFps =
        Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
      results = `Elapsed time: ${
        Math.round((sinceStart / 1000) * 100) / 100
      } seconds @ ${currentFps} fps`;
    }
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
        cameraSettings = stream.getVideoTracks()[0].getSettings();
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
        video.srcObject = stream;
        startDrawingVideoToCanvas(canvasFramerate);
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
      <div class="grid grid-cols-2">
        <div>
          <h1 class="text-lg">Raw video from camera device:</h1>
          <p class="text-sm">Aspect Ratio: {cameraSettings.aspectRatio}</p>
          <p class="text-sm">
            Resolution: {cameraSettings.width} / {cameraSettings.height}
          </p>
          <p class="text-sm">Frame Rate: {cameraSettings.frameRate}</p>
          <video bind:this={video} autoplay muted />
        </div>
        <div>
          <h1 class="text-lg">Canvas Output</h1>
          <p class="text-sm">
            Aspect Ratio: <span
              class="text-blue-600"
              on:click={toggleCanvasResolution}>{canvasResolution}</span
            >
          </p>
          <p class="text-sm">
            Canvas element size: {canvasWidth} / {canvasHeight}
          </p>
          <p class="text-sm">
            Frame Rate: <input
              type="number"
              bind:value={canvasFramerate}
              on:change={handleCanvasFramerateChange}
            />
          </p>
          <p class="text-sm">{results}</p>
          <canvas
            bind:this={canvas}
            bind:clientHeight={canvasHeight}
            bind:clientWidth={canvasWidth}
            style={`aspect-ratio: ${canvasResolution};`}
          />
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  canvas {
    width: 100%;
  }
</style>
