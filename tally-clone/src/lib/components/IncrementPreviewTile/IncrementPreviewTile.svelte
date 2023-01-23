<script lang="ts">
  export let counterTitle: string = "";
  export let counterValue: number = 0;
  export let counterColor: string = "";
  export let increment: number = 0;
</script>

<div
  class="aspect-square flex flex-col justify-center items-center self-center rounded-lg p-2 {counterColor} w-full max-w-xs"
>
  <p class="text-3xl text-gray-100 text-center truncate w-full">
    {counterTitle}
  </p>
  <p class="flex items-center space-x-3 justify-center text-3xl font-bold my-3">
    <span class="line-through">{counterValue}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>

    <span>{counterValue + increment}</span>
  </p>
</div>
