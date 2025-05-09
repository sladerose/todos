<script lang="ts">
	import { onMount } from 'svelte';
	import { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } from '$lib/stores/todos';
	import type { Todo } from '$lib/stores/todos';

	let newTodo = '';

	onMount(() => {
		fetchTodos();
	});

	async function handleAdd() {
		if (newTodo.trim()) {
			await addTodo(newTodo.trim());
			newTodo = '';
		}
	}
</script>

<h1>📝 To-Do List</h1>

<div>
	<input
		type="text"
		bind:value={newTodo}
		on:keydown={(e) => e.key === 'Enter' && handleAdd()}
		placeholder="Add a new task..."
	/>
	<button on:click={handleAdd}>Add</button>
</div>

<ul>
	{#each $todos as todo (todo.id)}
		<li>
			<input
				type="checkbox"
				checked={todo.is_complete}
				on:change={() => toggleTodo(todo.id, todo.is_complete)}
			/>
			<span style:text-decoration={todo.is_complete ? 'line-through' : 'none'}>
				{todo.content}
			</span>
			<button on:click={() => deleteTodo(todo.id)}>🗑️</button>
		</li>
	{/each}
</ul>

<style>
	h1 {
		font-size: 1.75rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	div {
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
		background: #f2f2f2;
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

	@media (min-width: 600px) {
		div {
			flex-direction: row;
			align-items: center;
		}

		input[type='text'] {
			flex: 1;
		}

		button {
			width: auto;
		}
	}
</style>
