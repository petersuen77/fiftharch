<script lang="ts">
  import { page } from "$app/stores";
  export let data;
  export let form;

  data.name = "Park Matthew";
  data.id = 100;
  data.sites = [ {"zone":'A', "id":1}, {"zone":'B', "id":10},  {"zone":'C', "id":93} ];

</script>

<div class="flex items-top justify-center h-screen w-[60%] m-4">
  
  <!-- LEFT BAR -->
  <div class="bg-gray-100 p-4 w-[300px] rounded"></div>

  <!-- RIGHT/MAIN CONTENT -->
  <div class="p-4">
    <h1 class="text-lg font-semibold pb-3">SimHENUA Admin</h1>

    <div class="text-medium font-medium">Park {data.id}</div>
    <div class="text-medium font-medium">{data.name}</div>

    <br/>
    <div class="text-medium font-medium">Sites</div>

    <!--List of Sites -->
    <ul>
      {#each data.sites as site}
        <li>
          {site.zone}-{site.id}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
