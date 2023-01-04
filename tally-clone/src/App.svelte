<script lang="ts">
  const getTrack = [
    {
      id: 1,
      title: '',
      createdAt: '',
      resetType: '',
      target: '',
      groupId: '',
      color: '',
      incrementValue: undefined,
      latestRecord: {
        incrementValue: 0,
        latestValue: 10,
        createdAt: ''
      },

    }
  ]
</script>

<main class="min-h-screen bg-neutral-800">
  <div class="container mx-auto h-screen pt-12">
    <h1 class='text-lg text-center text-white'>WAICH</h1>
    <div class='grid grid-cols-2 gap-6 p-6 md:grid-cols-8'>
      <div class='aspect-square bg-yellow-400 flex flex-col justify-center items-center rounded-lg p-3'>
        <p class='text-md text-white text-center truncate w-full'>Commits</p>
        <p class='text-xs text-center w-full'>This Month</p>
        <p class='text-4xl text-center font-bold my-2 w-full'>4</p>
        <p class='text-xs text-center w-full'>3 days ago</p>
      </div>

      <div class='aspect-square bg-lime-500 flex flex-col justify-center items-center rounded-lg p-3'>
        <p class='text-md text-white text-center truncate w-full'>Commits</p>
        <p class='text-xs text-center w-full'>This Month</p>
        <p class='text-4xl text-center font-bold my-2 w-full'>4</p>
        <p class='text-xs text-center w-full'>3 days ago</p>
      </div>

      <div class='aspect-square bg-blue-400 flex flex-col justify-center items-center rounded-lg p-3'>
        <p class='text-md text-white text-center truncate w-full'>Commits</p>
        <p class='text-xs text-center w-full'>This Month</p>
        <p class='text-4xl text-center font-bold my-2 w-full'>4</p>
        <p class='text-xs text-center w-full'>3 days ago</p>
      </div>

      <div class='aspect-square bg-slate-400 flex flex-col justify-center items-center rounded-lg p-3'>
        <p class='text-md text-white text-center truncate w-full'>Commits</p>
        <p class='text-xs text-center w-full'>This Month</p>
        <p class='text-4xl text-center font-bold my-2 w-full'>4</p>
        <p class='text-xs text-center w-full'>3 days ago</p>
      </div>
    </div>
  </div>
</main>