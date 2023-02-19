<script lang="ts">
  import type { IRecord } from "@/@types/records";
  import { records } from "@/lib/store/records";
  import { counters } from "@/lib/store/counters";
  import { DateTime } from "luxon";
  import { fade, fly } from "svelte/transition";
  import { spring } from "svelte/motion";
  import { drag } from "@/lib/actions/drag";
  import { Icon } from "@/lib/components";

  export let record: IRecord;
  export let index: number;

  let coords = spring({ x: 0 }, { stiffness: 0.05, damping: 0.5 });
  let width: number;
  let isDragged: boolean = false;

  $: prevRecordDate = DateTime.fromSeconds($records[index - 1]?.createdAt || 0);
  $: recordDate = DateTime.fromSeconds(record.createdAt);
  $: counter = $counters.find((c) => c.id === record.counterId);
  $: isSameDayAsPrevRecord =
    prevRecordDate.startOf("day").toSeconds() ===
    recordDate.startOf("day").toSeconds();

  function handleSlideStart() {
    coords.stiffness = coords.damping = 1;
    coords.set($coords);
    isDragged = true;
  }

  function handleSlideMove(event: CustomEvent<{ dx: number; dy: number }>) {
    if (event.detail.dx < 0) {
      coords.update(($coords) => ({
        x: $coords.x + event.detail.dx,
      }));
    } else if ($coords.x < 0 && $coords.x + event.detail.dx < 0) {
      coords.update(($coords) => ({
        x: $coords.x + event.detail.dx,
      }));
    }
  }

  function handleSlideEnd() {
    coords.stiffness = 0.05;
    coords.damping = 0.5;
    coords.set({ x: 0 });
    isDragged = false;
  }

  $: if ($coords.x * -1 >= 70 && !isDragged) {
    $records = [...$records.filter((r) => r.id !== record.id)];
  }
  $: maxDragCoords = Math.max($coords.x, -70);
</script>

<div class="relative mb-3 overflow-x-hidden" bind:offsetWidth={width}>
  <!-- DELETE ICON LAYER-->
  <div class="absolute left-full top-0 bottom-0 z-30 flex items-center">
    <div
      class="aspect-square rounded-full bg-red-400 p-1 text-white"
      style="transform: translate3d({maxDragCoords}px, 0, 0); opacity: {(maxDragCoords *
        -1) /
        70}"
    >
      <Icon.Cross />
    </div>
  </div>

  <!-- DRAGGABLE AREA -->
  <div
    use:drag
    on:dragstart={() => {
      handleSlideStart();
    }}
    on:dragmove={handleSlideMove}
    on:dragend={handleSlideEnd}
    class="absolute top-0 bottom-0 right-0 z-30 w-12 hover:cursor-grab active:cursor-grabbing"
  />

  <!-- CONTENT LAYER -->
  <div
    class="relative z-20 grid select-none grid-cols-[100px_1fr] bg-white px-3 py-2"
    style="transform: translate3d({maxDragCoords}px, 0, 0)"
  >
    <p class="whitespace-nowrap text-sm font-bold" transition:fade>
      {recordDate.toFormat("h:mm a")}
    </p>
    <div
      class="w-full space-y-3"
      in:fly={{ x: 200, delay: index * 50 }}
      out:fade
    >
      <div
        class="w-max whitespace-nowrap rounded-md px-2 py-0.5 text-sm text-white"
        style="background-color: {counter?.color}"
      >
        +{record.incrementValue}
        {counter?.title}
      </div>
      {#if record.description}
        <div class="text-sm">
          {record.description}
        </div>
      {/if}

      {#if record.labels.length}
        <div class="flex flex-wrap gap-1 text-sm">
          {#each record.labels as label (label)}
            <span
              class="rounded-full border-2 border-gray-400 py-0.5 px-3 text-gray-400"
              >{label}</span
            >
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
