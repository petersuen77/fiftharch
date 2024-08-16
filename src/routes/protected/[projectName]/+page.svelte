<script lang="ts">
	import { page } from '$app/stores';

	export let data;
	export let form;
	
	let deleteConfirmed:boolean = false;
	
</script>

<!--Sidebar -->
<div
	class="sidebar lg:left-0 p-2 w-[250px] overflow-y-auto bg-gray-100 rounded-lg"
>
	<div class="h-full px-3 py-2 overflow-y-auto dark:bg-gray-800">
		<div class="p-2.5 mt-1 flex items-center"></div>

		<form
			method="POST"
			class="bg-white shadow-md rounded px-3 pt-3 pb-3 mb-4"
		>
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
					class="buttonPrimary inline-block align-middle"
					type="submit"
					formaction="?/addProject"
				>
					<img
						src="/icons/expand-plus-icon.png"
						alt="+"
						class="inline-block"
					/>
					<span class="align-middle pl-1">Add</span>
				</button>
			</div>
		</form>
	</div>
</div>

<div class="p-4">
	<h1>{$page.error?.message ?? ''}</h1>
	<form method="POST" class="px-3 pb-3 mb-4">
		<h1 class="font-semibold text-xl">{data.prj.name}</h1>
		
		<input
			type="hidden"
			id="userEmail"
			name="userEmail"
			value={$page.data.session?.user?.email}
		/>
		<input
			type="hidden"
			id="projectName"
			name="projectName"
			value={$page.params.projectName}
		/>

		<br/>
		<button
			class="buttonPrimary inline-block align-middle"
			type="submit"
			formaction="?/deleteProject"
			disabled={!deleteConfirmed}
		>
			<img
				src="/icons/close-window-icon.png"
				alt=" "
				class="inline-block"
			/>
			<span class="align-middle pl-1">Delete Project</span>
		</button>

		<div class="pl-1">
			<input type="checkbox" id="confirm_delete"  on:click={() => deleteConfirmed=!deleteConfirmed}>
			<label for="confirm_delete">Confirm Delete</label>
		</div>
	</form>
</div>
