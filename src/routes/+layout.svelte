<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { session } from '$lib/stores/session';

	// Logout function
	async function logout() {
		await supabase.auth.signOut();
		window.location.href = '/login';
	}

	// Client-only session logic
	onMount(async () => {
		const { data } = await supabase.auth.getSession();
		session.set(data.session); // Set initial session

		// Watch for login/logout
		supabase.auth.onAuthStateChange((_event, newSession) => {
			session.set(newSession);

			if (!newSession && window.location.pathname !== '/login') {
				window.location.href = '/login';
			}

			if (newSession && window.location.pathname === '/login') {
				window.location.href = '/';
			}
		});
	});
</script>

<nav>
	{#if $session}
		<button on:click={logout}>Logout</button>
	{:else}
		<a href="/login">Login</a> | <a href="/signup">Sign Up</a>
	{/if}
</nav>

<slot />
