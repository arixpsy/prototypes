<script lang="ts">
  import type { IButtonColor } from "./types";

  export let text = "";
  export let color: IButtonColor = "default";
  export let block = false;

  const colorClasses: Record<IButtonColor, string> = {
    default: "text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-black",
    primary: "text-pink-100 bg-blue-600 hover:bg-blue-700 hover:text-white",
  };

  const buttonTextClasses = "font-bold text-sm text-center";
  
  const buttonContainerClasses = `px-4 py-3 rounded-lg transition-colors`;

  const buttonClasses = `${buttonContainerClasses} ${buttonTextClasses} ${colorClasses[color]}`
</script>

<button
  on:click
  class={buttonClasses}
  class:w-full={block}
>
  {text}
</button>
