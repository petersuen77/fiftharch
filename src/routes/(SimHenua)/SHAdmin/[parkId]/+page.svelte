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

    <div class="text-medium font-medium">Park {data.id}</div>
    <div class="text-medium font-medium">{data.name}</div>

    <!--List of Sites -->
    <br/>
    <div class="text-medium font-medium">Sites</div>
    <ul>
      {#each data.sites as site}
        <li>
          <form method="POST" class="pt-3 pb-3 mb-4" action="?/updateSite" name="site_{site.id}">
            <label
              class="gray-700 text-sm font-medium mb-2 pr-2"
              for="site{site.id}"
            >
              <a href="/SHAdmin/{data.id}/{site.id}">{site.zone}-{site.id}</a
              >:
            </label>

            {#if form?.error && form?.siteId==site.id}
              <p
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {form.error}
              </p>
            {/if}

            <input
              class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-10"
              value={site.zone}
              name="siteZone"
              id="siteZone"
              type="text"
              pattern="[A-Z]"
              required
            />
            -
            <input
              class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-14"
              value={site.id}
              name="siteId"
              id="siteId"
              type="text"
              pattern="[0-9]*"
              required
            />

            <input type="hidden" id="parkId" name="parkId" value={data.id} />
            <input type="hidden" id="existingSiteId" name="existingSiteId" value={site.id} />

            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>

            <button
              class="bg-red-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              formaction="?/deleteSite"
            >
              Delete
            </button>
          </form>
        </li>
      {/each}
    </ul>

    <form method="POST" class="pt-3 pb-3 mb-4" action="?/addSite">
      <label class="text-gray-700 text-sm font-medium mb-2 pr-2" for="newSite">
        Add New Site:
      </label>

      {#if form?.error && form?.addSiteId}
        <p
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {form.error}
        </p>
      {/if}

      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-10"
        value={form?.addSiteZone ?? ""}
        name="addSiteZone"
        id="addSiteZone"
        type="text"
        placeholder="A"
        pattern="[A-Z]"
        required
      />
      -
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-14"
        value={form?.addSiteId ?? "0"}
        name="addSiteId"
        id="addSiteId"
        type="text"
        pattern="[0-9]*"
        required
      />

      <input type="hidden" id="addParkId" name="addParkId" value={data.id} />

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add
      </button>
    </form>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
