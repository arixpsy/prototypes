<script lang="ts">
  import Portal from "svelte-portal";
  import { createEventDispatcher } from "svelte";
  import { Button } from "@/lib/components";

  export let isVisible = false;
  export let confirmText = "Confirm";
  export let cancelText = "Cancel";

  const dispatch = createEventDispatcher<any>();

  function handleKeyUp(e: KeyboardEvent) {
    if (e.keyCode === 27) handleClose();
  }

  function handleOnConfirm() {
    dispatch("modal-confirm");
  }

  function handleClose() {
    dispatch("modal-close");
  }

  function handleCancel() {
    dispatch("modal-cancel");
  }
</script>

<Portal target="body">
  <div
    class="fixed inset-0 flex justify-center items-center transition-opacity duration-300"
    class:opacity-0={!isVisible}
    class:pointer-events-none={!isVisible}
    on:keyup={handleKeyUp}
  >
    <div
      class="absolute bg-black opacity-50 h-full w-full"
      on:click={handleClose}
      on:keypress={() => {}}
    />
    <div
      class={`absolute bg-white rounded-lg h-full max-h-full sm:h-fit w-full sm:w-fit flex flex-col`}
    >
      <!-- Content -->
      <div class="p-6 h-full overflow-auto">
        <slot />
      </div>

      <!-- Footer -->
      <div class="p-6 flex space-x-6 h-24">
        <Button text={cancelText} on:click={handleCancel} block />
        <Button
          text={confirmText}
          color="primary"
          on:click={handleOnConfirm}
          block
        />
      </div>
    </div>
  </div>
</Portal>
