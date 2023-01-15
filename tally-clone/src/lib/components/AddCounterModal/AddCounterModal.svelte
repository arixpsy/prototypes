<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Modal, TextInput, RadioInput } from "@/lib/components/";
  import { RESET_TYPE, type IResetType } from "@/utils/types";
  import SwitchInput from "@/lib/components/SwitchInput/SwitchInput.svelte";

  let title = "";
  let titleRef: HTMLInputElement;
  let type: IResetType = "Day";
  let hasTarget: boolean = false;
  let target: number = 0;
  let color: string;
  let increment: number;
  const dispatch = createEventDispatcher();

  $: ({ isVisible, ...ModalProps } = $$props);
  $: resetTypeValues = Object.entries(RESET_TYPE);
  $: if (isVisible) {
    titleRef.focus();
  }

  function handleResetForm() {
    title = "";
    type = "Day";
  }

  function handleFormSubmit() {
    console.log(title);
    console.log(type);
    console.log(hasTarget);

    handleResetForm();
    dispatch("modal-close");
  }

  function handleFormCancel() {
    handleResetForm();
    dispatch("modal-cancel");
  }

  function handleFormClose() {
    handleResetForm();
    dispatch("modal-close");
  }

  function handleRadioSelect(event: CustomEvent<IResetType>) {
    type = event.detail;
  }
</script>

<Modal
  {isVisible}
  {...ModalProps}
  on:modal-confirm={handleFormSubmit}
  on:modal-cancel={handleFormCancel}
  on:modal-close={handleFormClose}
>
  <p class="text-3xl mb-3">NEW</p>

  <form on:submit|preventDefault={handleFormSubmit} class="flex flex-col">
    <div class="flex flex-col my-3">
      <p class="text-sm text-gray-500 mb-3">What are you counting?</p>
      <TextInput bind:value={title} bind:ref={titleRef} />
    </div>
    <div class="flex flex-col my-3">
      <p class="text-sm text-gray-500 mb-3">Resets every:</p>
      <div class="flex gap-3 flex-wrap">
        {#each resetTypeValues as [resetKey, resetType] (resetKey)}
          <RadioInput
            name="reset_type"
            bind:group={type}
            value={resetType}
            on:radio-select={handleRadioSelect}
            on:radio-submit={handleFormSubmit}
          />
        {/each}
      </div>
    </div>
    <div class="flex flex-col my-3">
      <p class="text-sm text-gray-500 mb-3">Set a target?</p>
      <div class="flex flex-wrap items-center gap-3">
        <SwitchInput
          isToggle={hasTarget}
          on:switch-toggle={() => (hasTarget = !hasTarget)}
          on:switch-submit={handleFormSubmit}
        />
        <div
          class="flex items-center gap-3 transition-opacity"
          class:opacity-0={!hasTarget}
        >
          <p class="text-sm text-gray-500">Target:</p>
        </div>
      </div>
    </div>
    <!-- <input placeholder="Color" type="color" />
    <input placeholder="Increment" type="number" /> -->
    <input type="submit" class="invisible h-0" />
  </form>
</Modal>
