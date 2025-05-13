<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { session } from '$lib/stores/session';
	import { goto } from '$app/navigation'; // ✅ SvelteKit client-side navigation

	// Logout function: ends the session and redirects to login
	async function logout() {
		await supabase.auth.signOut();
		goto('/login'); // 🚫 No reloads — stay in app
	}

	// Run once on the client after mount
	onMount(async () => {
		// Get current session from localStorage
		const { data } = await supabase.auth.getSession();
		session.set(data.session); // ✅ Store in reactive session store

		// Listen for login/logout changes
		supabase.auth.onAuthStateChange((_event, newSession) => {
			session.set(newSession); // ✅ Keep store updated

			// If logged out and not on login page, redirect
			if (!newSession && window.location.pathname !== '/login') {
				goto('/login');
			}

			// If already logged in and stuck on login page, send to home
			if (newSession && window.location.pathname === '/login') {
				goto('/');
			}
		});
	});
</script>

<!-- Navigation bar -->
<nav>
	{#if $session}
		<!-- If user is logged in -->
		<button on:click={logout}>Logout</button>
	{:else}
		<!-- If user is not logged in -->
		<a href="/login">Login</a> | <a href="/signup">Sign Up</a>
	{/if}
</nav>

<!-- Render route content -->
<slot />
