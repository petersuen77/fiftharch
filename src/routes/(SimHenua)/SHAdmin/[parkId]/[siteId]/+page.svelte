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

    <div class="text-medium font-medium">
      Site {data.site.zone}-{data.site.id}
    </div>

    <form
      method="POST"
      class="pt-3 pb-3 mb-4"
      action="?/updateSite"
      name="site_{data.site.id}"
    >
      <input type="hidden" id="parkId" name="parkId" value={data.parkId} />
      <input
        type="hidden"
        id="siteId"
        name="existingSiteId"
        value={data.site.id}
      />

      <label class="gray-700 text-sm font-medium mb-2 pr-2" for="siteZone">Site Zone:</label>
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-10"
        value={data.site.zone}
        name="siteZone"
        id="siteZone"
        type="text"
        pattern="[A-Z]"
        required
      />
      <br/>
      
      <br/>
      <label class="gray-700 text-sm font-medium mb-2 pr-2" for="siteZone">Site ID:</label>
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-14"
        value={data.site.id}
        name="siteId"
        id="siteId"
        type="text"
        pattern="[0-9]*"
        required
      />
      <br/>

      <br />
      <label for="siteType">Type:</label>
      <img src="/Site_{data.site?.siteType}.png" alt="{data.site?.siteType}" width="300" class="border-2" />
      <select name="siteType" id="siteType">
        {#each data.siteTypesArr as type}
          {#if data.site.siteType == type}
            <option selected value={type}>{type}</option>
          {:else}
            <option value={type}>{type}</option>
          {/if}
        {/each}
      </select>
      <br/>

      <br />
      <label for="siteState">State:</label>
      <select name="siteState" id="siteState">
        {#each data.siteStatesArr as state}
          {#if data.site.state == state}
            <option selected value={state}>{state}</option>
          {:else}
            <option value={state}>{state}</option>
          {/if}
        {/each}
      </select>
      <br/>

      <br/>
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
