<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	// Form state: email, password, and error message
	let email = '';
	let password = '';
	let error = '';

	// Handle user signup with Supabase Auth
	async function signup() {
		// Use Supabase's built-in email/password signup method
		const { error: authError } = await supabase.auth.signUp({ email, password });

		// Display error message if signup fails
		if (authError) {
			error = authError.message;
		} else {
			// Redirect to login page after successful signup
			window.location.href = '/login';
		}
	}
</script>

<!-- Sign Up Form UI -->
<h1>Sign Up</h1>

<!-- Email input -->
<input type="email" bind:value={email} placeholder="Email" />

<!-- Password input -->
<input type="password" bind:value={password} placeholder="Password" />

<!-- Submit button -->
<button on:click={signup}>Sign Up</button>

<!-- Error message display -->
{#if error}
	<p style="color: red;">{error}</p>
{/if}
