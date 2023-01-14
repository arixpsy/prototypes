<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Modal } from "@/lib/components/";
  import { RESET_TYPE, type IResetType } from "@/utils/types";

  let title: string;
  let type: IResetType;
  let target: number;
  let color: string;
  let increment: number;

  const dispatch = createEventDispatcher();

  $: ({ ...ModalProps } = $$props);
  $: resetTypeValues = Object.values(RESET_TYPE);

  function handleFormSubmit(event) {
    dispatch("modal-close");
  }

  export function forwardEvent(event: CustomEvent<any>) {
    switch (event.type) {
      case "modal-submit":
        dispatch("modal-submit");
      case "modal-close":
        dispatch("modal-close");
      case "modal-cancel":
        dispatch("modal-cancel");
      default:
        dispatch(event.type);
    }
  }
</script>

<Modal
  {...ModalProps}
  on:modal-submit={handleFormSubmit}
  on:modal-cancel={forwardEvent}
  on:modal-close={forwardEvent}
>
  <p class="text-lg font-bold text-white">New Counter</p>

  <form on:submit={handleFormSubmit}>
    <input placeholder="Title" type="text" bind:value={title} />
    <select>
      {#each resetTypeValues as type}
        <option value={type}>{type}</option>
      {/each}
    </select>
    <input placeholder="Target" type="number" />
    <input placeholder="Color" type="color" />
    <input placeholder="Increment" type="number" />
  </form>
</Modal>
