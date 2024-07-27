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

    <div class="text-medium font-medium">Site {data.site.zone}-{data.site.id}</div>

    <form
      method="POST"
      class="pt-3 pb-3 mb-4"
      action="?/updateSite"
      name="site_{data.site.id}"
    >
      {#if data.site.siteType}
        <div class="text-medium font-medium">{site.siteType}</div>
      {/if}

      <a href="/SHAdmin/site/{data.site.id}">{data.site.zone}-{data.site.id}</a>

      <br/>
      <label for="siteType">Type</label>
      <select name="siteTypes" id="siteType">
        {#each data.siteTypesArr as type}
          <option value="{type}">{type}</option>
        {/each}
      </select>

      {#if data.site.state == 0}
        <div>State: POOR</div>
      {:else if data.site.state == 1}
        <div>State: NORMAL</div>
      {:else if data.site.state == 2}
        <div>State: GOOD</div>
      {/if}

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Update
      </button>
    </form>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
