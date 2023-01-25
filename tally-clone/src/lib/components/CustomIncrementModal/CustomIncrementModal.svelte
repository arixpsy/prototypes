<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { nanoid } from "nanoid";
  import { records } from "@/lib/store/records";
  import { labels } from "@/lib/store/labels";
  import {
    IncrementPreviewTile,
    Modal,
    CustomLabelInput,
  } from "@/lib/components";
  import NumberInput from "@/lib/components/NumberInput/NumberInput.svelte";
  import TextInput from "@/lib/components/TextInput/TextInput.svelte";
  import { RecordSchema, type CustomIncrementEvent } from "@/utils/types";
  import { DateTime } from "luxon";

  export let customIncrementEvent: CustomIncrementEvent | undefined;
  export let isVisible: boolean;

  let increment: number = 1;
  let incrementRef: HTMLInputElement;
  let description: string = "";
  let recordLabels: Array<string> = [];
  const dispatch = createEventDispatcher();

  $: counterValue = customIncrementEvent?.latestValue || 0;
  $: counterTitle = customIncrementEvent?.counterTitle || "";
  $: counterColor = customIncrementEvent?.counterColor || "";
  $: if (isVisible) {
    focusFirstField();
  }

  async function focusFirstField() {
    await tick();
    incrementRef.focus();
  }

  function handleResetForm() {
    increment = 1;
    description = "";
    recordLabels = [];
  }

  function handleFormSubmit() {
    try {
      const newRecord = RecordSchema.parse({
        id: nanoid(),
        counterId: customIncrementEvent?.counterId,
        incrementValue: increment,
        latestValue: counterValue + increment,
        createdAt: DateTime.now().toSeconds(),
        labels: recordLabels,
        description,
      });

      $labels = [...new Set([...$labels, ...recordLabels])];
      $records = [newRecord, ...$records];

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
</script>

<Modal
  {isVisible}
  on:modal-confirm={handleFormSubmit}
  on:modal-cancel={handleFormCancel}
  on:modal-close={handleFormClose}
>
  <p class="text-3xl mb-3 w-72">Add</p>

  <form
    on:submit|preventDefault={handleFormSubmit}
    class="flex flex-col space-y-6"
  >
    <div class="flex flex-col">
      <p class="text-sm text-gray-500 mb-3">What amount?</p>
      <NumberInput
        bind:value={increment}
        bind:ref={incrementRef}
        on:input-submit={handleFormSubmit}
      />
    </div>

    <div class="flex flex-col">
      <p class="text-sm text-gray-500 mb-3">Short description:</p>
      <TextInput bind:value={description} on:input-submit={handleFormSubmit} />
    </div>

    <div class="flex flex-col">
      <p class="text-sm text-gray-500 mb-3">Labels:</p>
      <CustomLabelInput
        bind:value={recordLabels}
        on:input-submit={handleFormSubmit}
      />
    </div>

    <div class="flex flex-col">
      <p class="text-sm text-gray-500 mb-3">Preview:</p>
      <IncrementPreviewTile
        {counterTitle}
        {counterValue}
        {counterColor}
        {increment}
      />
    </div>
  </form>
</Modal>
