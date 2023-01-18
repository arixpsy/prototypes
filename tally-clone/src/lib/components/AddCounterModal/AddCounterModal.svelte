<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    Modal,
    TextInput,
    RadioInput,
    NumberInput,
    SwitchInput,
    ColorRadioInput,
    IncrementInput,
  } from "@/lib/components/";
  import { COUNTER_COLOR, RESET_TYPE, type IResetType } from "@/utils/types";

  let title = "";
  let titleRef: HTMLInputElement;
  let type: IResetType = RESET_TYPE.DAY;
  let hasTarget: boolean = false;
  let target: number = 0;
  let color: string = COUNTER_COLOR[0];
  let hasCustomIncrement: boolean = false;
  let increment: number = 1;
  const dispatch = createEventDispatcher();

  $: ({ isVisible, ...ModalProps } = $$props);
  $: resetTypeValues = Object.entries(RESET_TYPE);
  $: if (isVisible) {
    titleRef.focus();
  }

  function handleResetForm() {
    title = "";
    type = "Day";
    hasTarget = false;
    target = 0;
    color = COUNTER_COLOR[0];
    hasCustomIncrement = false;
    increment = 1;
  }

  function handleFormSubmit() {
    console.log(title);
    console.log(type);
    console.log(hasTarget);
    console.log(target);
    console.log(color);
    console.log(increment);

    handleResetForm();
    dispatch("modal-close");
  }

  function handleFormCancel() {
    dispatch("modal-cancel");
    handleResetForm();
  }

  function handleFormClose() {
    dispatch("modal-close");
    handleResetForm();
  }

  function handleRadioSelect(event: CustomEvent<IResetType>) {
    type = event.detail;
  }

  function handleColorRadioSelect(event: CustomEvent<IResetType>) {
    color = event.detail;
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

  <form
    on:submit|preventDefault={handleFormSubmit}
    class="flex flex-col space-y-6"
  >
    <div class="flex flex-col">
      <p class="text-sm text-gray-500 mb-3">What are you counting?</p>
      <TextInput bind:value={title} bind:ref={titleRef} />
    </div>

    <div class="flex flex-col">
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
    <div class="flex flex-col">
      <p class="text-sm text-gray-500 mb-3">Counter Increment:</p>
      <IncrementInput
        bind:value={increment}
        bind:isCustom={hasCustomIncrement}
      />
    </div>

    <div class="flex flex-col">
      <p class="text-sm text-gray-500 mb-3">Set a target?</p>
      <div class="flex flex-wrap items-center gap-3">
        <SwitchInput
          bind:isToggle={hasTarget}
          on:switch-submit={handleFormSubmit}
        />

        <div
          class="flex items-center flex-wrap flex-1 gap-3 transition-opacity"
          class:opacity-0={!hasTarget}
          class:pointer-events-none={!hasTarget}
        >
          <p class="text-sm text-gray-500 flex-none">Target:</p>
          <NumberInput
            bind:value={target}
            class="flex-1"
            tabIndex={hasTarget ? 0 : -1}
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <p class="text-sm text-gray-500 mb-3">Pick a color:</p>
      <div class="flex flex-wrap gap-3 max-w-xl">
        {#each COUNTER_COLOR as counterColor, i (i)}
          <ColorRadioInput
            bind:group={color}
            value={counterColor}
            on:radio-select={handleColorRadioSelect}
            on:radio-submit={handleFormSubmit}
          />
        {/each}
      </div>
    </div>

    <input type="submit" class="invisible h-0" />
  </form>
</Modal>
