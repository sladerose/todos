<script lang="ts">
	import { onMount } from 'svelte';
	import type { Session } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabaseClient';

	// Session passed in from +layout.ts (optional)
	export let data: { session: Session | null };

	// Client-side redirect logic to prevent login loop
	onMount(() => {
		let hasRedirected = false;

		// Check current session from client (localStorage)
		supabase.auth.getSession().then(({ data: { session } }) => {
			const path = window.location.pathname;

			if (!hasRedirected) {
				if (!session && path !== '/login' && path !== '/signup') {
					hasRedirected = true;
					window.location.href = '/login';
				}
				if (session && (path === '/login' || path === '/signup')) {
					hasRedirected = true;
					window.location.href = '/';
				}
			}
		});

		// Handle logout from anywhere
		supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
			if (!session && !hasRedirected) {
				hasRedirected = true;
				window.location.href = '/login';
			}
		});
	});

	// Sign the user out
	async function logout() {
		await supabase.auth.signOut();
		window.location.href = '/login';
	}
</script>

<!-- Navigation -->
<nav>
	{#if data.session}
		<button on:click={logout}>Logout</button>
	{:else}
		<a href="/login">Login</a> | <a href="/signup">Sign Up</a>
	{/if}
</nav>

<!-- Page content -->
<slot />
