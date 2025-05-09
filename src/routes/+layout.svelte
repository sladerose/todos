<script lang="ts">
	import { onMount } from 'svelte';
	import type { Session } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabaseClient';

	// Session from +layout.ts (optional, may be null on first load)
	export let data: { session: Session | null };

	// Watch session changes and do route-based redirects
	onMount(async () => {
		// Get current session from browser (localStorage)
		const {
			data: { session }
		} = await supabase.auth.getSession();

		const path = window.location.pathname;

		// If user is not logged in and not on /login or /signup, redirect
		if (!session && path !== '/login' && path !== '/signup') {
			window.location.href = '/login';
		}

		// If already logged in and on login/signup, redirect to home
		if (session && (path === '/login' || path === '/signup')) {
			window.location.href = '/';
		}

		// Listen for auth changes (e.g., logout)
		supabase.auth.onAuthStateChange((_event, session) => {
			if (!session) {
				window.location.href = '/login';
			}
		});
	});

	// Logout function: ends session and redirects
	async function logout() {
		await supabase.auth.signOut();
		window.location.href = '/login';
	}
</script>

<!-- Navigation: shows logout if logged in, login/signup if not -->
<nav>
	{#if data.session}
		<button on:click={logout}>Logout</button>
	{:else}
		<a href="/login">Login</a> | <a href="/signup">Sign Up</a>
	{/if}
</nav>

<!-- Render current page -->
<slot />
