<script lang="ts">
  import Portal from "svelte-portal";
  import Button from "./../Button/Button.svelte";

  export let isVisible: boolean;
  export let width = 96;
  export let confirmText = "Confirm";
  export let cancelText = "Cancel";
  export let onConfirm = () => {};
  export let onCancel = () => {};
</script>

<Portal target="body">
  <div
    class="fixed inset-0 flex justify-center items-center"
    class:opacity-0={!isVisible}
    class:pointer-events-none={!isVisible}
  >
    <div class="absolute bg-black opacity-50 h-full w-full" />
    <div
      class={`absolute bg-neutral-800 rounded-lg w-full h-full md:w-${width} md:h-fit md:max-h-full flex flex-col`}
    >
      <!-- Content -->
      <div class="p-6 h-full overflow-auto">
        <slot />
      </div>

      <!-- Footer -->
      <div class="p-6 flex space-x-6 h-24">
        <Button text={cancelText} on:click={onCancel} block />
        <Button text={confirmText} color="primary" on:click={onConfirm} block />
      </div>
    </div>
  </div>
</Portal>
