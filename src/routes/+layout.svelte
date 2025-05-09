<script lang="ts">
	// Import the Session type for type safety
	import type { Session } from '@supabase/supabase-js';

	// Receive session data from +layout.ts (set on load)
	export let data: { session: Session | null };

	// Import the Supabase client for logout
	import { supabase } from '$lib/supabaseClient';

	// Logout function: signs out the user and redirects to /login
	async function logout() {
		await supabase.auth.signOut();
		window.location.href = '/login';
	}
</script>

<!-- Simple nav bar: shows login/signup if user is logged out, logout if logged in -->
<nav>
	{#if data.session}
		<!-- If user is logged in, show logout button -->
		<button on:click={logout}>Logout</button>
	{:else}
		<!-- If not logged in, show login/signup links -->
		<a href="/login">Login</a> | <a href="/signup">Sign Up</a>
	{/if}
</nav>

<!-- Render the current page content here -->
<slot />
