<script lang="ts">
	import { page } from "$app/stores";
	export let data;
	export let form;
</script>

<div class="sidebar lg:left-0 p-2 w-[250px] overflow-y-auto bg-gray-100 rounded-lg">
   	<div class="h-full px-3 py-2 overflow-y-auto dark:bg-gray-800">
		
		<div class="p-2.5 mt-1 flex items-center">
			<!--Sidebar -->
		</div>
	
		<form method="POST" class="bg-white shadow-md rounded px-3 pt-3 pb-3 mb-4">
			<div class="mb-6">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="projectName"
				>
					Add New Project
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
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					value={form?.projectName ?? ""}
					name="projectName"
					id="projectName"
					type="text"
					placeholder="Project Name"
					pattern="[\w]*"
					required
				/>
			</div>
			<input
				type="hidden"
				id="userEmail"
				name="userEmail"
				value={$page.data.session?.user?.email}
			/>
			<div class="flex">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Add
				</button>
			</div>
		</form>
	</div>
</div>

<div class="p-4">
	<!-- Session Test Info
	<h1>User Page</h1>
	<p>
		This is a protected content. You can access this content because you are
		signed in.
	</p>
	<p>Session expiry: {$page.data.session?.expires}</p>
	-->

	<div class="">
		<h1 class="font-semibold">Projects</h1>
		<ul class="list-disc">
			{#if Array.isArray(data.projects)}
				{#each data.projects as project}
					<li class="list-inside">
						{project}
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>
