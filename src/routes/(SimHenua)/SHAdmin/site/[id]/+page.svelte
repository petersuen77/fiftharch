<script lang="ts">
  import { page } from "$app/stores";
  export let data;
  export let form;
</script>

<div class="flex items-top justify-center h-screen w-[60%] m-4">
  <!-- LEFT BAR -->
  <div class="bg-gray-100 p-4 w-[300px] rounded"></div>

  <!-- RIGHT/MAIN CONTENT -->
  <div class="p-4">
    <h1 class="text-lg font-semibold pb-3">SimHENUA Admin</h1>

    <div class="text-medium font-medium">Site {data.zone}-{data.id}</div>

    {#if data.siteType}
    <div class="text-medium font-medium">{data.siteType}</div>
    {/if}

    <a href="/SHAdmin/site/{data.id}">{data.zone}-{data.id}</a>

    {#if data.state == 0}
      <div>State: POOR</div>
    {:else if data.state == 1}
      <div>State: NORMAL</div>
    {:else if data.state == 2}
      <div>State: GOOD</div>
    {/if}
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
