<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	// Two-way bound form fields for email and password
	let email = '';
	let password = '';

	// Error message (if login fails)
	let error = '';

	// Function to handle login using Supabase's email/password auth
	async function login() {
		// Call Supabase sign-in
		const { error: authError, data: sessionData } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		// Show error message if authentication fails
		if (authError) {
			error = authError.message;
		} else {
			// Log session data (optional)
			console.log('Session after login:', sessionData);

			// Redirect to the home page on success
			window.location.href = '/';
		}
	}
</script>

<!-- Simple Login Form UI -->
<h1>Login</h1>

<!-- Email input field -->
<input type="email" bind:value={email} placeholder="Email" />

<!-- Password input field -->
<input type="password" bind:value={password} placeholder="Password" />

<!-- Submit button -->
<button on:click={login}>Login</button>

<!-- Error message display -->
{#if error}
	<p style="color: red;">{error}</p>
{/if}
