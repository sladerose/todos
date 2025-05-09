<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let email = '';
	let password = '';
	let error = '';

	// Handles user registration
	async function signup() {
		// Basic validation: prevent empty input
		if (!email || !password) {
			error = 'Please provide both email and password.';
			return;
		}

		// Call Supabase Auth signup endpoint
		const { error: authError } = await supabase.auth.signUp({ email, password });

		if (authError) {
			error = authError.message;
		} else {
			// Redirect to login after successful signup
			window.location.href = '/login';
		}
	}
</script>

<h1>Sign Up</h1>

<!-- Email input field -->
<input type="email" bind:value={email} placeholder="Email" />

<!-- Password input field -->
<input type="password" bind:value={password} placeholder="Password" />

<!-- Sign up button -->
<button on:click={signup}>Sign Up</button>

<!-- Display error message -->
{#if error}
	<p style="color: red;">{error}</p>
{/if}
