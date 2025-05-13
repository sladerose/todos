<script lang="ts">
	import { onMount } from 'svelte';

	// Import the todos store and functions for CRUD operations
	import { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } from '$lib/stores/todos';
	import type { Todo } from '$lib/stores/todos';
	type ExtendedTodo = Todo & { priority: string; due_date: string | null; category: string };

	// Local input value for the new to-do
	let newTodo = {
		content: '',
		priority: 'Medium',
		due_date: '',
		category: ''
	};

	let search = '';
	let filterPriority = 'All';
	let filterCategory = 'All';

	$: filteredTodos = $todos.filter(
		(todo) =>
			todo.content.toLowerCase().includes(search.toLowerCase()) &&
			(filterPriority === 'All' || todo.priority === filterPriority) &&
			(filterCategory === 'All' || todo.category === filterCategory)
	);

	// Fetch the current user's todos when the component mounts
	onMount(() => {
		fetchTodos();
	});

	// Add a new todo and clear the input field
	async function handleAdd() {
		if (newTodo.content.trim()) {
			await addTodo(
				newTodo.content.trim(),
				newTodo.priority,
				newTodo.due_date || null,
				newTodo.category
			);
			newTodo = { content: '', priority: 'Medium', due_date: '', category: '' };
		}
	}
</script>

<div class="min-h-screen bg-white text-black">
	<!-- Page title -->
	<h1>📝 To-Do List</h1>

	<!-- New to-do input and add button -->
	<div class="form-wrapper">
		<input
			type="text"
			bind:value={newTodo.content}
			on:keydown={(e) => e.key === 'Enter' && handleAdd()}
			placeholder="Add a new task..."
		/>
		<select bind:value={newTodo.priority}>
			<option value="High">High</option>
			<option value="Medium">Medium</option>
			<option value="Low">Low</option>
		</select>
		<input type="date" bind:value={newTodo.due_date} placeholder="Due date" />
		<select bind:value={newTodo.category}>
			<option value="" disabled selected>Select category</option>
			<option value="Work">Work</option>
			<option value="Personal">Personal</option>
			<option value="Shopping">Shopping</option>
			<option value="Other">Other</option>
		</select>
		<button on:click={handleAdd}>Add</button>
	</div>

	<div class="filters">
		<input type="text" bind:value={search} placeholder="Search tasks..." />

		<select bind:value={filterPriority}>
			<option value="All">All Priorities</option>
			<option value="High">High</option>
			<option value="Medium">Medium</option>
			<option value="Low">Low</option>
		</select>

		<select bind:value={filterCategory}>
			<option value="All">All Categories</option>
			<option value="Work">Work</option>
			<option value="Personal">Personal</option>
			<option value="Shopping">Shopping</option>
			<option value="Other">Other</option>
		</select>
	</div>

	<!-- List of to-dos -->
	<ul>
		{#each filteredTodos as todo: ExtendedTodo (todo.id)}
			<li class="mb-2 flex items-center justify-between gap-2 rounded bg-gray-100 p-2 text-base">
				<!-- Checkbox to toggle completion -->
				<input
					type="checkbox"
					checked={todo.is_complete}
					on:change={() => toggleTodo(todo.id, todo.is_complete)}
					class="mr-2 scale-120 transform"
				/>

				<!-- Task content, styled with strikethrough if complete -->
				<span
					style:text-decoration={todo.is_complete ? 'line-through' : 'none'}
					class="flex-1 break-words"
				>
					{todo.content}
					<span class="ml-2 text-sm text-gray-500">
						({todo.priority})
					</span>
					{#if todo.due_date}
						<span
							class="ml-2 text-sm"
							style="color: {new Date(todo.due_date) < new Date() ? 'red' : 'gray'};"
						>
							📅 {todo.due_date}
						</span>
					{/if}
					{#if todo.category}
						<span class="ml-2 text-sm text-teal-600">
							🏷️ {todo.category}
						</span>
					{/if}
				</span>

				<!-- Delete button -->
				<button on:click={() => deleteTodo(todo.id)}>🗑️</button>
			</li>
		{/each}
	</ul>
</div>

<!-- Basic mobile-friendly styles -->
<style>
	h1 {
		font-size: 1.75rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
		margin: 0 auto 1.5rem;
		max-width: 500px;
		padding: 0 1rem;
	}

	input[type='text'] {
		padding: 0.6rem;
		font-size: 1rem;
	}

	button {
		padding: 0.6rem;
		font-size: 1rem;
		cursor: pointer;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0 auto;
		max-width: 500px;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.6rem;
		border-radius: 6px;
		margin-bottom: 0.5rem;
		font-size: 1rem;
	}

	li span {
		flex: 1;
		word-break: break-word;
	}

	input[type='checkbox'] {
		transform: scale(1.2);
		margin-right: 0.5rem;
	}

	.filters {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 500px;
		margin: 0 auto 1.5rem;
		padding: 0 1rem;
	}

	.filters input,
	.filters select {
		padding: 0.6rem;
		font-size: 1rem;
	}

	@media (min-width: 600px) {
		.form-wrapper {
			flex-direction: row;
			align-items: center;
		}

		.form-wrapper input[type='text'] {
			flex: 1;
		}

		.form-wrapper button {
			width: auto;
		}

		.filters {
			flex-direction: row;
			align-items: center;
		}
	}
</style>
