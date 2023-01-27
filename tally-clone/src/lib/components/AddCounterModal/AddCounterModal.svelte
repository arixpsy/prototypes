<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { fade } from "svelte/transition";
  import { nanoid } from "nanoid";
  import { DateTime } from "luxon";
  import type { z } from "zod";
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
    type ICounter,
    COUNTER_COLOR,
    type ICounterColor,
    type IResetType,
    CounterFormSchema,
  } from "@/@types/counters";
  import { useForm } from "@/lib/hooks/useForm";

  export let isVisible: boolean = false;

  const {
    form,
    refs,
    errors,
    onSubmit: handleFormSubmit,
    resetForm: handleResetForm,
  } = useForm({
    schema: CounterFormSchema,
    defaultValues: {
      title: "",
      resetType: RESET_TYPE.DAY,
      hasTarget: false,
      target: 0,
      color: COUNTER_COLOR[0],
      hasCustomIncrement: false,
      incrementValue: 1,
    },
    onSubmitCallback(values: z.infer<typeof CounterFormSchema>) {
      const { title, resetType, incrementValue, target, color } = values;
      const newCounter: ICounter = {
        id: nanoid(),
        title,
        resetType,
        incrementValue,
        target,
        color,
        createdAt: DateTime.now().toSeconds(),
      };
      $counters = [...$counters, newCounter];
      dispatch("modal-close");
      handleResetForm();
    },
  });
  const dispatch = createEventDispatcher();

  $: resetTypeValues = Object.entries(RESET_TYPE);
  $: ({ hasTarget } = form);
  $: if (isVisible) {
    focusFirstField();
  }
  $: if (hasTarget) {
    focusTargetRef();
  }

  async function focusFirstField() {
    await tick();
    refs.title?.focus();
  }

  async function focusTargetRef() {
    await tick();
    refs.target?.focus();
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
    form.resetType = event.detail;
  }

  function handleColorRadioSelect(event: CustomEvent<ICounterColor>) {
    form.color = event.detail;
  }
</script>

<Modal
  {isVisible}
  on:modal-confirm={handleFormSubmit}
  on:modal-cancel={handleFormCancel}
  on:modal-close={handleFormClose}
>
  <p class="text-3xl mb-3">Create</p>

  <form on:submit|preventDefault={handleFormSubmit} class="flex flex-col">
    <FormItem label="What are you counting?" errorMessage={$errors.title}>
      <TextInput
        bind:value={form.title}
        bind:ref={refs.title}
        hasError={!!$errors.title}
      />
    </FormItem>

    <FormItem label="Resets every:">
      <div class="flex gap-3 flex-wrap">
        {#each resetTypeValues as [resetKey, resetType] (resetKey)}
          <RadioInput
            name="reset_type"
            bind:group={form.resetType}
            value={resetType}
            on:radio-select={handleRadioSelect}
            on:radio-submit={handleFormSubmit}
          />
        {/each}
      </div>
    </FormItem>

    <FormItem label="Counter increment:">
      <IncrementInput
        bind:value={form.incrementValue}
        bind:isCustom={form.hasCustomIncrement}
        on:switch-submit={handleFormSubmit}
      />
    </FormItem>

    <FormItem label="Set a target?">
      <div class="flex flex-wrap items-center gap-3">
        <SwitchInput
          bind:isToggle={form.hasTarget}
          on:switch-submit={handleFormSubmit}
        />

        {#if form.hasTarget}
          <div class="flex items-center flex-wrap flex-1 gap-3" transition:fade>
            <p class="text-sm text-gray-500 flex-none">Target:</p>
            <NumberInput
              bind:ref={refs.target}
              bind:value={form.target}
              class="flex-1"
            />
          </div>
        {/if}
      </div>
    </FormItem>

    <FormItem label="Pick a color:">
      <div class="flex flex-wrap gap-3 max-w-xl">
        {#each COUNTER_COLOR as counterColor, i (i)}
          <ColorRadioInput
            bind:group={form.color}
            value={counterColor}
            on:radio-select={handleColorRadioSelect}
            on:radio-submit={handleFormSubmit}
          />
        {/each}
      </div>
    </FormItem>

    <input type="submit" class="hidden" />
  </form>
</Modal>
