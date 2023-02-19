<script lang="ts">
  import { Icon } from "@/lib/components";

  export let counterTitle: string = "";
  export let counterValue: number = 0;
  export let counterColor: string = "";
  export let increment: number = 0;
</script>

<div
  class="flex aspect-square flex-col items-center justify-center self-center rounded-lg p-2 {counterColor} w-full max-w-xs"
>
  <p class="w-full truncate text-center text-3xl text-gray-100">
    {counterTitle}
  </p>
  <p class="my-3 flex items-center justify-center space-x-3 text-3xl font-bold">
    <span class="line-through"
      >{counterValue.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      })}</span
    >
    <Icon.ChevronRight />
    <span
      >{(counterValue + increment).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      })}</span
    >
  </p>
</div>
