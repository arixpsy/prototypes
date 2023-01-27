<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { nanoid } from "nanoid";
  import { DateTime } from "luxon";
  import {
    Modal,
    TextInput,
    RadioInput,
    NumberInput,
    SwitchInput,
    ColorRadioInput,
    IncrementInput,
    FormItem,
  } from "@/lib/components/";
  import { counters } from "@/lib/store/counters";
  import {
    RESET_TYPE,
    CounterSchema,
    COUNTER_COLOR,
    type ICounterColor,
    type IResetType,
  } from "@/@types/counters";
  import { fade } from "svelte/transition";

  export let isVisible: boolean = false;

  let title = "";
  let titleRef: HTMLInputElement;
  let type: IResetType = RESET_TYPE.DAY;
  let hasTarget: boolean = false;
  let target: number = 0;
  let targetRef: HTMLInputElement;
  let color: string = COUNTER_COLOR[0];
  let hasCustomIncrement: boolean = false;
  let increment: number = 1;
  const dispatch = createEventDispatcher();

  $: resetTypeValues = Object.entries(RESET_TYPE);
  $: if (isVisible) {
    focusFirstField();
  }
  $: if (hasTarget) {
    focusTargetRef();
  }

  async function focusFirstField() {
    await tick();
    titleRef.focus();
  }

  async function focusTargetRef() {
    await tick();
    targetRef.focus();
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
    try {
      const newCounter = CounterSchema.parse({
        id: nanoid(),
        title,
        resetType: type,
        incrementValue: increment,
        target,
        color,
        createdAt: DateTime.now().toSeconds(),
      });

      $counters = [...$counters, newCounter];
      dispatch("modal-close");
      handleResetForm();
    } catch (error) {
      // TODO: handle error notifs
      console.table(error);
    }
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

  function handleColorRadioSelect(event: CustomEvent<ICounterColor>) {
    color = event.detail;
  }
</script>

<Modal
  {isVisible}
  on:modal-confirm={handleFormSubmit}
  on:modal-cancel={handleFormCancel}
  on:modal-close={handleFormClose}
>
  <p class="text-3xl mb-3">Create</p>

  <form
    on:submit|preventDefault={handleFormSubmit}
    class="flex flex-col space-y-6"
  >
    <FormItem label="What are you counting?">
      <TextInput
        bind:value={title}
        bind:ref={titleRef}
        on:input-submit={handleFormSubmit}
      />
    </FormItem>

    <FormItem label="Resets every:">
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
    </FormItem>

    <FormItem label="Counter increment:">
      <IncrementInput
        bind:value={increment}
        bind:isCustom={hasCustomIncrement}
        on:switch-submit={handleFormSubmit}
      />
    </FormItem>

    <FormItem label="Set a target?">
      <div class="flex flex-wrap items-center gap-3">
        <SwitchInput
          bind:isToggle={hasTarget}
          on:switch-submit={handleFormSubmit}
        />

        {#if hasTarget}
          <div class="flex items-center flex-wrap flex-1 gap-3" transition:fade>
            <p class="text-sm text-gray-500 flex-none">Target:</p>
            <NumberInput
              bind:ref={targetRef}
              bind:value={target}
              class="flex-1"
              on:input-submit={handleFormSubmit}
            />
          </div>
        {/if}
      </div>
    </FormItem>

    <FormItem label="Pick a color:">
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
    </FormItem>

    <input type="submit" class="invisible h-0" />
  </form>
</Modal>
