<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { DateTime } from "luxon";
  import { nanoid } from "nanoid";
  import type { z } from "zod";
  import { records } from "@/lib/store/records";
  import { labels } from "@/lib/store/labels";
  import {
    IncrementPreviewTile,
    Modal,
    CustomLabelInput,
    FormItem,
    NumberInput,
    TextInput,
  } from "@/lib/components";
  import {
    RecordFormSchema,
    type CustomIncrementEvent,
    type IRecord,
  } from "@/@types/records";
  import { useForm } from "@/lib/hooks/useForm";

  export let customIncrementEvent: CustomIncrementEvent | undefined;
  export let isVisible: boolean;

  const {
    form,
    refs,
    errors,
    onSubmit: handleFormSubmit,
    resetForm: handleResetForm,
  } = useForm({
    schema: RecordFormSchema,
    defaultValues: {
      incrementValue: 1,
      labels: [],
      description: "",
    },
    onSubmitCallback(values: z.infer<typeof RecordFormSchema>) {
      const counterId = customIncrementEvent?.counterId;
      if (!counterId) return;
      const { incrementValue, labels: recordLabels, description } = values;
      const newRecord: IRecord = {
        id: nanoid(),
        counterId,
        incrementValue,
        latestValue: counterValue + incrementValue,
        createdAt: DateTime.now().toSeconds(),
        labels: recordLabels,
        description,
      };

      $labels = [...new Set([...$labels, ...recordLabels])];
      $records = [newRecord, ...$records];

      dispatch("modal-close");
      handleResetForm();
    },
  });
  const dispatch = createEventDispatcher();

  $: counterValue = customIncrementEvent?.latestValue || 0;
  $: counterTitle = customIncrementEvent?.counterTitle || "";
  $: counterColor = customIncrementEvent?.counterColor || "";
  $: if (isVisible) {
    focusFirstField();
  }

  async function focusFirstField() {
    await tick();
    refs.incrementValue?.focus();
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
  <p class="mb-3 w-72 text-3xl">Add</p>

  <form on:submit|preventDefault={handleFormSubmit} class="flex flex-col">
    <FormItem label="What amount?" errorMessage={$errors.incrementValue}>
      <NumberInput
        bind:value={form.incrementValue}
        bind:ref={refs.incrementValue}
        hasError={!!$errors.incrementValue}
      />
    </FormItem>

    <FormItem label="Short description:">
      <TextInput bind:value={form.description} />
    </FormItem>

    <FormItem label="Labels:">
      <CustomLabelInput
        bind:value={form.labels}
        on:input-submit={handleFormSubmit}
      />
    </FormItem>

    <FormItem label="Preview:">
      <IncrementPreviewTile
        {counterTitle}
        {counterValue}
        {counterColor}
        increment={form.incrementValue}
      />
    </FormItem>

    <input type="submit" hidden />
  </form>
</Modal>
