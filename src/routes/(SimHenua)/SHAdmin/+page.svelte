<script lang="ts">
  import { page } from "$app/stores";
  export let data;
  export let form;
</script>

<div class="flex items-top justify-center h-screen w-[60%] m-4">

  <!-- LEFT BAR -->
  <div class="bg-gray-100 p-4 w-[300px] rounded">
    <a href="/SHHome">HOME</a>
    <br/>
    <a href="/SHAdmin">ADMIN</a>
    <br/>
  </div>

  <!-- RIGHT/MAIN CONTENT -->
  <div class="p-4">
    <h1 class="text-lg font-semibold pb-3">SimHENUA Admin</h1>

    <div class="text-medium font-medium">Parks</div>

    <ul>
      {#each data.game.parks as park}
        <li>
          <form method="POST" class="pt-3 pb-3 mb-4" action="?/updatePark">
            <label
              class="gray-700 text-sm font-medium mb-2 pr-2"
              for="parkName"
            >
              <a href="/SHAdmin/{park.id}">Park {park.id}</a>:
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
              class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={form?.parkName ?? park.name}
              name="parkName"
              id="parkName"
              type="text"
              pattern="[\w ]*"
              required
            />

            <input
              type="hidden"
              id="parkId"
              name="parkId"
              value={park.id}
            />

            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>

            <button
              class="bg-red-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              formaction="?/deletePark"
            >
              Delete
            </button>
          </form>
        </li>
      {/each}
    </ul>

    <form method="POST" class="pt-3 pb-3 mb-4" action="?/addPark">
      <label
        class="text-gray-700 text-sm font-medium mb-2 pr-2"
        for="parkName"
      >
        Add New Park:
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
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={form?.parkName ?? ""}
        name="parkName"
        id="parkName"
        type="text"
        placeholder="Park Name"
        pattern="[\w ]*"
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
