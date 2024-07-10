<script lang="ts">
  import { page } from "$app/stores";
  export let data;
  export let form;

  data.name = "Park Matthew";
  data.id = 100;
  data.sites = [
    { zone: "A", id: 1 },
    { zone: "B", id: 10 },
    { zone: "C", id: 93 },
  ];
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
    <ul>
      {#each data.sites as site}
        <li>
          <form method="POST" class="pt-3 pb-3 mb-4" action="?/updateSite">
            <label
              class="gray-700 text-sm font-medium mb-2 pr-2"
              for="parkName"
            >
              <a href="/SHAdmin/site/{data.id}#{site.id}"
                >{site.zone}-{site.id}</a
              >:
            </label>

            {#if form?.error}
              <p
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {form.error}
              </p>
            {/if}

            <input
              class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-10"
              value={form?.siteZone ?? site.zone}
              name="siteZone"
              id="siteZone"
              type="text"
              pattern="[A-Z]"
              required
            />
            -
            <input
              class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-14"
              value={form?.siteId ?? site.id}
              name="siteId"
              id="siteId"
              type="text"
              pattern="[0-9]*"
              required
            />

            <input type="hidden" id="parkId" name="parkId" value={data.id} />

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

      {#if form?.error}
        <p
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {form.error}
        </p>
      {/if}

      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-10"
        value={form?.siteZone ?? ""}
        name="siteZone"
        id="siteZone"
        type="text"
        placeholder="A"
        pattern="[A-Z]"
        required
      />
      -
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-14"
        value={form?.siteId ?? "0"}
        name="siteId"
        id="siteId"
        type="text"
        pattern="[0-9]*"
        required
      />

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
