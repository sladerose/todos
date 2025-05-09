// Import the Supabase client instance
import { supabase } from '$lib/supabaseClient';

// This `load` function runs before each page to provide layout-level data
export const load = async () => {
    // Get the current user's session (if any)
    const {
        data: { session }
    } = await supabase.auth.getSession();

    // Return the session so it's accessible in +layout.svelte via `data.session`
    return { session };
};
