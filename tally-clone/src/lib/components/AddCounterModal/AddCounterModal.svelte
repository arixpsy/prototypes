<script lang="ts">
  import { Modal } from "@/lib/components/";

  $: ({ ...ModalProps } = $$props);
</script>

<Modal {...ModalProps}>
  <p class="text-lg font-bold text-white">New Counter</p>
  <input placeholder="Title" type='text' />
  <select>
    <option value='day'>Day</option>
    <option value='week'>Week</option>
    <option value='month'>Month</option>
    <option value='year'>Year</option>
    <option value='never'>Never</option>
  </select>
  <input placeholder="Group" type='text' />
  <input placeholder="Target" type='number' />
  <input placeholder="Color" type='color' />
  <input placeholder='Increment' type='number' />
</Modal>