<script>
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {HTMLFormElement} */
	let form_element;

	/** @type {import('./$types').Snapshot<Record<string, FormDataEntryValue>>} */
	export const snapshot = {
		capture: () => {
			const data = new FormData(form_element);
			return Object.fromEntries(data);
		},
		restore: (value) => {
			for (const control of form_element.elements) {
				const name = control.getAttribute('name');
				if (name) /** @type {any} */ (control).value = value[name];
			}
		}
	};
</script>

<form bind:this={form_element} method="post">
	<input type="text" name="title" placeholder="Title" required />
	<textarea name="desc" rows="3" placeholder="Description" />

	<button>Add</button>
</form>

<p>Todo List</p>
<ol>
	{#each data.todo_list as todo}
		<li>
			<p>{todo.title}</p>
			<em>{todo.desc}</em>
		</li>
	{:else}
		<em>Empty</em>
	{/each}
</ol>

<style>
	form {
		margin: 2.5rem;
	}
	form > * {
		display: block;
		margin: 0.25rem;
	}
</style>
