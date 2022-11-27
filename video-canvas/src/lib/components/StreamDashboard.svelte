<script lang="ts">
  import { onMount, tick } from "svelte";
  import { MediaSwitcher } from "./../utils/classes/MediaSwitcher";
  import { readable } from "svelte/store";

  let mediaSwitcher: MediaSwitcher;
  let videoElement: HTMLVideoElement;

  let cameraSettings: MediaTrackSettings;

  let canvasElement: HTMLCanvasElement;
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

  const drawVideoToCanvas = () => {
    requestAnimationFrame(drawVideoToCanvas);

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      if (canvasElement) {
        const ctx = canvasElement.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        const { height: cHeight, width: cWidth } = canvasElement;
        const { height: vHeight, width: vWidth } = cameraSettings;

        const ratio = cWidth / cHeight;
        const x_of_video = 0;

        const target_width = vWidth;
        const target_height = vWidth / ratio;
        const y_of_video = (vHeight - target_height) / 2;

        ctx.drawImage(
          videoElement,
          x_of_video,
          y_of_video,
          target_width,
          target_height,
          0,
          0,
          cWidth,
          cHeight
        );
      }

      const sinceStart = now - startTime;
      const currentFps =
        Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
      results = `Elapsed time: ${
        Math.round((sinceStart / 1000) * 100) / 100
      } seconds @ ${currentFps} fps`;
    }
  };
  const onVideoLoaded = (input: MediaStream) => {
    videoElement.srcObject = input;
    startDrawingVideoToCanvas(canvasFramerate);
  };

  onMount(async () => {
    const initialStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    mediaSwitcher = new MediaSwitcher(initialStream, onVideoLoaded);
    cameraSettings = initialStream.getVideoTracks()[0].getSettings();
  });
</script>

<div class="grid grid-cols-2 gap-y-3">
  <div>
    <h1 class="text-lg">Raw video from camera device:</h1>
    <p class="text-sm">Aspect Ratio: {cameraSettings?.aspectRatio}</p>
    <p class="text-sm">
      Resolution: {cameraSettings?.width} / {cameraSettings?.height}
    </p>
    <p class="text-sm">Frame Rate: {cameraSettings?.frameRate}</p>
    <video bind:this={videoElement} autoplay muted />
  </div>
  <div>
    <h1 class="text-lg">Canvas Output</h1>
    <p class="text-sm">
      Aspect Ratio:{canvasResolution}
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
      bind:this={canvasElement}
      bind:clientHeight={canvasHeight}
      bind:clientWidth={canvasWidth}
      class="aspect-video "
    />
  </div>
</div>

<style>
  video {
    width: 100%;
    height: auto;
  }

  canvas {
    width: 100%;
    height: auto;
  }
</style>
